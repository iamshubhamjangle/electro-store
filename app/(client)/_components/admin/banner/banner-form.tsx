"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
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
import { Banner } from "@prisma/client";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { Button } from "@/component/button";
import { Input } from "@/component/input";
import useImageDropzone from "../../ui/image-dropzone";
import { formatBytes } from "@/app/_lib/utils";

const BannerFormSchema = z.object({
  id: z.string().optional(),
  redirectUrl: z.string().min(1),
  type: z.string().min(1).max(50).toUpperCase(),
});

type formSchema = z.infer<typeof BannerFormSchema>;

interface BannerFormProps {
  action: "ADD" | "UPDATE";
  banner: Banner;
  resetBanner: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
  action,
  banner,
  resetBanner,
}) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [loading, setLoading] = useState(false);

  const { DropzoneComponent, dropzoneImages, setDropzoneImages } =
    useImageDropzone(false, "Image");

  const form = useForm<formSchema>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: {
      id: "",
      type: "",
      redirectUrl: "",
    },
    values: {
      id: banner.id,
      type: banner.type,
      redirectUrl: banner.redirectUrl,
    },
  });

  async function onSubmit(values: formSchema) {
    let imageUrl = "";

    if (!dropzoneImages.length && !banner.imageUrl) {
      toast.error("Image is required.");
      return;
    }

    setLoading(true);

    for (const file of dropzoneImages) {
      try {
        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "banner",
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

    const { id, redirectUrl, type } = values;

    try {
      await axios.post("/api/admin/banner", {
        id,
        type,
        imageUrl,
        redirectUrl,
      });
      toast.success("Added");
      router.refresh();
      resetBanner();
    } catch (err: any) {
      toast.error(`Unable to add new banner: ${err?.message}`);
    } finally {
      setLoading(false);
    }

    setDropzoneImages([]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {DropzoneComponent}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                E.g OFFER_BANNER, DEAL_BANNER, CAROUSEL_BANNER,...
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

export default BannerForm;
