import Image from "next/image";
import { Category } from "@prisma/client";

interface HeroSectionForCategoryProps {
  categories: Category[];
  selectedCategory: string | null;
}

const HeroSectionForCategory: React.FC<HeroSectionForCategoryProps> = ({
  categories,
  selectedCategory,
}) => {
  const data = categories?.find(
    (c) => c.name.toLowerCase() === selectedCategory?.toLowerCase()
  );

  let bannerImage = "/grey.png";
  if (data?.bannerImageUrl) {
    bannerImage = data.bannerImageUrl;
  } else if (categories.length) {
    bannerImage = categories[0].bannerImageUrl;
  }

  return (
    <div className="space-y-2">
      <div
        className="flex w-full rounded-lg overflow-clip h-fit"
        style={{ maxHeight: "300px" }}
      >
        <Image
          alt={"Category Banner Image"}
          src={bannerImage}
          width={1200}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default HeroSectionForCategory;
