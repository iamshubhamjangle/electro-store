/*
  Warnings:

  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "electro"."_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "electro"."_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- AlterTable
ALTER TABLE "electro"."Cart" ADD COLUMN     "productId" TEXT;

-- DropTable
DROP TABLE "electro"."_CartToProduct";

-- CreateTable
CREATE TABLE "electro"."CartProduct" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "product_sub_title" TEXT NOT NULL,
    "product_quantity" INTEGER NOT NULL DEFAULT 1,
    "product_current_price" INTEGER NOT NULL,
    "product_original_price" INTEGER NOT NULL,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "electro"."Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "electro"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."CartProduct" ADD CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "electro"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
