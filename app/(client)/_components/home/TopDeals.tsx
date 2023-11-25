import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageBanner from "@/component/product-image-banner";
import prisma from "@/app/_lib/db";

const TopDeals = async () => {
  const banners = await prisma.banner.findMany({
    where: {
      type: "TOP_DEAL",
    },
  });

  return (
    <ContentRow title="Top Deals">
      <ProductImageBanner banners={banners} />
    </ContentRow>
  );
};

export default TopDeals;
