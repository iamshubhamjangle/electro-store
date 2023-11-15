import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Trait } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    // // Authentication
    // const session = await serverAuth();
    // if (!session) return new NextResponse("Please login....", { status: 401 });
    // const userId = session.user?.id;

    const body = await req.json();
    const { id, name }: Trait = body;

    if (!name) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    // Check if trait already exists
    if (id) {
      await prisma.trait.update({
        data: {
          name,
        },
        where: {
          id,
        },
      });
    } else {
      await prisma.trait.create({
        data: {
          name,
        },
      });
    }

    return new NextResponse("Success");
  } catch (error) {
    console.error("<<< ERROR::POST::api/admin/trait >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
