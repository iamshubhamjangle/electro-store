import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

interface ProductImageListProps {
  categories: Category[];
}

const ProductImageList: React.FC<ProductImageListProps> = ({ categories }) => {
  return (
    <div className="relative pb-2">
      <div className="flex gap-4 overflow-auto">
        {categories?.map((item) => {
          return (
            <Link
              key={item.id}
              className="relative flex justify-center group rounded-md overflow-hidden min-w-[180px]"
              href={item.redirectUrl}
              prefetch={false}
            >
              <Image
                className="object-cover"
                alt={"Category Cover Image"}
                src={item.imageUrl}
                width={180}
                height={300}
              />
              <div className="absolute text-center bg-black bg-blend-multiply text-white w-full h-full opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="absolute z-10 self-center text-white font-bold text-xl group-hover:opacity-0 transition-opacity duration-300">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageList;
