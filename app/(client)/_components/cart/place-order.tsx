"use client";

import { Button } from "@/app/(client)/_components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Order Placed Successfully!", {
        duration: 3000,
        icon: "👏",
      });
    }, 2000);
  };

  return (
    <div className="pb-10 flex justify-center">
      <Button
        size="lg"
        onClick={handlePlaceOrder}
        loading={loading}
        disabled={loading}
      >
        Place Order
      </Button>
    </div>
  );
};

export default PlaceOrder;
