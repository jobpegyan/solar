import { describe, it, expect } from 'vitest';
import { calculatePanelCount } from '@/lib/calculations/roof';
import { calculateSystemSize } from '@/lib/calculations/solar-system';

describe('Accuracy Engine Fixtures', () => {
  it('validates US household sizing', async () => {
    const result = await calculateSystemSize({ monthlyUsageKWh: 1000, peakSunHours: 5, countryCode: 'US' });
    expect(result.requiredSystemSizeKW).toBeGreaterThan(8);
  });
});
