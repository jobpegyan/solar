/**
 * Financial calculation engine for solar project estimates.
 * All formulas are based on industry standards for solar financial modeling.
 */

export interface SystemCostInputs {
  systemSizeWatts: number;
  costPerWatt: number | undefined;
  installationCost: number;
  equipmentCost: number;
  batteryCost: number;
  additionalCosts: number;
  incentives: number;
}

export interface SystemCostResults {
  baseSystemCost: number;
  grossProjectCost: number;
  estimatedNetCost: number;
  estimatedInstallationCost: number;
  estimatedEquipmentCost: number;
  estimatedBatteryCost: number;
  estimatedIncentives: number;
  costPerWatt: number;
}

export interface SavingsInputs {
  monthlyUsageKWh: number;
  electricityRate: number;
  annualProductionKWh: number;
  solarSelfConsumptionPct: number; // 0-100
  exportCompensationRate: number;
  annualEscalationRate: number;
  annualDegradationRate: number;
  annualMaintenanceCost: number;
  analysisPeriodYears: number;
}

export interface SavingsResults {
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number[]; // Array of cumulative savings for each year
  totalLifetimeSavings: number;
  totalMaintenanceCost: number;
  totalDegradationLoss: number;
}

export interface ROIResults {
  netGain: number;
  simpleROI: number;
  paybackPeriod: number | null;
  paybackTimeline: { year: number; balance: number }[];
}

/**
 * Calculates total system cost using either cost-per-watt or component method.
 */
export function calculateSystemCost(inputs: SystemCostInputs): SystemCostResults {
  const {
    systemSizeWatts,
    costPerWatt,
    installationCost = 0,
    equipmentCost = 0,
    batteryCost = 0,
    additionalCosts = 0,
    incentives = 0,
  } = inputs;

  let baseSystemCost = 0;
  let estimatedInstallationCost = installationCost;
  let estimatedEquipmentCost = equipmentCost;

  if (costPerWatt !== undefined && costPerWatt > 0) {
    baseSystemCost = systemSizeWatts * costPerWatt;
    if (installationCost === 0) estimatedInstallationCost = baseSystemCost * 0.25;
    if (equipmentCost === 0) estimatedEquipmentCost = baseSystemCost * 0.75;
  } else {
    baseSystemCost = installationCost + equipmentCost;
  }

  const grossProjectCost = baseSystemCost + batteryCost + additionalCosts;
  const estimatedNetCost = Math.max(0, grossProjectCost - incentives);
  
  const finalCostPerWatt = systemSizeWatts > 0 ? grossProjectCost / systemSizeWatts : 0;

  return {
    baseSystemCost,
    grossProjectCost,
    estimatedNetCost,
    estimatedInstallationCost,
    estimatedEquipmentCost,
    estimatedBatteryCost: batteryCost,
    estimatedIncentives: incentives,
    costPerWatt: finalCostPerWatt,
  };
}

/**
 * Calculates solar savings over a specific period.
 */
export function calculateSavings(inputs: SavingsInputs): SavingsResults {
  const {
    monthlyUsageKWh,
    electricityRate,
    annualProductionKWh,
    solarSelfConsumptionPct,
    exportCompensationRate = 0,
    annualEscalationRate = 0,
    annualDegradationRate = 0.5,
    annualMaintenanceCost = 0,
    analysisPeriodYears = 25,
  } = inputs;

  const selfConsumptionFactor = solarSelfConsumptionPct / 100;
  const escalationFactor = 1 + annualEscalationRate / 100;
  const degradationFactor = 1 - annualDegradationRate / 100;

  const lifetimeSavings: number[] = [];
  let totalLifetimeSavings = 0;
  let totalMaintenanceCost = 0;
  let cumulativeSavings = 0;

  for (let year = 1; year <= analysisPeriodYears; year++) {
    const yearProduction = annualProductionKWh * Math.pow(degradationFactor, year - 1);
    const yearRate = electricityRate * Math.pow(escalationFactor, year - 1);
    const yearExportRate = exportCompensationRate * Math.pow(escalationFactor, year - 1);

    const selfConsumedEnergy = Math.min(yearProduction * selfConsumptionFactor, monthlyUsageKWh * 12);
    const exportedEnergy = Math.max(0, yearProduction - selfConsumedEnergy);

    const yearSavings = (selfConsumedEnergy * yearRate) + (exportedEnergy * yearExportRate) - annualMaintenanceCost;
    
    cumulativeSavings += yearSavings;
    lifetimeSavings.push(cumulativeSavings);
    totalLifetimeSavings = cumulativeSavings;
    totalMaintenanceCost += annualMaintenanceCost;
  }

  const firstYearCumulative = lifetimeSavings[0];
  const annualSavings = firstYearCumulative !== undefined ? firstYearCumulative + annualMaintenanceCost : 0; 
  const monthlySavings = annualSavings / 12;

  return {
    monthlySavings,
    annualSavings,
    lifetimeSavings,
    totalLifetimeSavings,
    totalMaintenanceCost,
    totalDegradationLoss: 0, 
  };
}

/**
 * Calculates ROI and Payback Period.
 */
export function calculateFinancialROI(netCost: number, annualBenefit: number, savingsResults: SavingsResults): ROIResults {
  const totalBenefit = savingsResults.totalLifetimeSavings;
  const netGain = totalBenefit - netCost;
  const simpleROI = netCost > 0 ? (netGain / netCost) * 100 : 0;

  let paybackPeriod: number | null = null;
  const paybackTimeline: { year: number; balance: number }[] = [{ year: 0, balance: -netCost }];

  for (let i = 0; i < savingsResults.lifetimeSavings.length; i++) {
    const year = i + 1;
    const currentLifetimeSaving = savingsResults.lifetimeSavings[i];
    if (currentLifetimeSaving === undefined) continue;
    
    const balance = currentLifetimeSaving - netCost;
    const prevEntry = paybackTimeline[i];
    paybackTimeline.push({ year, balance });

    if (paybackPeriod === null && balance >= 0 && prevEntry) {
      const prevBalance = prevEntry.balance;
      const yearGain = balance - prevBalance;
      if (yearGain > 0) {
        paybackPeriod = (year - 1) + (Math.abs(prevBalance) / yearGain);
      } else {
        paybackPeriod = year;
      }
    }
  }

  return {
    netGain,
    simpleROI,
    paybackPeriod,
    paybackTimeline,
  };
}
