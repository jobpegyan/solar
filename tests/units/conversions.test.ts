import { describe, it, expect } from 'vitest';
import { convertArea, convertTemperature } from '@/lib/utils/internationalization/units';

describe('Unit Conversion Logic', () => {
  it('converts sq m to sq ft', () => {
    expect(convertArea(1, 'sq m', 'sq ft')).toBeCloseTo(10.7639, 4);
  });
});
