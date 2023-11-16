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
import { useCartStore } from "@/app/(client)/_store/trait";
import BannerForm from "./banner-form";

const NewBannerButton = () => {
  const store = useCartStore();
  const { dialogOpen, setDialogOpen } = store;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button size={"lg"}>New</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Banner</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <BannerForm
        // action={store.action}
        // trait={store.trait}
        // resetTrait={store.resetTrait}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewBannerButton;
