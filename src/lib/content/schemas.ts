import { z } from 'zod';

export const pageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(2).max(160),
  body: z.string().max(30000), published: z.boolean(),
});

export const settingsSchema = z.object({
  storeName: z.string().min(2).max(100), supportPhone: z.string().min(8).max(20),
  defaultLocale: z.enum(['en', 'bn']), freeDeliveryPoisha: z.number().int().nonnegative(),
});
