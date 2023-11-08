import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type Tbody = {
  product_id: string;
  product_title: string;
  product_sub_title: string;
  product_current_price: string;
  product_original_price: string;
};

export async function POST(req: NextRequest) {
  try {
    const session = await serverAuth();
    if (!session) return new NextResponse("Please login....", { status: 401 });
    const userId = session.user?.id;

    const body = await req.json();
    const {
      product_id,
      product_title,
      product_sub_title,
      product_current_price,
      product_original_price,
    }: Tbody = body;

    if (
      !product_id ||
      !product_title ||
      !product_sub_title ||
      !product_current_price ||
      !product_original_price
    ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await prisma.cartItem.create({
      data: {
        product_id,
        product_title,
        product_sub_title,
        product_current_price: parseInt(product_current_price),
        product_original_price: parseInt(product_original_price),
        userId,
      },
    });

    return new NextResponse("Successfully Added to Cart");
  } catch (error) {
    console.error("<<< ERROR >>><<< API/CART/GET >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
