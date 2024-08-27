"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  // type-safe data from api
  const { isSuccess, error, isError, isLoading } = trpc.authCallBack.useQuery(
    undefined,
    {
      retry: false,
    }
  );
  useEffect(() => {
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      router.push(origin ? `/${origin}` : "/dashboard");
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading || !isSuccess && (
        <div className="w-full mt-24 flex justify-center">
          <div className="flex items-center gap-2 flex-col">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-800" />

            <h3 className="text-xl font-semibold text-center">
              Setting up your account...
            </h3>
            <p className=" text-gray-600">
              You will be redirected automatically.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
