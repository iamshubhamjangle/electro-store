import Image from "next/image";
import Link from "next/link";

interface ProductImageListProps {
  data: any;
}

const ProductImageList: React.FC<ProductImageListProps> = ({ data }) => {
  return (
    <div className="relative pb-2">
      <div className="flex gap-4 overflow-auto">
        {data?.data?.map((item: any, idx: number) => {
          return (
            <Link
              key={item?.id || idx}
              className="relative flex justify-center group rounded-md overflow-hidden min-w-[180px]"
              href={`${item?.attributes?.slug}`}
              prefetch={false}
            >
              <Image
                className="object-cover"
                alt={item?.attributes?.name}
                src={
                  item?.attributes?.image?.data?.attributes?.url
                    ? `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${item?.attributes?.image?.data?.attributes?.url}`
                    : "/grey.jpg"
                }
                width={180}
                height={300}
              />
              <div className="absolute text-center bg-black bg-blend-multiply text-white w-full h-full opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="absolute z-10 self-center text-white font-bold text-xl group-hover:opacity-0 transition-opacity duration-300">
                {item?.attributes?.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageList;
