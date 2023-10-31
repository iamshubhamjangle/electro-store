import {
  ScrollArea,
  ScrollBar,
} from "@/app/(client)/_components/ui/scroll-area";
import Image from "next/image";

const ProductImageList = () => {
  return (
    <ScrollArea>
      <div className="flex space-x-10">
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
        <Image
          className="rounded-md object-cover"
          alt="Samsung Galaxy S21 FE 5G"
          src="/grey.jpg"
          width={180}
          height={300}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ProductImageList;
