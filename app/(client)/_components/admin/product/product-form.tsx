"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Trait } from "@prisma/client";

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
import { Checkbox } from "@/component/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/select";
import { FileUploadResult } from "@/component/multi-file-dropzone";
import MultiFileDropzoneWrapper from "@/component/multi-file-dropzone-wrapper";

interface ProductFormProps {
  action: "ADD" | "UPDATE";
  product: ProductFormType;
  resetProduct: () => void;
  categories: Category[];
  traits: Trait[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  action,
  product,
  resetProduct,
  categories,
  traits,
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
      traits: [],
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
      traits: product.traits,
    },
  });

  async function onSubmit(values: ProductFormType) {
    console.log("values", values);

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
      traits,
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
        traits,
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
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <FormField
          control={form.control}
          name="traits"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Traits</FormLabel>
                <FormDescription>
                  Select the trait you want to assign the product.
                </FormDescription>
              </div>
              {traits.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="traits"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.some(
                              (_trait) => _trait.id === item.id
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value.id !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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
