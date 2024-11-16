import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../../lib/firebase";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";

// Initialize Firebase Admin
if (!admin.apps.length) {
  initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const auth = getAuth(app);

// Verify ID Token
const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw new Error("Invalid token");
  }
};

// Authentication API Handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    try {
      const decodedToken = await verifyIdToken(token);
      return res.status(200).json({
        message: "Token verified successfully",
        uid: decodedToken.uid,
      });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
