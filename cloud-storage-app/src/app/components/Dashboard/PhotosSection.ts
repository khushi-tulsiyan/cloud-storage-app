import { useEffect, useState } from "react";
import { storage, uploadFile } from "../../backend/storage/index";

export default function PhotosSection() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const url = await uploadFile(file, `photos/${file.name}`);
      setPhotos((prev) => [...prev, url]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        {photos.map((url) => (
          <img key={url} src={url} alt="Uploaded photo" />
        ))}
      </div>
    </div>
  );
}
