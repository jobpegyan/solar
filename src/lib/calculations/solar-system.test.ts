import { describe, it, expect, vi } from 'vitest';
import { calculateSystemSize } from './solar-system';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: null })),
            maybeSingle: vi.fn(() => Promise.resolve({ data: null }))
          })),
          single: vi.fn(() => Promise.resolve({ data: null }))
        }))
      }))
    }))
  }
}));

describe('Solar System Calculation Logic', () => {
  it('should calculate system size correctly for standard inputs', async () => {
    const input = {
      monthlyUsageKWh: 1000,
      peakSunHours: 5,
      performanceRatio: 0.8,
      panelWattage: 400,
      countryCode: 'US',
      inverterLosses: 0.04,
      wiringLosses: 0.02,
      soilingLosses: 0.03
    };

    const results = await calculateSystemSize(input);
    expect(results.panelCount).toBeGreaterThan(0);
    expect(results.requiredSystemSizeKW).toBeGreaterThan(0);
  });

  it('should convert monthly bill to usage correctly', async () => {
    const input = {
      monthlyBill: 200,
      tariffPerKWh: 0.20,
      peakSunHours: 5,
      performanceRatio: 0.8,
      countryCode: 'US'
    };

    const results = await calculateSystemSize(input);
    expect(results.monthlyBreakdown[0]?.consumption).toBe(1000);
  });
});
