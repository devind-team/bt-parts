/*
  Warnings:

  - Added the required column `company_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "company_name" VARCHAR(50) NOT NULL;
