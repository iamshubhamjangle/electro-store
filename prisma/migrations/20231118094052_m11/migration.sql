/*
  Warnings:

  - Added the required column `bannerImageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "electro"."Category" ADD COLUMN     "bannerImageUrl" TEXT NOT NULL;
