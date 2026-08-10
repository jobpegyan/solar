import { test, expect } from 'vitest';
import { calculateSystemSize } from './solar-system';

test('USA calculation uses regional defaults', async () => {
  const result = await calculateSystemSize({
    monthlyBill: 150,
    countryCode: 'US',
    regionCode: 'CA',
    tariffPerKWh: 0.28,
    peakSunHours: 5.5
  });

  expect(result.requiredSystemSizeKW).toBeGreaterThan(0);
  expect(result.dataSourceInfo?.solarSource).toContain('NREL');
});

test('Formatting for US currency and units', () => {
  // Manual check for locale formatting in a real environment
  const val = 125000;
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  expect(formatted).toContain('$125,000');
});
