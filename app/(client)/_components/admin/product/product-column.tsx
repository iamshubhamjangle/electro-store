"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/component/button";
import { useProductStore } from "@/app/(client)/_store/product";
import { ProductFormType } from "@/app/_types/form-schemas";

const productColumn: ColumnDef<ProductFormType>[] = [
  {
    accessorKey: "title",
    header: () => <div className="font-bold">Title</div>,
  },
  {
    accessorKey: "subTitle",
    header: () => <div className="font-bold">SubTitle</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
  },
  {
    accessorKey: "categoryId",
    header: () => <div className="font-bold">Category</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: () => <div className="font-bold">Price</div>,
  },
  {
    accessorKey: "maximumRetailPrice",
    header: () => <div className="font-bold">MRP</div>,
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

export default productColumn;

const ActionRow: React.FC<any> = ({ row }) => {
  const store = useProductStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);

    await axios
      .delete(`/api/admin/product/${id}`)
      .then(() => {
        toast.success("Deleted");
        router.refresh();
        store.resetProduct();
      })
      .catch((err) => toast.error(`Unable to delete product: ${err?.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        loading={loading}
        onClick={() => {
          store.setAction("UPDATE");
          store.setProduct(row.original);
          store.setDialogOpen(true);
        }}
      >
        <span className="sr-only">Edit</span>
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        loading={loading}
        onClick={() => handleDeleteItem(row.original.id)}
      >
        <span className="sr-only">Delete</span>
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );
};
