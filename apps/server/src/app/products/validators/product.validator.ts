import { z } from 'zod'

export const productValidator = z.object({
  vendorCode: z.string().min(1),
  manufacturerId: z.string().optional(),
})
