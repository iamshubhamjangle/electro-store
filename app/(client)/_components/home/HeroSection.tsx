import fetcher from "@/app/_lib/fetcher";
import HeroSectionComponent from "./HeroSectionComponent";

const HeroSection = async () => {
  const data = await fetcher("/api/website-banners?populate=bannerImage").catch(
    (e) => {}
  );

  return <HeroSectionComponent data={data} />;
};

export default HeroSection;
