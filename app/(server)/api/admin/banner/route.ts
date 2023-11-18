import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Banner } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    // // Authentication
    // const session = await serverAuth();
    // if (!session) return new NextResponse("Please login....", { status: 401 });
    // const userId = session.user?.id;

    const body = await req.json();
    const { id, type, imageUrl, redirectUrl }: Banner = body;

    if (!type || !redirectUrl) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await prisma.banner.upsert({
      create: {
        type,
        imageUrl,
        redirectUrl,
      },
      update: {
        type,
        imageUrl: imageUrl || undefined,
        redirectUrl,
      },
      where: {
        id,
      },
    });

    return new NextResponse("Success");
  } catch (error) {
    console.error("<<< ERROR::POST::api/admin/banner >>>", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
