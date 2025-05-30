-- AlterTable
ALTER TABLE "items" ADD COLUMN     "ordered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proforma_number" VARCHAR(300);
