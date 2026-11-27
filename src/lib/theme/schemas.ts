import { z } from 'zod';

export const themeSchema = z.object({
  accent: z.string().regex(/^#[0-9a-f]{6}$/i), ink: z.string().regex(/^#[0-9a-f]{6}$/i),
  muted: z.string().regex(/^#[0-9a-f]{6}$/i), hero: z.enum(['editorial', 'rail']),
  animation: z.enum(['full', 'reduced', 'off']),
});

export const sectionsSchema = z.array(z.object({ sectionKey: z.string().min(1), position: z.number().int(), enabled: z.boolean() }));
