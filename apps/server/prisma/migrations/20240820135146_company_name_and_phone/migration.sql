-- AlterTable
ALTER TABLE "users"
ADD COLUMN "company_name" VARCHAR(50) NOT NULL DEFAULT 'BT_Parts';

ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL;
-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users" ("phone")