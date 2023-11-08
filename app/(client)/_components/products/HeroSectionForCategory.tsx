"use client";

import fetcher from "@/app/_lib/fetcher";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroSectionForCategoryProps {
  category: string | null;
}

const HeroSectionForCategory: React.FC<HeroSectionForCategoryProps> = ({
  category,
}) => {
  const [data, setData] = useState<any>([]);

  async function fetchData() {
    let categoryFilter = "";

    if (category) {
      categoryFilter = `&filters[name][$eqi]=${category}`;
    }

    const URL = `/api/categories?populate=image&populate=banner_image${categoryFilter}`;

    await fetcher(URL)
      .then((data) => setData(data))
      .catch((e) => {});
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="space-y-2">
      <div
        className="flex w-full rounded-lg overflow-clip h-fit"
        style={{ maxHeight: "300px" }}
      >
        <Image
          alt={""}
          src={
            data?.data &&
            data?.data[0]?.attributes?.banner_image?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${data?.data[0]?.attributes?.banner_image?.data?.attributes?.url}`
              : "/grey.jpg"
          }
          width={1200}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default HeroSectionForCategory;
