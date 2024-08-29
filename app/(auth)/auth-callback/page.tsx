"use client";
import { trpc } from "@/app/_trpc/client";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  // registring the user to the database
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
  }, [error, user]);

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

export default Page;
