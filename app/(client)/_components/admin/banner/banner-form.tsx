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
import SingleImageDropzoneWrapper from "@/component/single-image-dropzone-wrapper";

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [localBannerImage, setLocalBannerImage] = useState<File>();

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
    const { id, redirectUrl, type } = values;
    let imageUrl = "";

    if (!localBannerImage && !banner.imageUrl) {
      toast.error("Image is required.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    if (localBannerImage) {
      await edgestore.publicImages
        .upload({
          file: localBannerImage,
          input: {
            category: "banner",
          },
          onProgressChange: (progress) => {
            setUploadProgress(progress);
          },
        })
        .then((res) => {
          console.log("Image uplaoded", res);
          imageUrl = res.url;
        })
        .catch((err) => {
          console.error("Image upload failed:", err.message);
          toast.error(`Image upload failed`);
        });
    }

    await axios
      .post("/api/admin/banner", {
        id,
        type,
        imageUrl,
        redirectUrl,
      })
      .then(() => {
        toast.success("Added");
        router.refresh();
        resetBanner();
      })
      .catch((err) => toast.error(`Unable to add new banner: ${err?.message}`))
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <SingleImageDropzoneWrapper
          localImage={localBannerImage}
          localImageSetter={setLocalBannerImage}
          backupImage={banner.imageUrl}
          uploadProgress={uploadProgress}
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
