"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductFormSchema, ProductFormType } from "@/types/form-schemas";

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
import { FileUploadResult } from "@/component/multi-file-dropzone";
import MultiFileDropzoneWrapper from "@/component/multi-file-dropzone-wrapper";

interface ProductFormProps {
  action: "ADD" | "UPDATE";
  product: ProductFormType;
  resetProduct: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  action,
  product,
  resetProduct,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // Multi Image `product.imageUrls`
  // prettier-ignore
  const [uploadedProductImages, setUploadedProductImages] = useState<FileUploadResult[]>(product.imageUrls
    ? product.imageUrls.map((imageUrl, idx) => ({ filename: `uploadedFile-${idx}`, url: imageUrl }))
    : []);

  const form = useForm<ProductFormType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      id: "",
      title: "",
      subTitle: "",
      description: "",
      imageUrls: [],
      categoryId: "",
      sellingPrice: "",
      maximumRetailPrice: "",
      manufacturer: "",
      rating: "",
    },
    values: {
      id: product.id,
      title: product.title,
      subTitle: product.subTitle,
      description: product.description,
      imageUrls: product.imageUrls,
      categoryId: product.categoryId,
      sellingPrice: product.sellingPrice.toString(),
      maximumRetailPrice: product.maximumRetailPrice.toString(),
      manufacturer: product.manufacturer,
      rating: product.rating.toString(),
    },
  });

  async function onSubmit(values: ProductFormType) {
    // Get Images Urls List
    const filteredUploadImagesUrls = uploadedProductImages.map(
      (item) => item.url
    );

    if (!filteredUploadImagesUrls.length && !product.imageUrls) {
      toast.error("Image is required.");
      return;
    }

    setLoading(true);

    const {
      id,
      title,
      subTitle,
      description,
      categoryId,
      sellingPrice,
      maximumRetailPrice,
      manufacturer,
      rating,
    } = values;

    try {
      await axios.post("/api/admin/product", {
        id,
        title,
        subTitle,
        description,
        imageUrls: filteredUploadImagesUrls,
        categoryId,
        sellingPrice,
        maximumRetailPrice,
        manufacturer,
        rating,
      });
      toast.success("Added");
      router.refresh();
      resetProduct();
    } catch (err: any) {
      toast.error(`Unable to add new product: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MultiFileDropzoneWrapper
          uploadRes={uploadedProductImages}
          setUploadRes={setUploadedProductImages}
          allowMultiFileSelect={true}
          maximumAllowedFiles={5}
          uploadFileCategory="banner"
        />
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
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturer</FormLabel>
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
