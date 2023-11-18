import prisma from "@/app/_lib/db";
import { DataTable } from "@/component/data-table";
import NewCategoryButton from "@/app/(client)/_components/admin/category/new-category-button";

const Page = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div className="space-y-4">
      <NewCategoryButton />
      {/* <DataTable columns={bannerColumn} data={categories} /> */}
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  );
};

export default Page;
