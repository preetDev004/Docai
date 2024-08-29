import ChatWrapper from "@/components/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { db } from "@/drizzle/db";
import { fileTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { fileid } = params;
  const { userId } = auth();

  if (!userId) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.query.fileTable.findFirst({
    where: and(eq(fileTable.id, fileid), eq(fileTable.userId, userId)),
  });
  if (!file) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className=" w-full max-w-8xl mx-auto grow lg:flex xl:px-2">
        {/* PDF renderer */}
        <div className="flex-1 xl:flex">
          <div className="px-2.5 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer />
          </div>
        </div>

        {/* ChatWrapper */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default Page;
