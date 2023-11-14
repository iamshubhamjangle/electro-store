/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "electro"."CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropTable
DROP TABLE "electro"."CartItem";

-- CreateTable
CREATE TABLE "electro"."Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "description" TEXT,
    "imageUrls" TEXT[],
    "categoryId" TEXT,
    "sellingPrice" INTEGER NOT NULL DEFAULT 0,
    "maximumRetailPrice" INTEGER NOT NULL DEFAULT 0,
    "manufacturer" TEXT,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Banner" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."_ProductToTrait" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "electro"."_CartToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTrait_AB_unique" ON "electro"."_ProductToTrait"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTrait_B_index" ON "electro"."_ProductToTrait"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToProduct_AB_unique" ON "electro"."_CartToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToProduct_B_index" ON "electro"."_CartToProduct"("B");

-- AddForeignKey
ALTER TABLE "electro"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "electro"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "electro"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."_ProductToTrait" ADD CONSTRAINT "_ProductToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "electro"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."_ProductToTrait" ADD CONSTRAINT "_ProductToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "electro"."Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."_CartToProduct" ADD CONSTRAINT "_CartToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "electro"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."_CartToProduct" ADD CONSTRAINT "_CartToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "electro"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
