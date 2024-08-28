"use client";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin")?.replace(/^\//, '') || 'dashboard';

  return <SignUp signInFallbackRedirectUrl={`/${origin}`} />;
}
