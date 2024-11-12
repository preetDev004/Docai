"use client";
import { trpc } from "@/app/_trpc/client";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentUsingSearchParams />
    </Suspense>
  );
};

export default Page;

const ComponentUsingSearchParams = () => {
  const router = useRouter();
  const { user } = useUser();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  // type-safe data from api
  const { error, isSuccess, isLoading } = trpc.authCallBack.useQuery(
    undefined,
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push(`/sign-in?origin=${origin || "dashboard"}`);
    }
    if (user?.id) {
      if (origin) {
        router.back();
      } else {
        router.push("/dashboard");
      }
    }
  }, [error, user, router, origin]);
  return (
    <>
      {isLoading ||
        (!isSuccess && (
          <Loader
            title="Setting up your account..."
            description="You will be redirected automatically."
          />
        ))}
    </>
  );
};