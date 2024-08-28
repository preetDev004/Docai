import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { fileid } = params;

  const {userId} = auth()

  if(!userId) redirect(`/auth-callback?origin=dashboard/${fileid}`)
  return <div>{fileid}</div>;
};

export default Page;
