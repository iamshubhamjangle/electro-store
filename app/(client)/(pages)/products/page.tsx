"use client";

import {
  Filters,
  HeroSectionForCategory,
  Products,
  TrendingDealsInCategory,
} from "@/app/(client)/_components/products";

import { useQueryState } from "next-usequerystate";

const Page = () => {
  const [category, setCategory] = useQueryState("category");
  const [rating, setRating] = useQueryState("rating");
  const [offers, setOffers] = useQueryState("offers");
  const [sortby, setSortby] = useQueryState("sortby");

  return (
    <main className="container max-w-7xl">
      <HeroSectionForCategory />
      <div className="space-y-16 my-16">
        <Filters
          category={category}
          setCategory={setCategory}
          rating={rating}
          setRating={setRating}
          offers={offers}
          setOffers={setOffers}
          sortby={sortby}
          setSortby={setSortby}
        />
        <Products
          category={category}
          rating={rating}
          offers={offers}
          sortby={sortby}
        />
        <TrendingDealsInCategory category={category} />
      </div>
    </main>
  );
};

export default Page;
