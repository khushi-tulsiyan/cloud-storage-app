import React, { useState } from 'react';
import { trpc } from '../../../../backend/src/app/api/trpc';

const DocumentUpload = () => { 
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Ensure correct usage of tRPC mutation
  const uploadDocument = trpc.file.uploadDocument.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('No file selected');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileData = fileReader.result?.toString() || '';
      try {
        // Call the tRPC mutation to upload the document
        const result = await uploadDocument.mutateAsync({
          filename: file.name,
          fileData: fileData,
        });

        if (result.success) {
          setMessage(`File uploaded successfully: ${result.filename}`);
        }
      } catch (error) {
        setMessage(`Failed to upload file: ${(error as Error).message}`);
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploadDocument.isLoading}>
        {uploadDocument.isLoading ? 'Uploading...' : 'Upload Document'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DocumentUpload;
