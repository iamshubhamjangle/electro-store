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
    console.log("body", body);

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
      traits,
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

    const parsedSellingPrice = parseInt(sellingPrice.replace(/,/g, "")) || 0;
    const parsedMaximumRetailPrice =
      parseInt(maximumRetailPrice.replace(/,/g, "")) || 0;
    const formattedTrait = traits?.map((trait) => ({ id: trait.id }));

    // Find the existing product including its associated traits
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { trait: true }, // Assuming 'trait' is the relation field name in the Product model
    });

    // Extract existing trait IDs
    const existingTraitIds = existingProduct?.trait.map(
      (existingTrait) => existingTrait.id
    );

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
        trait: {
          connect: formattedTrait,
        },
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
        trait: {
          // each time user sends new set of values. Hence disconnect previous
          disconnect: existingTraitIds?.map((id) => ({ id })),
          connect: formattedTrait,
        },
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

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    console.log(
      "-------------------searchParams----------------------",
      searchParams
    );
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("<<< ERROR::GET::api/admin/product >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
