import Image from "next/image";
import Link from "next/link";
import { Banner } from "@prisma/client";

interface ProductImageBannerProps {
  banners: Banner[];
}

const ProductImageBanner: React.FC<ProductImageBannerProps> = ({ banners }) => {
  return (
    <div className="grid grid-cols-3 gap-4 relative">
      {banners?.map((item) => {
        return (
          <Link href={item.redirectUrl} key={item.id} prefetch={false}>
            <Image
              className="rounded-md object-cover"
              alt={item.type}
              src={item.imageUrl}
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
