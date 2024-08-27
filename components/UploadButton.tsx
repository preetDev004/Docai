"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { db } from "@/drizzle/db";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <Dialog
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
      open={isOpen}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button className="text-white p-1 sm:p-2 size-6 sm:size-auto">
          <PlusIcon className="w-4 h-4" />{" "}
          <span className=" ml-1 hidden sm:block">Upload PDF</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
