import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '명함 관리 앱',
  description: '명함을 생성하고 관리하는 웹 애플리케이션',
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
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 antialiased dark:from-gray-900 dark:to-gray-800`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-6 pb-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
