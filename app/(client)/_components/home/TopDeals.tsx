import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageBanner from "@/app/(client)/_components/ui/product-image-banner";
import fetcher from "@/app/_lib/fetcher";

const TopDeals = async () => {
  const data = await fetcher(
    "/api/deals?populate=*&filters[type][$eq]=TOP_DEAL"
  ).catch((e) => {});

  return (
    <ContentRow title="Top Deals">
      <ProductImageBanner data={data} />
    </ContentRow>
  );
};

export default TopDeals;
