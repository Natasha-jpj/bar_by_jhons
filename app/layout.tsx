import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bar by John - Premium Mobile Bar Service',
  description: 'Curated cocktails and classy service for every occasion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        {/* Centered Header with Logo */}
        <header className="site-header fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-center transition-opacity duration-500">
          <Link href="/" className="inline-block">
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <Image
                src="/logooo.png" // Your logo file
                alt="Bar by John"
                fill
                className="object-contain hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
          </Link>
        </header>

        {/* Main Content */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}