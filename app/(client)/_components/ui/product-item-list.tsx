import ProductItem from "@/component/product-item";
import { Product } from "@prisma/client";

interface ProductItemListProps {
  products: Product[];
}

const ProductItemList: React.FC<ProductItemListProps> = ({ products }) => {
  return (
    <div className="flex gap-6 overflow-auto pb-2">
      {products?.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            width={200}
            height={350}
          />
        );
      })}
    </div>
  );
};

export default ProductItemList;
