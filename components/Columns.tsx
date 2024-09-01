"use client";

import { deleteS3Files } from "@/actions/delete-s3-file";
import { trpc } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, EllipsisVertical, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export type File = {
  id: string;
  key: string;
  name: string;
  url: string;
  createdAt: string;
  userId: string;
  uploadStatus: "PENDING" | "PROCESSING" | "FAILED" | "SUCCESS" | null;
  updatedAt: string;
};

export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="font-normal"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="w-full flex items-center justify-between">
          <Link
            href={`/dashboard/${file.id}`}
            className="group flex items-center justify-center space-x-4"
          >
            <Image
              src={"/pdf-icon.svg"}
              alt="pdf"
              width={100}
              height={100}
              className="w-8 h-8 sm:w-10 sm:h-10 group-hover:opacity-90"
            />
            <div className="flex-1 truncate">
              <div className="flex items-start space-x-3">
                <p className="truncate group-hover:underline underline-offset-2 group-hover:opacity-90 font-medium text-zinc-900">
                  {file.name.length > 30
                    ? file.name.slice(0, 15) + "..." + file.name.slice(-8)
                    : file.name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="w-full text-right font-normal"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = String(row.getValue("createdAt"));
      const formatted = format(new Date(createdAt), "d MMM, yyyy, h:mm a");

      return <div className="text-center font-normal">{formatted}</div>;
    },
    enableSorting: true,
    sortingFn: (a: Row<File>, b: Row<File>) => {
      return (
        new Date(b.getValue("createdAt")).getTime() -
        new Date(a.getValue("createdAt")).getTime()
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "Chats",
    header: () => <div className="text-right">Chats</div>,
    cell: ({ row }) => {
      return <div className="text-right font-normal">{14}</div>;
    },
  },
  {
    id: "ask",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="text-right">
          <Link
            className="w-full bg-zinc-200 hover:bg-zinc-300 shadow-b hover:shadow-md py-3 px-4 cursor-pointer rounded-md transition-all duration-300"
            href={`/dashboard/${file.id}`}
          >
            Ask
          </Link>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: ({ table }) => {
      const selectedRows = table.getFilteredSelectedRowModel().rows;

      const { toast } = useToast();

      const [currentDeletingFile, setCurrentDeletingFile] = useState<
        string[] | null
      >(null);

      const utils = trpc.useUtils();

      const { mutate: deleteFilesFromDB } = trpc.deleteUserFiles.useMutation({
        onMutate: ({ fileId }) => {
          setCurrentDeletingFile(fileId);
        },
        onSettled: () => {
          setCurrentDeletingFile(null);
        },
        onSuccess: async (files) => {
          utils.getUserFiles.invalidate();
          toast({
            variant: "success",
            title: "File Deleted, Successfully!",
            duration: 2500,
          });
          await deleteS3Files(files.map((obj) => obj.key));
        },
        onError: (err) => {
          toast({
            variant: "destructive",
            title: err.message,
            duration: 2500,
          });
        },
      });

      return (
        <div className="relative w-full text-right flex items-center justify-end">
          {
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={!!currentDeletingFile || !selectedRows.length}
                  aria-label="zoom"
                  variant={"ghost"}
                  size={"sm"}
                  className="gap-1.5 border-none ring-0 focus-visible:ring-0 rounded-full text-zinc-700 font-medium hover:bg-zinc-200"
                >
                  <EllipsisVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 z-30 mr-5 lg:mr-20 bg-white px-2 py-2 shadow-lg border border-1 border-zinc-200 rounded-md ">
                <DropdownMenuItem
                  onClick={() => {
                    deleteFilesFromDB({
                      fileId: selectedRows.map((file) => file.original.id),
                    });
                  }}
                  className="hover:border-none hover:outline-none hover:bg-zinc-200 py-1 px-2 rounded cursor-pointer flex gap-2"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span className="text-red-600">
                    {" "}
                    Delete {selectedRows.length} files
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }

          {selectedRows.length > 0 && (
            <div className="absolute -mt-1 top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full text-white text-center text-xs sm:text-sm bg-green-700">
              {selectedRows.length}
            </div>
          )}
        </div>
      );
    },
    enableHiding: false,
    cell: ({ row }) => {
      const file = row.original;
      const { toast } = useToast();

      const [currentDeletingFile, setCurrentDeletingFile] = useState<
        string | null
      >(null);

      const utils = trpc.useUtils();

      const { mutate: deleteFileFromDB } = trpc.deleteUserFile.useMutation({
        onMutate: ({ fileId }) => {
          setCurrentDeletingFile(fileId);
        },
        onSettled: () => {
          setCurrentDeletingFile(null);
        },
        onSuccess: async (file) => {
          utils.getUserFiles.invalidate();
          toast({
            variant: "success",
            title: "File Deleted, Successfully!",
            duration: 2500,
          });
          await deleteS3Files(file[0].key);
        },
        onError: (err) => {
          toast({
            variant: "destructive",
            title: err.message,
            duration: 2500,
          });
        },
      });
      return (
        <div className="w-full text-right">
          {!currentDeletingFile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="zoom"
                  variant={"ghost"}
                  size={"sm"}
                  className="gap-1.5 border-none ring-0 focus-visible:ring-0 hover:bg-zinc-200"
                >
                  <EllipsisVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 z-30 mr-5 lg:mr-20 bg-white px-2 py-2 shadow-lg border border-1 border-zinc-200 rounded-md ">
                <DropdownMenuItem
                  onClick={() => {
                    deleteFileFromDB({ fileId: file.id });
                  }}
                  className="hover:border-none hover:outline-none hover:bg-zinc-200 py-1 px-2 rounded cursor-pointer flex gap-2"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span className="text-red-600"> Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Loader2 className="text-right animate-spin w-4 h-4 " />
          )}
        </div>
      );
    },
  },
];