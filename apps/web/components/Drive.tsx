import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const Drive = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate } = trpc.file.upload.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = reader.result as string;
        if (fileData) {
          mutate({
            fileName: file.name,
            fileType: file.type,
            fileData: fileData.split(",")[1] ?? '', // Extract base64 data after the comma
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>Upload a File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Drive;
