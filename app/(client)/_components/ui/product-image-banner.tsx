import Image from "next/image";
import Link from "next/link";

interface ProductImageBannerProps {
  data: any;
}

const ProductImageBanner: React.FC<ProductImageBannerProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 relative">
      {data?.data?.map((item: any, idx: number) => {
        return (
          <Link href={item?.attributes?.redirectUrl || "#"} key={idx}>
            <Image
              className="rounded-md object-cover"
              alt={
                item?.attributes?.image?.data?.attributes?.alternativeText || ""
              }
              src={
                item?.attributes?.image?.data?.attributes?.url
                  ? `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${item?.attributes?.image?.data?.attributes?.url}`
                  : "/grey.jpg"
              }
              width={500}
              height={300}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ProductImageBanner;
