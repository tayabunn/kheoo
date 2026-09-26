'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles, Store, KeyRound } from 'lucide-react';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if already logged in as admin
  useEffect(() => {
    const adminToken = localStorage.getItem('kheoo_admin_token');
    if (adminToken) {
      router.replace(returnUrl);
    }
  }, [router, returnUrl]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both admin email and password.');
      return;
    }

    setLoading(true);

    try {
      // Try backend auth API
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('kheoo_admin_token', 'jwt_admin_session_' + Date.now());
        localStorage.setItem(
          'kheoo_admin_user',
          JSON.stringify({
            name: data.data?.name || 'Super Admin',
            email: data.data?.email || email,
            role: 'admin',
          })
        );
        router.push(returnUrl);
        return;
      }
    } catch {
      // Backend not running or error: Fallback to local admin credentials verification
    }

    // Default built-in Admin verification fallback (admin@kheoo.com / admin123 or any admin keyword)
    if (
      (email.toLowerCase() === 'admin@kheoo.com' && password === 'admin123') ||
      (email.toLowerCase() === 'admin' && password === 'admin')
    ) {
      localStorage.setItem('kheoo_admin_token', 'jwt_admin_session_' + Date.now());
      localStorage.setItem(
        'kheoo_admin_user',
        JSON.stringify({
          name: 'KHEOO Super Admin',
          email: 'admin@kheoo.com',
          role: 'super_admin',
        })
      );
      router.push(returnUrl);
    } else {
      setErrorMsg('Invalid admin credentials. Please use the demo credentials below.');
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@kheoo.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-black font-mono flex flex-col justify-between selection:bg-black selection:text-white p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full py-2">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-black text-white font-black text-sm px-2.5 py-1 uppercase tracking-widest">
            KHEOO
          </span>
          <span className="text-zinc-600 text-xs font-bold uppercase tracking-wider hidden sm:inline">
            • E-Commerce & POS Portal
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs text-zinc-600 hover:text-black uppercase font-bold transition-colors"
        >
          ← Return to Storefront
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white border border-zinc-300 p-6 sm:p-8 relative">
          {/* Header info */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-zinc-100 border border-zinc-300 flex items-center justify-center mx-auto mb-4 text-black">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-black">
              Admin Access
            </h1>
            <p className="text-xs text-zinc-600 mt-1.5 font-sans">
              Sign in to manage omnichannel inventory, web orders & POS registers.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-300 text-red-700 text-xs font-mono flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Admin Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kheoo.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-300 focus:border-black text-xs text-black placeholder:text-zinc-400 focus:outline-none transition-all font-bold"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Admin Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-zinc-50 border border-zinc-300 focus:border-black text-xs text-black placeholder:text-zinc-400 focus:outline-none transition-all font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-zinc-400 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 transition-all active:scale-[0.99] border border-black"
            >
              {loading ? (
                'Authenticating...'
              ) : (
                <>
                  Enter Admin Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>


          {/* Quick Demo Credentials Card */}
          <div className="mt-6 pt-5 border-t border-zinc-200">
            <div className="bg-zinc-50 border border-zinc-200 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                  Quick Demo Credentials:
                </span>
                <p className="text-zinc-800 font-mono text-[11px] mt-0.5">
                  <span className="font-bold">admin@kheoo.com</span> /{' '}
                  <span className="font-bold">admin123</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="px-3 py-1.5 bg-black hover:bg-zinc-800 text-white text-[11px] font-bold transition-colors flex items-center gap-1.5 uppercase"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" /> Autofill
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-[11px] text-zinc-500 font-bold uppercase">
        KHEOO Streetwear Admin & POS Suite • Encrypted Connection
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">Loading Authentication Portal...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}

