import prisma from "@/app/_lib/db";
import TraitNewButton from "@/app/(client)/_components/admin/trait/trait-new-button";
import { traitColumns } from "@/app/(client)/_components/admin";
import { DataTable } from "@/app/(client)/_components/ui/data-table";

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
