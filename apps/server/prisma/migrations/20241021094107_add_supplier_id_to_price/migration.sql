-- Добавление нового столбца supplier_id
ALTER TABLE "prices" ADD COLUMN "supplier_id" TEXT;

-- Копирование данных из столбца supplierId в supplier_id
UPDATE "prices" SET "supplier_id" = "supplierId";

-- Удаление старого столбца supplierId
ALTER TABLE "prices" DROP COLUMN "supplierId";

-- Добавление нового внешнего ключа
ALTER TABLE "prices"
ADD CONSTRAINT "prices_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE;