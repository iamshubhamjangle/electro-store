import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageBanner from "@/component/product-image-banner";
import prisma from "@/app/_lib/db";

const DiscountedDeals = async () => {
  const banners = await prisma.banner.findMany({
    where: {
      type: "DISCOUNTED",
    },
  });

  return (
    <ContentRow title="Discounted Deals">
      <ProductImageBanner banners={banners} />
    </ContentRow>
  );
};

export default DiscountedDeals;
