'use client';

import React, { useState } from 'react';
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products'>('overview');

  return (
    <div className="py-12 bg-white text-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-zinc-200 pb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              MANAGEMENT PORTAL
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black mt-1">
              KHEOO ADMIN DASHBOARD
            </h1>
          </div>
          <span className="bg-black text-white border border-black text-xs px-3 py-1 rounded-full font-black uppercase">
            ● System Status: Online
          </span>
        </div>

        <div className="flex gap-3 mb-8 border-b border-zinc-200 pb-4">
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'orders', label: 'Customer Orders' },
            { id: 'products', label: 'Products & Inventory' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-black text-white font-black shadow'
                  : 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 font-mono">
          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-bold uppercase">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-black text-black">$14,250.00</p>
            <span className="text-[10px] text-emerald-600 font-bold">+18.5% from last month</span>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-bold uppercase">Total Orders</span>
              <Package className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-black text-black">284</p>
            <span className="text-[10px] text-emerald-600 font-bold">+12 new today</span>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-bold uppercase">Active Customers</span>
              <Users className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-black text-black">1,890</p>
            <span className="text-[10px] text-emerald-600 font-bold">+45 this week</span>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-bold uppercase">Avg. Order Value</span>
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-black text-black">520.00 TK</p>
            <span className="text-[10px] text-zinc-500">2.4 items / cart</span>
          </div>
        </div>

        {/* Dynamic Table Card */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6 overflow-hidden">
          <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
            Recent Customer Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {[
                  { id: 'KHE-849201', name: 'Alice Smith', status: 'PROCESSING', pm: 'Cash On Delivery', total: '$34.99', date: '2026-07-26' },
                  { id: 'KHE-849198', name: 'Bob Johnson', status: 'DELIVERED', pm: 'bKash', total: '$72.98', date: '2026-07-25' },
                  { id: 'KHE-849195', name: 'Charlie Lee', status: 'SHIPPED', pm: 'Nagad', total: '$38.99', date: '2026-07-25' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50">
                    <td className="py-3 px-4 font-bold text-black">{row.id}</td>
                    <td className="py-3 px-4">{row.name}</td>
                    <td className="py-3 px-4">
                      <span className="bg-black text-white border border-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{row.pm}</td>
                    <td className="py-3 px-4 font-bold text-black">{row.total}</td>
                    <td className="py-3 px-4 text-zinc-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
