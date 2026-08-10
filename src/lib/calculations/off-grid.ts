import { solarConfig } from "../solar-config";
import { calculateAppliances, Appliance } from "./appliances";
import { calculateBattery, BatteryInput } from "./solar-battery";
import { calculateInverter } from "./solar-inverter";

export interface OffGridInput {
  appliances: Appliance[];
  autonomyDays: number;
  peakSunHours?: number;
  performanceRatio?: number;
  batteryVoltage?: number;
  batteryEfficiency?: number;
  depthOfDischarge?: number;
}

export interface OffGridResults {
  recommendedSolarKW: number;
  recommendedBatteryKWh: number;
  recommendedInverterKW: number;
  dailyEnergyRequirementKWh: number;
  estimatedGenerationKWhPerDay: number;
  estimatedAutonomyDays: number;
  peakLoadW: number;
}

export function calculateOffGrid(input: OffGridInput): OffGridResults {
  const sunHours = input.peakSunHours || solarConfig.defaultPeakSunHours;
  const pr = input.performanceRatio || solarConfig.defaultPerformanceRatio;
  
  // 1. Calculate Load
  const appResults = calculateAppliances(input.appliances);
  const dailyEnergyKWh = appResults.totalDailyEnergyKWh;

  // 2. Solar Sizing: Load / (Sun Hours * PR)
  // We add a safety margin for off-grid (usually 1.2x)
  const solarKW = (dailyEnergyKWh / (sunHours * pr)) * 1.2;

  // 3. Battery Sizing: Load * Autonomy / (Efficiency * DOD)
  const batteryRes = calculateBattery({
    dailyEnergyKWh: dailyEnergyKWh,
    backupPercentage: input.autonomyDays,
    batteryVoltage: input.batteryVoltage,
    batteryEfficiency: input.batteryEfficiency,
    depthOfDischarge: input.depthOfDischarge
  } as BatteryInput);



  // 4. Inverter Sizing: Based on Peak Load
  const inverterRes = calculateInverter({
    systemSizeKW: solarKW,
    maxContinuousLoadKW: appResults.estimatedPeakLoadW / 1000,
    peakLoadKW: (appResults.estimatedPeakLoadW * 2) / 1000, // Assuming peak is 2x continuous
    systemType: 'off-grid'
  });

  return {
    recommendedSolarKW: Number(solarKW.toFixed(2)),
    recommendedBatteryKWh: batteryRes.nominalCapacityKWh,
    recommendedInverterKW: inverterRes.recommendedInverterSizeKW,
    dailyEnergyRequirementKWh: dailyEnergyKWh,
    estimatedGenerationKWhPerDay: Number((solarKW * sunHours * pr).toFixed(2)),
    estimatedAutonomyDays: input.autonomyDays,
    peakLoadW: appResults.estimatedPeakLoadW
  };
}
