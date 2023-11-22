import { X } from "lucide-react";
import Image from "next/image";

interface PreviewImageProps {
  index: number;
  image: File | string;
  alt?: string;
  removeImage: (index: number) => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  index,
  image,
  alt = "Image",
  removeImage,
}) => {
  let imageUrl = "";
  if (typeof image === "string") {
    imageUrl = image;
  } else {
    imageUrl = URL.createObjectURL(image);
  }

  return (
    <div className="relative mr-3 w-fit">
      <Image
        src={imageUrl}
        width={100}
        height={100}
        alt={alt}
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
  );
};

export default PreviewImage;
