import { describe, expect, it } from 'vitest';
import { formatMoney, takaToPoisha } from '../src/lib/money';

describe('money', () => {
  it('converts taka to poisha', () => expect(takaToPoisha(12)).toBe(1200));
  it('formats BDT', () => expect(formatMoney(1200)).toContain('12'));
});
