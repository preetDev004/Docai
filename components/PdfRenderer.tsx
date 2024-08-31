"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCw,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";
import { z } from "zod";
import PDFFullscreen from "./PDFFullscreen";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
const PdfRenderer = ({ url }: { url: string }) => {
  const { toast } = useToast();

  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);
  const { width, ref } = useResizeDetector();
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const isLoading = renderedScale !== scale; // loading is true when redndered scale does not match

  const pageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });
  type pageValidatorType = z.infer<typeof pageValidator>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<pageValidatorType>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(pageValidator),
  });
  const handlePageSubmit = ({ page }: pageValidatorType) => {
    setCurrPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      {/* custom PDF tools */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-1">
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prevPage) => (prevPage - 1 <= 0 ? 1 : prevPage - 1));
              setValue("page", String(currPage - 1), {
                shouldValidate: true,
              });
            }}
            variant={"ghost"}
            size={"sm"}
            aria-label="previous-page"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
              {...register("page")}
              className={cn(
                "text-xs sm:text-sm w-10 h-6 sm:w-12 sm:h-8 text-center text-zinc-700 transition-all duration-200",
                errors.page &&
                  "outline-none ring-1 sm:ring-2 ring-ring ring-offset-0 ring-red-600 focus-visible:ring-red-600"
              )}
            />
            <p className="text-xs sm:text-sm text-zinc-700 space-x-1">
              <span className="text-zinc-500 ">/</span>
              <span>{numPages ?? "X"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currPage >= numPages}
            onClick={() => {
              setCurrPage((prevPage) =>
                prevPage + 1 >= numPages! ? numPages! : prevPage + 1
              );
              setValue("page", String(currPage + 1), {
                shouldValidate: true,
              });
            }}
            variant={"ghost"}
            size={"sm"}
            aria-label="next-page"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>

        <div className="space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="zoom"
                variant={"ghost"}
                size={"sm"}
                className="gap-1.5 border-none ring-0 focus-visible:ring-0"
              >
                <SearchIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                {scale * 100}% <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 z-30 mr-5 lg:mr-20 bg-white px-2 py-2 shadow-lg border border-1 border-zinc-200 rounded-md ">
              <DropdownMenuItem
                onSelect={() => setScale(1)}
                className="hover:border-none hover:outline-none hover:bg-gray-100 py-1 px-2 rounded cursor-pointer"
              >
                100%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(1.5)}
                className="hover:border-none hover:outline-none hover:bg-gray-100  py-1 px-2 rounded cursor-pointer"
              >
                150%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2)}
                className="hover:border-none hover:outline-none hover:bg-gray-100  py-1 px-2 rounded cursor-pointer"
              >
                200%
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setScale(2.5)}
                className="hover:border-none hover:outline-none hover:bg-gray-100  py-1 px-2 rounded cursor-pointer"
              >
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setRotation((prevRotation) => prevRotation + 90)}
            variant={"ghost"}
            size={"sm"}
            aria-label="rotate 90 degrees"
          >
            <RotateCw className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <PDFFullscreen url={url} />
        </div>
      </div>

      {/* Main PDF */}
      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
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
              {/* Loading for Low Threshold devices if scaling takes time */}
              {isLoading && renderedScale ? (
                // Show previous scale page until onRenderSuccess!
                <Page
                  key={"@" + renderedScale} // To avoid flicker add key to identify/distinguish both the pages
                  rotate={rotation}
                  scale={renderedScale}
                  width={width ? width : 1}
                  pageNumber={
                    currPage > numPages!
                      ? numPages!
                      : currPage < 1
                      ? 1
                      : currPage
                  }
                />
              ) : null}
              {/* Hide this page when scale is changed */}
              <Page
                key={"@" + scale}
                rotate={rotation}
                scale={scale}
                width={width ? width : 1}
                className={cn(isLoading ? "hidden" : "")}
                pageNumber={
                  currPage > numPages! ? numPages! : currPage < 1 ? 1 : currPage
                }
                loading={
                  <div className="flex h-full justify-center">
                    <Loader2 className="my-24 w-4 h-4 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
