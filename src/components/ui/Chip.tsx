import type { ReactNode } from 'react';

export function Chip({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' }) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}
