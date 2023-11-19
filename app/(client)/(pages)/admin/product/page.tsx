import prisma from "@/app/_lib/db";
import productColumn from "@/app/(client)/_components/admin/product/product-column";
import { NewProductButton } from "@/app/(client)/_components/admin/product";
import { DataTable } from "@/component/data-table";

const Page = async () => {
  const products = await prisma.product.findMany();
  return (
    <div className="space-y-4">
      <NewProductButton />
      <DataTable columns={productColumn} data={products} />
    </div>
  );
};

export default Page;
