import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type TCartPostBody = {
  product_id: string;
  product_title: string;
  product_sub_title: string;
  product_image_url: string;
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
      product_image_url,
      product_current_price,
      product_original_price,
    }: TCartPostBody = body;

    if (
      !product_id ||
      !product_title ||
      !product_sub_title ||
      !product_current_price ||
      !product_original_price
    ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    // Check if the user has a cart
    const existingCartProduct = await prisma.cartProduct.findFirst({
      where: {
        product_id: product_id,
        userId: userId,
      },
    });

    if (existingCartProduct) {
      await prisma.cartProduct.update({
        data: {
          product_quantity: existingCartProduct.product_quantity + 1,
        },
        where: {
          id: existingCartProduct.id,
        },
      });
    } else {
      await prisma.cartProduct.create({
        data: {
          product_id,
          product_title,
          product_sub_title,
          product_current_price: parseInt(product_current_price),
          product_original_price: parseInt(product_original_price),
          product_image_url,
          userId,
        },
      });
    }

    return new NextResponse("Successfully Added/Updated Cart");
  } catch (error) {
    console.error("<<< ERROR >>><<< API/CART/GET >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export type TCartDeleteBody = {
  cartProductId: string;
};

export async function DELETE(req: NextRequest) {
  try {
    const session = await serverAuth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const userId = session.user?.id;

    const body = await req.json();
    const { cartProductId }: TCartDeleteBody = body;

    if (!cartProductId) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await prisma.cartProduct.delete({
      where: {
        id: cartProductId,
        userId,
      },
    });

    return new NextResponse("Successfully Deleted Cart Item");
  } catch (error) {
    console.error("<<< ERROR >>><<< API/CART/DELETE >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
