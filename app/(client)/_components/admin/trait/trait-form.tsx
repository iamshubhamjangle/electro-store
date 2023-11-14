"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(client)/_components/ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const traitFormSchema = z.object({
  name: z.string().min(1).max(50).toUpperCase(),
});

const TraitForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof traitFormSchema>>({
    resolver: zodResolver(traitFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof traitFormSchema>) {
    const { name } = values;
    setLoading(true);

    await axios
      .post("/api/admin/trait", {
        name,
      })
      .then(() => {
        toast.success("Added");
        router.refresh();
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
        <Button type="submit" loading={loading}>
          Add
        </Button>
      </form>
    </Form>
  );
};

export default TraitForm;
