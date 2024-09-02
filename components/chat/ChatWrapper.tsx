"use client";
import React from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { trpc } from "@/app/_trpc/client";
import Loader from "../Loader";
import { ArrowLeft, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId: fileId,
    },
    {
      refetchInterval: (query) => {
        return query.state.data?.status === "SUCCESS" ||
          query.state.data?.status === "FAILED"
          ? false
          : 500;
      },
    }
  );

  // handle loading state
  if (isLoading)
    return (
      <div className="relative w-full min-h-full bg-zinc-50 flex flex-col divide-y divide-zinc-200 justify-between gap-2 -mt-24">
        <div className=" flex-1 items-center justify-center flex flex-col mb-28">
          <Loader
            title="Fetching PDF Chat..."
            description="May take a while to grab the data."
          />
        </div>
        <ChatInput isDisabled />
      </div>
    );
  // handle processing state
  if (data?.status === "PROCESSING") {
    return (
      <div className="relative w-full min-h-full bg-zinc-50 flex flex-col divide-y divide-zinc-200 justify-between gap-2 -mt-24">
        <div className=" flex-1 items-center justify-center flex flex-col mb-28 ">
          <Loader title="Proccesssing PDF..." description="It's almost done." />
        </div>
        <ChatInput isDisabled />
      </div>
    );
  }
  // handle failed state
  if (data?.status === "FAILED") {
    return (
      <div className="relative w-full min-h-full bg-zinc-50 flex flex-col divide-y divide-zinc-200 justify-between gap-2">
        <div className=" flex-1 items-center justify-center flex flex-col mb-28">
          <div className="flex items-center justify-center gap-3 flex-col">
            <XCircle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-center">
                Too many pages!
              </h3>
              <p className="text-sm text-gray-600">
                Up to 5 pages per PDF is allowed on Free Plan.
              </p>
            </div>
            <Link
              className={cn(
                "mt-4 flex items-center gap-2",
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
              href={"/dashboard"}
            >
              <ArrowLeft className="w-4 h-4 " /> <span>Back</span>
            </Link>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    );
  }

  // handle success state
  return (
    <div className="relative w-full min-h-full bg-zinc-50 flex flex-col divide-y divide-zinc-200 justify-between gap-2">
      <div className=" flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>

      <div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWrapper;
