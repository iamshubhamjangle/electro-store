import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type TTraitPostRequestBody = {
  name: string;
};

export async function POST(req: NextRequest) {
  try {
    // // Authentication
    // const session = await serverAuth();
    // if (!session) return new NextResponse("Please login....", { status: 401 });
    // const userId = session.user?.id;

    const body = await req.json();
    const { name }: TTraitPostRequestBody = body;

    if (!name) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    // Check if trait already exists
    const existingTraits = await prisma.trait.findFirst({
      where: {
        name,
      },
    });

    if (!existingTraits) {
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

export type TTraitDeleteRequestBody = {
  id: string;
};

export async function DELETE(req: NextRequest) {
  try {
    // // Authentication
    // const session = await serverAuth();
    // if (!session) return new NextResponse("Unauthorized", { status: 401 });
    // const userId = session.user?.id;

    const body = await req.json();
    const { id }: TTraitDeleteRequestBody = body;

    if (!id) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await prisma.trait.delete({
      where: {
        id,
      },
    });

    return new NextResponse("Success");
  } catch (error) {
    console.error("<<< ERROR::DELETE::api/admin/trait >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
