import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/context/providers/Providers";

export const metadata: Metadata = {
  title: "Schedulr Timetable Manager",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
