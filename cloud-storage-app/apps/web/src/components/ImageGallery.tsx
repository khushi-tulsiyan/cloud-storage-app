import { useState } from 'react';
import { trpc } from '../utils/trpc';

export default function ImageGallery() {
  const [file, setFile] = useState<File | null>(null);
  const uploadMutation = trpc.file.upload.useMutation();

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadMutation.mutate({ file: reader.result as string, userId: 'user-123' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-gallery">
      <input type="file" onChange={(e) => setFile(e.target.files![0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
