"use client";

import { Trait } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useTraitFormStore } from "@/app/(client)/_store/trait";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const traitColumns: ColumnDef<Trait>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Trend Name</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      return <ActionRow row={row} />;
    },
  },
];

export default traitColumns;

const ActionRow: React.FC<any> = ({ row }) => {
  const store = useTraitFormStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);

    await axios
      .delete(`/api/admin/trait/${id}`)
      .then(() => {
        toast.success("Deleted");
        router.refresh();
        store.resetTrait();
      })
      .catch((err) => toast.error(`Unable to delete trait: ${err?.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        className="h-8 w-8 p-0"
        loading={loading}
        onClick={() => {
          store.setAction("UPDATE");
          store.setTrait(row.original);
          store.setDialogOpen(true);
        }}
      >
        <span className="sr-only">Edit</span>
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        className="h-8 w-8 p-0"
        loading={loading}
        onClick={() => handleDeleteItem(row.original.id)}
      >
        <span className="sr-only">Delete</span>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
