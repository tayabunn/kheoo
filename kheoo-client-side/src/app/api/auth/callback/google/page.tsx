'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    async function processGoogleAuth() {
      try {
        // 1. Extract access_token from URL hash (#access_token=...) or query param
        let accessToken: string | null = null;

        if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          accessToken = hashParams.get('access_token');
        }

        if (!accessToken) {
          const searchParams = new URLSearchParams(window.location.search);
          accessToken = searchParams.get('access_token');
        }

        if (!accessToken) {
          throw new Error('No access token received from Google.');
        }

        // 2. Fetch user profile from Google
        const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!googleRes.ok) {
          throw new Error('Failed to retrieve Google user profile.');
        }

        const profile = await googleRes.json();

        // 3. Send profile to backend MongoDB auth API
        const backendRes = await fetch('http://localhost:5000/api/v1/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            googleId: profile.sub,
            name: profile.name || profile.email.split('@')[0],
            email: profile.email,
            avatar: profile.picture || '',
          }),
        });

        const backendData = await backendRes.json();

        const userData = backendData.success
          ? backendData.data
          : {
              name: profile.name || profile.email.split('@')[0],
              email: profile.email,
              avatar: profile.picture || '',
              role: 'customer',
            };

        // 4. Save session locally
        localStorage.setItem('kheoo_user', JSON.stringify(userData));
        setStatus('success');

        // 5. Redirect to homepage
        setTimeout(() => {
          router.push('/');
        }, 1200);
      } catch (err: any) {
        console.error('Google OAuth callback error:', err);
        setErrorText(err.message || 'Authentication failed. Please try again.');
        setStatus('error');
      }
    }

    processGoogleAuth();
  }, [router]);

  return (
    <div className="py-24 bg-white text-black min-h-screen flex items-center justify-center font-mono">
      <div className="w-[90%] max-w-md mx-auto p-8 bg-white border border-zinc-200 text-center shadow-lg">
        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-black" />
            <h3 className="text-base font-black uppercase tracking-wider">Verifying Google Account...</h3>
            <p className="text-xs text-zinc-500 font-sans">
              Authenticating with KHEOO security protocol. Please wait.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black uppercase tracking-wider">Authentication Successful!</h3>
            <p className="text-xs text-zinc-600 font-sans">
              Welcome to KHEOO. Redirecting to store...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-black uppercase tracking-wider text-red-600">Sign In Failed</h3>
            <p className="text-xs text-zinc-600 font-sans">{errorText}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 inline-block bg-black text-white font-bold text-xs uppercase px-6 py-3 hover:bg-zinc-800 transition-colors"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
