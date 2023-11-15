"use client";

import { useCartStore } from "@/app/(client)/_store/trait";
import TraitForm from "./trait-form";

const TraitFormWrapper = () => {
  const store = useCartStore();

  return (
    <TraitForm
      action={store.action}
      trait={store.trait}
      resetTrait={store.resetTrait}
    />
  );
};

export default TraitFormWrapper;
