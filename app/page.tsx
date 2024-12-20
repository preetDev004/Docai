import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/Badge";

export default function Home() {

  return (
    <>
      <MaxWidthWrapper classname="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        {/* badge */}
        <Badge />

        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chat with your <br />{" "}
          <span className="text-green-600">Documents</span> in seconds.
        </h1>

        <p className="mt-5 max-w-prose text-zinc-700 sm:text-xl">
          Docai allows you to have conversations with any .PDF document. Simply
          upload your file and start asking questions right away.
        </p>

        <Link
          href={"/dashboard"}
          // target="_blank"
          className={cn(
            "text-white",
            buttonVariants({
              size: "lg",
              className: "mt-5",
            })
          )}
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
      {/* value proposition section */}
      <div className="relative isolate">
        {/* decorational */}
        <div
          aria-hidden="true"
          className="mt-5 lg:mt-10 pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-pulse "
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8 drop-shadow-md">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                className="rounded-md p-2 sm:p-8 md:p-20 ring-1 ring-gray-900/10 shadow-2xl bg-white"
                src={"/dashboard-preview.jpg"}
                width={1364}
                height={866}
                quality={100}
                alt="product-preview"
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-5 lg:mt-10 pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-pulse"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-24 mb-40 max-w-5xl sm:mt-44">
        <div className="sm:mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-gray-900 text-4xl sm:text-5xl">
              Starting chatting in minutes
            </h2>
            <p className="mt-4 sm:text-md md:text-lg text-gray-600">
              Interacting with your PDF files is easier than ever with Docai.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="m-4 sm:my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0 ">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                You can start with our free tier or choose our{" "}
                <Link
                  className="underline underline-offset-2 text-green-700 font-semibold"
                  href={"/pricing"}
                >
                  PRO
                </Link>{" "}
                plan.
              </span>
            </div>
          </li>

          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Step 2</span>
              <span className="text-xl font-semibold">
                Upload your .PDF file
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make it ready for you to chat
                with.
              </span>
            </div>
          </li>

          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Step 3</span>
              <span className="text-xl font-semibold">
                Start asking questions
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s really that simple. Try out Docai today!
              </span>
            </div>
          </li>
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8 ">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                className="rounded-md p-2 sm:p-8 md:p-20 ring-1 ring-gray-900/10 shadow-2xl bg-white"
                src={"/file-upload-preview.jpg"}
                width={1419}
                height={732}
                quality={100}
                alt="product-preview"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
