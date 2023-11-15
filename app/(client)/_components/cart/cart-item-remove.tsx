"use client";

import axios from "axios";
import { Button } from "@/app/(client)/_components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RemoveCartItemProps {
  cart_item_id: string;
}

const RemoveCartItem: React.FC<RemoveCartItemProps> = ({ cart_item_id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemoveItemFromCart = async () => {
    setLoading(true);
    await axios
      .delete("/api/cart", {
        data: {
          cart_item_id,
        },
      })
      .then(() => router.refresh())
      .catch((err) => console.log("Error removing item from cart.", err))
      .finally(() => setLoading(false));
  };

  return (
    <Button
      size={"sm"}
      variant={"outline"}
      className="mt-2"
      onClick={handleRemoveItemFromCart}
      loading={loading}
    >
      Remove
    </Button>
  );
};

export default RemoveCartItem;
