"use client";
import { FolderOpen, Plus } from "lucide-react";
import UploadButton from "./UploadButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { trpc } from "@/app/_trpc/client";
import Loader from "./Loader";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import {format} from "date-fns";

const Dashboard = () => {
  const {
    isError,
    error,
    data: files,
    isLoading,
  } = trpc.getUserFiles.useQuery(undefined, {
    retry: false,
  });
  return (
    <MaxWidthWrapper classname="md:py-10">
      <div className="mt-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-1 md:gap-2">
          <FolderOpen
            stroke="#ffffff"
            fill="#43A047"
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20"
          />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
            My Files{" "}
          </h1>
        </div>
        <UploadButton />
      </div>

      {/* display all user files  */}
      {isLoading ? (
        // <Loader title="Please wait..." description="Grabbing all your files." />
        <div className="mt-24">
          <Skeleton count={3} className="p-2 my-2" height={50} />
        </div>
      ) : files && files?.length !== 0 ? (
        <ul className="mt-8 gid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (f1, f2) =>
                new Date(f1.updatedAt).getTime() -
                new Date(f2.updatedAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow trasition-all duration-200 hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 w-full flex items-center justify-between space-x-6">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600" />
                    <div className="flex-1 truncate">
                      <div className="flex items-start space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {format(new Date(file.createdAt), "dd MMMM yyyy")}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="w-full mt-24 flex flex-col items-center gap-4 text-center">
          <Image
            src={"/add-files.svg"}
            alt="No Data"
            width={180}
            height={180}
          />
          <div className="flex flex-col gap-1 mt-2">
            <h1 className="font-semibold text-lg md:text-xl text-zinc-800">
              Empty here!
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Let&apos;s upload your first .PDF
            </p>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Dashboard;
