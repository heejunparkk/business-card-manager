import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "명함 관리 앱",
  description: "명함을 생성하고 관리하는 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen`}
      >
        <ThemeProvider>
          <Header />
          <main className="pt-6 pb-16">{children}</main>
          <footer
            className="text-center text-gray-400 dark:text-gray-500 text-sm py-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm"
            style={{ backgroundColor: "var(--footer-bg)" }}
          >
            <p>
              &copy; {new Date().getFullYear()} 명함 관리 앱 - 모든 권리 보유
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
