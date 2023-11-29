import prisma from "@/app/_lib/db";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductList from "../products/ProductsList";

const TrendingDeals = async () => {
  const products = await prisma.product.findMany({
    where: {
      trait: {
        some: {
          name: "TRENDING",
        },
      },
    },
  });

  return (
    <ContentRow title="Trending Deals">
      <ProductList products={products} />
    </ContentRow>
  );
};

export default TrendingDeals;
