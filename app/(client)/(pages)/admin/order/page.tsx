import orderColumn from "@/app/(client)/_components/admin/order/order-column";
import { DataTable } from "@/app/(client)/_components/ui/data-table";
import prisma from "@/app/_lib/db";

const Page = async () => {
  const orders = await prisma.order.findMany();

  return (
    <div>
      <DataTable columns={orderColumn} data={orders} />
    </div>
  );
};

export default Page;
