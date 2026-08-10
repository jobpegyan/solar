import { BillResult } from './utility-billing';
import { solarConfig } from '../solar-config';

export interface PaybackResults {
  paybackYears: number;
  netInvestment: number;
  annualSavings: number;
  lifetimeSavings: number;
  cumulativeCashflow: { year: number; cashflow: number; investment: number }[];
}

export interface PaybackInput {
  systemSizeKW: number;
  systemCost: number;
  subsidy: number;
  monthlyBill: number;
  tariffPerKWh: number;
  annualMaintenanceCost: number;
  peakSunHours: number;
  performanceRatio: number;
}

// Simple memoization for core calculations
const paybackCache = new Map<string, PaybackResults>();

export const calculatePayback = (input: PaybackInput): PaybackResults => {
  const cacheKey = JSON.stringify(input);
  if (paybackCache.has(cacheKey)) return paybackCache.get(cacheKey)!;

  const { 
    systemSizeKW, 
    systemCost, 
    subsidy, 
    monthlyBill, 
    tariffPerKWh, 
    annualMaintenanceCost,
    peakSunHours,
    performanceRatio 
  } = input;

  const netInvestment = systemCost - subsidy;
  const annualGeneration = systemSizeKW * peakSunHours * performanceRatio * 365;
  const initialAnnualSavings = Math.min(monthlyBill * 12, annualGeneration * tariffPerKWh);
  
  let cumulativeSavings = 0;
  let paybackYears = 0;
  const cumulativeCashflow = [];
  const annualPriceIncrease = solarConfig.defaultAnnualPriceIncrease || 0.03;

  for (let year = 1; year <= 25; year++) {
    const yearSavings = initialAnnualSavings * Math.pow(1 + annualPriceIncrease, year - 1) - annualMaintenanceCost;
    cumulativeSavings += yearSavings;
    
    if (paybackYears === 0 && cumulativeSavings >= netInvestment) {
      paybackYears = year;
    }

    cumulativeCashflow.push({
      year,
      cashflow: Math.round(cumulativeSavings),
      investment: netInvestment
    });
  }

  const result = {
    paybackYears: paybackYears || 25,
    netInvestment,
    annualSavings: Math.round(initialAnnualSavings - annualMaintenanceCost),
    lifetimeSavings: Math.round(cumulativeSavings),
    cumulativeCashflow
  };

  paybackCache.set(cacheKey, result);
  return result;
};

export interface FinancialProjectionYear {
  year: number;
  generation: number;
  billWithoutSolar: number;
  billWithSolar: number;
  savings: number;
  maintenance: number;
  replacementCost: number;
  netCashFlow: number;
  cumulativeBenefit: number;
}

export interface PaybackConfig {
  systemCost: number;
  incentives: number;
  annualDegradation: number; // e.g., 0.005 for 0.5%
  electricityPriceIncrease: number; // e.g., 0.03 for 3%
  maintenanceAnnual: number;
  inverterReplacementCost?: number;
  inverterReplacementYear?: number;
  batteryReplacementCost?: number;
  batteryReplacementYear?: number;
  analysisPeriodYears: number;
}

const projectionCache = new Map<string, FinancialProjectionYear[]>();

export const calculateLongTermProjection = (
  annualBillResults: BillResult[],
  config: PaybackConfig
): FinancialProjectionYear[] => {
  const cacheKey = JSON.stringify({ annualBillResults, config });
  if (projectionCache.has(cacheKey)) return projectionCache.get(cacheKey)!;

  const {
    systemCost,
    incentives,
    annualDegradation,
    electricityPriceIncrease,
    maintenanceAnnual,
    inverterReplacementCost = 0,
    inverterReplacementYear = 0,
    batteryReplacementCost = 0,
    batteryReplacementYear = 0,
    analysisPeriodYears = 25
  } = config;

  const initialAnnualSavings = annualBillResults.reduce((acc, curr) => acc + curr.savings, 0);
  const initialAnnualBillWithout = annualBillResults.reduce((acc, curr) => acc + curr.billWithoutSolar, 0);
  const initialAnnualBillWith = annualBillResults.reduce((acc, curr) => acc + curr.billWithSolar, 0);
  const initialAnnualGen = annualBillResults.reduce((acc, curr) => acc + curr.generation, 0);

  const projection: FinancialProjectionYear[] = [];
  let cumulativeBenefit = - (systemCost - incentives);

  for (let year = 1; year <= analysisPeriodYears; year++) {
    const degradationFactor = Math.pow(1 - annualDegradation, year - 1);
    const generation = initialAnnualGen * degradationFactor;
    const priceFactor = Math.pow(1 + electricityPriceIncrease, year - 1);
    const billWithoutSolar = initialAnnualBillWithout * priceFactor;
    const billWithSolar = initialAnnualBillWith * priceFactor * (1 + (1 - degradationFactor) * 0.5); 
    const savings = billWithoutSolar - billWithSolar;

    let replacementCost = 0;
    if (year === inverterReplacementYear) replacementCost += inverterReplacementCost;
    if (year === batteryReplacementYear) replacementCost += batteryReplacementCost;

    const maintenance = maintenanceAnnual * priceFactor;
    const netCashFlow = savings - maintenance - replacementCost;
    cumulativeBenefit += netCashFlow;

    projection.push({
      year,
      generation,
      billWithoutSolar,
      billWithSolar,
      savings,
      maintenance,
      replacementCost,
      netCashFlow,
      cumulativeBenefit
    });
  }

  projectionCache.set(cacheKey, projection);
  return projection;
};

export const findBreakEvenYear = (projection: FinancialProjectionYear[]): number | null => {
  const year = projection.find(p => p.cumulativeBenefit >= 0)?.year;
  return year || null;
};
