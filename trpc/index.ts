import { db } from "@/drizzle/db";
import { fileTable, userTable } from "@/drizzle/schema";
import { and, eq, inArray } from "drizzle-orm";
import { privateProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCClientError } from "@trpc/client";
import { deleteS3Files } from "@/actions/delete-s3-file";

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

      if (!file || file.length === 0) {
        throw new TRPCClientError("File NOT_FOUND");
      }
      await deleteS3Files({
        key: file.map((obj) => obj.key),
        user: ctx.userId,
      });
      return file;
    }),
  deleteUserFiles: privateProcedure
    .input(
      z.object({
        fileId: z.string().array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const file = await db
        .delete(fileTable)
        .where(
          and(
            inArray(fileTable.id, input.fileId),
            eq(fileTable.userId, ctx.userId)
          )
        )
        .returning();

      if (!file || file.length === 0) {
        throw new TRPCClientError("File NOT_FOUND");
      }

      await deleteS3Files({
        key: file.map((obj) => obj.key),
        user: ctx.userId,
      });
      return file;
    }),
  getFile: privateProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const file = await db.query.fileTable.findFirst({
        where: and(
          eq(fileTable.key, input.key),
          eq(fileTable.userId, ctx.userId)
        ),
      });

      if (!file) {
        throw new TRPCClientError("NOT_FOUND");
      }
      return file;
    }),
  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.query.fileTable.findFirst({
        where: and(
          eq(fileTable.id, input.fileId),
          eq(fileTable.userId, ctx.userId)
        ),
      });
      if (!file) {
        // return as const to prevent TS error and know status is from enum type and can't be any other value.
        return { status: "PENDING" as const };
      }
      return { status: file.uploadStatus };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
