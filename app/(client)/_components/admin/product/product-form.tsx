"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
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
import { ProductFormSchema, ProductFormType } from "@/types/form-schemas";
import useImageDropzone from "../../ui/image-dropzone";
import { formatBytes } from "@/app/_lib/utils";

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
  const { edgestore } = useEdgeStore();

  const [loading, setLoading] = useState(false);
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState<String[]>([]);
  const { DropzoneComponent, dropzoneImages, setDropzoneImages } =
    useImageDropzone(true);

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
    setLoading(true);
    setUploadedImagesUrl([]);

    dropzoneImages.map(async (file) => {
      try {
        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "product",
          },
        });
        setUploadedImagesUrl((prevState) => [...prevState, res.url]);
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
    });

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

    await axios
      .post("/api/admin/product", {
        id,
        title,
        subTitle,
        description,
        imageUrls: uploadedImagesUrl,
        categoryId,
        sellingPrice,
        maximumRetailPrice,
        manufacturer,
        rating,
      })
      .then(() => {
        toast.success("Added");
        router.refresh();
        resetProduct();
      })
      .catch((err) => toast.error(`Unable to add new product: ${err?.message}`))
      .finally(() => setLoading(false));

    setDropzoneImages([]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {DropzoneComponent}
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
