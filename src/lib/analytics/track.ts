export async function trackEvent(name: string, value: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  await fetch('/api/analytics', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, value }) });
}
