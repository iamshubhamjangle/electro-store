import Image from "next/image";
import RemoveCartItem from "./cart-item-remove";

interface cartItemsProps {
  id: string;
  product_id: string;
  product_title: string;
  product_sub_title: string;
  product_image_url: string;
  product_quantity: number;
  product_current_price: number;
  product_original_price: number;
}

const CartItem: React.FC<cartItemsProps> = ({
  id,
  product_id,
  product_title,
  product_sub_title,
  product_current_price,
  product_original_price,
  product_image_url,
  product_quantity,
}) => {
  return (
    <div className="flex gap-2 items-center hover:shadow-md p-2">
      <div style={{ minWidth: "200px", maxWidth: "200px" }}>
        <Image
          alt={product_title}
          src={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${product_image_url}`}
          height={500}
          width={500}
          style={{ height: "auto", objectFit: "contain", position: "relative" }}
        />
      </div>
      <div>
        <p className="font-bold text-lg wrap-lines-2">{product_title}</p>
        <p className="text-sm text-muted-foreground wrap-lines-1">
          {product_sub_title}
        </p>
        <p className="text-xs">
          Qty: <span className="font-bold">{product_quantity}</span>
        </p>
        <RemoveCartItem cart_item_id={id} />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xl font-bold">₹{product_current_price}</span>
        <span className="text-xs line-through text-muted-foreground">
          ₹{product_original_price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;