import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["hebrew"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "שעה של פוקוס",
  description: "מחברים בין ילידי מפונים למורים פרטים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head></head>
      <body
        className={`${open_sans.className} max-w-[100svw]  antialiased  text-normal relative`}
      >
        {children}
      </body>
      </html>
  );
}
