import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/layout/CartDrawer';
import { SearchDrawer } from '../components/layout/SearchDrawer';
import { QuickViewModal } from '../components/product/QuickViewModal';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="light scroll-smooth">
      <body className={`${inter.className} bg-white text-black antialiased selection:bg-black selection:text-white flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        <CartDrawer />
        <SearchDrawer />
        <QuickViewModal />
      </body>
    </html>
  );
}
