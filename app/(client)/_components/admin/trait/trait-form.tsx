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

const traitFormSchema = z.object({
  name: z.string().min(1).max(50).toUpperCase(),
});

const TraitForm = () => {
  const form = useForm<z.infer<typeof traitFormSchema>>({
    resolver: zodResolver(traitFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof traitFormSchema>) {
    console.log("TraitForm", values);
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TraitForm;
