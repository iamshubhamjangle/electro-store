"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react"; // Assuming the X icon from lucide-react is available
import { Card, CardContent, CardFooter } from "./card";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

type ImageDropzoneHook = {
  DropzoneComponent: JSX.Element;
  dropzoneImages: File[];
  setDropzoneImages: Dispatch<SetStateAction<File[]>>;
};

const useImageDropzone = (
  multiple: boolean,
  label: string = "Images"
): ImageDropzoneHook => {
  const [dropzoneImages, setDropzoneImages] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast.error("The files you were trying to upload were rejected.");
      }

      if (acceptedFiles.length > 0) {
        if (!multiple) {
          setDropzoneImages([acceptedFiles[0]]);
        } else {
          const uniqueFiles = acceptedFiles.filter(
            (file) =>
              !dropzoneImages.some(
                (existingFile) => existingFile.name === file.name
              )
          );
          setDropzoneImages([...dropzoneImages, ...uniqueFiles]);
        }
      }
    },
    [dropzoneImages, multiple]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple,
    onDrop,
  });

  const removeImage = (index: number) => {
    const updatedImages = [...dropzoneImages];
    updatedImages.splice(index, 1);
    setDropzoneImages(updatedImages);
  };

  const DropzoneComponent = (
    <div>
      <h6 className="my-2 text-sm font-medium">{label}</h6>
      <Card>
        <div
          {...getRootProps({
            className: "dropzone p-4 bg-secondary rounded-md",
          })}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-muted-foreground">
            Drag and drop {multiple ? "images" : "image"} here, or click to
            select images
          </p>
        </div>
        <div className="p-4 space-y-4">
          {dropzoneImages.length > 0 && (
            <div>
              <div className="flex flex-wrap">
                {dropzoneImages.map((image, index) => (
                  <div
                    key={index}
                    style={{ position: "relative", marginRight: "10px" }}
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      width={100}
                      height={100}
                      alt={`Preview ${index}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      type="button"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                        zIndex: 1,
                      }}
                    >
                      <X size={18} color="red" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            Supported images: JPG/PNG. Max Size: 1MB.
          </div>
        </div>
      </Card>
    </div>
  );

  return { DropzoneComponent, dropzoneImages, setDropzoneImages };
};

export default useImageDropzone;
