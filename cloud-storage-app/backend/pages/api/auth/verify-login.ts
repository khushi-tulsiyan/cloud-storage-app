import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verifyLogin(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  try {
    const { verified } = await verifyAuthenticationResponse({
      credential: body,
      expectedChallenge: 'your-server-side-challenge', // This should be a string
      expectedOrigin: 'http://localhost:3000',          // This should be a string
      expectedRPID: 'localhost',                        // This should be a string
      authenticator: {
        credentialPublicKey: 'userCredentialPublicKey', // Ensure this is a correctly formatted string
        credentialID: 'userCredentialID',               // Ensure this is a correctly formatted string
      },
    });

    if (verified) {
      // Set the session or token
      return res.status(200).json({ success: true });
    }

    res.status(400).json({ success: false, message: 'Authentication failed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
