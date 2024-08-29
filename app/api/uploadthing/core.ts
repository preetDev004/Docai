import { db } from "@/drizzle/db";
import { fileTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(() => {
      const { userId } = auth();
      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(fileTable).values({
        name: file.name,
        key: file.key,
        uploadStatus: "SUCCESS",
        url: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
