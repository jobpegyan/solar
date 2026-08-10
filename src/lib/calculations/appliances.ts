import { solarConfig } from "../solar-config";

export interface Appliance {
  id: string;
  name: string;
  quantity: number;
  power: number; // Watts
  hoursPerDay: number;
}

export interface ApplianceResults {
  totalDailyEnergyKWh: number;
  estimatedPeakLoadW: number;
  appliances: (Appliance & { dailyEnergyKWh: number })[];
}

export function calculateAppliances(appliances: Appliance[]): ApplianceResults {
  let totalDailyEnergyWh = 0;
  let estimatedPeakLoadW = 0;

  const processed = appliances.map(app => {
    const dailyEnergyWh = app.quantity * app.power * app.hoursPerDay;
    totalDailyEnergyWh += dailyEnergyWh;
    
    // Simple peak load estimation: sum of all wattages
    // In more complex models, we might apply a diversity factor
    estimatedPeakLoadW += app.quantity * app.power;

    return {
      ...app,
      dailyEnergyKWh: Number((dailyEnergyWh / 1000).toFixed(3))
    };
  });

  return {
    totalDailyEnergyKWh: Number((totalDailyEnergyWh / 1000).toFixed(2)),
    estimatedPeakLoadW,
    appliances: processed
  };
}

export function getApplianceDefaults(): Appliance[] {
  return solarConfig.applianceDefaults.map(def => ({
    ...def,
    quantity: 1,
    hoursPerDay: 4
  }));
}
