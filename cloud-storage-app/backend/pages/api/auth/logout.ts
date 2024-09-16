import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    // Destroy session
    res.redirect('/auth/logout');
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
}
