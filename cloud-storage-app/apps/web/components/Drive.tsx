import React from "react";
import { uploadFiles } from "../utils/uploadThing";
import { NextApiRequest } from "next";

const Drive = () => {
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
      <h3>Documents</h3>
      <input
        type="file"
        accept="application/pdf,application/msword"
        multiple
        onChange={handleFileUpload}
        className="mt-2"
      />
    </div>
  );
};

export default Drive;
