"use client";
import { trpc } from "@/app/_trpc/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CloudUpload, File, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useToast } from "./ui/use-toast";

const UploadDropzone = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState<boolean | null>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isFailed, setIsFailed] = useState<boolean | null>(false);

  const { mutate: startDBPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      setUploadProgress(100);
      toast({
        variant: "success",
        title: "File Uploaded, Successfully!",
        duration: 2500,
      });
      router.push(`/dashboard/${file?.id}`);
    },
    onError: () => {
      setUploadProgress(100);
      setIsFailed(true);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Please try again later.",
        duration: 2500,
      });
    },
    retry: 5,
    retryDelay: 500,
  });

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (!res || res.length === 0) {
        setIsFailed(true);
        setUploadProgress(100);
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Please try again later.",
          duration: 2500,
        });
      } else {
        startDBPolling({ key: res[0].key });
      }
    },
    onUploadError: (e) => {
      setIsFailed(true);
      setUploadProgress(100);
      toast({
        variant: "destructive",
        title: "File Uploading Failed!",
        description: e.message,
        duration: 2500,
      });
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });
  return (
    <Dropzone
      accept={{
        "application/pdf": [".pdf"],
      }}
      multiple={false}
      onDrop={async (acceptedFiles) => {
        setIsFailed(false);
        setUploadProgress(0);
        setIsUploading(true);

        //TODO: Upload the file
        await startUpload(acceptedFiles);
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
                    <File
                      className={cn(
                        "w-4 h-4",
                        isFailed ? "text-red-600" : "text-green-600"
                      )}
                    />
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
                  <Progress
                    barColor={isFailed ? "bg-red-600" : ""}
                    value={uploadProgress}
                    className="w-full h-1"
                  />
                </div>
              ) : null}
              {uploadProgress === 100 && (
                <p className="flex items-center justify-center gap-1 mt-2 text-zinc-700">
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin"  />
                  <span className="text-sm">Redirecting...</span>
                </p>
              )}
            </label>
            <input
              {...getInputProps()}
              type="file"
              id="dropzone-file"
              className="hidden"
            />
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
        <Button className="text-white p-1 sm:py-2 sm:px-4 size-6 sm:size-auto">
          <Upload className="w-4 h-4" />{" "}
          <span className=" ml-1 hidden sm:block">Upload</span>
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
