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
import { Button } from "@/component/button";
import { Input } from "@/component/input";
import { Banner } from "@prisma/client";
import { SingleImageDropzone } from "../../ui/single-image-dropzone";
import { useEdgeStore } from "@/app/_lib/edgestore";
import { Progress } from "../../ui/progress";

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
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

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

    setLoading(true);
    setUploadProgress(0);

    if (!file) {
      toast.error("Image is required.");
      return;
    }

    await edgestore.publicFiles
      .upload({
        file,
        onProgressChange: (progress) => {
          setUploadProgress(progress);
        },
      })
      .then((res) => {
        imageUrl = res.url;
      })
      .catch((err) => {
        console.error("Image upload failed:", err);
        toast.error("Image upload failed.");
      });

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
        <div className="w-fit">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => setFile(file)}
          />
          <Progress value={uploadProgress} />
        </div>
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
