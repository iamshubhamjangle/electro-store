import { cn } from "@/app/_lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  imgSrc: string;
  width?: number;
  height?: number;
}

const ProductItem = ({
  name,
  description,
  imgSrc,
  width,
  height,
  className,
  ...props
}: ProductItemProps) => {
  return (
    <div>
      <div
        className={cn(
          "hover:border hover:border-slate-200 p-2 cursor-pointer w-[230px]",
          className
        )}
        {...props}
      >
        <Image
          src={imgSrc}
          alt={name}
          width={width}
          height={height}
          className={cn("object-cover mx-auto")}
        />
        <div className="space-y-3 text-sm">
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold leading-none">{name}</h3>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <div className="flex items-center gap-1 bg-blue-900 w-fit p-1 rounded-sm">
                <span className="text-xs font-bold text-white">4.4</span>
                <Star className="w-3 h-3" stroke="white" fill="white" />
              </div>
              <span className="text-sm font-bold text-muted-foreground">
                (200)
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold">₹81.20</span>
              <span className="text-xs line-through text-muted-foreground">
                ₹99.00
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
    </div>
  );
};

export default ProductItem;
