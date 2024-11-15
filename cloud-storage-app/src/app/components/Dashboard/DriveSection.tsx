import React, { useState } from "react";
import { uploadFile } from "../../backend/storage"; // Assuming uploadFile is set up in storage/index.ts

export default function DriveSection() {
  const [files, setFiles] = useState<string[]>([]); // Store URLs of uploaded files
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const path = `drive/${file.name}`; // Specify a path for the file in Firebase Storage
      const url = await uploadFile(file, path); // Upload file and get URL
      setFiles((prevFiles) => [...prevFiles, url]); // Add the file URL to the state
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileUpload(event.target.files[0]); // Call file upload function with selected file
    }
  };

  return (
    <div>
      <input type="file" onChange={handleInputChange} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      <div>
        {files.map((url, index) => (
          <div key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              File {index + 1}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
