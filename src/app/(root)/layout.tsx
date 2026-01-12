import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";


export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}