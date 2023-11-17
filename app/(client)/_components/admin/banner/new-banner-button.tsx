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
import BannerForm from "./banner-form";
import { useBannerStore } from "@/app/(client)/_store/banner";

const NewBannerButton = () => {
  const store = useBannerStore();
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
          action={store.action}
          banner={store.banner}
          resetBanner={store.resetBanner}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewBannerButton;
