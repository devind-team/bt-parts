/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
