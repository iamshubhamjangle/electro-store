import { NewBannerButton } from "@/app/(client)/_components/admin/banner";
import prisma from "@/app/_lib/db";

const Page = async () => {
  const banners = await prisma.banner.findMany();

  return (
    <div className="space-y-4">
      <NewBannerButton />
      <pre>{JSON.stringify(banners, null, 2)}</pre>
    </div>
  );
};

export default Page;
