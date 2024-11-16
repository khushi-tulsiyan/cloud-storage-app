import React, { useState, useEffect } from "react";

const DriveSection = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState<File | null>(null);

  useEffect(() => {
    
    const fetchFiles = async () => {
      try {
        const res = await fetch("/api/drive", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFiles(data.files);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleFileUpload = async () => {
    if (!fileContent || !fileName) {
      alert("Please select a file and provide a name.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result?.toString().split(",")[1];

      if (!base64File) return;

      try {
        const res = await fetch("/api/drive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({
            file: base64File,
            name: fileName,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setFiles((prev) => [...prev, { name: fileName, url: data.fileURL }]);
          setFileName("");
          setFileContent(null);
        } else {
          alert("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    reader.readAsDataURL(fileContent);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Files</h1>
      {loading ? (
        <p>Loading your files...</p>
      ) : (
        <div>
          {files.length > 0 ? (
            <ul>
              {files.map((file: { name: string; url: string }) => (
                <li key={file.name}>
                  <a href={file.url} className="text-blue-500">
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files available.</p>
          )}
        </div>
      )}

      <div className="mt-6">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border p-2"
          placeholder="Enter file name"
        />
        <input
          type="file"
          onChange={(e) => setFileContent(e.target.files?.[0] ?? null)}
          className="border p-2 mt-2"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default DriveSection;
