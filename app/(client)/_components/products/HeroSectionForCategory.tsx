import Image from "next/image";

const HeroSectionForCategory = () => {
  return (
    <div className="space-y-2">
      <div className="flex w-full rounded-lg overflow-clip h-fit">
        <Image
          alt={""}
          src={"/products_cover_1.png"}
          width={1200}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default HeroSectionForCategory;
