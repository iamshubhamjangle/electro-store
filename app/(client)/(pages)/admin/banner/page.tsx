import prisma from "@/app/_lib/db";
import { DataTable } from "@/component/data-table";
import { NewBannerButton } from "@/app/(client)/_components/admin/banner";
import bannerColumn from "@/app/(client)/_components/admin/banner/banner-column";

const Page = async () => {
  const banners = await prisma.banner.findMany();

  return (
    <div className="space-y-4">
      <NewBannerButton />
      <DataTable columns={bannerColumn} data={banners} />
    </div>
  );
};

export default Page;
