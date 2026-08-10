import { describe, it, expect } from 'vitest';
import { calculateSystemSize } from '@/lib/calculations/solar-system';

describe('Solar System Core Calculation Logic', () => {
  it('calculates system size for typical home', async () => {
    const result = await calculateSystemSize({ monthlyUsageKWh: 1000, peakSunHours: 5 });
    expect(result.requiredSystemSizeKW).toBeGreaterThan(5);
  });
});
