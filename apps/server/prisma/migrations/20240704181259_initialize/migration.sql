-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SELLER', 'BUYER', 'LOGIST', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('UNKNOWN', 'MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "avatar" TEXT,
    "last_name" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "patronymic" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "phone" VARCHAR(20),
    "birthday" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "server_url" VARCHAR(64) NOT NULL,
    "bucket" VARCHAR(64) NOT NULL,
    "key" VARCHAR(512) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_username_email_idx" ON "users"("username", "email");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
