"use client";

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
import { TraitFormSchema, TraitFormType } from "@/app/_types/form-schemas";

interface TraitFormProps {
  action: "ADD" | "UPDATE";
  trait: TraitFormType;
  resetTrait: () => void;
}

const TraitForm: React.FC<TraitFormProps> = ({ action, trait, resetTrait }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TraitFormType>({
    resolver: zodResolver(TraitFormSchema),
    defaultValues: {
      id: "",
      name: "",
    },
    values: {
      id: trait.id,
      name: trait.name,
    },
  });

  async function onSubmit(values: TraitFormType) {
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

export default TraitForm;
