"use client";
import { Document, Page, pdfjs } from "react-pdf";
import React from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
const PdfRenderer = ({ url }: { url: string }) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      {/* custom PDF tools */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-center">
        <div className="flex items-center gap-1.5">tool bar</div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div
          ref={ref}
        >
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
            className="max-h-full"
            file={url}
          >
            <Page width={width ? width : 1} className="w-auto" pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
