import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return (
    <SessionProvider session={session}>
      <trpc.Provider client={trpcClient} queryClientConfig={{}}>
        <Component {...pageProps} />
      </trpc.Provider>
    </SessionProvider>
  );
}

export default MyApp;
