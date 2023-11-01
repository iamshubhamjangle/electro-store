import { HeroSection } from "@/app/(client)/_components/exports";
import ProductItemList from "@/app/(client)/_components/ui/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageList from "@/app/(client)/_components/ui/product-image-list";
import ProductImageBanner from "../_components/ui/product-image-banner";

export default function Home() {
  return (
    <main className="container max-w-7xl">
      <HeroSection />
      <div className="space-y-16 my-16">
        <ContentRow title="Shop our top categories">
          <ProductImageList />
        </ContentRow>
        <ContentRow title="Top Deals">
          <ProductImageBanner />
        </ContentRow>
        <ContentRow title="Upto 60% off">
          <ProductImageBanner />
        </ContentRow>
        <ContentRow title="Trending Deals">
          <ProductItemList />
        </ContentRow>
      </div>
    </main>
  );
}
