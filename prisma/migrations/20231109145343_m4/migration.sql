/*
  Warnings:

  - Added the required column `product_image_url` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "product_image_url" TEXT NOT NULL;
