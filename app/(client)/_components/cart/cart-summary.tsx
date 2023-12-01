import prisma from "@/app/_lib/db";
import { serverAuth } from "@/app/_lib/serverAuth";
import PriceDetails from "./price-details";
import PlaceOrder from "./place-order";
import CartItemList from "./cart-item-list";
import Image from "next/image";

const CartSummary = async () => {
  // Authenticate
  const session = await serverAuth();
  const userId = session?.user.id;
  if (!userId) return <div>You are not logged in!</div>;

  // Fetch Cart Items
  const cart = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      products: true,
    },
  });

  // Cart is EMPTY
  if (cart && cart.length === 0)
    return (
      <div className="flex flex-col items-center my-12">
        <Image
          src="/empty_cart.svg"
          alt="cart is empty"
          width={300}
          height={300}
        />
        <p className="font-bold text-lg mt-4">Your cart is empty!</p>
        <p className="text-lg">
          Explore our wide selection and find something you like
        </p>
      </div>
    );

  // Cart is NOT empty
  return (
    <div className="space-y-10">
      <CartItemList cart={cart} />
      <PriceDetails cart={cart} />
      <PlaceOrder />
    </div>
  );
};

export default CartSummary;
