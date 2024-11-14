import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../backend/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { content, userId } = req.body;
    const note = await prisma.note.create({ data: { content, userId } });
    res.status(201).json(note);
  }
}
