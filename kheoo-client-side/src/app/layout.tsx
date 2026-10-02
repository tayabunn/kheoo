import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConditionalLayout } from '../components/layout/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'KHEOO — Premium Streetwear & Drop Shoulder T-Shirts',
  description: 'Heavyweight 240+ GSM drop shoulder T-shirts inspired by Anime, Marvel, and DC sagas. Premium 100% combed cotton streetwear apparel based in Dhaka, Bangladesh.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth overflow-x-hidden max-w-full w-full" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black antialiased selection:bg-black selection:text-white flex flex-col min-h-screen overflow-x-hidden max-w-full w-full relative`}
        suppressHydrationWarning
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}

