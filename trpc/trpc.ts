import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.create();

const middleware = t.middleware;

const isAuthenticated = middleware(async (opts) => {
  const { userId } = await auth();
  if (!userId) {
    throw new TRPCError({ message: "Unauthorized", code: "UNAUTHORIZED" });
  }
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return opts.next({
    ctx: {
      userId: userId,
      user: user,
    },
  });
});

export const router = t.router;
export const procedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);
