import { describe, it, expect } from 'vitest';
import { calculateSystemSize } from './solar-system';

describe('Solar System Calculations Safety', () => {
  it('should handle zero or missing inputs without returning NaN or Infinity', async () => {
    const inputs = [
      {},
      { monthlyUsageKWh: 0 },
      { monthlyBill: 0, tariffPerKWh: 0 },
      { peakSunHours: 0 },
      { performanceRatio: 0 },
      { panelWattage: 0 },
      { inverterLosses: 1 }, // 100% loss
    ];

    for (const input of inputs) {
      const results = await calculateSystemSize(input);
      
      expect(results.requiredSystemSizeKW).toBeDefined();
      expect(Number.isFinite(results.requiredSystemSizeKW)).toBe(true);
      expect(results.requiredSystemSizeKW).not.toBeNaN();
      
      expect(results.panelCount).toBeGreaterThanOrEqual(1);
      expect(Number.isFinite(results.panelCount)).toBe(true);
      
      expect(Number.isFinite(results.annualSavings)).toBe(true);
      expect(results.annualSavings).not.toBeNaN();
    }
  });

  it('should handle extreme values correctly', async () => {
    const results = await calculateSystemSize({
      monthlyUsageKWh: 1000000, // Extremely high usage
      peakSunHours: 0.1, // Very low sun
      panelWattage: 10, // Small panels
    });

    expect(Number.isFinite(results.requiredSystemSizeKW)).toBe(true);
    expect(results.panelCount).toBeGreaterThan(0);
  });

  it('should round panel counts up', async () => {
    // 1kW system / 330W panels = 3.03 panels -> should be 4
    const results = await calculateSystemSize({
      monthlyUsageKWh: 450,
      peakSunHours: 5,
      performanceRatio: 0.8,
      panelWattage: 330
    });
    
    // Daily req: 450*12/365 = 14.7945 kWh/day
    // Gen per kW: 5 * 0.8 * 0.96 * 0.98 * 0.97 = 3.65 kWh/kW (includes default losses)
    // Size: 14.7945 / 3.65 = 4.05 kW
    // Panels: 4.05 * 1000 / 330 = 12.28 -> 13 panels
    expect(results.panelCount).toBe(13);
  });
});
