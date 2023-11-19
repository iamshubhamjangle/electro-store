import { create } from "zustand";

type TProductSchema = {
  id: string;
  title: string;
  subTitle: string;
  description: string | null;
  imageUrls: string[];
  categoryId: string | null;
  sellingPrice: number;
  maximumRetailPrice: number;
  manufacturer: string | null;
  rating: any;
  createdAt: any;
  updatedAt: any;
};

type ProductStore = {
  dialogOpen: boolean;
  action: "ADD" | "UPDATE";
  product: TProductSchema;
  setProduct: (product: TProductSchema) => void;
  setAction: (action: "ADD" | "UPDATE") => void;
  resetProduct: () => void;
  setDialogOpen: (value: boolean) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  dialogOpen: false,
  action: "ADD",
  product: {
    id: "",
    title: "",
    subTitle: "",
    description: "",
    imageUrls: [],
    categoryId: "",
    manufacturer: "",
    sellingPrice: 0,
    maximumRetailPrice: 0,
    rating: 0,
    createdAt: "",
    updatedAt: "",
  },
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
      product: {
        id: "",
        title: "",
        subTitle: "",
        description: "",
        imageUrls: [],
        categoryId: "",
        manufacturer: "",
        sellingPrice: 0,
        maximumRetailPrice: 0,
        rating: 0,
        createdAt: "",
        updatedAt: "",
      },
      dialogOpen: false,
    });
  },
  setDialogOpen: (value) => {
    if (value === false) {
      set({
        dialogOpen: value,
        action: "ADD",
        product: {
          id: "",
          title: "",
          subTitle: "",
          description: "",
          imageUrls: [],
          categoryId: "",
          manufacturer: "",
          sellingPrice: 0,
          maximumRetailPrice: 0,
          rating: 0,
          createdAt: "",
          updatedAt: "",
        },
      });
    } else {
      set({
        dialogOpen: value,
      });
    }
  },
}));
