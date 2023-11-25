"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { DropzoneOptions } from "react-dropzone";
import { SetStateAction, useState } from "react";

import { useEdgeStore } from "@/app/_lib/edgestore";
import { updateFileProgress } from "@/app/_lib/utils";

import {
  FileState,
  FileUploadResult,
  MultiFileDropzone,
} from "@/component/multi-file-dropzone";
import { Button } from "@/component/button";

interface MultiFileDropzoneWrapperProps {
  title?: string;
  uploadRes: FileUploadResult[];
  setUploadRes: (value: SetStateAction<FileUploadResult[]>) => void;
  uploadFileCategory: string;
  allowMultiFileSelect: boolean;
  maximumAllowedFiles: number;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled"> | undefined;
}

const MultiFileDropzoneWrapper: React.FC<MultiFileDropzoneWrapperProps> = ({
  title = "Image",
  uploadRes,
  setUploadRes,
  uploadFileCategory,
  allowMultiFileSelect,
  maximumAllowedFiles,
  dropzoneOptions,
}) => {
  const { edgestore } = useEdgeStore();
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  return (
    <div className="space-y-1">
      <h3 className="font-medium">{title}</h3>
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
        disabled={uploadRes.length >= maximumAllowedFiles}
        dropzoneOptions={{
          accept: {
            "image/*": [],
          },
          multiple: allowMultiFileSelect,
          maxFiles: maximumAllowedFiles,
          ...dropzoneOptions,
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
                    category: uploadFileCategory,
                  },
                  onProgressChange: async (progress: FileState["progress"]) => {
                    updateFileProgress(
                      addedFileState.key,
                      progress,
                      setFileStates
                    );
                    if (progress === 100) {
                      // wait 1 second to set it to complete so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
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
                updateFileProgress(addedFileState.key, "ERROR", setFileStates);
              }
            })
          );
        }}
      />
    </div>
  );
};

export default MultiFileDropzoneWrapper;
