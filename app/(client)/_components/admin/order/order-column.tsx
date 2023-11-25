"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Order } from "@prisma/client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/component/button";
import { Badge } from "@/component/badge";
import { useOrderStore } from "@/app/(client)/_store/order";

// Order Status
// 1 - "New"
// 2 - "Accepted"
// 3 - "Shipped"
// 4 - "Out for delivery"
// 5 - "Delivered"
// 6 - "Cancelled"
// 7 - "Returned"
function getOrderStatusFromId(id: number) {
  switch (id) {
    case 0:
      return "New";
    case 1:
      return "Accepted";
    case 2:
      return "Shipped";
    case 3:
      return "Out for delivery";
    case 4:
      return "Delivered";
    case 5:
      return "Cancelled";
    case 6:
      return "Returned";
    default:
      return "Unknown";
  }
}

const orderColumn: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold">Id</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-bold">Date</div>,
    cell: ({ row }) => (
      <div>{row.original.createdAt.toLocaleString("en-IN")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="font-bold">Address</div>,
    cell: ({ row }) => <p className="max-w-xs">{row.original.address}</p>,
  },
  {
    accessorKey: "status",
    header: () => <div className="font-bold">Status</div>,
    cell: ({ row }) => (
      <Badge>{getOrderStatusFromId(row.original.status)}</Badge>
    ),
  },
  {
    accessorKey: "orderTotal",
    header: () => <div className="font-bold">Amount</div>,
    cell: ({ row }) => <span>₹{row.original.orderTotal}</span>,
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

export default orderColumn;

const ActionRow: React.FC<any> = ({ row }) => {
  const store = useOrderStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);

    await axios
      .delete(`/api/admin/order/${id}`)
      .then(() => {
        toast.success("Deleted");
        router.refresh();
        store.resetOrder();
      })
      .catch((err) => toast.error(`Unable to delete banner: ${err?.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex gap-2">
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
