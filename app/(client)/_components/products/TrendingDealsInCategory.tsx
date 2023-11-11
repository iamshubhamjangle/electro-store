"use client";

import { useState, useEffect } from "react";

import ProductItemList from "@/app/(client)/_components/ui/product-item-list";
import ContentRow from "@/app/(client)/_components/home/ContentRow";
import fetcher from "@/app/_lib/fetcher";

interface TrendingDealsInCategoryProps {
  category: string | null;
}

const TrendingDealsInCategory: React.FC<TrendingDealsInCategoryProps> = ({
  category,
}) => {
  const [data, setData] = useState<any>([]);

  async function fetchData() {
    let categoryFilter = "";
    let trendingFilter = "&filters[traits][type][$eqi]=TRENDING";

    if (category) {
      categoryFilter = `&filters[category][name][$eqi]=${category}`;
    }

    const URL = `/api/products?populate=*${categoryFilter}${trendingFilter}`;

    await fetcher(URL)
      .then((data) => setData(data))
      .catch((e) => {});
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <ContentRow title="Trending Deals In this Category">
      <ProductItemList data={data} />
    </ContentRow>
  );
};

export default TrendingDealsInCategory;
