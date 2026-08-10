import { solarConfig } from "../solar-config";

export interface BatteryInput {
  // Method A: Backup Load
  backupLoadW?: number;
  backupDurationHours?: number;
  
  // Method B: Daily Energy
  dailyEnergyKWh?: number;
  backupPercentage?: number;
  
  // Common
  batteryVoltage?: number;
  batteryEfficiency?: number;
  depthOfDischarge?: number;
  batteryType?: string;
}

export interface BatteryResults {
  recommendedCapacityKWh: number;
  usableCapacityKWh: number;
  nominalCapacityKWh: number;
  estimatedBackupDurationHours: number;
  recommendedVoltageV: number;
  nominalCapacityAh: number;
  calculationExplanation: string;
}

export function calculateBattery(input: BatteryInput): BatteryResults {
  const voltage = input.batteryVoltage || solarConfig.defaultBatteryVoltage;
  const efficiency = input.batteryEfficiency || solarConfig.defaultBatteryEfficiency;
  const dod = input.depthOfDischarge || solarConfig.defaultDepthOfDischarge;

  let requiredEnergyKWh = 0;
  let explanation = "";

  if (input.backupLoadW !== undefined && input.backupDurationHours !== undefined) {
    requiredEnergyKWh = (input.backupLoadW * input.backupDurationHours) / 1000;
    explanation = `Required Energy (${requiredEnergyKWh.toFixed(2)} kWh) = Load (${input.backupLoadW}W) × Hours (${input.backupDurationHours}h) / 1000`;
  } else if (input.dailyEnergyKWh !== undefined && input.backupPercentage !== undefined) {
    requiredEnergyKWh = input.dailyEnergyKWh * input.backupPercentage;
    explanation = `Required Energy (${requiredEnergyKWh.toFixed(2)} kWh) = Daily Usage (${input.dailyEnergyKWh} kWh) × Backup Percentage (${(input.backupPercentage * 100).toFixed(0)}%)`;
  }

  const nominalCapacityKWh = (requiredEnergyKWh > 0 && efficiency > 0 && dod > 0) 
    ? requiredEnergyKWh / (efficiency * dod) 
    : 0;
    
  const usableCapacityKWh = nominalCapacityKWh * dod;
  const nominalAh = voltage > 0 ? (nominalCapacityKWh * 1000) / voltage : 0;

  return {
    recommendedCapacityKWh: Number(nominalCapacityKWh.toFixed(2)),
    usableCapacityKWh: Number(usableCapacityKWh.toFixed(2)),
    nominalCapacityKWh: Number(nominalCapacityKWh.toFixed(2)),
    estimatedBackupDurationHours: input.backupDurationHours || 0,
    recommendedVoltageV: voltage,
    nominalCapacityAh: Math.round(nominalAh),
    calculationExplanation: explanation
  };
}
