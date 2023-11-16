import ProductItem from "@/component/product-item";

interface ProductListProps {
  data: any;
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <>
      {data?.data?.map((product: any, idx: number) => {
        return (
          <ProductItem
            key={idx}
            productId={product?.id}
            name={product?.attributes?.title}
            description={product?.attributes?.description}
            imgSrc={product?.attributes?.image?.data[0]?.attributes?.url}
            rating={product?.attributes?.rating}
            reviews={0}
            currentPrice={product?.attributes?.currentPrice}
            originalPrice={product?.attributes?.originalPrice}
            width={200}
            height={350}
          />
        );
      })}
    </>
  );
};

export default ProductList;
