// web/src/utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../backend/src/app/api/trpc';

// Add an explicit type annotation for `trpc`
const trpc = createTRPCReact<AppRouter>();

export {trpc};

