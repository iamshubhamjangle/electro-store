import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Nav } from "@/app/(client)/_components/nav";
import { Footer } from "@/app/(client)/_components/footer";
import Providers from "@/app/(client)/_components/providers/providers";

const opensans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electro Store - Best place on 🌍 to buy electronics!",
  description: "Electro Store - Best place on 🌍 to buy electronics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={opensans.className}>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
