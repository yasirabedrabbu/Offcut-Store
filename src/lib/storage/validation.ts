import { z } from 'zod';
import { MAX_UPLOAD_BYTES } from '@/config/constants';

export const uploadSchema = z.object({
  name: z.string().min(1).max(180),
  mime: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  size: z.number().int().positive().max(MAX_UPLOAD_BYTES),
  folder: z.string().regex(/^[a-z0-9-]+$/).max(40),
});

export const completeSchema = z.object({
  path: z.string().min(1),
  alt: z.string().trim().min(1).max(160),
  folder: z.string().min(1).max(40),
});
