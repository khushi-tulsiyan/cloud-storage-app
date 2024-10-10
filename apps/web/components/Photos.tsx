import React from "react";
import { trpc } from "../utils/trpc";

const Photos = () => {
  const { mutate } = trpc.file.upload.useMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const fileData = reader.result as string | null;
          if (fileData) {
            mutate({
              fileName: file.name,
              fileType: file.type,
              fileData: fileData.split(",")[1] ?? '', // Provide a default value if undefined
            });
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div>
      <h3>Photo Gallery</h3>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="mt-2"
      />
    </div>
  );
};

export default Photos;
