import { describe, it, expect } from 'vitest';
import { 
  calculateApplianceEnergy, 
  calculateACEnergy, 
  calculateKWToPanels, 
  calculateWattsToPanels,
  calculateBillToEnergy 
} from './load';

describe('Load & Micro Calculations', () => {
  it('should calculate appliance energy correctly', () => {
    const items = [
      { name: 'Fridge', quantity: 1, wattage: 200, hoursPerDay: 24, daysPerMonth: 30, standbyWatts: 5 },
      { name: 'TV', quantity: 1, wattage: 100, hoursPerDay: 5, daysPerMonth: 30, standbyWatts: 2 }
    ];
    
    const results = calculateApplianceEnergy(items);
    
    // Fridge: (200 * 24 + 5 * 0) = 4800Wh/day = 4.8kWh/day
    // TV: (100 * 5 + 2 * 19) = 500 + 38 = 538Wh/day = 0.538kWh/day
    // Total: 5.338kWh/day
    
    expect(results.dailyEnergyKWh).toBe(5.338);
    expect(results.totalRunningWatts).toBe(300);
    expect(results.monthlyEnergyKWh).toBeCloseTo(5.338 * 30, 1);
  });

  it('should calculate AC energy correctly', () => {
    const res = calculateACEnergy({ units: 1, wattage: 1500, hoursPerDay: 8, daysPerMonth: 30 });
    expect(res.dailyKWh).toBe(12);
    expect(res.monthlyKWh).toBe(360);
  });

  it('should convert kW to panels', () => {
    const res = calculateKWToPanels(5, 400); // 5000 / 400 = 12.5
    expect(res.panels).toBe(13);
    expect(res.actualKW).toBe(5.2);
  });

  it('should convert Watts to panels', () => {
    const res = calculateWattsToPanels(2000, 400);
    expect(res.panels).toBe(5);
    expect(res.actualW).toBe(2000);
  });

  it('should calculate energy usage from electricity bill', () => {
    const res = calculateBillToEnergy({ billAmount: 100, rate: 0.1, fixedCharges: 10, taxesFees: 5 });
    // (100 - 10 - 5) / 0.1 = 85 / 0.1 = 850
    expect(res).toBe(850);
  });
});
