import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
  try {
    const session = await serverAuth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const userId = session.user?.id;

    const cartItems = await prisma.cartProduct.findMany({
      where: {
        userId,
      },
    });

    let orderTotal = cartItems.reduce(
      (total, product) =>
        (total + product.product_current_price) * product.product_quantity,
      0
    );

    const indianCities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Ahmedabad",
      "Chennai",
      "Kolkata",
      "Surat",
      "Pune",
      "Jaipur",
      "Lucknow",
      "Kanpur",
      "Nagpur",
      "Visakhapatnam",
      "Indore",
      "Thane",
      "Bhopal",
      "Patna",
      "Vadodara",
      "Ghaziabad",
      "Ludhiana",
      "Agra",
      "Nashik",
      "Faridabad",
      "Meerut",
      "Rajkot",
      "Varanasi",
      "Srinagar",
      "Aurangabad",
    ];

    // Create a new order
    await prisma.order.create({
      data: {
        userId,
        orderTotal,
        address: indianCities[Math.floor(Math.random() * indianCities.length)],
        products: {
          createMany: {
            data: cartItems?.map((cartItem) => {
              return {
                product_id: cartItem.product_id,
                product_title: cartItem.product_title,
                product_sub_title: cartItem.product_sub_title,
                product_quantity: cartItem.product_quantity,
                product_current_price: cartItem.product_current_price,
                product_original_price: cartItem.product_original_price,
              };
            }),
          },
        },
      },
    });

    await prisma.cartProduct.deleteMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(
      { message: "Order placed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("<<< ERROR >>><<< API/ORDER/POST >>>");
    console.error(error);

    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
