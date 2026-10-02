'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchDrawer } from './SearchDrawer';
import { QuickViewModal } from '../product/QuickViewModal';

export const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen bg-zinc-50 text-black font-mono antialiased">{children}</div>;
  }


  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchDrawer />
      <QuickViewModal />
    </>
  );
};
