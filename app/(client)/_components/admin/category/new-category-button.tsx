"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/component/dialog";
import { Button } from "@/component/button";
import CategoryForm from "./category-form";
import { useCategoryStore } from "@/app/(client)/_store/category";

const NewCategoryButton = () => {
  const store = useCategoryStore();
  const { dialogOpen, setDialogOpen } = store;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button size={"lg"}>New</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          action={store.action}
          category={store.category}
          resetCategory={store.resetCategory}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryButton;
