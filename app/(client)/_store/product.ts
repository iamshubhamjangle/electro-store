import { ProductFormType } from "@/app/_types/form-schemas";
import { create } from "zustand";

type ProductStore = {
  dialogOpen: boolean;
  action: "ADD" | "UPDATE";
  product: ProductFormType;
  setProduct: (product: ProductFormType) => void;
  setAction: (action: "ADD" | "UPDATE") => void;
  resetProduct: () => void;
  setDialogOpen: (value: boolean) => void;
};

const initialValueProduct: ProductFormType = {
  id: "",
  title: "",
  subTitle: "",
  description: "",
  imageUrls: [],
  categoryId: "",
  manufacturer: "",
  sellingPrice: "",
  maximumRetailPrice: "",
  rating: "",
  traits: [],
};

export const useProductStore = create<ProductStore>((set) => ({
  dialogOpen: false,
  action: "ADD",
  product: initialValueProduct,
  setProduct: (newProduct) => {
    set((prevState) => ({
      product: { ...prevState.product, ...newProduct },
    }));
  },
  setAction: (newAction) => {
    set({
      action: newAction,
    });
  },
  resetProduct: () => {
    set({
      action: "ADD",
      product: initialValueProduct,
      dialogOpen: false,
    });
  },
  setDialogOpen: (value) => {
    if (value === false) {
      set({
        dialogOpen: value,
        action: "ADD",
        product: initialValueProduct,
      });
    } else {
      set({
        dialogOpen: value,
      });
    }
  },
}));
