import * as z from "zod";

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

export type ProductFormType = z.infer<typeof ProductFormSchema>;
