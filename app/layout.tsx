import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudinary Showcase - Display Your Media Content",
  description:
    "A platform to showcase and manage your media content using AI capabilities of Cloudinary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark">
        <body
          className={`${inter.className} bg-base-300 min-h-screen flex flex-col`}
        >
          <main className="flex-grow">{children}</main>
          <Notification />
        </body>
      </html>
    </ClerkProvider>
  );
}
