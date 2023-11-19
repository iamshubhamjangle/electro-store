import { Progress } from "./progress";
import { FormDescription, FormLabel } from "./form";
import { SingleImageDropzone } from "./single-image-dropzone";

interface SingleImageDropzoneWrapperProps {
  label?: string;
  localImage: File | undefined;
  localImageSetter: any;
  backupImage: string;
  uploadProgress: number;
  width?: number;
  height?: number;
  description?: string;
}

const SingleImageDropzoneWrapper: React.FC<SingleImageDropzoneWrapperProps> = ({
  label = "Image",
  localImage,
  backupImage,
  localImageSetter,
  uploadProgress,
  width = 200,
  height = 200,
  description = "Max-size: 1mb (JPEG & PNG supported)",
}) => {
  return (
    <div className="w-fit">
      <FormLabel>{label}</FormLabel>
      <SingleImageDropzone
        width={width}
        height={height}
        value={localImage || backupImage}
        onChange={(localImage) => localImageSetter(localImage)}
      />
      <Progress value={uploadProgress} />
      <FormDescription>{description}</FormDescription>
    </div>
  );
};

export default SingleImageDropzoneWrapper;
