import ProductItemList from "@/app/(client)/_components/ui/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import fetcher from "@/app/_lib/fetcher";

const TrendingDealsInCategory = () => {
  // const data = await fetcher(
  //   "/api/products?populate=*&filters[traits][type][$eq]=TRENDING"
  // ).catch((e) => {});
  const data = {};

  return (
    <ContentRow title="Deals In this Category">
      <ProductItemList data={data} />
    </ContentRow>
  );
};

export default TrendingDealsInCategory;
