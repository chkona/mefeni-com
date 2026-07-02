import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "მეფენი.ge — ქართველ მეფეთა ისტორია",
  description:
    "ქართველ მეფეთა, დინასტიების და ბრძოლების ინტერაქტიული ისტორია — ფარნავაზიდან გიორგი XII-მდე.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body className="font-body">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
