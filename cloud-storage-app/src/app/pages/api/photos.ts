import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { app } from "../../../../lib/firebase";

const auth = getAuth(app);
const storage = getStorage(app).bucket();

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
      const { file, fileName } = req.body;

      if (!file || !fileName) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileBuffer = Buffer.from(file, "base64");
      const destination = `photos/${userId}/${fileName}`;
      const fileObject = storage.file(destination);

      await fileObject.save(fileBuffer, { contentType: 'image/jpeg' });

      const fileURL = `https://storage.googleapis.com/${storage.name}/${destination}`;
      return res.status(200).json({ message: "File uploaded", fileURL });

    } else if (req.method === "GET") {
      const [files] = await storage.getFiles({ prefix: `photos/${userId}/` });
      const fileURLs = files.map(file => ({
        name: file.name,
        url: `https://storage.googleapis.com/${storage.name}/${file.name}`
      }));

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
