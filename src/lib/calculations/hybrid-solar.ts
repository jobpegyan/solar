import { solarConfig } from "../solar-config";
import { calculateBattery } from "./solar-battery";
import { calculateInverter } from "./solar-inverter";

export interface HybridInput {
  monthlyUsageKWh: number;
  peakLoadKW: number;
  backupLoadKW: number;
  backupHours: number;
  peakSunHours?: number;
  performanceRatio?: number;
}

export interface HybridResults {
  recommendedSolarKW: number;
  recommendedBatteryKWh: number;
  recommendedInverterKW: number;
  dailyGenerationKWh: number;
  estimatedGridDependence: number;
}

export function calculateHybrid(input: HybridInput): HybridResults {
  const sunHours = input.peakSunHours || solarConfig.defaultPeakSunHours;
  const pr = input.performanceRatio || solarConfig.defaultPerformanceRatio;
  const dailyUsage = input.monthlyUsageKWh / 30.42;

  // 1. Solar Sizing (aiming for 100% offset of consumption)
  const solarKW = dailyUsage / (sunHours * pr);

  // 2. Battery Sizing (based on backup requirements)
  const batteryRes = calculateBattery({
    backupLoadW: input.backupLoadKW * 1000,
    backupDurationHours: input.backupHours
  });

  // 3. Inverter Sizing
  const inverterRes = calculateInverter({
    systemSizeKW: solarKW,
    maxContinuousLoadKW: input.peakLoadKW,
    peakLoadKW: input.peakLoadKW * 1.5,
    systemType: 'hybrid'
  });

  // 4. Grid dependence (rough estimate)
  // Simple model: grid dependency is what solar doesn't cover
  // but in hybrid we assume some night-time battery use
  const dailyGen = solarKW * sunHours * pr;
  const deficit = Math.max(0, dailyUsage - dailyGen);
  const gridDependence = (deficit / dailyUsage) * 100;

  return {
    recommendedSolarKW: Number(solarKW.toFixed(2)),
    recommendedBatteryKWh: batteryRes.nominalCapacityKWh,
    recommendedInverterKW: inverterRes.recommendedInverterSizeKW,
    dailyGenerationKWh: Number(dailyGen.toFixed(2)),
    estimatedGridDependence: Math.round(gridDependence)
  };
}
