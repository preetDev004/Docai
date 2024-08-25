import { trpc } from "@/app/_trpc/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");

  // type-safe data from api
  const { data, isLoading, isSuccess } = trpc.authCallBack.useQuery();
  useEffect(() => {
    if(isSuccess){
      router.push(origin ? `/${origin}` : '/dashboard')
    }
  }, [isSuccess, data])
  

  return <div>AuthCallback</div>;
};

export default AuthCallback;
