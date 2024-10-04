import NextAuth from "next-auth";
import PasskeyProvider from "@teamhanko/passkeys-next-auth-provider";

export default NextAuth({
  providers: [
    PasskeyProvider({
      Name: "Passkey",
      domain: process.env.NEXT_PUBLIC_APP_DOMAIN || "localhost",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub || "";
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
