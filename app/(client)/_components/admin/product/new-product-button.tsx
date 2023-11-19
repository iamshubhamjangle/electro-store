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
import ProductForm from "./product-form";
import { useProductStore } from "@/app/(client)/_store/product";

const NewProductButton = () => {
  const store = useProductStore();
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
          <DialogTitle>Product</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          action={store.action}
          product={store.product}
          resetProduct={store.resetProduct}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewProductButton;
