-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('UNCONFIRMED', 'CONFIRMED');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "Status" "ProductStatus" NOT NULL DEFAULT 'UNCONFIRMED';
