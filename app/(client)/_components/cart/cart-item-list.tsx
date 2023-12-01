import { Prisma, Product } from "@prisma/client";
import CartItem from "./cart-item";

interface CartItemListProps {
  cart: any;
}

const CartItemList: React.FC<CartItemListProps> = ({ cart }) => {
  return (
    <div className="space-y-6">
      {cart.products.map((item: Product) => {
        return (
          <CartItem
            key={cart.id}
            id={cart.id}
            product_id={item.id}
            product_title={item.title}
            product_sub_title={item.subTitle}
            product_image_url={
              item.imageUrls.length > 0 ? item.imageUrls[0] : ""
            }
            product_quantity={1}
            product_current_price={item.sellingPrice}
            product_original_price={item.maximumRetailPrice}
          />
        );
      })}
    </div>
  );
};

export default CartItemList;
