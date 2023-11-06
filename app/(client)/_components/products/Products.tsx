import fetcher from "@/app/_lib/fetcher";
import ProductList from "./ProductsList";

const Products = async () => {
  const data = await fetcher("/api/products?populate=*").catch((e) => {});

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <ProductList data={data} />
    </div>
  );
};

export default Products;
