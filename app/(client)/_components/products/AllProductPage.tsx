"use client";

import {
  Filters,
  HeroSectionForCategory,
  TrendingDealsInCategory,
  ProductsList,
} from "@/app/(client)/_components/products";

import { useQueryState } from "next-usequerystate";
import { Category, Prisma } from "@prisma/client";

type Product = Prisma.ProductGetPayload<{
  include: {
    category: true;
    trait: true;
  };
}>;

interface AllProductPageProps {
  products: Product[];
  categories: Category[];
}

const AllProductsPage: React.FC<AllProductPageProps> = ({
  products,
  categories,
}) => {
  const [category, setCategory] = useQueryState("category");
  const [rating, setRating] = useQueryState("rating");
  const [offers, setOffers] = useQueryState("offers");
  const [sortby, setSortby] = useQueryState("sortby");

  let filteredProduct = [...products];

  if (category) {
    filteredProduct = filteredProduct.filter(
      (p) => p.category?.name.toLowerCase() === category.toLowerCase()
    );
  }

  if (rating) {
    filteredProduct = filteredProduct.filter(
      (p) => parseFloat(p.rating.toString()) >= parseFloat(rating)
    );
  }

  if (offers) {
    filteredProduct = filteredProduct.filter((p) =>
      p.trait.some((trait) => trait.name === offers)
    );
  }

  if (sortby) {
    if (sortby === "PLH") {
      filteredProduct = filteredProduct.sort(
        (a, b) => a.sellingPrice - b.sellingPrice
      );
    } else {
      filteredProduct = filteredProduct.sort(
        (a, b) => -(a.sellingPrice - b.sellingPrice)
      );
    }
  }

  let trendingProducts = [...products];
  trendingProducts = trendingProducts.filter((p) => {
    return (
      p.trait.some((trait) => trait.name === "TRENDING") &&
      (category
        ? p.category?.name.toLowerCase() === category.toLowerCase()
        : true)
    );
  });

  return (
    <main className="container max-w-7xl">
      <HeroSectionForCategory
        categories={categories}
        selectedCategory={category}
      />
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
        <ProductsList products={filteredProduct} />
        <TrendingDealsInCategory trendingProducts={trendingProducts} />
      </div>
    </main>
  );
};

export default AllProductsPage;
