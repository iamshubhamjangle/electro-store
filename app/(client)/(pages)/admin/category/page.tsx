import prisma from "@/app/_lib/db";
import { DataTable } from "@/component/data-table";
import NewCategoryButton from "@/app/(client)/_components/admin/category/new-category-button";
import categoryColumn from "@/app/(client)/_components/admin/category/category-column";

const Page = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div className="space-y-4">
      <NewCategoryButton />
      <DataTable columns={categoryColumn} data={categories} />
    </div>
  );
};

export default Page;
