/*
  Warnings:

  - Added the required column `imageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redirectUrl` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electro"."Category" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "redirectUrl" TEXT NOT NULL;
