import { auth } from "@clerk/nextjs/server";
import { procedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  authCallBack: procedure.query(() => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }

    // check if user exsits in database

    
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
