import ProductItem from "@/component/product-item";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products && products.length === 0)
    return (
      <div className="grid place-content-center bg-slate-200 h-60 rounded-md">
        <p className="text-primary font-medium text-lg">
          No products available 😟
        </p>
      </div>
    );

  return (
    <div className="flex flex-wrap gap-6 justify-center">
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

export default ProductList;
