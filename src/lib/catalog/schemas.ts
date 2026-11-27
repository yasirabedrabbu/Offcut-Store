import { z } from 'zod';

export const variantSchema = z.object({
  id: z.string().uuid().optional(), sku: z.string().trim().min(1).max(80),
  size: z.string().trim().min(1).max(20), color: z.string().trim().max(40),
  pricePoisha: z.coerce.number().int().nonnegative(), stock: z.coerce.number().int().nonnegative(),
});

export const productSchema = z.object({
  id: z.string().uuid().optional(), name: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/), description: z.string().max(4000),
  published: z.coerce.boolean(), variants: z.array(variantSchema).min(1),
});

export type ProductInput = z.infer<typeof productSchema>;
