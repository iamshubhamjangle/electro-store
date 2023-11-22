import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";
import { FileState } from "@/component/multi-file-dropzone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function updateFileProgress(
  key: string,
  progress: FileState["progress"],
  setFileStates: Dispatch<SetStateAction<FileState[]>>
) {
  setFileStates((fileStates) => {
    const newFileStates = structuredClone(fileStates);
    const fileState = newFileStates.find((fileState) => fileState.key === key);
    if (fileState) {
      fileState.progress = progress;
    }
    return newFileStates;
  });
}
