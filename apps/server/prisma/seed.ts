import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'
import { Decimal } from 'decimal.js'

const prisma = new PrismaClient()

interface RowData {
  manufacturer: string
  vendorCode: string
  aliases: string
  price: string
  duration?: string
  validAt?: string
  supplier_name: string
}

async function main() {
  const workbook = XLSX.readFile('Цены.xlsx')
  const sheetName = workbook.SheetNames[0]
  const worksheet: RowData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

  for (const row of worksheet) {
    if (!row.manufacturer || !row.vendorCode || !row.price) {
      console.error('Missing required data in the row:', row)
      continue // Пропускаем строки с отсутствующими обязательными данными
    }

    try {
      // Преобразуем price в число и затем в Decimal
      const priceValue = parseFloat(row.price)
      if (isNaN(priceValue)) {
        console.error('Invalid price value:', row.price)
        continue // Пропускаем строки с некорректным значением цены
      }

      const manufacturer = await prisma.manufacturer.upsert({
        where: { name: row.manufacturer },
        update: {},
        create: {
          name: row.manufacturer,
        },
      })

      const product = await prisma.product.upsert({
        where: { vendorCode: String(row.vendorCode) },
        update: {},
        create: {
          vendorCode: String(row.vendorCode),
          manufacturer: { connect: { id: manufacturer.id } },
          aliases: String(row.aliases),
        },
      })

      await prisma.price.create({
        data: {
          price: new Decimal(priceValue), // Преобразуем значение price в Decimal
          duration: row.duration ? parseInt(row.duration) : null,
          validAt: row.validAt ? new Date(row.validAt) : null,
          supplierName: row.supplier_name,
          product: { connect: { id: product.id } },
        },
      })
    } catch (error) {
      console.error('Error processing row:', row, error)
    }
  }
}

main()
  .catch((e) => {
    console.error('Error in main function:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
