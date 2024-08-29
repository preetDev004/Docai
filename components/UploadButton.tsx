"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CloudUpload, File, PlusIcon } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        // clear the interval if file is not uploaded yet when we reach 95 progress.
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        // up the progress by 10
        return prevProgress + 8;
      });
    }, 500);

    return interval;
  };
  return (
    <Dropzone
      accept={{
        "application/pdf": [".pdf"],
      }}
      multiple={false}
      onDrop={ (acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = simulateProgress();

        //TODO: Upload the file

        // progress done when file is uploaded and clear the interval if not yet cleared.
        clearInterval(progressInterval);
        setUploadProgress(100);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className=" border-dashed border-2 transition-all duration-300 border-gray-300 group hover:border-gray-500 h-64 sm:h-80 rounded-lg"
        >
          <div className="flex items-center justify-center w-full h-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50  transition-all duration-300 group-hover:bg-gray-100"
            >
              <div className="flex items-center justify-center flex-col ">
                <CloudUpload className="w-6 h-6  text-zinc-500 group-hover:text-zinc-700 transition-all duration-300 mb-2" />
                <p className="text-center text-sm  text-zinc-700 group-hover:text-zinc-800 transition-all duration-300 mb-1">
                  <span className="font-semibold"> Click to upload</span> or
                  Drag &amp; Drop
                </p>
                {/* Dynamic change the size upon the subscription */}
                <p className="text-xs text-zinc-500 mb-2">PDF (up to 4MB)</p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="px-3 py-2 h-full text-xs sm:text-sm truncate">
                    {acceptedFiles[0].name.length > 30
                      ? acceptedFiles[0].name.slice(0, 15) +
                        "..." +
                        acceptedFiles[0].name.slice(-8)
                      : acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-[10rem] sm:max-w-[14rem] mx-auto">
                  <Progress value={uploadProgress} className="w-full h-1" />
                </div>
              ) : null}
            </label>
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </Dropzone>
  );
};

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
          <PlusIcon strokeWidth={3} className="w-4 h-4" />{" "}
          <span className=" ml-1 hidden sm:block">Upload PDF</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader className=" sr-only">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
