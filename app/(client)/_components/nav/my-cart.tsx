import { serverAuth } from "@/app/_lib/serverAuth";
import Link from "next/link";
import prisma from "@/app/_lib/db";

const MyCart = async ({ title, Icon }: any) => {
  const session = await serverAuth();
  const userId = session?.user.id;

  const numberOfCartItem = userId
    ? await prisma?.cartItem.count({
        where: {
          userId,
        },
      })
    : 0;

  return (
    <Link
      href={"/cart"}
      prefetch={false}
      className="flex gap-1 items-center text-slate-700"
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="hidden md:block">Cart</span>
      <span>({numberOfCartItem})</span>
    </Link>
  );
};

export default MyCart;
