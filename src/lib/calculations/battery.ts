/**
 * Solar Battery Calculation Engine
 * All formulas are based on standard electrical engineering principles for battery storage.
 */

export interface BatterySizeInputs {
  backupLoadW: number;
  backupDurationHours: number;
  batteryEfficiency: number; // 0-100
  depthOfDischarge: number; // 0-100
  reservePercentage: number; // 0-100
}

export interface BatteryRuntimeInputs {
  batteryCapacityKWh: number;
  depthOfDischarge: number; // 0-100
  batteryEfficiency: number; // 0-100
  inverterEfficiency: number; // 0-100
  backupLoadW: number;
  stateOfCharge: number; // 0-100
}

export interface BatteryBankInputs {
  batteryEnergyWh: number;
  batteryVoltageV: number;
}

export interface BatterySizeResults {
  backupEnergyRequiredKWh: number;
  requiredUsableEnergyKWh: number;
  requiredNominalCapacityKWh: number;
  estimatedUsableCapacityKWh: number;
}

export interface BatteryRuntimeResults {
  usableEnergyKWh: number;
  availableACEnergyKWh: number;
  estimatedBackupTimeHours: number;
}

/**
 * Calculates battery capacity needed for a target backup load and duration.
 */
export function calculateBatterySize(inputs: BatterySizeInputs): BatterySizeResults {
  const {
    backupLoadW,
    backupDurationHours,
    batteryEfficiency,
    depthOfDischarge,
    reservePercentage = 0,
  } = inputs;

  const eff = Math.max(0.01, batteryEfficiency / 100);
  const dod = Math.max(0.01, depthOfDischarge / 100);
  const res = reservePercentage / 100;

  // Basic backup energy in kWh
  const backupEnergyRequiredKWh = (backupLoadW * backupDurationHours) / 1000;
  
  // Account for efficiency and reserve
  const requiredUsableEnergyKWh = (backupEnergyRequiredKWh / eff) * (1 + res);
  
  // Account for Depth of Discharge to get Nominal Capacity
  const requiredNominalCapacityKWh = requiredUsableEnergyKWh / dod;

  return {
    backupEnergyRequiredKWh,
    requiredUsableEnergyKWh,
    requiredNominalCapacityKWh,
    estimatedUsableCapacityKWh: requiredNominalCapacityKWh * dod * eff,
  };
}

/**
 * Calculates backup time based on battery capacity and load.
 */
export function calculateBatteryRuntime(inputs: BatteryRuntimeInputs): BatteryRuntimeResults {
  const {
    batteryCapacityKWh,
    depthOfDischarge,
    batteryEfficiency,
    inverterEfficiency,
    backupLoadW,
    stateOfCharge = 100,
  } = inputs;

  const dod = depthOfDischarge / 100;
  const battEff = batteryEfficiency / 100;
  const invEff = inverterEfficiency / 100;
  const soc = stateOfCharge / 100;

  // Usable energy based on current state of charge and DoD limit
  // We assume we can discharge down to (1-DoD)
  // E.g. If DoD is 80%, we can go down to 20% SoC. 
  // If current SoC is 90%, available fraction is (90% - 20%) = 70% of nominal capacity?
  // Actually, standard formula for "usable" is often just Nom * DoD * Eff.
  // With SoC, available energy is Nom * (SoC - (1-DoD)) * Eff.
  
  const minSoC = 1 - dod;
  const availableFraction = Math.max(0, soc - minSoC);
  
  const usableEnergyKWh = batteryCapacityKWh * availableFraction;
  const availableACEnergyKWh = usableEnergyKWh * battEff * invEff;
  
  const estimatedBackupTimeHours = backupLoadW > 0 ? (availableACEnergyKWh * 1000) / backupLoadW : 0;

  return {
    usableEnergyKWh,
    availableACEnergyKWh,
    estimatedBackupTimeHours,
  };
}

/**
 * Converts energy to Amp Hours for a specific voltage.
 */
export function calculateBatteryBankSize(inputs: BatteryBankInputs): number {
  const { batteryEnergyWh, batteryVoltageV } = inputs;
  if (batteryVoltageV <= 0) return 0;
  return batteryEnergyWh / batteryVoltageV;
}
