import { withTRPC } from '@trpc/next';
import type { AppType } from 'next/app';
import { AppRouter } from '/Users/INDIA/cloud-storage-app/cloud-storage-app/backend/src/app/api/trpc';
import superjson from 'superjson';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
