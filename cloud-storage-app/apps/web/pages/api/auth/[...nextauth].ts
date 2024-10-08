import NextAuth from "next-auth";
import { PasskeyProvider } from "@teamhanko/passkeys-next-auth-provider";

export default NextAuth({
  providers: [
    PasskeyProvider({
      tenant: {
        credential: {
          type: "public-key",          
        },
        config: {
          baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://example.com",
          tenantId: process.env.NEXT_PUBLIC_TENANT_ID || "your-tenant-id",
        },
        user: (userId: string) => ({
          credentials: async () => {
            return [
              {
                id: "credential-id",
                name: "User Credential",
                public_key: "public-key-data",
                attestation_type: "direct",
                aaguid: "aaguid-value", // Add aaguid
                created_at: "2023-10-01T00:00:00Z", // Add created_at
                last_used_at: null, // Optional
                transports: ["usb", "nfc"],
                backup_eligible: false, // Add backup_eligible
                backup_state: false, // Add backup_state
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
                allowCredentials: [],  // Matches expected empty array
                userVerification: "required",
              },
            };
          },
          finalize: async (credential: { id: string; type: string; } & { rawId: string; clientExtensionResults?: Record<string, never>; response: any; }) => {
            return {
              token: "generated-token",  // Add a token field as expected
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
              token: "generated-token",  // Return token instead of success flag
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
