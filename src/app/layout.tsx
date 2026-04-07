import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

const ridiBatang = localFont({
  src: '../../public/fonts/RIDIBatang.woff2',
  variable: '--font-ridiBatang',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: '윤동주 포트폴리오',
  description: '윤동주 프론트엔드 개발자 포트폴리오',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} ${inter.variable} ${ridiBatang.variable} scroll-smooth`}>
      <body className="antialiased font-inter">
        <div className="root">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
