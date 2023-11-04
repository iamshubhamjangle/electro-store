import {
  Filters,
  HeroSectionForCategory,
  Products,
  TrendingDealsInCategory,
} from "@/app/(client)/_components/products";

const Page = () => {
  return (
    <main className="container max-w-7xl">
      <HeroSectionForCategory />
      <div className="space-y-16 my-16">
        <Filters />
        <Products />
        <TrendingDealsInCategory />
      </div>
    </main>
  );
};

export default Page;
