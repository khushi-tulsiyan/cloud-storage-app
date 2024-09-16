import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verifyRegistration(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  try {
    const { verified, registrationInfo } = await verifyRegistrationResponse({
      credential: body,
      expectedChallenge: 'your-server-side-challenge',
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
    });

    if (verified) {
      // Save registration info (public key, userID) to DB
      return res.status(200).json({ success: true });
    }

    res.status(400).json({ success: false, message: 'Verification failed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
