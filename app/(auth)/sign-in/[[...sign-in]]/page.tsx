"use client"
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin")?.replace(/^\//, '') || 'dashboard';


  return <SignIn fallbackRedirectUrl={`/${origin}`} />;
}
