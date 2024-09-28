import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppsProviders from "../components/AppProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pay with ERC20 tokens",
  description: "Project showcasing how to implement payments with ERC20 tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppsProviders>{children}</AppsProviders>
      </body>
    </html>
  );
}
