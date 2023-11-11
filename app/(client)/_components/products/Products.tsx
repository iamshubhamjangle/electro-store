"use client";

import { useState, useEffect } from "react";

import fetcher from "@/app/_lib/fetcher";
import ProductList from "./ProductsList";

interface ProductsProps {
  category: string | null;
  rating: string | null;
  offers: string | null;
  sortby: string | null;
}

const Products: React.FC<ProductsProps> = ({
  category,
  rating,
  offers,
  sortby,
}) => {
  const [data, setData] = useState<any>([]);

  async function fetchData() {
    let categoryFilter = "";
    let ratingFilter = "";
    let offersFilter = "";
    let sortByFilter = "";

    if (category) {
      categoryFilter = `&filters[category][name][$eqi][0]=${category}`;
    }

    if (rating) {
      ratingFilter = `&filters[rating][$gte][1]=${rating}`;
    }

    if (offers) {
      if (offers === "30")
        offersFilter = `&filters[traits][type][$eqi][2]=ON_DEAL_30%`;
      else if (offers === "60")
        offersFilter = `&filters[traits][type][$eqi][2]=ON_DEAL_60%`;
    }

    // GET /api/articles?sort[0]=title:asc&sort[1]=slug:desc
    if (sortby) {
      if (sortby === "PLH") sortByFilter = `&sort[0]=currentPrice:asc`;
      else if (sortby === "PHL") sortByFilter = `&sort[0]=currentPrice:desc`;
    }

    const URL = `/api/products?populate=*${categoryFilter}${ratingFilter}${offersFilter}${sortByFilter}`;

    await fetcher(URL)
      .then((data) => {
        console.log("data", data);
        setData(data);
      })
      .then(() => console.log("PRODUCTS_FETCHED: ", URL))
      .catch((e) => console.error("PRODUCTS_FETCHED_FAILED", e));
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, rating, offers, sortby]);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <ProductList data={data} />
    </div>
  );
};

export default Products;
