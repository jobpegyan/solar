import { z } from "zod";

/**
 * Advanced Solar Calculations Module
 * 
 * Handles Tilt, Irradiance, Shading, and System Losses.
 */

// --- TILT & ORIENTATION ---

export interface TiltOptimizationInputs {
  latitude: number;
  goal: 'annual' | 'summer' | 'winter' | 'custom';
}

/**
 * Estimates optimal planning tilt based on latitude and goal.
 * Based on common planning heuristics.
 */
export const calculateOptimalTilt = (inputs: TiltOptimizationInputs) => {
  const { latitude, goal } = inputs;
  const absLat = Math.abs(latitude);
  
  let tilt = absLat; // Default: Annual production is roughly latitude

  if (goal === 'summer') {
    // Summer: Flatter angle to capture high sun
    tilt = absLat * 0.9 - 15;
  } else if (goal === 'winter') {
    // Winter: Steeper angle to capture low sun
    tilt = absLat * 0.9 + 15;
  }

  // Clamping
  tilt = Math.max(0, Math.min(90, tilt));
  
  return {
    estimatedTilt: Math.round(tilt * 10) / 10,
    latitude: latitude,
    optimizationGoal: goal,
    guidance: `Optimal tilt for ${goal} production at ${absLat}° latitude.`
  };
};

export const getOrientationGuidance = (latitude: number, azimuth: number) => {
  const isNorthernHemisphere = latitude >= 0;
  const idealAzimuth = isNorthernHemisphere ? 180 : 0; // 180 = South, 0 = North
  
  return {
    isNorthernHemisphere,
    recommendedAzimuth: idealAzimuth,
    deviation: Math.abs(azimuth - idealAzimuth),
    description: isNorthernHemisphere 
      ? "In the Northern Hemisphere, south-facing (180°) is generally optimal."
      : "In the Southern Hemisphere, north-facing (0°) is generally optimal."
  };
};

// --- IRRADIANCE ---

export interface IrradianceInputs {
  peakSunHours?: number | null;
  irradianceWm2?: number | null;
  dailyKwhM2?: number | null;
}

export const calculateIrradianceMetrics = (inputs: IrradianceInputs) => {
  const peakSunHours = inputs.peakSunHours ?? inputs.dailyKwhM2 ?? 0;
  const irradiance = inputs.irradianceWm2 ?? (peakSunHours > 0 ? 1000 : 0); // 1kW/m2 is STC

  return {
    peakSunHours,
    dailyEnergyKwhM2: peakSunHours, // 1 PSH = 1 kWh/m2/day
    monthlyEstimate: peakSunHours * 30,
    annualEstimate: peakSunHours * 365,
    irradianceWm2: irradiance
  };
};

// --- SHADING ---

export interface ShadingInputs {
  baselineProduction: number;
  shadingPercentage: number;
  monthlyShading?: number[];
}

export const calculateShadingLoss = (inputs: ShadingInputs) => {
  const { baselineProduction, shadingPercentage, monthlyShading } = inputs;
  
  const estimatedProduction = baselineProduction * (1 - (shadingPercentage / 100));
  
  let monthlyAdjusted: number[] = [];
  if (monthlyShading && monthlyShading.length === 12) {
    const monthlyBaseline = baselineProduction / 12;
    monthlyAdjusted = monthlyShading.map(sh => monthlyBaseline * (1 - (sh / 100)));
  }

  return {
    estimatedProduction: Math.max(0, estimatedProduction),
    totalShadingLoss: (shadingPercentage / 100) * baselineProduction,
    monthlyProduction: monthlyAdjusted
  };
};

// --- SYSTEM LOSSES ---

export interface SystemLossInputs {
  initialOutput: number;
  losses: {
    panelDegradation: number;
    inverter: number;
    wiring: number;
    soiling: number;
    shading: number;
    mismatch: number;
    temperature: number;
    other: number;
  };
}

/**
 * Calculates losses sequentially to avoid double counting or simple addition errors.
 */
export const calculateCombinedLosses = (inputs: SystemLossInputs) => {
  const { initialOutput, losses } = inputs;
  
  let currentOutput = initialOutput;
  const lossDetails: Record<string, number> = {};
  
  // Sequential loss application
  Object.entries(losses).forEach(([key, value]) => {
    const lossFraction = value / 100;
    const lossAmount = currentOutput * lossFraction;
    lossDetails[key] = lossAmount;
    currentOutput -= lossAmount;
  });

  const totalLossPercentage = initialOutput > 0 
    ? ((initialOutput - currentOutput) / initialOutput) * 100 
    : 0;

  return {
    remainingOutput: currentOutput,
    totalLossPercentage: Math.round(totalLossPercentage * 100) / 100,
    remainingFraction: initialOutput > 0 ? currentOutput / initialOutput : 0,
    lossBreakdown: lossDetails
  };
};
