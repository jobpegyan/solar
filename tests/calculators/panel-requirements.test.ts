import { describe, it, expect } from 'vitest';
import { calculateRoofArea } from '@/lib/calculations/roof';

describe('Panel Requirement Logic', () => {
  it('calculates roof area correctly', () => {
    const input = {
      panelCount: 20,
      panelWidthIn: 40,
      panelHeightIn: 79,
      spacingFactor: 1.25,
      unit: 'sqft' as const
    };
    const result = calculateRoofArea(input);
    // 40 * 79 * 20 / 144 = 438.89 sqft panel only
    // 438.89 * 1.25 = 548.61 total
    expect(result.estimatedTotalAreaSqFt).toBe(548.61);
  });
});
