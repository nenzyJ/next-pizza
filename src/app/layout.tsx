import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/app/globals.css";
import toast, { Toaster } from 'react-hot-toast';
import { Providers } from "@/components/shared/Providers";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pizza DOVAS",
  description: "The best pizza in the universe",
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

