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
import { useTraitFormStore } from "@/app/(client)/_store/trait";

import TraitForm from "./trait-form";

const TraitNewButton = () => {
  const store = useTraitFormStore();
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
          <DialogTitle>Trait</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <TraitForm
          action={store.action}
          trait={store.trait}
          resetTrait={store.resetTrait}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TraitNewButton;
