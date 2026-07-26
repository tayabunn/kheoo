'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotal,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = getSubtotal();
  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setCouponLoading(true);
    setCouponError('');

    try {
      const res = await fetch('http://localhost:5000/api/v1/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inputCoupon, subtotal }),
      });

      const data = await res.json();
      if (data.success) {
        applyCoupon(data.data.code, data.data.discountAmount);
        setInputCoupon('');
      } else {
        setCouponError(data.message || 'Invalid coupon code');
      }
    } catch {
      if (inputCoupon.trim().toUpperCase() === 'KHEOO10') {
        applyCoupon('KHEOO10', subtotal * 0.1);
        setInputCoupon('');
      } else {
        setCouponError('Invalid promo code');
      }
    } finally {
      setCouponLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-black shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-sm font-bold tracking-widest uppercase">Your Cart</h2>
              <span className="bg-black text-white text-xs px-2.5 py-0.5 rounded-full font-black">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress */}
          <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-200">
            <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-zinc-700">
                <Truck className="w-3.5 h-3.5 text-black" />
                {remainingForFreeShipping > 0 ? (
                  <>Add <strong className="text-black">${remainingForFreeShipping.toFixed(2)}</strong> for FREE Shipping</>
                ) : (
                  <span className="text-black font-black">✓ FREE Shipping Unlocked</span>
                )}
              </span>
              <span className="text-zinc-500">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-black mb-1 uppercase">Cart is Empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mb-6 font-sans">
                  Explore our heavyweight streetwear drops.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-black text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="relative w-20 h-24 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-black line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-black transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-600">
                        <span className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">
                          Size: {item.size}
                        </span>
                        <span className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">
                          {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-200 rounded-md bg-zinc-50">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-zinc-600 hover:text-black">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs text-black font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-zinc-600 hover:text-black">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-black">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 space-y-4">
              {couponCode ? (
                <div className="flex items-center justify-between bg-zinc-100 border border-zinc-300 px-3 py-2 rounded-lg text-xs">
                  <span className="flex items-center gap-1.5 text-black font-bold">
                    <Tag className="w-3.5 h-3.5 text-black" /> CODE: {couponCode} (-${discountAmount.toFixed(2)})
                  </span>
                  <button onClick={removeCoupon} className="text-zinc-500 hover:text-black underline text-[10px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (KHEOO10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 bg-white border border-zinc-200 text-xs text-black px-3 py-2 rounded-lg focus:outline-none focus:border-black uppercase"
                  />
                  <button type="submit" disabled={couponLoading} className="bg-black hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2 rounded-lg">
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-red-500">{couponError}</p>}

              <div className="space-y-1.5 text-xs text-zinc-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-black font-bold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-black">{subtotal >= 50 ? 'FREE' : '$5.00'}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span className="text-black text-base">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>SSL Encrypted Checkout • 7-Day Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
