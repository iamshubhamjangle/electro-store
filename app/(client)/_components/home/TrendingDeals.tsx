import ProductItemList from "@/app/(client)/_components/ui/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import fetcher from "@/app/_lib/fetcher";

const TrendingDeals = async () => {
  const data = await fetcher(
    "/api/products?populate=*&filters[traits][type][$eq]=TRENDING"
  ).catch((e) => {});

  return (
    <ContentRow title="Trending Deals">
      <ProductItemList data={data} />
    </ContentRow>
  );
};

export default TrendingDeals;
