import { describe, it, expect } from 'vitest';
import { calculateSystemCost, calculateSavings, calculateFinancialROI } from '@/lib/calculations/financial';

describe('Financial Calculation Logic', () => {
  describe('calculateSystemCost', () => {
    it('calculates cost based on cost-per-watt', () => {
      const inputs = {
        systemSizeWatts: 5000,
        costPerWatt: 3,
        installationCost: 0,
        equipmentCost: 0,
        batteryCost: 0,
        additionalCosts: 0,
        incentives: 0,
      };
      const result = calculateSystemCost(inputs);
      expect(result.baseSystemCost).toBe(15000);
    });
  });
});
