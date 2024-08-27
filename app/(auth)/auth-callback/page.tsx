"use client";
import { trpc } from "@/app/_trpc/client";
import Loader from "@/components/Loader";
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
      {isLoading ||
        (!isSuccess && (
          <Loader
            title="Setting up your account..."
            description=" You will be redirected automatically."
          />
        ))}
    </>
  );
};

export default Page;
