import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve user by ID and generate authentication options
  const options = generateAuthenticationOptions({
    rpID: 'localhost',
    timeout: 60000,
    userVerification: 'preferred',
    allowCredentials: [
      {
        id: 'userPublicKeyID',
        type: 'public-key',
        transports: ['usb', 'ble', 'nfc', 'internal'],
      },
    ],
  });

  // Return the challenge to the frontend
  res.status(200).json(options);
}
