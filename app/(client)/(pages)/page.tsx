import { HeroSection } from "@/app/(client)/_components/exports";
import ProductItemList from "@/app/(client)/_components/ui/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import ProductImageList from "@/app/(client)/_components/ui/product-image-list";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="container max-w-7xl">
        <div className="space-y-16 my-16">
          <ContentRow title="Shop our top categories">
            <ProductImageList />
          </ContentRow>
          <ContentRow title="Trending Deals">
            <ProductItemList />
          </ContentRow>
        </div>
      </div>
    </main>
  );
}
