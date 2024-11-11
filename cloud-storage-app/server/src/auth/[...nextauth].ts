import NextAuth, { NextAuthOptions } from "next-auth";
// Replace this with the actual import if WebAuthn is supported directly or an OAuth provider
import { CustomWebAuthnProvider } from "../path-to-your-custom-provider"; 
import { User } from "../../models/User"; // Adjust to your actual user model

// Extend the User and Session types to include the 'id' property
interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CustomWebAuthnProvider({
      name: "Passkey Authentication", // Name of the provider
      id: "webauthn",
      credentials: {},
      async authorize(credentials) {
        const user = await getUserByCredential(credentials);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page route
  },
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        (session.user as SessionUser).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

async function getUserByCredential(credentials: any) {
  // Adjust to your database model or logic for fetching the user by credential
  const user = await User.findOne({ where: { passkeyId: credentials?.passkeyId } });
  return user;
}

export default NextAuth(authOptions);
