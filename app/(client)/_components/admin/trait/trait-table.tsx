import { Trait } from "@prisma/client";
import { DataTable } from "@/app/(client)/_components/ui/data-table";
import { columns } from "./columns";

interface TraitTableProps {
  traits: Trait[];
}

const TraitTable: React.FC<TraitTableProps> = ({ traits }) => {
  return (
    <div className="mt-8">
      <DataTable columns={columns} data={traits} />
    </div>
  );
};

export default TraitTable;
