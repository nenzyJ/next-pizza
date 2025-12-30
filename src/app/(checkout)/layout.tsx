import { Container } from "@/components/shared";
import { Header } from "@/components/shared/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza - Cart",
  description: "Your cart items and checkout process",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
