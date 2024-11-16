import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { email } = req.body;
    const user = await prisma.user.create({ data: { email } });
    res.status(201).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
