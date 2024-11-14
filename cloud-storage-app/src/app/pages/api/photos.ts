import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../../lib/firebase";

const auth = getAuth(app);
const storage = getStorage(app);


const verifyUser = async (token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  return decodedToken.uid;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userId = await verifyUser(token);

    if (req.method === "POST") {
      
      const { file } = req.body;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const storageRef = ref(storage, `photos/${userId}/${file.name}`);
      await uploadBytes(storageRef, Buffer.from(file, "base64"));
      const fileURL = await getDownloadURL(storageRef);

      return res.status(200).json({ message: "File uploaded", fileURL });
    } else if (req.method === "GET") {
      
      const userPhotos = `photos/${userId}/`; 
      const files = await storage.bucket().getFiles({ prefix: userPhotos });
      const fileURLs = await Promise.all(
        files[0].map(async (file) => {
          const url = await getDownloadURL(file);
          return { name: file.name, url };
        })
      );

      return res.status(200).json({ photos: fileURLs });
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
