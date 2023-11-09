import { CartItem as TCartItem } from "@prisma/client";
import CartItem from "./cart-item";

interface CartItemListProps {
  cartItems: TCartItem[];
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems }) => {
  return (
    <div className="space-y-6">
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            product_id={item.product_id}
            product_title={item.product_title}
            product_sub_title={item.product_sub_title}
            product_image_url={item.product_image_url}
            product_quantity={item.product_quantity}
            product_current_price={item.product_current_price}
            product_original_price={item.product_original_price}
          />
        );
      })}
    </div>
  );
};

export default CartItemList;
