"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Category } from "@prisma/client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/component/button";
import { useCategoryStore } from "@/app/(client)/_store/category";

const categoryColumn: ColumnDef<Category>[] = [
  {
    accessorKey: "imageUrl",
    header: () => <div className="font-bold">Image</div>,
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl || "/dummy.png"}
        alt="Image"
        width={100}
        height={100}
      />
    ),
  },
  {
    accessorKey: "bannerImageUrl",
    header: () => <div className="font-bold">Banner Image</div>,
    cell: ({ row }) => (
      <Image
        src={row.original.bannerImageUrl || "/dummy.png"}
        alt="Image"
        width={100}
        height={100}
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
  },
  {
    accessorKey: "redirectUrl",
    header: () => <div className="font-bold">Redirect URL</div>,
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

export default categoryColumn;

const ActionRow: React.FC<any> = ({ row }) => {
  const store = useCategoryStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);

    await axios
      .delete(`/api/admin/category/${id}`)
      .then(() => {
        toast.success("Deleted");
        router.refresh();
        store.resetCategory();
      })
      .catch((err) => toast.error(`Unable to delete category: ${err?.message}`))
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
          store.setCategory(row.original);
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
