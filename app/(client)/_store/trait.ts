import { create } from "zustand";

type TTraitFormSchema = {
  id: string;
  name: string;
};

type TraitFormStore = {
  dialogOpen: boolean;
  action: "ADD" | "UPDATE";
  trait: TTraitFormSchema;
  setTrait: (trait: TTraitFormSchema) => void;
  setAction: (action: "ADD" | "UPDATE") => void;
  resetTrait: () => void;
  setDialogOpen: (value: boolean) => void;
};

export const useTraitFormStore = create<TraitFormStore>((set) => ({
  dialogOpen: false,
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
      dialogOpen: false,
    });
  },
  setDialogOpen: (value) => {
    if (value === false) {
      set({
        dialogOpen: value,
        action: "ADD",
        trait: {
          id: "",
          name: "",
        },
      });
    } else {
      set({
        dialogOpen: value,
      });
    }
  },
}));
