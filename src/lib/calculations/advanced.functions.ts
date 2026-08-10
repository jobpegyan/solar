import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { 
  calculateOptimalTilt, 
  calculateIrradianceMetrics, 
  calculateShadingLoss, 
  calculateCombinedLosses 
} from "./advanced";
import { calculateSystemSize } from "./solar-system";

const baseSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  optimizationGoal: z.enum(['annual', 'summer', 'winter', 'custom']).optional(),
  peakSunHours: z.number().optional(),
  irradianceWm2: z.number().optional(),
  dailyKwhM2: z.number().optional(),
  shadingPercentage: z.number().min(0).max(100).optional(),
  baselineProduction: z.number().optional(),
  losses: z.object({
    panelDegradation: z.number().default(0),
    inverter: z.number().default(0),
    wiring: z.number().default(0),
    soiling: z.number().default(0),
    shading: z.number().default(0),
    mismatch: z.number().default(0),
    temperature: z.number().default(0),
    other: z.number().default(0),
  }).optional(),
  // Array size specific
  annualEnergyKwh: z.number().optional(),
  panelWattage: z.number().optional(),
  targetOffset: z.number().optional(),
});

export const calculateAdvancedSolar = createServerFn({ method: "POST" })
  .inputValidator((data) => baseSchema.parse(data))
  .handler(async ({ data }) => {
    const results: any = {};

    // Tilt Calculation
    if (data.latitude !== undefined) {
      results.tilt = calculateOptimalTilt({
        latitude: data.latitude,
        goal: data.optimizationGoal || 'annual'
      });
    }

    // Irradiance Calculation
    if (data.peakSunHours !== undefined || data.dailyKwhM2 !== undefined || data.irradianceWm2 !== undefined) {
      results.irradiance = calculateIrradianceMetrics({
        peakSunHours: data.peakSunHours ?? null,
        irradianceWm2: data.irradianceWm2 ?? null,
        dailyKwhM2: data.dailyKwhM2 ?? null
      });
    }

    // Shading Calculation
    if (data.shadingPercentage !== undefined && data.baselineProduction !== undefined) {
      results.shading = calculateShadingLoss({
        baselineProduction: data.baselineProduction,
        shadingPercentage: data.shadingPercentage
      });
    }

    // Combined Losses
    if (data.losses) {
      results.losses = calculateCombinedLosses({
        initialOutput: data.baselineProduction || 1000,
        losses: data.losses as any
      });
    }

    // Array Size - Reusing existing engine
    if (data.annualEnergyKwh && data.peakSunHours) {
      const solarRes = calculateSystemSize({
        monthlyUsageKWh: data.annualEnergyKwh / 12,
        peakSunHours: data.peakSunHours,
        panelWattage: data.panelWattage || 400,
        targetOffset: data.targetOffset || 100
      });
      results.array = solarRes;
    }

    return results;
  });
