import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import Passkey from '@auth/core/passkey';

export default NextAuth({
  providers: [
    Passkey({
      // Your Passkey configuration
      passkey: process.env.PASSKEY_SECRET,
    }),
  ],
  // Additional configuration options
});