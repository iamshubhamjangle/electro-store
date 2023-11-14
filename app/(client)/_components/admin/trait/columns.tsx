"use client";

import { Trait } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

export const columns: ColumnDef<Trait>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Trend Name</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      console.log("row_id", row.original.id);

      return (
        <div>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Edit</span>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Delete</span>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
