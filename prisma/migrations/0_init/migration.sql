-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "electro";

-- CreateTable
CREATE TABLE "electro"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

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
    "imageUrl" TEXT NOT NULL,
    "bannerImageUrl" TEXT NOT NULL,
    "redirectUrl" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "electro"."CartProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "product_sub_title" TEXT NOT NULL,
    "product_image_url" TEXT NOT NULL,
    "product_quantity" INTEGER NOT NULL DEFAULT 1,
    "product_current_price" INTEGER NOT NULL,
    "product_original_price" INTEGER NOT NULL,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."Order" (
    "id" TEXT NOT NULL,
    "orderTotal" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."ProductItems" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "product_sub_title" TEXT NOT NULL,
    "product_quantity" INTEGER NOT NULL DEFAULT 1,
    "product_current_price" INTEGER NOT NULL,
    "product_original_price" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "ProductItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electro"."_ProductToTrait" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "electro"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "electro"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "electro"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "electro"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "electro"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTrait_AB_unique" ON "electro"."_ProductToTrait"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTrait_B_index" ON "electro"."_ProductToTrait"("B");

-- AddForeignKey
ALTER TABLE "electro"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "electro"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "electro"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "electro"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."CartProduct" ADD CONSTRAINT "CartProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "electro"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "electro"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."ProductItems" ADD CONSTRAINT "ProductItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "electro"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."_ProductToTrait" ADD CONSTRAINT "_ProductToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "electro"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "electro"."_ProductToTrait" ADD CONSTRAINT "_ProductToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "electro"."Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

