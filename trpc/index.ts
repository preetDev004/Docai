import { db } from "@/drizzle/db";
import { fileTable, userTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
  deleteUserFile: privateProcedure
    .input(
      z.object({
        fileId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const file = await db
        .delete(fileTable)
        .where(
          and(eq(fileTable.id, input.fileId), eq(fileTable.userId, ctx.userId))
        )
        .returning();

      if (!file) {
        throw new TRPCError({ message: "NOT_FOUND", code: "NOT_FOUND" });
      }
      return file;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
