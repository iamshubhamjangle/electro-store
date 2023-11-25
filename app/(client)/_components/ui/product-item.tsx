import { cn } from "@/app/_lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductItemAddToCart from "./product-item-action-add";
import { Product } from "@prisma/client";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  width?: number;
  height?: number;
}

const ProductItem = ({
  product,
  width,
  height,
  className,
  ...props
}: ProductItemProps) => {
  return (
    <div
      className={cn(
        "hover:border hover:border-slate-200 p-2 w-[230px]",
        className
      )}
      {...props}
    >
      <div>
        <Image
          src={product.imageUrls && product.imageUrls[0]}
          alt={product.title}
          width={width}
          height={height}
          className={cn("object-cover mx-auto")}
        />
        <div className="space-y-3 text-sm">
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold leading-none">{product.title}</h3>
          </div>
          <div className="">
            <p className="text-xs font-medium text-muted-foreground wrap-lines-2">
              {product.description}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <div className="flex items-center gap-1 bg-blue-900 w-fit p-1 rounded-sm">
                <span className="text-xs font-bold text-white">
                  {product.rating.toString()}
                </span>
                <Star className="w-3 h-3" stroke="white" fill="white" />
              </div>
              <span className="text-sm font-bold text-muted-foreground">
                (0)
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">₹{product.sellingPrice}</span>
              <span className="text-xs line-through text-muted-foreground">
                ₹{product.maximumRetailPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <ProductItemAddToCart
          product_id={product.id}
          product_title={product.title}
          product_sub_title={product.subTitle}
          product_image_url={product.imageUrls && product.imageUrls[0]}
          product_current_price={product.sellingPrice.toString()}
          product_original_price={product.maximumRetailPrice.toString()}
        />
      </div>
    </div>
  );
};

export default ProductItem;
