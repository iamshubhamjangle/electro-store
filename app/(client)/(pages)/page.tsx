import {
  Categories,
  DiscountedDeals,
  HeroSection,
  TopDeals,
  TrendingDeals,
  ViewAllProducts,
} from "@/app/(client)/_components/home";

export default function Home() {
  return (
    <main className="container max-w-7xl">
      <HeroSection />
      <div className="space-y-16 my-16">
        <Categories />
        <TopDeals />
        <DiscountedDeals />
        <TrendingDeals />
        <ViewAllProducts />
      </div>
    </main>
  );
}
