import { HeroSection } from "@/app/(client)/_components/exports";
import Categories from "@/app/(client)/_components/home/Categories";
import TopDeals from "@/app/(client)/_components/home/TopDeals";
import DiscountedDeals from "@/app/(client)/_components/home/DiscountedDeals";
import TrendingDeals from "@/app/(client)/_components/home/TrendingDeals";

export default function Home() {
  return (
    <main className="container max-w-7xl">
      <HeroSection />
      <div className="space-y-16 my-16">
        <Categories />
        <TopDeals />
        <DiscountedDeals />
        <TrendingDeals />
      </div>
    </main>
  );
}
