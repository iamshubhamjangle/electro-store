"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Product } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEdgeStore } from "@/app/_lib/edgestore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/component/form";
import { Button } from "@/component/button";
import { Input } from "@/component/input";
import SingleImageDropzoneWrapper from "@/component//single-image-dropzone-wrapper";

const ProductFormSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  subTitle: z.string(),
  description: z.string(),
  imageUrls: z.string().array(),
  categoryId: z.string(),
  sellingPrice: z.number(),
  maximumRetailPrice: z.number(),
  manufacturer: z.string(),
  rating: z.any(),
});

type formSchema = z.infer<typeof ProductFormSchema>;

interface ProductFormProps {
  action: "ADD" | "UPDATE";
  product: Product;
  resetProduct: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  action,
  product,
  resetProduct,
}) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [localProductImage, setLocalProductImage] = useState<File>();
  const [localProductBannerImage, setLocalProductBannerImage] =
    useState<File>();
  const [uploadProgressBannerImage, setUploadProgressBannerImage] = useState(0);

  const form = useForm<formSchema>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      id: "",
      title: "",
      subTitle: "",
      description: "",
      imageUrls: [],
      categoryId: "",
      sellingPrice: 0,
      maximumRetailPrice: 0,
      manufacturer: "",
      rating: 0,
    },
    values: {
      id: product.id,
      title: product.title,
      subTitle: product.subTitle,
      description: product.description || "",
      imageUrls: product.imageUrls,
      categoryId: product.categoryId || "",
      sellingPrice: product.sellingPrice,
      maximumRetailPrice: product.maximumRetailPrice,
      manufacturer: product.manufacturer || "",
      rating: product.rating,
    },
  });

  async function onSubmit(values: formSchema) {
    const {
      id,
      title,
      subTitle,
      description,
      imageUrls,
      categoryId,
      sellingPrice,
      maximumRetailPrice,
      rating,
    } = values;
    let imageUrl = "";
    let bannerImageUrl = "";

    setLoading(true);
    setUploadProgress(0);
    setUploadProgressBannerImage(0);

    await axios
      .post("/api/admin/product", {
        id,
        title,
        subTitle,
        description,
        imageUrls,
        categoryId,
        sellingPrice,
        maximumRetailPrice,
        rating,
      })
      .then(() => {
        toast.success("Added");
        router.refresh();
        resetProduct();
      })
      .catch((err) => toast.error(`Unable to add new product: ${err?.message}`))
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 
          <SingleImageDropzoneWrapper
            localImage={localProductImage}
            localImageSetter={setLocalProductImage}
            backupImage={product.imageUrl}
            uploadProgress={uploadProgress}
          />
        */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>E.g Lenovo Ideapad Gaming 3,...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Eg. (8GB DDR4 | 512GB NVMe SSD | 4GB GTX 1060Ti),...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Features and specifications of product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ImageURLs</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CategoryId</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sellingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maximumRetailPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MRP</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            {action === "ADD" ? "Save" : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
