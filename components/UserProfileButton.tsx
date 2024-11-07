"use client";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { buttonVariants } from "./ui/button";

const UserProfileButton = () => {
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return (
        <Skeleton
          circle
          height={28}
          width={28}
          count={1}
          style={{ background: "#E0E0E0", transform: "rotate(30deg)" }}
        />
    );
  }
  return (
    <div className="flex gap-2">
      <>
        <SignedOut>
          <Link
            href={"/sign-in"}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            Sign in
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={"/dashboard"}
              className="hidden sm:flex items-center justify-center text-green-600 font-medium sm:text-sm md:text-base hover:underline hover:underline-offset-2"
            >
              Dashboard
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </>
      <SignedOut>
        <Link
          href={"/sign-up"}
          className={cn(
            "text-white",
            buttonVariants({
              size: "sm",
            })
          )}
        >
          Sign up <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </SignedOut>
    </div>
  );
};

export default UserProfileButton;
