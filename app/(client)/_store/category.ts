import { create } from "zustand";

type TCategorySchema = {
  id: string;
  name: string;
  imageUrl: string;
  bannerImageUrl: string;
  redirectUrl: string;
};

type CategoryStore = {
  dialogOpen: boolean;
  action: "ADD" | "UPDATE";
  category: TCategorySchema;
  setCategory: (category: TCategorySchema) => void;
  setAction: (action: "ADD" | "UPDATE") => void;
  resetCategory: () => void;
  setDialogOpen: (value: boolean) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  dialogOpen: false,
  action: "ADD",
  category: {
    id: "",
    name: "",
    imageUrl: "",
    bannerImageUrl: "",
    redirectUrl: "",
  },
  setCategory: (newCategory) => {
    set((prevState) => ({
      category: { ...prevState.category, ...newCategory },
    }));
  },
  setAction: (newAction) => {
    set({
      action: newAction,
    });
  },
  resetCategory: () => {
    set({
      action: "ADD",
      category: {
        id: "",
        name: "",
        imageUrl: "",
        bannerImageUrl: "",
        redirectUrl: "",
      },
      dialogOpen: false,
    });
  },
  setDialogOpen: (value) => {
    if (value === false) {
      set({
        dialogOpen: value,
        action: "ADD",
        category: {
          id: "",
          name: "",
          imageUrl: "",
          bannerImageUrl: "",
          redirectUrl: "",
        },
      });
    } else {
      set({
        dialogOpen: value,
      });
    }
  },
}));
