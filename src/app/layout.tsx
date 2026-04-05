import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', //tailwind와 연동할 css 변수명
});

export const metadata: Metadata = {
  title: 'template',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} ${inter.variable}`}>
      <body className="antialiased font-inter">{children}</body>
    </html>
  );
}
