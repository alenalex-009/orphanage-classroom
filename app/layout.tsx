import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Classroom OS",
  description: "Gamified Classroom Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: { borderRadius: "1rem", fontWeight: "700" },
          }}
        />
      </body>
    </html>
  );
}
