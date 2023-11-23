"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { BannerFormSchema, BannerFormType } from "@/app/_types/form-schemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/component/form";
import { Input } from "@/component/input";
import { Button } from "@/component/button";
import { FileUploadResult } from "@/component/multi-file-dropzone";
import MultiFileDropzoneWrapper from "@/component/multi-file-dropzone-wrapper";

interface BannerFormProps {
  action: "ADD" | "UPDATE";
  banner: BannerFormType;
  resetBanner: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
  action,
  banner,
  resetBanner,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // prettier-ignore
  const [uploadedBannerImage, setUploadedBannerImage] = useState<FileUploadResult[]>(banner.imageUrl
    ? [{ filename: "uploadedFile", url: banner.imageUrl }]
    : []);

  const form = useForm<BannerFormType>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: {
      id: "",
      type: "",
      redirectUrl: "",
      imageUrl: "",
    },
    values: {
      id: banner.id,
      type: banner.type,
      redirectUrl: banner.redirectUrl,
      imageUrl: "",
    },
  });

  async function onSubmit(values: BannerFormType) {
    // Get Images
    const filteredUploadImagesUrl = uploadedBannerImage.map((item) => item.url);

    if (!filteredUploadImagesUrl.length && !banner.imageUrl) {
      toast.error("Image is required.");
      return;
    }

    // Get Form Values
    setLoading(true);
    const { id, redirectUrl, type } = values;

    try {
      await axios.post("/api/admin/banner", {
        id,
        type,
        imageUrl: filteredUploadImagesUrl[0],
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MultiFileDropzoneWrapper
          uploadRes={uploadedBannerImage}
          setUploadRes={setUploadedBannerImage}
          allowMultiFileSelect={false}
          maximumAllowedFiles={1}
          uploadFileCategory="banner/image"
        />
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
