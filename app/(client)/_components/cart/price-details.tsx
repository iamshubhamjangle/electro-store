import { CartProduct } from "@prisma/client";
import { Separator } from "../ui/separator";

interface PriceDetailsProps {
  cartProducts: CartProduct[];
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ cartProducts }) => {
  let price = 0;
  let originalPrice = 0;

  cartProducts.map((item: any) => {
    price += item.product_current_price * item.product_quantity;
    originalPrice += item.product_original_price * item.product_quantity;
  });

  return (
    <div className="max-w-xl mx-auto p-2 space-y-2">
      <div className="flex justify-between text-lg">
        <span>Price</span>
        <span>₹{price}</span>
      </div>
      <div className="flex justify-between text-lg">
        <span>Discount</span>
        <span className="text-green-600">- ₹{originalPrice - price}</span>
      </div>
      <div className="flex justify-between text-lg">
        <span>Delivery</span>
        <span className="text-green-600">Free</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span>₹{price}</span>
      </div>
    </div>
  );
};

export default PriceDetails;
