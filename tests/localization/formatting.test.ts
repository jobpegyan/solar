import { describe, it, expect } from 'vitest';
import { formatCurrency, formatEnergy } from '@/lib/utils/formatters';

describe('International Formatting', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(18500, 'USD', 'US')).toContain('18,500');
  });
});
