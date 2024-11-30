import { NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin"
import Navbar from "@/components/Navbar";
import TRPCProvider from "@/components/TRPCProvider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import 'simplebar-react/dist/simplebar.min.css';
import { Toaster } from "@/components/ui/toaster";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docai",
  description: "Chat with your doccuments in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (typeof Promise.withResolvers === "undefined") {
  //   // @ts-expect-error This does not exist outside of polyfill which this is doing
  //   Promise.withResolvers = function () {
  //     let resolve, reject;
  //     const promise = new Promise((res, rej) => {
  //       resolve = res;
  //       reject = rej;
  //     });
  //     return { promise, resolve, reject };
  //   };
  // }
  return (
      <ClerkProvider 
        afterMultiSessionSingleSignOutUrl={"/"}
        afterSignOutUrl={"/"}
      >
    <html lang="en" className="light">
    <body
      suppressHydrationWarning
      className={cn(
        "min-h-screen font-sans antialiased grainy",
        inter.className
      )}
    >
        <TRPCProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </TRPCProvider>
    </body>
  </html>
      </ClerkProvider>
  );
}
