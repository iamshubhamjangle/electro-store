"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./button";

const ProductItemAddToCart = () => {
  return (
    <Button
      variant="outline"
      className="rounded-full w-full"
      onClick={() => console.log("ADD_TO_CART")}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      <span className="font-medium">Add to Cart</span>
    </Button>
  );
};

export default ProductItemAddToCart;
