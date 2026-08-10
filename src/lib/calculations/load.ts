/**
 * Phase 8: Load + Micro Calculation Engine
 */

export interface ApplianceEnergyItem {
  name: string;
  quantity: number;
  wattage: number;
  hoursPerDay: number;
  daysPerMonth: number;
  standbyWatts?: number | undefined;
}

export interface LoadEnergyResults {
  totalRunningWatts: number;
  estimatedPeakWatts: number;
  dailyEnergyKWh: number;
  monthlyEnergyKWh: number;
  annualEnergyKWh: number;
  applianceBreakdown: Array<{
    name: string;
    quantity: number;
    dailyKWh: number;
    monthlyKWh: number;
    percentage: number;
  }>;
}

export function calculateApplianceEnergy(items: ApplianceEnergyItem[]): LoadEnergyResults {
  let totalRunning = 0;
  let totalDailyKWh = 0;
  
  let maxSurgeDiff = 0;

  const breakdown = items.map(item => {
    const running = item.wattage * item.quantity;
    totalRunning += running;
    
    const surge = (item.wattage * 1.5) * item.quantity; // Heuristic for generic appliances
    const diff = surge - running;
    if (diff > maxSurgeDiff) maxSurgeDiff = diff;
    
    // Daily Energy = (Wattage * Qty * Hours + Standby * Qty * (24 - Hours)) / 1000
    const standbyHours = 24 - item.hoursPerDay;
    const activeDailyWh = item.wattage * item.quantity * item.hoursPerDay;
    const standbyDailyWh = (item.standbyWatts || 0) * item.quantity * standbyHours;
    
    const dailyKWh = (activeDailyWh + standbyDailyWh) / 1000;
    totalDailyKWh += dailyKWh;
    
    return {
      name: item.name,
      quantity: item.quantity,
      dailyKWh,
      monthlyKWh: dailyKWh * item.daysPerMonth,
      percentage: 0 // Will fill after total is known
    };
  });

  const monthlyTotal = breakdown.reduce((acc, b) => acc + b.monthlyKWh, 0);

  return {
    totalRunningWatts: totalRunning,
    estimatedPeakWatts: totalRunning + maxSurgeDiff,
    dailyEnergyKWh: Number(totalDailyKWh.toFixed(3)),
    monthlyEnergyKWh: Number(monthlyTotal.toFixed(2)),
    annualEnergyKWh: Number((totalDailyKWh * 365).toFixed(0)),
    applianceBreakdown: breakdown.map(b => ({
      ...b,
      dailyKWh: Number(b.dailyKWh.toFixed(3)),
      monthlyKWh: Number(b.monthlyKWh.toFixed(2)),
      percentage: monthlyTotal > 0 ? Number(((b.monthlyKWh / monthlyTotal) * 100).toFixed(1)) : 0
    }))
  };
}

export interface ACEnergyInputs {
  units: number;
  wattage?: number | undefined;
  tonnage?: number | undefined;
  efficiency?: number | undefined; // EER/SEER
  hoursPerDay: number;
  daysPerMonth: number;
}

export function calculateACEnergy(inputs: ACEnergyInputs) {
  let acWattage = inputs.wattage || 0;
  
  if (!acWattage && inputs.tonnage) {
    // Basic heuristic: 1 Ton ~ 12000 BTU/hr. 
    // Wattage = (Tons * 12000) / EER
    const eer = inputs.efficiency || 10; // Default EER 10 if not supplied
    acWattage = (inputs.tonnage * 12000) / eer;
  }
  
  const dailyKWh = (acWattage * inputs.units * inputs.hoursPerDay) / 1000;
  
  return {
    acWattage: Number(acWattage.toFixed(0)),
    dailyKWh: Number(dailyKWh.toFixed(3)),
    monthlyKWh: Number((dailyKWh * inputs.daysPerMonth).toFixed(2)),
    annualKWh: Number((dailyKWh * 365).toFixed(0))
  };
}

export function calculateKWToPanels(systemKW: number, panelW: number) {
  if (panelW <= 0) return { panels: 0, actualKW: 0 };
  const panels = Math.ceil((systemKW * 1000) / panelW);
  return {
    panels,
    actualKW: Number(((panels * panelW) / 1000).toFixed(2))
  };
}

export function calculateWattsToPanels(requiredW: number, panelW: number) {
  if (panelW <= 0) return { panels: 0, actualW: 0 };
  const panels = Math.ceil(requiredW / panelW);
  return {
    panels,
    actualW: panels * panelW
  };
}

export interface BillToEnergyInputs {
  billAmount: number;
  rate: number;
  fixedCharges?: number | undefined;
  taxesFees?: number | undefined;
  otherCharges?: number | undefined;
}

export function calculateBillToEnergy(inputs: BillToEnergyInputs) {
  if (inputs.rate <= 0) return 0;
  
  const energyComponent = inputs.billAmount - (inputs.fixedCharges || 0) - (inputs.taxesFees || 0) - (inputs.otherCharges || 0);
  const monthlyKWh = Math.max(0, energyComponent / inputs.rate);
  
  return Number(monthlyKWh.toFixed(2));
}
