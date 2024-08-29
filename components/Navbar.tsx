import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import UserProfileButton from "./UserProfileButton";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="h-14 flex items-center justify-between border-b border-zinc-200">
          <Link href={"/"} className="flex z-40 font-semibold">
            <span className="sm:text-xl text-green-600">Docai.</span>
          </Link>

          {/* TODO: add mobile navbar... */}

          <div className="hidden sm:flex items-center space-x-4">
            <>
              <Link
                href={"/pricing"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>
            </>
          </div>

          <UserProfileButton />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
