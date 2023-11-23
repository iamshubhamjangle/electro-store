"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

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
import MultiFileDropzoneWrapper from "@/component/multi-file-dropzone-wrapper";
import { FileUploadResult } from "../../ui/multi-file-dropzone";

const CategoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50),
  redirectUrl: z.string().min(1),
});

type formSchema = z.infer<typeof CategoryFormSchema>;

interface CategoryFormProps {
  action: "ADD" | "UPDATE";
  category: Category;
  resetCategory: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  action,
  category,
  resetCategory,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // category/image
  // prettier-ignore
  const [uploadedCategoryImages, setUploadedCategoryImages] = useState<FileUploadResult[]>(
    category.imageUrl
      ? [{ filename: "uploadedFile", url: category.imageUrl }]
      : []
  );
  // category/banner
  // prettier-ignore
  const [uploadedCategoryBannerImages, setUploadedCategoryBannerImages] = useState<FileUploadResult[]>(
    category.bannerImageUrl
      ? [{ filename: "uploadedFile", url: category.bannerImageUrl }]
      : []);

  const form = useForm<formSchema>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      id: "",
      name: "",
      redirectUrl: "",
    },
    values: {
      id: category.id,
      name: category.name,
      redirectUrl: category.redirectUrl,
    },
  });

  async function onSubmit(values: formSchema) {
    const filteredCategoryImage = uploadedCategoryImages.map(
      (item) => item.url
    );
    const filteredCategoryBannerImage = uploadedCategoryBannerImages.map(
      (item) => item.url
    );

    if (!filteredCategoryImage.length && !category.imageUrl) {
      toast.error("Category Image is required.");
      return;
    }
    if (!filteredCategoryBannerImage.length && !category.bannerImageUrl) {
      toast.error("Category Banner Image is required.");
      return;
    }

    const { id, name, redirectUrl } = values;

    try {
      await axios.post("/api/admin/category", {
        id,
        name,
        imageUrl: filteredCategoryImage[0],
        bannerImageUrl: filteredCategoryBannerImage[0],
        redirectUrl,
      });
      toast.success("Added");
      router.refresh();
      resetCategory();
    } catch (err: any) {
      toast.error(`Unable to add new category: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MultiFileDropzoneWrapper
          uploadRes={uploadedCategoryImages}
          setUploadRes={setUploadedCategoryImages}
          allowMultiFileSelect={false}
          maximumAllowedFiles={1}
          uploadFileCategory="category/image"
        />
        <MultiFileDropzoneWrapper
          uploadRes={uploadedCategoryBannerImages}
          setUploadRes={setUploadedCategoryBannerImages}
          allowMultiFileSelect={false}
          maximumAllowedFiles={1}
          uploadFileCategory="category/banner"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                E.g Mobiles, Laptops, Headphones,...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="redirectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Redirect URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>E.g /products/unique-product-id</FormDescription>
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

export default CategoryForm;
