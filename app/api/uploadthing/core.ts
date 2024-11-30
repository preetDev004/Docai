import { db } from "@/drizzle/db";
import { fileTable } from "@/drizzle/schema";
import { pc } from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { eq } from "drizzle-orm";
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } }, { awaitServerData: true })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db
        .insert(fileTable)
        .values({
          name: file.name,
          key: file.key,
          uploadStatus: "PROCESSING",
          url: file.url,
          userId: metadata.userId,
        })
        .returning({
          id: fileTable.id,
        });
      try {
        const response = await fetch(file.url);
        // get the blob from the response
        const blob = await response.blob();
        // use the blob to create a PDFLoader
        const loader = new PDFLoader(blob);
        // load the PDF and page level information
        const pageLevelDoc = await loader.load();
        // get the number of pages in the PDF (not moew than 5 pages for FREE tier)
        const pageAmt = pageLevelDoc.length;

        // Vectorize and Index the entire pdf
        const pineconeIndex = pc.Index("chat");
        const docEmbeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });
        await PineconeStore.fromDocuments(pageLevelDoc, docEmbeddings, {
          // @ts-ignore
          pineconeIndex,
          namespace: createdFile[0].id,
        });
        await db
          .update(fileTable)
          .set({
            uploadStatus: "SUCCESS",
          })
          .where(eq(fileTable.id, createdFile[0].id));
      } catch (error) {
        await db
          .update(fileTable)
          .set({
            uploadStatus: "FAILED",
          })
          .where(eq(fileTable.id, createdFile[0].id));
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
