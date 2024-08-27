import { db } from "@/drizzle/db";
import { fileTable, userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { privateProcedure, router } from "./trpc";

export const appRouter = router({
  authCallBack: privateProcedure.query(async ({ ctx }) => {
    // check if user exsits in database
    const dbUser = await db.query.userTable.findFirst({
      where: eq(userTable.id, ctx.userId),
    });

    if (!dbUser) {
      await db.insert(userTable).values({
        id: ctx.userId,
        email: ctx.user.emailAddresses[0].emailAddress,
      });
    }
    return { success: true };
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const files = await db
      .select()
      .from(fileTable)
      .where(eq(fileTable.userId, ctx.userId));
    return files;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
