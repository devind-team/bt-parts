import { z } from 'zod'

export const priceValidator = z.object({
  price: z.number().positive(),
  productId: z.string(),
  validAt: z.date(),
  duration: z.number().optional(),
  supplierName: z.string().optional(),
  country: z.string().optional(),
  site: z.string().optional(),
  comment: z.string().optional(),
})
