import { solarConfig } from "../solar-config";

export interface SavingsInput {
  systemSizeKW: number;
  tariffPerKWh?: number;
  annualPriceIncrease?: number;
  systemLifetime?: number;
  peakSunHours?: number;
  performanceRatio?: number;
}

export interface SavingsResults {
  annualGenerationKWh: number;
  monthlySavings: number;
  annualSavings: number;
  savings10Year: number;
  savings25Year: number;
  lifetimeSavings: number;
  cumulativeSavings: { year: number; savings: number }[];
}

export function calculateSavings(input: SavingsInput): SavingsResults {
  const {
    systemSizeKW,
    tariffPerKWh = solarConfig.defaultTariffPerKWh,
    annualPriceIncrease = solarConfig.defaultAnnualPriceIncrease,
    systemLifetime = solarConfig.defaultSystemLifetime,
    peakSunHours = solarConfig.defaultPeakSunHours,
    performanceRatio = solarConfig.defaultPerformanceRatio,
  } = input;

  const dailyGeneration = systemSizeKW * peakSunHours * performanceRatio;
  const annualGeneration = dailyGeneration * 365;
  const initialAnnualSavings = annualGeneration * tariffPerKWh;

  let cumulativeTotal = 0;
  const cumulativeSavings: { year: number; savings: number }[] = [];

  for (let year = 1; year <= systemLifetime; year++) {
    // Tariff increases each year
    const currentTariff = tariffPerKWh * Math.pow(1 + annualPriceIncrease, year - 1);
    const yearlySavings = annualGeneration * currentTariff;
    cumulativeTotal += yearlySavings;
    cumulativeSavings.push({ year, savings: Math.round(cumulativeTotal) });
  }

  const savings10Year = cumulativeSavings[Math.min(9, systemLifetime - 1)]?.savings || 0;
  const savings25Year = cumulativeSavings[Math.min(24, systemLifetime - 1)]?.savings || 0;

  return {
    annualGenerationKWh: Math.round(annualGeneration),
    monthlySavings: Math.round(initialAnnualSavings / 12),
    annualSavings: Math.round(initialAnnualSavings),
    savings10Year,
    savings25Year,
    lifetimeSavings: Math.round(cumulativeTotal),
    cumulativeSavings,
  };
}
