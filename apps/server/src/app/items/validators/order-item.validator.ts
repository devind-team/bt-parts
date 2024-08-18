import { z } from 'zod'

export const orderItemValidator = z.object({
  quantity: z.number().positive(),
  carNo: z.string().optional(),
  routeNo: z.string().optional(),
  orderId: z.string().min(1),
  productId: z.string().min(1),
  userId: z.string().min(1),
})
