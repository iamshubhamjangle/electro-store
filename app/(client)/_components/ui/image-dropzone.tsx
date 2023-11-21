"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react"; // Assuming the X icon from lucide-react is available
import { Card, CardContent } from "./card";
import { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

type ImageDropzoneHook = {
  DropzoneComponent: JSX.Element;
  images: File[];
};

const useImageDropzone = (multiple: boolean): ImageDropzoneHook => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast.error("The files you were trying to upload were rejected.");
      }

      if (acceptedFiles.length > 0) {
        if (!multiple) {
          setImages([acceptedFiles[0]]);
        } else {
          const uniqueFiles = acceptedFiles.filter(
            (file) =>
              !images.some((existingFile) => existingFile.name === file.name)
          );
          setImages([...images, ...uniqueFiles]);
        }
      }
    },
    [images, multiple]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple,
    onDrop,
  });

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const DropzoneComponent = (
    <div>
      <h6 className="my-2 text-sm font-medium">Images</h6>
      <Card>
        <div
          {...getRootProps({
            className: "dropzone p-4 bg-secondary rounded-md",
          })}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-muted-foreground">
            Drag and drop images here, or click to select images
          </p>
        </div>
        {images.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap mt-5">
              {images.map((image, index) => (
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
                      margin: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={() => removeImage(index)}
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
          </CardContent>
        )}
      </Card>
    </div>
  );

  return { DropzoneComponent, images };
};

export default useImageDropzone;
