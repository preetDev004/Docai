"use client";
import { Expand, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import SimpleBar from "simplebar-react";
import { useResizeDetector } from "react-resize-detector";
import { Document, Page } from "react-pdf";
import { useToast } from "./ui/use-toast";

const PDFFullscreen = ({ url }: { url: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [numPages, setNumPages] = useState<number>();
  const { width, ref } = useResizeDetector();
  const { toast } = useToast();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant={"ghost"} size={"sm"} aria-label="Full Screen">
          <Expand className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex h-full justify-center">
                  <Loader2 className="my-24 w-4 h-4 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  variant: "destructive",
                  title: "Error loading PDF",
                  description: "Please try again later.",
                  duration: 2500,
                });
              }}
              onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
              className=""
              file={url}
            >
              {numPages &&
                new Array(numPages).fill(0).map((_, index) => (
                  <Page
                    key={index}
                    width={width ? width : 1}
                    className="w-auto"
                    pageNumber={index + 1}
                  />
                ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PDFFullscreen;
