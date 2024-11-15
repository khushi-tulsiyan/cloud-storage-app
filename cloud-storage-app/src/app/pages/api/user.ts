import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, url, filePath } = req.body;

    if (!userId || !url || !filePath) {
      return res.status(400).json({ error: 'Missing required fields: userId, url, or filePath' });
    }

    try {
      const newFile = await prisma.file.create({
        data: {
          userId,
          url,
          filePath,
        },
      });

      return res.status(201).json(newFile);
    } catch (error) {
      console.error('Error creating file:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
