"use server";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteS3Files = async ({
  key,
  user,
}: {
  key: string | string[];
  user: string;
}) => {
  const { userId } = await auth()
  if (!userId || userId !== user) {
    throw new Error("Unauthorized");
  }
  await utapi.deleteFiles(key);
};
