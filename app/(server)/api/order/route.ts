import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
  try {
    const session = await serverAuth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const userId = session.user?.id;

    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
    });

    // let orderTotal = cartItems.reduce(
    //   (total, product) => total + product.product_current_price,
    //   0
    // );

    // // Create a new order
    // const order = await prisma.order.create({
    //   data: {
    //     userId: userId,
    //     orderTotal,
    //     products: {
    //       createMany: {
    //         data: cartItems?.map((cartItem) => {
    //           return {
    //             product_id: cartItem.product_id,
    //             product_title: cartItem.product_title,
    //             product_sub_title: cartItem.product_sub_title,
    //             product_quantity: cartItem.product_quantity,
    //             product_current_price: cartItem.product_current_price,
    //             product_original_price: cartItem.product_original_price,
    //           };
    //         }),
    //       },
    //     },
    //   },
    //   select: {
    //     id: true,
    //   },
    // });

    // // Delete the cart items after placing the order
    // await prisma.cartItem.deleteMany({
    //   where: {
    //     userId: userId,
    //   },
    // });

    // return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("<<< ERROR >>><<< API/ORDER/POST >>>");
    console.error(error);

    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
