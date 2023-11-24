"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/component/button";
import { useProductStore } from "@/app/(client)/_store/product";
import { ProductFormType } from "@/app/_types/form-schemas";

const productColumn: ColumnDef<ProductFormType>[] = [
  {
    accessorKey: "imageUrl",
    header: () => <div className="font-bold">Image</div>,
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.imageUrls.map((src, index) => (
          <Image
            key={index}
            src={src || "/dummy.png"}
            alt="Image"
            width={50}
            height={50}
          />
        ))}
      </div>
    ),
  },
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
    cell: ({ row }) => <span>₹{row.original.sellingPrice}</span>,
  },
  {
    accessorKey: "maximumRetailPrice",
    header: () => <div className="font-bold">MRP</div>,
    cell: ({ row }) => <span>₹{row.original.maximumRetailPrice}</span>,
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
    <div className="flex gap-2">
      <Button
        variant="default"
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
