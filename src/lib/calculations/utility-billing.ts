import { MonthlyGeneration } from './solar-system';

export type ExportModel = 'net-metering' | 'net-billing' | 'feed-in-tariff' | 'self-consumption-only' | 'unknown';

export interface UtilityBillingConfig {
  modelType: ExportModel;
  fixedMonthlyCharge: number;
  importRate: number;
  exportRate?: number;
  selfConsumptionRate: number; // 0 to 1
}

export interface BillResult {
  month: string;
  billWithoutSolar: number;
  billWithSolar: number;
  savings: number;
  consumption: number;
  generation: number;
  imported: number;
  exported: number;
  selfConsumed: number;
  exportCompensation: number;
}

export const calculateMonthlyBill = (
  consumptionKwh: number,
  generationKwh: number,
  config: UtilityBillingConfig
): Omit<BillResult, 'month'> => {
  const { modelType, fixedMonthlyCharge, importRate, exportRate = 0, selfConsumptionRate } = config;

  // 1. Determine how much solar is used directly
  const selfConsumed = Math.min(consumptionKwh, generationKwh * selfConsumptionRate);
  const exported = Math.max(0, generationKwh - selfConsumed);
  const imported = Math.max(0, consumptionKwh - selfConsumed);

  // 2. Bill WITHOUT Solar
  const billWithoutSolar = fixedMonthlyCharge + (consumptionKwh * importRate);

  // 3. Bill WITH Solar (Depends on export model)
  let exportCompensation = 0;
  let netImported = imported;

  switch (modelType) {
    case 'net-metering':
      // Offsets import 1:1 up to import amount
      const offset = Math.min(imported, exported);
      netImported = imported - offset;
      // Some utilities pay for excess at a lower rate, but standard NM usually just zeros out
      exportCompensation = (exported > imported) ? (exported - imported) * (exportRate || 0) : 0;
      break;
    case 'net-billing':
    case 'feed-in-tariff':
      // Pays for all exports at a specific rate
      exportCompensation = exported * (exportRate || importRate * 0.5);
      break;
    case 'self-consumption-only':
      exportCompensation = 0;
      break;
    default:
      exportCompensation = 0;
  }

  const billWithSolar = Math.max(fixedMonthlyCharge, (netImported * importRate) - exportCompensation + fixedMonthlyCharge);
  const savings = billWithoutSolar - billWithSolar;

  return {
    billWithoutSolar,
    billWithSolar,
    savings,
    consumption: consumptionKwh,
    generation: generationKwh,
    imported,
    exported,
    selfConsumed,
    exportCompensation
  };
};

export const calculateAnnualUtilityComparison = (
  annualConsumptionKwh: number,
  monthlyGeneration: MonthlyGeneration[],
  config: UtilityBillingConfig
): BillResult[] => {
  const avgMonthlyConsumption = annualConsumptionKwh / 12;

  return monthlyGeneration.map(gen => {
    const monthlyResult = calculateMonthlyBill(avgMonthlyConsumption, gen.kwh, config);
    return {
      month: gen.month,
      ...monthlyResult
    };
  });
};
