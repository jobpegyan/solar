import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber, formatEnergy } from './formatters';
import { calculateIndiaSubsidy } from '../data/india/subsidies';

describe('India Localization Logic', () => {
  describe('Formatters', () => {
    it('formats INR currency correctly with Indian grouping', () => {
      // Note: Intl.NumberFormat might use different spaces depending on the environment
      // so we check the core structure
      const formatted = formatCurrency(125000, 'INR');
      expect(formatted).toContain('₹');
      // Indian grouping: 1,25,000
      expect(formatted).toContain('1,25,000');
    });

    it('formats large INR amounts correctly', () => {
      const formatted = formatCurrency(1250000, 'INR');
      expect(formatted).toContain('12,50,000');
    });

    it('formats energy as "units" for India', () => {
      expect(formatEnergy(450, 'IN')).toBe('450 units');
      expect(formatEnergy(450, 'US')).toBe('450 kWh');
    });

    it('formats numbers with Indian grouping', () => {
      expect(formatNumber(125000, 'IN')).toBe('1,25,000');
    });
  });

  describe('India Subsidy Logic', () => {
    it('calculates PM Surya Ghar correctly for 2kW', () => {
      expect(calculateIndiaSubsidy(2)).toBe(60000);
    });

    it('calculates PM Surya Ghar correctly for 3kW', () => {
      expect(calculateIndiaSubsidy(3)).toBe(78000);
    });

    it('caps PM Surya Ghar at 78000 for >3kW', () => {
      expect(calculateIndiaSubsidy(5)).toBe(78000);
      expect(calculateIndiaSubsidy(10)).toBe(78000);
    });

    it('calculates partial subsidy for non-integers', () => {
      // 2 * 30000 + 0.5 * 18000 = 60000 + 9000 = 69000
      expect(calculateIndiaSubsidy(2.5)).toBe(69000);
    });
  });
});
