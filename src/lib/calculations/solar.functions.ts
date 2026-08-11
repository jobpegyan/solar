import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { calculateSystemSize as calculateSystemSizeInternal } from "./solar-system";

export const calculateSolarSystem = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    monthlyUsageKWh: z.number().optional().nullable(),
    monthlyBill: z.number().optional().nullable(),
    tariffPerKWh: z.number().optional(),
    peakSunHours: z.number().optional(),
    performanceRatio: z.number().optional(),
    panelWattage: z.number().optional(),
    countryCode: z.string().optional(),
    regionCode: z.string().optional(),
    locationId: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    orientation: z.string().optional(),
    tilt: z.number().optional(),
    shading: z.enum(['none', 'some', 'heavy']).optional(),
    inverterLosses: z.number().optional(),
    wiringLosses: z.number().optional(),
    soilingLosses: z.number().optional(),
    targetOffset: z.number().optional().default(100),
    systemSizeKW: z.number().optional().nullable(),
    costPerWatt: z.number().optional(),
    includeTaxCredit: z.boolean().optional(),
    taxCreditPct: z.number().optional(),
  }).passthrough().parse(data))
  .handler(async ({ data }) => {
    const results = await calculateSystemSizeInternal({
      monthlyUsageKWh: data.monthlyUsageKWh ?? undefined,
      monthlyBill: data.monthlyBill ?? undefined,
      tariffPerKWh: data.tariffPerKWh,
      peakSunHours: data.peakSunHours,
      performanceRatio: data.performanceRatio,
      panelWattage: data.panelWattage,
      countryCode: data.countryCode,
      regionCode: data.regionCode,
      locationId: data.locationId,
      city: data.city,
      postalCode: data.postalCode,
      orientation: data.orientation,
      tilt: data.tilt,
      shading: data.shading,
      inverterLosses: data.inverterLosses,
      wiringLosses: data.wiringLosses,
      soilingLosses: data.soilingLosses,
      targetSystemSizeKW: data.systemSizeKW ?? undefined,
      targetOffset: data.targetOffset,
      costPerWatt: data.costPerWatt,
      includeTaxCredit: data.includeTaxCredit,
      taxCreditPct: data.taxCreditPct,
    });

    return results;
  });
