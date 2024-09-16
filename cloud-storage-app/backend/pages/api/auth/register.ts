import { generateRegistrationOptions } from '@simplewebauthn/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default function register(req: NextApiRequest, res: NextApiResponse) {
  // Check if user exists, if not create new user entry
  // Generate registration options (public key challenge)
  const options = generateRegistrationOptions({
    rpName: 'Cloud Storage Name',
    rpID: 'localhost',
    userID: 'user-123',
    userName: 'testuser',
    timeout: 60000,
    attestationType: 'indirect',
  });

  // Return the challenge to the frontend
  res.status(200).json(options);
}
