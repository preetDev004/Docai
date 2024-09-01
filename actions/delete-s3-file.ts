"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteS3Files = async (key: string | string[]) => {
  try {
    await utapi.deleteFiles(key);
  } catch (error) {
    console.log(error);
  }
};
