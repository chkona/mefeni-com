import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "მეფენი.ge — ყველა მეფე ერთად",
  description:
    "ქართველ მეფეთა,ისტორია — ფარნავაზიდან გიორგი XII-მდე.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('mefeni-theme');
                if (saved === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-body">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}


