/*
  Warnings:

  - A unique constraint covering the columns `[order_id,product_id,user_id]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ItemStatus" ADD VALUE 'UNAVAILABLE';
ALTER TYPE "ItemStatus" ADD VALUE 'CANCEL';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'REQUEST';
ALTER TYPE "OrderStatus" ADD VALUE 'CANCEL';

-- CreateIndex
CREATE UNIQUE INDEX "items_order_id_product_id_user_id_key" ON "items"("order_id", "product_id", "user_id");
