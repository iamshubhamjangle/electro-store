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
import useImageDropzone from "../../ui/image-dropzone";
import { formatBytes } from "@/app/_lib/utils";

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

  const { DropzoneComponent, dropzoneImages, setDropzoneImages } =
    useImageDropzone(false, "Image");

  const {
    DropzoneComponent: BannerDropzoneComponent,
    dropzoneImages: bannerDropzoneImage,
    setDropzoneImages: setBannerDropzoneImage,
  } = useImageDropzone(false, "Banner Image");

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
    let imageUrl = "";
    let bannerImageUrl = "";

    if (!dropzoneImages.length && !category.imageUrl) {
      toast.error("Image is required.");
      return;
    }

    if (!bannerDropzoneImage.length && !category.bannerImageUrl) {
      toast.error("Banner Image is required.");
      return;
    }

    setLoading(true);

    for (const file of dropzoneImages) {
      try {
        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "category/image",
          },
        });
        imageUrl = res.url;
      } catch (error) {
        console.log(
          `IMAGE UPLOAD FAILED FOR '${file.name}', SIZE: ${formatBytes(
            file.size
          )}`
        );
        toast.error(
          `Image upload failed for '${file.name}', size: ${formatBytes(
            file.size
          )}`,
          {
            duration: 5000,
          }
        );
      }
    }

    for (const file of bannerDropzoneImage) {
      try {
        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "category/banner",
          },
        });
        bannerImageUrl = res.url;
      } catch (error) {
        console.log(
          `IMAGE UPLOAD FAILED FOR '${file.name}', SIZE: ${formatBytes(
            file.size
          )}`
        );
        toast.error(
          `Image upload failed for '${file.name}', size: ${formatBytes(
            file.size
          )}`,
          {
            duration: 5000,
          }
        );
      }
    }

    const { id, name, redirectUrl } = values;

    try {
      await axios.post("/api/admin/category", {
        id,
        name,
        imageUrl,
        bannerImageUrl,
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

    setDropzoneImages([]);
    setBannerDropzoneImage([]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {DropzoneComponent}
        {BannerDropzoneComponent}
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
