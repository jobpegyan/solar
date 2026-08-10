import { solarConfig } from "../solar-config";

export type SystemType = 'on-grid' | 'off-grid' | 'hybrid';

export interface CostInput {
  systemSizeKW: number;
  systemType: SystemType;
  includePanels: boolean;
  includeInverter: boolean;
  includeMounting: boolean;
  includeInstallation: boolean;
  includeElectrical: boolean;
  batteryKWh?: number;
  customSubsidy?: number;
}

export interface CostBreakdownItem {
  label: string;
  cost: number;
}

export interface CostResults {
  breakdown: CostBreakdownItem[];
  totalCost: number;
  subsidyAmount: number;
  netCost: number;
}

export function calculateCost(input: CostInput): CostResults {
  const { costs } = solarConfig;
  const breakdown: CostBreakdownItem[] = [];
  let total = 0;

  if (input.includePanels) {
    const cost = input.systemSizeKW * 1000 * costs.panelPerWatt;
    breakdown.push({ label: 'Solar Panels', cost });
    total += cost;
  }

  if (input.includeInverter) {
    const cost = input.systemSizeKW * costs.inverterPerKW;
    breakdown.push({ label: 'Inverter', cost });
    total += cost;
  }

  if (input.includeMounting) {
    const cost = input.systemSizeKW * costs.mountingPerKW;
    breakdown.push({ label: 'Mounting Structure', cost });
    total += cost;
  }

  if (input.includeInstallation) {
    const cost = input.systemSizeKW * costs.installationPerKW;
    breakdown.push({ label: 'Installation', cost });
    total += cost;
  }

  if (input.includeElectrical) {
    const cost = input.systemSizeKW * costs.electricalPerKW;
    breakdown.push({ label: 'Electrical Components', cost });
    total += cost;
  }

  if (input.batteryKWh && input.batteryKWh > 0) {
    const cost = input.batteryKWh * costs.batteryPerKWh;
    breakdown.push({ label: 'Battery', cost });
    total += cost;
  }

  const subsidyAmount = input.customSubsidy || 0;

  return {
    breakdown,
    totalCost: total,
    subsidyAmount,
    netCost: Math.max(0, total - subsidyAmount),
  };
}
