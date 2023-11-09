import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import PriceDetails from "./price-details";
import PlaceOrder from "./place-order";
import CartItemList from "./cart-item-list";

const CartSummary = async () => {
  const session = await serverAuth();
  const userId = session?.user.id;

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="space-y-10">
      <CartItemList cartItems={cartItems} />
      <PriceDetails cartItems={cartItems} />
      <PlaceOrder />
    </div>
  );
};

export default CartSummary;
