import { Prisma } from "@prisma/client";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductList from "./ProductsList";

type Product = Prisma.ProductGetPayload<{
  include: {
    category: true;
    trait: true;
  };
}>;

interface TrendingDealsInCategoryProps {
  trendingProducts: Product[];
}

const TrendingDealsInCategory: React.FC<TrendingDealsInCategoryProps> = ({
  trendingProducts,
}) => {
  return (
    <ContentRow title="Trending Deals In this Category">
      <ProductList products={trendingProducts} />
    </ContentRow>
  );
};

export default TrendingDealsInCategory;
