import { describe, it, expect, vi } from 'vitest';
import { calculateSystemSize } from './solar-system';
import { calculateRoofArea } from './roof';

// Stub supabase to avoid actual DB calls during tests
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null }),
            maybeSingle: () => Promise.resolve({ data: null })
          })
        })
      })
    })
  }
}));

describe('Phase 5 Panel Requirement Logic', () => {
  describe('Panel Count Calculations', () => {
    it('rounds panel count up correctly', async () => {
      // 1000 kWh monthly = 12000 kWh annually
      // 5 sun hours, 0.75 PR, plus default losses (0.96*0.98*0.97 = 0.912)
      // Effective PR = 0.75 * 0.912 = 0.684
      // 12000 / (5 * 0.684 * 365) = 9.61 kW system size
      // 9.61 kW * 1000 / 400W panel = 24.03 panels -> 25 panels
      const results = await calculateSystemSize({
        monthlyUsageKWh: 1000,
        peakSunHours: 5,
        performanceRatio: 0.75,
        panelWattage: 400,
        countryCode: 'US'
      });
      expect(results.panelCount).toBe(25);
      expect(results.requiredSystemSizeKW).toBe(10); // 25 * 400 / 1000
    });

    it('respects target system size override', async () => {
      const results = await calculateSystemSize({
        targetSystemSizeKW: 5,
        panelWattage: 400
      });
      expect(results.panelCount).toBe(13); // 5000 / 400 = 12.5 -> 13
      expect(results.requiredSystemSizeKW).toBe(5.2);
    });

    it('handles small systems', async () => {
      const results = await calculateSystemSize({
        targetSystemSizeKW: 0.5,
        panelWattage: 300
      });
      expect(results.panelCount).toBe(2);
    });
  });

  describe('Roof Area Calculations', () => {
    it('calculates single panel area correctly', () => {
      // 40" x 79" = 3160 sq in = 21.94 sq ft
      const results = calculateRoofArea({
        panelCount: 1,
        panelWidthIn: 40,
        panelHeightIn: 79,
        unit: 'sqft',
        spacingFactor: 1.0
      });
      expect(results.panelOnlyAreaSqFt).toBeCloseTo(21.94, 2);
      expect(results.estimatedTotalAreaSqFt).toBeCloseTo(21.94, 2);
    });

    it('applies spacing factor correctly', () => {
      const results = calculateRoofArea({
        panelCount: 10,
        panelWidthIn: 40,
        panelHeightIn: 79,
        unit: 'sqft',
        spacingFactor: 1.25
      });
      // 21.94 * 10 * 1.25 = 274.25
      expect(results.estimatedTotalAreaSqFt).toBeCloseTo(274.3, 1);
    });

    it('handles orientation shifts', () => {
      const portrait = calculateRoofArea({
        panelCount: 4,
        panelWidthIn: 40,
        panelHeightIn: 80,
        unit: 'sqft',
        orientation: 'portrait'
      });
      // 2x2 grid. width = 2*40 + 1 = 81. height = 2*80 + 1 = 161. 
      // widthFt = 6.75, heightFt = 13.42
      expect(portrait.arrayWidthFt).toBe(6.75);
      expect(portrait.arrayHeightFt).toBe(13.42);

      const landscape = calculateRoofArea({
        panelCount: 4,
        panelWidthIn: 40,
        panelHeightIn: 80,
        unit: 'sqft',
        orientation: 'landscape'
      });
      // 2x2 grid. width = 2*80 + 1 = 161. height = 2*40 + 1 = 81.
      expect(landscape.arrayWidthFt).toBe(13.42);
      expect(landscape.arrayHeightFt).toBe(6.75);
    });

    it('flags insufficient space', () => {
      const results = calculateRoofArea({
        panelCount: 20,
        availableRoofAreaSqFt: 100, // Very small
        unit: 'sqft'
      });
      expect(results.isSpaceSufficient).toBe(false);
      expect(results.areaDifferenceSqFt).toBeLessThan(0);
    });
  });
});
