import Image from "next/image";

const ProductImageBanner = () => {
  return (
    <div className="grid grid-cols-3 gap-4 relative">
      <Image
        className="rounded-md object-cover"
        alt="Samsung Galaxy S21 FE 5G"
        src="/card_headphones.png"
        width={500}
        height={300}
      />
      <Image
        className="rounded-md object-cover"
        alt="Samsung Galaxy S21 FE 5G"
        src="/card_watch.png"
        width={500}
        height={300}
      />
      <Image
        className="rounded-md object-cover"
        alt="Samsung Galaxy S21 FE 5G"
        src="/card_laptop.png"
        width={500}
        height={300}
      />
    </div>
  );
};

export default ProductImageBanner;
