import Navbar from "@/components/Navbar";
import TRPCProvider from "@/components/TRPCProvider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css"
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
  return (
    <ClerkProvider
      signInFallbackRedirectUrl={"/dashboard"}
      signUpFallbackRedirectUrl={"/dashboard"}
      afterMultiSessionSingleSignOutUrl={"/"}
      afterSignOutUrl={"/"}
    >
       <TRPCProvider>
        <html lang="en" className="light">
          <body
            className={cn(
              "min-h-screen font-sans antialiased grainy",
              inter.className
            )}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
