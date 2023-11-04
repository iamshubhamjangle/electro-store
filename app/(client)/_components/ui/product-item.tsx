import { cn } from "@/app/_lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  productId: number;
  name: string;
  description: string;
  imgSrc: string;
  rating: number;
  reviews: number;
  currentPrice: number;
  originalPrice: number;
  width?: number;
  height?: number;
}

const ProductItem = ({
  productId,
  name,
  description,
  imgSrc,
  width,
  height,
  rating = 0,
  reviews = 0,
  currentPrice = 0,
  originalPrice = 0,
  className,
  ...props
}: ProductItemProps) => {
  return (
    <Link href={`/${productId}`}>
      <div
        className={cn(
          "hover:border hover:border-slate-200 p-2 cursor-pointer w-[230px]",
          className
        )}
        {...props}
      >
        <Image
          src={`${process.env.BACKEND_ENDPOINT}${imgSrc}`}
          alt={name}
          width={width}
          height={height}
          className={cn("object-cover mx-auto")}
        />
        <div className="space-y-3 text-sm">
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold leading-none">{name}</h3>
          </div>
          <div className="">
            <p className="text-xs font-medium text-muted-foreground wrapToTwoLines">
              {description}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <div className="flex items-center gap-1 bg-blue-900 w-fit p-1 rounded-sm">
                <span className="text-xs font-bold text-white">{rating}</span>
                <Star className="w-3 h-3" stroke="white" fill="white" />
              </div>
              <span className="text-sm font-bold text-muted-foreground">
                ({reviews})
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">₹{currentPrice}</span>
              <span className="text-xs line-through text-muted-foreground">
                ₹{originalPrice}
              </span>
            </div>
          </div>
          <div>
            <Button variant="outline" className="rounded-full w-full ">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="font-medium">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
