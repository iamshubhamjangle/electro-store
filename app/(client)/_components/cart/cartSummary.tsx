import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";

const CartSummary = async () => {
  const session = await serverAuth();
  const userId = session?.user.id;

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId,
    },
  });

  return <pre>{JSON.stringify(cartItems, null, 2)}</pre>;
};

export default CartSummary;
