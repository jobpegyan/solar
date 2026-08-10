import { describe, it, expect } from 'vitest';
import { calculateApplianceEnergy, calculateKWToPanels, calculateBillToEnergy } from '@/lib/calculations/load';

describe('Load and Micro Calculation Logic', () => {
  it('calculates appliance energy correctly', () => {
    const items = [{ name: 'Fan', quantity: 2, wattage: 75, hoursPerDay: 10, daysPerMonth: 30 }];
    const result = calculateApplianceEnergy(items);
    expect(result.dailyEnergyKWh).toBe(1.5);
  });
});
