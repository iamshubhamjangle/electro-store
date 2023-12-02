import { CartProduct } from "@prisma/client";
import CartItem from "./cart-item";

interface CartItemListProps {
  cartProducts: CartProduct[];
}

const CartItemList: React.FC<CartItemListProps> = ({ cartProducts }) => {
  return (
    <div className="space-y-6">
      {cartProducts.map((item) => {
        return (
          <CartItem
            key={item.id}
            cartProductId={item.id}
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
