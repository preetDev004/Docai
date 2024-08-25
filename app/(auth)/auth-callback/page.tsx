import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");
  return <div>AuthCallback</div>;
};

export default AuthCallback;
