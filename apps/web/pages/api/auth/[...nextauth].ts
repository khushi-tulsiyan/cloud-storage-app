import NextAuth from "next-auth";
import { PasskeyProvider } from "@teamhanko/passkeys-next-auth-provider";

export default NextAuth({
  providers: [
    PasskeyProvider({
      tenant: {
        config: {
          baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://example.com",
          tenantId: process.env.NEXT_PUBLIC_TENANT_ID || "your-tenant-id",
        },
        credential: (credentialId: string) => ({
          remove: async () => {
            // Implement the logic to remove the credential
            console.log(`Removing credential with ID: ${credentialId}`);
            throw new Error("Credential removal not implemented");
          },
        }),
        user: (userId: string) => ({
          credentials: async () => {
            return [
              {
                id: "credential-id",
                name: "User Credential",
                public_key: "public-key-data",
                attestation_type: "direct",
                aaguid: "aaguid-value",
                created_at: "2023-10-01T00:00:00Z",
                last_used_at: null,
                transports: ["usb", "nfc"],
                backup_eligible: false,
                backup_state: false,
              },
            ];
          },
        }),
        jwks: async () => {
          return {
            keys: [
              {
                kty: "RSA",
                alg: "RS256",
                use: "sig",
                kid: "key-id",
                n: "public-key-modulus",
                e: "AQAB",
              },
            ],
          };
        },
        login: {
          initialize: async () => {
            return {
              publicKey: {
                challenge: "challenge-string",
                rpId: "example.com",
                allowCredentials: [],
                userVerification: "required",
              },
            };
          },
          finalize: async (credential: { id: string; type: string; } & { rawId: string; clientExtensionResults?: Record<string, never>; response: any; }) => {
            return {
              token: "generated-token",
            };
          },
        },
        registration: {
          initialize: async (data: { userId: string; username: string; icon?: string | null; displayName?: string | null }) => {
            return {
              publicKey: {
                rp: {
                  id: "example.com",
                  name: "Example RP",
                },
                user: {
                  id: "base64-encoded-user-id",
                  name: data.username,
                  displayName: data.displayName || data.username,
                },
                challenge: "challenge-string",
                pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                timeout: 60000,
              },
            };
          },
          finalize: async (credential: { id: string; type: string; rawId: string; response: any; transports?: string[]; }) => {
            return {
              token: "generated-token",
            };
          },
        },
      },
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