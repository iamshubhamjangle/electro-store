import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_lib/db";

export type TProductDeleteRequestBody = {
  id: string;
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: TProductDeleteRequestBody }
) {
  try {
    // // Authentication
    // const session = await serverAuth();
    // if (!session) return new NextResponse("Unauthorized", { status: 401 });
    // const userId = session.user?.id;
    const { id } = params;

    if (!id) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return new NextResponse("Success");
  } catch (error) {
    console.error(
      `<<< ERROR::DELETE::api/admin/product/${params.id} >>>`,
      error
    );
    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
