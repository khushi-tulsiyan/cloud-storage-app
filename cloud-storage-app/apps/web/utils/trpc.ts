import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../backend/src/trpc/router";

const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>();

export { trpc};