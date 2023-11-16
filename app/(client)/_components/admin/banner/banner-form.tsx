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
  resetTrait: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
  action,
  banner,
  resetTrait,
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
      id: "",
      type: "",
      imageUrl: "",
      redirectUrl: "",
    },
  });

  async function onSubmit(values: formSchema) {
    const { id, name } = values;

    setLoading(true);

    await axios
      .post("/api/admin/trait", {
        id,
        name,
      })
      .then(() => {
        toast.success("Added");
        router.refresh();
        resetTrait();
      })
      .catch((err) => toast.error(`Unable to add new trait: ${err?.message}`))
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trait Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is a trait for product. E.g TRENDING, DISCOUNTED,...
              </FormDescription>
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
