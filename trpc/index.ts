import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { procedure, router } from "./trpc";

export const appRouter = router({
  authCallBack: procedure.query(async () => {
    const { userId } = auth();
    if (!userId) {
      throw new TRPCError({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }
    const user = await clerkClient().users.getUser(userId);
    // check if user exsits in database
    const dbUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!dbUser || dbUser.length === 0) {
      await db
        .insert(userTable)
        .values({ id: user.id, email: user.emailAddresses[0].emailAddress });
    }
    return { success: true };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
