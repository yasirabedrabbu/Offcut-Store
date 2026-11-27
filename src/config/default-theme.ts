export const DEFAULT_THEME = {
  accent: '#C8F135',
  ink: '#171817',
  muted: '#686B67',
  surface: '#FFFFFF',
  border: '#D9DDD7',
  radius: '8px',
  font: 'Inter Tight, Arial, sans-serif',
  hero: 'editorial',
  animation: 'full',
} as const;

export type ThemeConfig = typeof DEFAULT_THEME;
