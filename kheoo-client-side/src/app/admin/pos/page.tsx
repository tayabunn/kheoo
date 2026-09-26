'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export default function PosRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard?tab=pos');
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-black font-mono flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-black" />
        <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Opening POS Register in Dashboard...
        </span>
      </div>
    </div>
  );
}
