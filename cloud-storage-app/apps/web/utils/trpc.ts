import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../backend/src/trpc/index";
import { createTRPCRouter } from '../../backend/pages/api/trpc/[trpc]'; // Ensure correct import
import { fileRouter } from "../../backend/src/trpc/fileRouter";

export const appRouter = createTRPCRouter({
    file: fileRouter, // Make sure this is included
    // Add other routers here
});
  
  


const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>();

export { trpc};