import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(100), phone: z.string().regex(/^01[3-9]\d{8}$/),
  district: z.string().min(2), thana: z.string().min(2), area: z.string().min(2),
  details: z.string().min(8).max(300), paymentMethod: z.enum(['cod', 'bkash', 'nagad', 'card']),
  lines: z.array(z.object({ variantId: z.string().uuid(), quantity: z.number().int().positive() })).min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
