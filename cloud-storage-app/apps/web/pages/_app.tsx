import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Trpc from "../../backend/pages/api/trpc/[trpc]";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "",
      }),
    ],
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <Component {...pageProps} />
        </trpc.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
