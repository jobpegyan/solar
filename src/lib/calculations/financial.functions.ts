import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { 
  calculateSystemCost, 
  calculateSavings, 
  calculateFinancialROI,
  SystemCostInputs,
  SavingsInputs
} from "./financial";

export const calculateSolarFinancials = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    // System Cost Inputs
    systemSizeWatts: z.number(),
    costPerWatt: z.number().optional(),
    installationCost: z.number().optional(),
    equipmentCost: z.number().optional(),
    batteryCost: z.number().optional(),
    additionalCosts: z.number().optional(),
    incentives: z.number().optional(),
    
    // Savings Inputs
    monthlyUsageKWh: z.number(),
    electricityRate: z.number(),
    annualProductionKWh: z.number(),
    solarSelfConsumptionPct: z.number().default(70),
    exportCompensationRate: z.number().optional(),
    annualEscalationRate: z.number().optional(),
    annualDegradationRate: z.number().optional(),
    annualMaintenanceCost: z.number().optional(),
    analysisPeriodYears: z.number().default(25),
  }).parse(data))
  .handler(async ({ data }) => {
    const costInputs: SystemCostInputs = {
      systemSizeWatts: data.systemSizeWatts,
      costPerWatt: data.costPerWatt,
      installationCost: data.installationCost ?? 0,
      equipmentCost: data.equipmentCost ?? 0,
      batteryCost: data.batteryCost ?? 0,
      additionalCosts: data.additionalCosts ?? 0,
      incentives: data.incentives ?? 0,
    };

    const costResults = calculateSystemCost(costInputs);

    const savingsInputs: SavingsInputs = {
      monthlyUsageKWh: data.monthlyUsageKWh,
      electricityRate: data.electricityRate,
      annualProductionKWh: data.annualProductionKWh,
      solarSelfConsumptionPct: data.solarSelfConsumptionPct,
      exportCompensationRate: data.exportCompensationRate ?? 0,
      annualEscalationRate: data.annualEscalationRate ?? 0,
      annualDegradationRate: data.annualDegradationRate ?? 0.5,
      annualMaintenanceCost: data.annualMaintenanceCost ?? 0,
      analysisPeriodYears: data.analysisPeriodYears,
    };

    const savingsResults = calculateSavings(savingsInputs);

    const roiResults = calculateFinancialROI(
      costResults.estimatedNetCost,
      savingsResults.annualSavings,
      savingsResults
    );

    return {
      cost: costResults,
      savings: savingsResults,
      roi: roiResults,
    };
  });
