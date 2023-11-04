import { HeroSection } from "@/app/(client)/_components/exports";
import ProductItemList from "@/app/(client)/_components/ui/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import Categories from "@/app/(client)/_components/home/Categories";
import TopDeals from "@/app/(client)/_components/home/TopDeals";
import DiscountedDeals from "@/app/(client)/_components/home/DiscountedDeals";

export default function Home() {
  return (
    <main className="container max-w-7xl">
      <HeroSection />
      <div className="space-y-16 my-16">
        <Categories />
        <TopDeals />
        <DiscountedDeals />
        <ContentRow title="Trending Deals">
          <ProductItemList />
        </ContentRow>
      </div>
    </main>
  );
}
