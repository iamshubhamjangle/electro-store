"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";
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
import { Progress } from "@/component/progress";
import { SingleImageDropzone } from "@/component/single-image-dropzone";

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
  const { edgestore } = useEdgeStore();

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [localCategoryImage, setLocalCategoryImage] = useState<File>();
  const [localCategoryBannerImage, setLocalCategoryBannerImage] =
    useState<File>();
  const [uploadProgressBannerImage, setUploadProgressBannerImage] = useState(0);

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
    const { id, name, redirectUrl } = values;
    let imageUrl = "";
    let bannerImageUrl = "";

    if (!localCategoryImage && !category.imageUrl) {
      toast.error("Image is required.");
      return;
    }

    if (!localCategoryBannerImage && !category.bannerImageUrl) {
      toast.error("Banner Image is required.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setUploadProgressBannerImage(0);

    if (localCategoryImage) {
      await edgestore.publicImages
        .upload({
          file: localCategoryImage,
          input: {
            category: "category",
          },
          onProgressChange: (progress) => {
            setUploadProgress(progress);
          },
        })
        .then((res) => {
          console.log("Image uploaded", res);
          imageUrl = res.url;
        })
        .catch((err) => {
          console.error("Image upload failed:", err.message);
          toast.error(`Image upload failed`);
        });
    }

    if (localCategoryBannerImage) {
      await edgestore.publicImages
        .upload({
          file: localCategoryBannerImage,
          input: {
            category: "category",
          },
          onProgressChange: (progress) => {
            setUploadProgressBannerImage(progress);
          },
        })
        .then((res) => {
          console.log("Image uploaded", res);
          bannerImageUrl = res.url;
        })
        .catch((err) => {
          console.error("Image upload failed:", err.message);
          toast.error(`Image upload failed`);
        });
    }

    await axios
      .post("/api/admin/category", {
        id,
        name,
        imageUrl,
        bannerImageUrl,
        redirectUrl,
      })
      .then(() => {
        toast.success("Added");
        router.refresh();
        resetCategory();
      })
      .catch((err) =>
        toast.error(`Unable to add new category: ${err?.message}`)
      )
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-fit">
          <FormLabel>Image</FormLabel>
          <SingleImageDropzone
            width={200}
            height={200}
            value={localCategoryImage || category.imageUrl}
            onChange={(localCategoryImage) =>
              setLocalCategoryImage(localCategoryImage)
            }
          />
          <Progress value={uploadProgress} />
          <FormDescription>
            Max-size: 1mb (JPEG & PNG supported)
          </FormDescription>
        </div>
        <div className="w-fit">
          <FormLabel>Banner Image</FormLabel>
          <SingleImageDropzone
            width={200}
            height={200}
            value={localCategoryBannerImage || category.bannerImageUrl}
            onChange={(localCategoryBannerImage) =>
              setLocalCategoryBannerImage(localCategoryBannerImage)
            }
          />
          <Progress value={uploadProgressBannerImage} />
          <FormDescription>
            Max-size: 1mb (JPEG & PNG supported)
          </FormDescription>
        </div>
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
