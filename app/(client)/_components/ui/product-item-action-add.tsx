"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { Button } from "./button";

interface ProductItemAddToCartProps {
  product_id: string;
  product_title: string;
  product_sub_title: string;
  product_image_url: string;
  product_current_price: string;
  product_original_price: string;
}

const ProductItemAddToCart: React.FC<ProductItemAddToCartProps> = ({
  product_id,
  product_title,
  product_sub_title,
  product_image_url,
  product_current_price,
  product_original_price,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);

    const body = {
      product_id,
      product_title,
      product_sub_title,
      product_image_url,
      product_current_price,
      product_original_price,
    };

    axios
      .post("/api/cart", body)
      .then(() => {
        router.refresh();
        toast.success("Product Added to Cart!");
      })
      .catch((e) => toast.error(e?.response?.data || "Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <Button
      variant="outline"
      className="rounded-full w-full border-slate-500"
      onClick={handleAddToCart}
      loading={loading}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      <span className="font-medium">Add to Cart</span>
    </Button>
  );
};

export default ProductItemAddToCart;
