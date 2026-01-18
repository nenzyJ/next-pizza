import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Suspense } from "react";


export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; 
}>) {
  return (
    <>
    <Suspense>
      <Header />
    </Suspense>
      <main className="min-h-screen">
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}