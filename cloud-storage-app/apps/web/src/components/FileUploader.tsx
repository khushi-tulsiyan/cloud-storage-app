import { trpc } from '../utils/trpc';
import { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const uploadFile = trpc.upload.uploadFile.useMutation();

  const handleUpload = async () => {
    if (!file) return;
    const fileData = await file.text(); // Get the file content as text
    await uploadFile.mutateAsync({ filename: file.name, fileData });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUploader;
