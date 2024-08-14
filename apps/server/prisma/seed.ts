import { Location, PrismaClient } from '@prisma/client'
import prices from './data/prices.json'
import { Decimal } from 'decimal.js'

const prisma = new PrismaClient()

interface PriceType {
  manufacturer: string
  vendorCode: string
  price: string
  supplierName: string
  validAt: string
  aliases?: string
  duration?: string
}

type PriceCreateManyInput = {
  id?: string
  price: Decimal
  duration?: number | null
  site?: string | null
  comment?: string | null
  relevant?: boolean | null
  createdAt?: Date | string
  updatedAt?: Date | string
  validAt?: Date | string | null
  productId: string
  supplierId?: string | null
}

async function main() {
  await prisma.price.deleteMany()
  await prisma.product.deleteMany()
  await prisma.supplier.deleteMany()
  await prisma.manufacturer.deleteMany()

  const productsIds = new Map<string, string>()
  const suppliersIds = new Map<string, string>()
  const manufacturerIds = new Map<string, string>()
  const pricesData: PriceCreateManyInput[] = []

  for (const price of prices as PriceType[]) {
    if (!price.manufacturer || !price.supplierName || !price.vendorCode) {
      continue
    }
    if (!manufacturerIds.has(price.manufacturer)) {
      const manufacture = await prisma.manufacturer.create({
        data: { name: price.manufacturer },
      })
      manufacturerIds.set(manufacture.name, manufacture.id)
    }
    if (!suppliersIds.has(price.supplierName)) {
      const supplier = await prisma.supplier.create({
        data: {
          name: price.supplierName,
          location: price.supplierName === 'SHIYAN' ? Location.CHINA : Location.EUROPE,
        },
      })
      suppliersIds.set(supplier.name, supplier.id)
    }
    const vendorCode = String(price.vendorCode)
    if (!productsIds.has(vendorCode)) {
      const product = await prisma.product.create({
        data: { vendorCode, aliases: String(price.aliases) },
      })
      productsIds.set(vendorCode, product.id)
    }
    const [day, month, year] = price.validAt.split('.')
    try {
      const validAt = new Date(`${year.length == 4 ? year : '20' + year}-${month}-${day}`)
      pricesData.push({
        price: new Decimal(price.price),
        validAt,
        duration: price.duration ? parseInt(price.duration) : null,
        productId: productsIds.get(vendorCode) as string,
        supplierId: suppliersIds.get(price.supplierName) as string,
      })
    } catch (e) {
      console.log(e, price)
    }
  }
  await prisma.price.createMany({
    data: pricesData,
    skipDuplicates: true,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
