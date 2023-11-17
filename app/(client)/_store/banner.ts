import { create } from "zustand";

type TBannerSchema = {
  id: string;
  type: string;
  imageUrl: string;
  redirectUrl: string;
};

type BannerStore = {
  dialogOpen: boolean;
  action: "ADD" | "UPDATE";
  banner: TBannerSchema;
  setBanner: (banner: TBannerSchema) => void;
  setAction: (action: "ADD" | "UPDATE") => void;
  resetBanner: () => void;
  setDialogOpen: (value: boolean) => void;
};

export const useBannerStore = create<BannerStore>((set) => ({
  dialogOpen: false,
  action: "ADD",
  banner: {
    id: "",
    type: "",
    imageUrl: "",
    redirectUrl: "",
  },
  setBanner: (newBanner) => {
    set((prevState) => ({
      banner: { ...prevState.banner, ...newBanner },
    }));
  },
  setAction: (newAction) => {
    set({
      action: newAction,
    });
  },
  resetBanner: () => {
    set({
      action: "ADD",
      banner: {
        id: "",
        type: "",
        imageUrl: "",
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
        banner: {
          id: "",
          type: "",
          imageUrl: "",
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
