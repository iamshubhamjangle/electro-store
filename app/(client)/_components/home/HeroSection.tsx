import prisma from "@/app/_lib/db";
import HeroSectionComponent from "./HeroSectionComponent";

const HeroSection = async () => {
  const banners = await prisma.banner.findMany({
    where: {
      type: "CAROUSEL_BANNER",
    },
  });

  return <HeroSectionComponent banners={banners} />;
};

export default HeroSection;
