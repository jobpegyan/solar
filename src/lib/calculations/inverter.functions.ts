import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { calculateInverterSize, calculateInverterLoad, InverterLoadItem } from "./inverter";

const InverterLoadItemSchema = z.object({
  name: z.string(),
  quantity: z.number().min(1),
  runningWatts: z.number().min(0),
  surgeWatts: z.number().min(0).optional(),
  hoursPerDay: z.number().min(0).max(24).optional()
});

const InverterSizeInputSchema = z.object({
  solarArraySizeKW: z.number().min(0).optional(),
  targetDcAcRatio: z.number().min(0.1).optional(),
  runningLoadW: z.number().min(0).optional(),
  peakLoadW: z.number().min(0).optional(),
  safetyMargin: z.number().min(0).max(500).optional(),
  inverterEfficiency: z.number().min(1).max(100).optional(),
  inverterType: z.enum(['grid-tied', 'off-grid', 'hybrid']).optional(),
  appliances: z.array(InverterLoadItemSchema).optional()
});

export const calculateInverterRequirements = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InverterSizeInputSchema.parse(data))
  .handler(async ({ data }) => {
    let runningLoadW = data.runningLoadW || 0;
    let peakLoadW = data.peakLoadW || 0;

    if (data.appliances && data.appliances.length > 0) {
      const loadResults = calculateInverterLoad(data.appliances);
      runningLoadW = loadResults.totalRunningWatts;
      peakLoadW = loadResults.estimatedPeakWatts;
    }

    const sizeResults = calculateInverterSize({
      ...data,
      runningLoadW,
      peakLoadW
    });

    return {
      ...sizeResults,
      inputs: data
    };
  });
