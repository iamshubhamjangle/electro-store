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

const BannerFormSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().min(1),
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
  const router = useRouter();

  const form = useForm<formSchema>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: {
      id: "",
      type: "",
      imageUrl: "",
      redirectUrl: "",
    },
    values: {
      id: banner.id,
      type: banner.type,
      imageUrl: banner.imageUrl,
      redirectUrl: banner.redirectUrl,
    },
  });

  async function onSubmit(values: formSchema) {
    const { id, imageUrl, redirectUrl, type } = values;

    setLoading(true);

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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                E.g https://www.edgestore.com/s3/asfadfas.jpg
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
              <FormDescription>E.g /products/aslfjgkladjcmsd</FormDescription>
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
