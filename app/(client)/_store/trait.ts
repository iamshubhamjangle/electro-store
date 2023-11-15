import { create } from "zustand";

type TTraitFormSchema = {
  id: string;
  name: string;
};

type CartStore = {
  action: "ADD" | "UPDATE";
  trait: TTraitFormSchema;
  setTrait: (trait: TTraitFormSchema) => void;
  setAction: (action: "ADD" | "UPDATE") => void;
  resetTrait: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  action: "ADD",
  trait: {
    id: "",
    name: "",
  },
  setTrait: (newTrait) => {
    set((prevState) => ({
      trait: { ...prevState.trait, ...newTrait },
    }));
  },
  setAction: (newAction) => {
    set({
      action: newAction,
    });
  },
  resetTrait: () => {
    set({
      action: "ADD",
      trait: {
        id: "",
        name: "",
      },
    });
  },
}));
