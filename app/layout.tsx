import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Classroom OS — Orphanage Management",
  description: "A classroom-first management system for orphanages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-nunito)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
