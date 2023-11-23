import * as z from "zod";

// Schemas
export const ProductFormSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  subTitle: z.string(),
  description: z.string(),
  imageUrls: z.string().array(),
  categoryId: z.string(),
  sellingPrice: z.string(),
  maximumRetailPrice: z.string(),
  manufacturer: z.string(),
  rating: z.string(),
});

export const CategoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50),
  redirectUrl: z.string(),
  imageUrl: z.string(),
  bannerImageUrl: z.string(),
});

export const BannerFormSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1).max(50).toUpperCase(),
  redirectUrl: z.string(),
  imageUrl: z.string(),
});

export const TraitFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50).toUpperCase(),
});

// Types
export type ProductFormType = z.infer<typeof ProductFormSchema>;
export type CategoryFormType = z.infer<typeof CategoryFormSchema>;
export type BannerFormType = z.infer<typeof BannerFormSchema>;
export type TraitFormType = z.infer<typeof TraitFormSchema>;
