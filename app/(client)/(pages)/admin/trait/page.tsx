import prisma from "@/app/_lib/db";
import {
  traitColumns,
  TraitNewButton,
} from "@/app/(client)/_components/admin/trait";
import { DataTable } from "@/component/data-table";

const Page = async () => {
  const traits = await prisma.trait.findMany();

  return (
    <div className="space-y-4">
      <TraitNewButton />
      <DataTable columns={traitColumns} data={traits} />
    </div>
  );
};

export default Page;
