import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type TCartPostBody = {
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
      !product_image_url ||
      !product_current_price ||
      !product_original_price
    ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    // Check if cartItem already exists
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        product_id,
        userId,
      },
    });

    if (existingCartItem) {
      // If exist, increment the quantity
      await prisma.cartItem.update({
        data: {
          product_quantity: existingCartItem.product_quantity + 1,
        },
        where: {
          id: existingCartItem.id,
        },
      });
    } else {
      // else, create new cartItem entry
      await prisma.cartItem.create({
        data: {
          product_id,
          product_title,
          product_sub_title,
          product_image_url,
          product_current_price: parseInt(product_current_price),
          product_original_price: parseInt(product_original_price),
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

type TCartDeleteBody = {
  cart_item_id: string;
};

export async function DELETE(req: NextRequest) {
  console.log("DELETING");
  try {
    const session = await serverAuth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const userId = session.user?.id;

    const body = await req.json();
    const { cart_item_id }: TCartDeleteBody = body;

    if (!cart_item_id) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await prisma.cartItem.delete({
      where: {
        id: cart_item_id,
        userId,
      },
    });

    console.log("ITEM DELETED");

    return new NextResponse("Successfully Deleted Cart Item");
  } catch (error) {
    console.error("<<< ERROR >>><<< API/CART/DELETE >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
