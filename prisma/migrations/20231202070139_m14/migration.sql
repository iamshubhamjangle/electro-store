/*
  Warnings:

  - You are about to drop the column `cartId` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "electro"."Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "electro"."CartProduct" DROP CONSTRAINT "CartProduct_cartId_fkey";

-- AlterTable
ALTER TABLE "electro"."CartProduct" DROP COLUMN "cartId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "product_image_url" DROP DEFAULT;

-- DropTable
DROP TABLE "electro"."Cart";

-- AddForeignKey
ALTER TABLE "electro"."CartProduct" ADD CONSTRAINT "CartProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "electro"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
