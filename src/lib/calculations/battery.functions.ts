import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as batteryLogic from "./battery";

const batterySizeSchema = z.object({
  backupLoadW: z.number().min(0),
  backupDurationHours: z.number().min(0),
  batteryEfficiency: z.number().min(0).max(100),
  depthOfDischarge: z.number().min(1).max(100),
  reservePercentage: z.number().min(0).max(100).default(0),
});

const batteryRuntimeSchema = z.object({
  batteryCapacityKWh: z.number().min(0),
  depthOfDischarge: z.number().min(0).max(100),
  batteryEfficiency: z.number().min(0).max(100),
  inverterEfficiency: z.number().min(0).max(100),
  backupLoadW: z.number().min(0),
  stateOfCharge: z.number().min(0).max(100).default(100),
});

const batteryBankSchema = z.object({
  batteryEnergyWh: z.number().min(0),
  batteryVoltageV: z.number().min(1),
});

export const getBatterySize = createServerFn({ method: "POST" })
  .inputValidator((data) => batterySizeSchema.parse(data))
  .handler(async ({ data }) => {
    return batteryLogic.calculateBatterySize(data);
  });

export const getBatteryRuntime = createServerFn({ method: "POST" })
  .inputValidator((data) => batteryRuntimeSchema.parse(data))
  .handler(async ({ data }) => {
    return batteryLogic.calculateBatteryRuntime(data);
  });

export const getBatteryBankSize = createServerFn({ method: "POST" })
  .inputValidator((data) => batteryBankSchema.parse(data))
  .handler(async ({ data }) => {
    return batteryLogic.calculateBatteryBankSize(data);
  });
