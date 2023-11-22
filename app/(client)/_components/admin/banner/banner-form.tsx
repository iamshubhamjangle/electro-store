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
import { updateFileProgress } from "@/app/_lib/utils";
import {
  FileState,
  FileUploadResult,
  MultiFileDropzone,
} from "../../ui/multi-file-dropzone";
import Image from "next/image";
import { X } from "lucide-react";

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

  const initialStateUploadRes: FileUploadResult[] = banner.imageUrl
    ? [
        {
          filename: "uploadedFile",
          url: banner.imageUrl,
        },
      ]
    : [];

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadRes, setUploadRes] = useState<FileUploadResult[]>(
    initialStateUploadRes
  );

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
    // Get Images
    const filteredUploadImagesUrl = uploadRes.map((item) => item.url);

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
        {uploadRes.length > 0 && (
          <div className="flex flex-wrap justify-between gap-4">
            {uploadRes.map((res, index) => (
              <div key={res.url} className="relative rounded-md">
                <Image
                  className="border-4 border-secondary rounded-md"
                  src={res.url}
                  alt={res.filename}
                  width={200}
                  height={200}
                />
                <Button
                  className="absolute t-2 r-2 cursor-pointer z-10"
                  onClick={() => {
                    const newUploadResult = [...uploadRes];
                    newUploadResult.splice(index, 1);
                    setUploadRes(newUploadResult);
                  }}
                  type="button"
                  variant="destructive"
                  size="icon"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    zIndex: 1,
                  }}
                >
                  <X size={18} />
                </Button>
              </div>
            ))}
          </div>
        )}
        <MultiFileDropzone
          value={fileStates}
          disabled={uploadRes.length >= 1}
          dropzoneOptions={{
            accept: {
              "image/*": [],
            },
            multiple: false,
            maxFiles: 1,
          }}
          onChange={(files) => setFileStates(files)}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
                try {
                  const res = await edgestore.publicFiles.upload({
                    file: addedFileState.file,
                    input: {
                      category: "banner",
                    },
                    onProgressChange: async (
                      progress: FileState["progress"]
                    ) => {
                      updateFileProgress(
                        addedFileState.key,
                        progress,
                        setFileStates
                      );
                      if (progress === 100) {
                        // wait 1 second to set it to complete so that the user can see the progress bar at 100%
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        updateFileProgress(
                          addedFileState.key,
                          "COMPLETE",
                          setFileStates
                        );
                      }
                    },
                  });
                  setUploadRes((uploadRes) => [
                    ...uploadRes,
                    {
                      url: res.url,
                      filename: addedFileState.file.name,
                    },
                  ]);
                } catch (err) {
                  updateFileProgress(
                    addedFileState.key,
                    "ERROR",
                    setFileStates
                  );
                }
              })
            );
          }}
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
