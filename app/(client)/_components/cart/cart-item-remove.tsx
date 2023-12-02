"use client";

import axios from "axios";
import { Button } from "@/component/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TCartDeleteBody } from "@/app/(server)/api/cart/route";

const RemoveCartItem: React.FC<TCartDeleteBody> = ({ cartProductId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemoveItemFromCart = async () => {
    setLoading(true);
    await axios
      .delete("/api/cart", {
        data: {
          cartProductId,
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
