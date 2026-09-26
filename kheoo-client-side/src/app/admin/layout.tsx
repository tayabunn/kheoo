'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingBag,
  LogOut,
  ExternalLink,
  Menu,
  X,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'overview' : 'overview';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ name?: string; email?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';
  const isPosPage = pathname === '/admin/pos';

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('kheoo_admin_token');
    const userStr = localStorage.getItem('kheoo_admin_user');

    if (!token && !isLoginPage) {
      setIsAuthenticated(false);
      router.replace(`/admin/login?returnUrl=${encodeURIComponent(pathname || '/admin/dashboard')}`);
    } else {
      setIsAuthenticated(true);
      if (userStr) {
        try {
          setAdminUser(JSON.parse(userStr));
        } catch {}
      }
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('kheoo_admin_token');
    localStorage.removeItem('kheoo_admin_user');
    setIsAuthenticated(false);
    router.replace('/admin/login');
  };

  // If on login page, just render children directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-black" />
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Verifying Admin Session...
          </span>
        </div>
      </div>
    );
  }

  // If unauthenticated and not on login page, wait for redirect
  if (!isAuthenticated) {
    return null;
  }

  // If on POS terminal page, let POS render without sidebar for maximum cashier efficiency
  if (isPosPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'pos',
      label: '⚡ POS Terminal',
      href: '/admin/dashboard?tab=pos',
      icon: Store,
      badge: 'COUNTER',
    },
    {
      id: 'products',
      label: 'Products & Inventory',
      href: '/admin/dashboard?tab=products',
      icon: Package,
    },
    {
      id: 'orders',
      label: 'Orders & POS Sales',
      href: '/admin/dashboard?tab=orders',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-black font-mono flex selection:bg-black selection:text-white">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-white border-r border-zinc-200 p-5 sticky top-0 h-screen">
        <div>
          {/* Brand Header with KHEOO Logo linking to Homepage */}
          <div className="pb-5 mb-5 border-b border-zinc-200">
            <Link href="/" title="Back to Homepage" className="flex items-center gap-3 group">
              <Image
                src="/assets/logo/Kheoo-logo.png"
                alt="KHEOO Logo"
                width={56}
                height={56}
                className="w-12 h-12 object-contain group-hover:opacity-80 transition-opacity"
                priority
              />
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-1.5 group-hover:text-zinc-600 transition-colors">
                  KHEOO
                  <span className="text-[9px] bg-black text-white px-1.5 py-0.5 font-mono">ADMIN</span>
                </h2>
                <span className="text-[10px] text-zinc-500 font-sans font-bold block">
                  Omnichannel Control
                </span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-2 block">
              Core Modules
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase transition-all ${
                    isActive
                      ? 'bg-black text-white font-black'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 uppercase ${
                        isActive ? 'bg-white text-black' : 'bg-black text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom User Info & Actions */}
        <div className="pt-5 border-t border-zinc-200 space-y-2.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-bold text-zinc-600 hover:text-black hover:bg-zinc-100 border border-zinc-200 transition-colors uppercase"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Storefront
            </span>
          </Link>

          <div className="bg-zinc-100 p-3 border border-zinc-200 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-black text-black truncate uppercase">
                {adminUser?.name || 'Super Admin'}
              </p>
              <p className="text-[10px] text-zinc-500 truncate font-mono">
                {adminUser?.email || 'admin@kheoo.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-zinc-500 hover:text-black hover:bg-zinc-200 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-zinc-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-zinc-600 hover:text-black hover:bg-zinc-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden sm:inline">
                MANAGEMENT PORTAL /{' '}
              </span>
              <span className="text-xs font-black uppercase text-black">CONTROL CENTER</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-zinc-100 border border-zinc-300 text-black text-[11px] px-2.5 py-1 font-bold hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ONLINE
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-bold transition-colors border border-zinc-300 hidden sm:flex items-center gap-1.5 uppercase"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex">
            <div className="w-64 bg-white border-r border-zinc-200 p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-zinc-200">
                  <Link
                    href="/"
                    onClick={() => setSidebarOpen(false)}
                    title="Back to Homepage"
                    className="flex items-center gap-2 group"
                  >
                    <Image
                      src="/assets/logo/Kheoo-logo.png"
                      alt="KHEOO Logo"
                      width={44}
                      height={44}
                      className="w-10 h-10 object-contain group-hover:opacity-80 transition-opacity"
                      priority
                    />
                    <span className="text-xs font-black uppercase text-black group-hover:text-zinc-600 transition-colors">
                      KHEOO ADMIN
                    </span>
                  </Link>
                  <button onClick={() => setSidebarOpen(false)} className="text-zinc-600 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase transition-all ${
                          isActive
                            ? 'bg-black text-white font-black'
                            : 'text-zinc-700 hover:bg-zinc-100 hover:text-black'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-5 border-t border-zinc-200 space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2 text-xs text-zinc-600 hover:text-black py-1 uppercase font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Storefront
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-black text-white text-xs font-bold uppercase flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-zinc-50 min-h-[calc(100vh-64px)] overflow-x-hidden text-black">
          {children}
        </main>
      </div>
    </div>
  );
}
