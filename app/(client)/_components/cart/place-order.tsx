"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import { Button } from "@/app/(client)/_components/ui/button";
import { useRouter } from "next/navigation";

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = () => {
    setLoading(true);

    axios
      .post("/api/order")
      .then((res) => {
        console.log(res);
        toast.success("Order Placed Successfully!", {
          duration: 3000,
          icon: "👏",
        });
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Oops, Order Failed :(", {
          duration: 3000,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="pb-10 flex justify-center">
      <Button size="lg" onClick={handlePlaceOrder} loading={loading}>
        Place Order
      </Button>
    </div>
  );
};

export default PlaceOrder;
