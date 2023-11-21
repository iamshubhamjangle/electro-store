import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductFormType } from "@/types/form-schemas";

export async function POST(req: NextRequest) {
  try {
    // // Authentication
    // const session = await serverAuth();
    // if (!session) return new NextResponse("Please login....", { status: 401 });
    // const userId = session.user?.id;

    const body = await req.json();
    const {
      id,
      title,
      subTitle,
      description,
      imageUrls,
      categoryId,
      sellingPrice,
      maximumRetailPrice,
      manufacturer,
      rating,
    }: ProductFormType = body;

    if (
      !title ||
      !subTitle ||
      !imageUrls ||
      !sellingPrice ||
      !maximumRetailPrice ||
      !rating
    ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const parsedSellingPrice = parseInt(sellingPrice) || 0;
    const parsedMaximumRetailPrice = parseInt(maximumRetailPrice) || 0;

    await prisma.product.upsert({
      create: {
        title,
        subTitle,
        description: description || undefined,
        imageUrls,
        categoryId: categoryId || undefined,
        sellingPrice: parsedSellingPrice,
        maximumRetailPrice: parsedMaximumRetailPrice,
        manufacturer: manufacturer || undefined,
        rating,
      },
      update: {
        title,
        subTitle,
        description: description || undefined,
        imageUrls,
        categoryId: categoryId || undefined,
        sellingPrice: parsedSellingPrice,
        maximumRetailPrice: parsedMaximumRetailPrice,
        manufacturer: manufacturer || undefined,
        rating,
      },
      where: {
        id,
      },
    });

    return new NextResponse("Success");
  } catch (error) {
    console.error("<<< ERROR::POST::api/admin/product >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
