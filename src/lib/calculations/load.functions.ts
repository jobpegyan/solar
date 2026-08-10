import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { 
  calculateApplianceEnergy, 
  calculateACEnergy, 
  calculateKWToPanels, 
  calculateWattsToPanels,
  calculateBillToEnergy 
} from "./load";
import { calculateSystemSize } from "./solar-system";

export const calculateHomeLoadSolar = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    appliances: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      wattage: z.number(),
      hoursPerDay: z.number(),
      daysPerMonth: z.number(),
      standbyWatts: z.number().optional()
    })),
    solarInputs: z.object({
      peakSunHours: z.number(),
      performanceRatio: z.number(),
      systemLoss: z.number().optional(),
      targetOffset: z.number(),
      panelWattage: z.number()
    })
  }).parse(data))
  .handler(async ({ data }) => {
    const loadResults = calculateApplianceEnergy(data.appliances);
    
    // Reuse core solar engine
    const solarResults = await calculateSystemSize({
      monthlyUsageKWh: loadResults.monthlyEnergyKWh,
      peakSunHours: data.solarInputs.peakSunHours,
      performanceRatio: data.solarInputs.performanceRatio,
      panelWattage: data.solarInputs.panelWattage,
      targetOffset: data.solarInputs.targetOffset,
      inverterLosses: (data.solarInputs.systemLoss || 14) / 100 / 3, // Distribute if needed, or simplified
    });

    return {
      load: loadResults,
      solar: solarResults
    };
  });

export const calculateACLoadSolar = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    units: z.number(),
    wattage: z.number().optional(),
    tonnage: z.number().optional(),
    efficiency: z.number().optional(),
    hoursPerDay: z.number(),
    daysPerMonth: z.number(),
    solarInputs: z.object({
      peakSunHours: z.number(),
      performanceRatio: z.number(),
      targetOffset: z.number(),
      panelWattage: z.number()
    })
  }).parse(data))
  .handler(async ({ data }) => {
    const acResults = calculateACEnergy(data);
    
    const solarResults = await calculateSystemSize({
      monthlyUsageKWh: acResults.monthlyKWh,
      peakSunHours: data.solarInputs.peakSunHours,
      performanceRatio: data.solarInputs.performanceRatio,
      panelWattage: data.solarInputs.panelWattage,
      targetOffset: data.solarInputs.targetOffset
    });

    return {
      ac: acResults,
      solar: solarResults
    };
  });

export const calculateBillToSolar = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    billAmount: z.number(),
    rate: z.number(),
    fixedCharges: z.number().optional(),
    taxesFees: z.number().optional(),
    otherCharges: z.number().optional(),
    solarInputs: z.object({
      peakSunHours: z.number(),
      performanceRatio: z.number(),
      targetOffset: z.number(),
      panelWattage: z.number()
    })
  }).parse(data))
  .handler(async ({ data }) => {
    const monthlyKWh = calculateBillToEnergy(data);
    
    const solarResults = await calculateSystemSize({
      monthlyUsageKWh: monthlyKWh,
      peakSunHours: data.solarInputs.peakSunHours,
      performanceRatio: data.solarInputs.performanceRatio,
      panelWattage: data.solarInputs.panelWattage,
      targetOffset: data.solarInputs.targetOffset
    });

    return {
      monthlyKWh,
      solar: solarResults
    };
  });
