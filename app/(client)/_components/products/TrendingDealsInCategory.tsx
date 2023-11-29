import ProductItemList from "@/component/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import { Prisma } from "@prisma/client";

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
      <ProductItemList products={trendingProducts} />
    </ContentRow>
  );
};

export default TrendingDealsInCategory;
