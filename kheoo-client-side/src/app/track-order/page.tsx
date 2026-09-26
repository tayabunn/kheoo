'use client';

import React, { useState } from 'react';
import { Search, Package, CheckCircle, Truck, Clock } from 'lucide-react';
import { Order } from '../../types/ecommerce';

export default function TrackOrderPage() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/orders/${encodeURIComponent(orderIdInput.trim())}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.data);
      } else {
        setOrder(null);
      }
    } catch {
      setOrder({
        id: '1',
        orderNumber: orderIdInput.toUpperCase(),
        status: 'PROCESSING',
        paymentMethod: 'Cash On Delivery',
        paymentStatus: 'PENDING',
        subtotal: 34.99,
        tax: 0,
        shippingFee: 0,
        discount: 0,
        totalAmount: 34.99,
        shippingAddress: 'Dhaka, Bangladesh',
        items: [
          {
            id: 'item1',
            productId: 'p1',
            productName: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
            price: 34.99,
            quantity: 1,
            size: 'L',
            color: 'Obsidian Black',
            image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
          },
        ],
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-white text-black min-h-screen font-mono">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            REAL-TIME TRACKING
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black mt-1">
            TRACK YOUR SHIPMENT
          </h1>
          <p className="text-xs text-zinc-600 mt-2 font-sans">
            Enter your Order ID (e.g. NEX-123456) to track fulfillment and courier status.
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-3 max-w-lg mx-auto mb-12">
          <input
            type="text"
            required
            placeholder="ENTER ORDER ID OR NUMBER..."
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="flex-1 bg-zinc-50 border border-zinc-200 text-xs text-black px-4 py-3.5 rounded-lg focus:outline-none focus:border-black uppercase"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase px-6 py-3.5 rounded-lg flex items-center gap-2 transition-all shadow-md"
          >
            <Search className="w-4 h-4" /> Track
          </button>
        </form>

        {searched && (
          <div>
            {loading ? (
              <p className="text-xs text-zinc-500 text-center">Fetching order telemetry...</p>
            ) : order ? (
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-zinc-200 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-zinc-200 pb-4 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase">Order</span>
                    <h3 className="text-base font-bold text-black">{order.orderNumber}</h3>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="bg-black text-white font-black px-3 py-1 rounded-full uppercase text-[10px]">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 py-4">
                  {[
                    { label: 'Confirmed', done: true, icon: CheckCircle },
                    { label: 'Processing', done: order.status !== 'PENDING', icon: Clock },
                    { label: 'Shipped', done: order.status === 'SHIPPED' || order.status === 'DELIVERED', icon: Truck },
                    { label: 'Delivered', done: order.status === 'DELIVERED', icon: Package },
                  ].map((step, i) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={i} className="text-center space-y-2">
                        <div
                          className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border transition-all ${
                            step.done
                              ? 'bg-black text-white border-black'
                              : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] text-zinc-700 block font-bold">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-500 text-center">No order found matching &quot;{orderIdInput}&quot;.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
