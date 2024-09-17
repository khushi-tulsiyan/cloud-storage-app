// components/DocumentUpload.tsx
import { useState, useEffect } from 'react';
import { UploadButton } from '@uploadthing/react';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);

  // Fetch documents using tRPC
  const { data: docs, refetch } = trpc.file.getFilesByUserId.useQuery({ userId: "userId" });

  useEffect(() => {
    if (docs) {
      setDocuments(docs);
    }
  }, [docs]);

  // Handle file upload success
  const handleUploadSuccess = async (files) => {
    await refetch(); // Refetch the document list after successful upload
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Document Upload</h2>

      {/* Upload Button */}
      <UploadButton
        onClientUploadComplete={(res) => {
          handleUploadSuccess(res);
        }}
        onUploadError={(err) => {
          console.error('Upload failed:', err);
        }}
      />

      {/* Document List */}
      <h3 className="text-lg mt-4">Uploaded Documents</h3>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id} className="p-2 border border-gray-200">
            {doc.filename} - {doc.size} KB
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentUpload;
