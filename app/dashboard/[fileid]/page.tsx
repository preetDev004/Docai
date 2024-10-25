import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/drizzle/db";
import { fileTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{
    fileid: string;
  }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  const { fileid } = params;
  const { userId } = await auth();

  if (!userId) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.query.fileTable.findFirst({
    where: and(eq(fileTable.id, fileid), eq(fileTable.userId, userId)),
  });
  if (!file) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className=" w-full max-w-[1400px] mx-auto grow lg:flex xl:px-2">
        {/* PDF renderer */}
        <div className="flex-1 px-2.5 py-6 sm:px-6">
          <PdfRenderer url={file.url} />
        </div>

        {/* ChatWrapper */}
        <div className="shrink-0 lg:flex lg:flex-[0.85] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
