import { z } from 'zod';

export const discountSchema = z.object({
  code: z.string().trim().min(3).max(32), kind: z.enum(['percent', 'fixed', 'free_delivery']),
  value: z.coerce.number().int().nonnegative(), minimumPoisha: z.coerce.number().int().nonnegative(),
  active: z.coerce.boolean(), expiresAt: z.string().optional(),
});

export const statusSchema = z.object({ id: z.string().uuid(), status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']) });
