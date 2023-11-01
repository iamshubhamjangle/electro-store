import Image from "next/image";

const ProductImageBanner = () => {
  return (
    <div className="grid grid-cols-3 gap-4 relative">
      <Image
        className="rounded-md object-cover"
        alt="Samsung Galaxy S21 FE 5G"
        src="/headphones.png"
        width={400}
        height={200}
      />
      <Image
        className="rounded-md object-cover"
        alt="Samsung Galaxy S21 FE 5G"
        src="/skincare.png"
        width={400}
        height={200}
      />
      <Image
        className="rounded-md object-cover"
        alt="Samsung Galaxy S21 FE 5G"
        src="/shoes.png"
        width={400}
        height={200}
      />
    </div>
  );
};

export default ProductImageBanner;
