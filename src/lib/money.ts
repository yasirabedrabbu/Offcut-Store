export function formatMoney(poisha: number, currency = '৳'): string {
  const taka = Math.round(poisha / 100);
  return `${currency}${taka.toLocaleString('en-BD')}`;
}

export function takaToPoisha(taka: number): number {
  return Math.round(taka * 100);
}
