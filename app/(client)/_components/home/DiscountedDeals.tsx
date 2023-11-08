import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageBanner from "@/app/(client)/_components/ui/product-image-banner";
import fetcher from "@/app/_lib/fetcher";

const DiscountedDeals = async () => {
  const data = await fetcher(
    "/api/deals?populate=*&filters[type][$eq]=DISCOUNTED"
  ).catch((e) => {});

  return (
    <ContentRow title="Discounted Deals">
      <ProductImageBanner data={data} />
    </ContentRow>
  );
};

export default DiscountedDeals;
