import { db } from "@/drizzle/db";
import { fileTable, messageTable } from "@/drizzle/schema";
import { sendMessageValidator } from "@/lib/sendMessageValidator";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { fileId, message } = sendMessageValidator.parse(await req.json());

  const file = db.query.fileTable.findFirst({
    where: and(eq(fileTable.id, fileId), eq(fileTable.userId, userId)),
  });

  if (!file) {
    return new NextResponse("NOT_FOUND", { status: 404 });
  }
  await db.insert(messageTable).values({
    text: message,
    userId: userId,
    fileId: fileId,
    isUserMessage: true,
  });

  // TODO: AI response
  
  return new Response("OK", { status: 200 });
};
