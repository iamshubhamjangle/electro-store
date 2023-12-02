/*
  Warnings:

  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "electro"."Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- AlterTable
ALTER TABLE "electro"."Cart" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "electro"."CartProduct" ADD COLUMN     "product_image_url" TEXT NOT NULL DEFAULT '/grey.png';

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "electro"."Cart"("userId");
