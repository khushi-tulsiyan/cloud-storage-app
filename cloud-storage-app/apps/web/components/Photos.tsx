import React from "react";
import { uploadFiles } from "../utils/uploadThing";
import { NextApiRequest } from "next";

const Photos = () => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await uploadFiles({
        files,
        params: {},
        onError: console.error,
        onUpload: (res: NextApiRequest) => console.log("Uploaded: ", res),
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
