/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electro"."Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
