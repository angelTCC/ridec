import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header />

      {children}

      <Footer />
    </Providers>
  );
}
