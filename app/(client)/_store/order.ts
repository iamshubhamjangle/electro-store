import { create } from "zustand";

type TOrderSchema = {
  id: string;
  address: string;
  status: number;
  orderTotal: string;
  createdAt: string;
};

type OrderStore = {
  order: TOrderSchema;
  setOrder: (order: TOrderSchema) => void;
  resetOrder: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  dialogOpen: false,
  action: "ADD",
  order: {
    id: "",
    address: "",
    status: 0,
    createdAt: "",
    orderTotal: "",
  },
  setOrder: (newOrder) => {
    set((prevState) => ({
      order: { ...prevState.order, ...newOrder },
    }));
  },
  resetOrder: () => {
    set({
      order: {
        id: "",
        address: "",
        status: 0,
        createdAt: "",
        orderTotal: "",
      },
    });
  },
}));
