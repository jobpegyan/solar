import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getComparisonResults = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    calculatorId: z.string(),
    calculationIds: z.array(z.string()),
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: calculations, error } = await supabaseAdmin
      .from("saved_calculations")
      .select("*")
      .in("id", data.calculationIds)
      .eq("calculator_id", data.calculatorId);

    if (error) throw error;
    return calculations;
  });

export const COMPARISON_SCHEMAS: Record<string, { metrics: string[], labels: Record<string, string>, units: Record<string, string> }> = {
  'solar-panel-calculator': {
    metrics: ['requiredSystemSizeKW', 'panelCount', 'annualGenerationKWh', 'annualSavings'],
    labels: {
      requiredSystemSizeKW: 'System Size',
      panelCount: 'Panel Count',
      annualGenerationKWh: 'Annual Production',
      annualSavings: 'Annual Savings'
    },
    units: {
      requiredSystemSizeKW: 'kW',
      panelCount: 'panels',
      annualGenerationKWh: 'kWh',
      annualSavings: ''
    }
  },
  'solar-battery-size-calculator': {
    metrics: ['requiredNominalCapacityKWh', 'estimatedUsableCapacityKWh', 'backupEnergyRequiredKWh'],
    labels: {
      requiredNominalCapacityKWh: 'Nominal Capacity',
      estimatedUsableCapacityKWh: 'Usable Capacity',
      backupEnergyRequiredKWh: 'Backup Energy Need'
    },
    units: {
      requiredNominalCapacityKWh: 'kWh',
      estimatedUsableCapacityKWh: 'kWh',
      backupEnergyRequiredKWh: 'kWh'
    }
  }
};
