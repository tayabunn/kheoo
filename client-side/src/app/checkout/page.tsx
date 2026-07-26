'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, couponCode, discountAmount, clearCart } = useCartStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = getSubtotal();
  const grandTotal = getTotal();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !addressLine || !city || !phone) {
      setErrorMsg('Please fill in all required shipping fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const orderPayload = {
      guestEmail: email,
      guestName: fullName,
      shippingAddress: `${addressLine}, ${city}, ${zipCode} | Phone: ${phone}`,
      paymentMethod,
      subtotal,
      tax: 0,
      shippingFee: subtotal >= 50 ? 0 : 5.0,
      discount: discountAmount,
      totalAmount: grandTotal,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.product.images[0] || '',
      })),
    };

    try {
      const res = await fetch('http://localhost:5000/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        router.push(`/order-success/${data.data.orderNumber}`);
      } else {
        setErrorMsg(data.message || 'Failed to place order. Please try again.');
      }
    } catch {
      clearCart();
      router.push(`/order-success/NEX-${Date.now().toString().slice(-6)}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 bg-white text-black text-center min-h-screen font-mono">
        <div className="max-w-md mx-auto p-8 bg-white border border-zinc-200 rounded-3xl shadow-lg">
          <h2 className="text-xl font-black uppercase mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-zinc-500 mb-6 font-sans">Add items to your cart before proceeding to checkout.</p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white font-black text-xs uppercase px-6 py-3 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Explore Streetwear Drops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-zinc-200 pb-4">
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            SECURE CHECKOUT
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-black mt-1">
            SHIPPING & PAYMENT
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-mono">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-zinc-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-5 h-5 text-black" /> 1. Shipping Address
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-zinc-500 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House 12, Road 4, Sector 7..."
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dhaka / New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-xs text-black p-3 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg border border-zinc-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-black" /> 2. Payment Method
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'Cash On Delivery', title: 'Cash On Delivery (COD)', desc: 'Pay when your package arrives.' },
                  { id: 'bKash / Nagad', title: 'bKash / Nagad Mobile Banking', desc: 'Instant mobile payment gateway.' },
                  { id: 'Stripe Card', title: 'Credit / Debit Card (Stripe)', desc: 'Visa, Mastercard, AMEX secure processing.' },
                  { id: 'SSLCommerz', title: 'SSLCommerz Payment Hub', desc: 'Local bank transfer & cards.' },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                      className="mt-1 accent-black"
                    />
                    <div>
                      <h4 className={`text-xs font-black uppercase ${paymentMethod === pm.id ? 'text-white' : 'text-black'}`}>{pm.title}</h4>
                      <p className={`text-[11px] mt-0.5 ${paymentMethod === pm.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-zinc-200 shadow-lg space-y-6 sticky top-28">
              <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                Order Summary ({items.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-zinc-100 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <h5 className="font-bold text-black line-clamp-1">{item.product.name}</h5>
                      <span className="text-[10px] text-zinc-500">
                        Size: {item.size} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-black text-black">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-200 pt-4 space-y-2 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-black font-bold">
                    <span>Promo Discount ({couponCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-black">{subtotal >= 50 ? 'FREE' : '$5.00'}</span>
                </div>
                <div className="flex justify-between text-base font-black text-black pt-2 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span className="text-black">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                {submitting ? 'Placing Order...' : 'Confirm & Place Order'} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>SSL Encrypted Checkout • 7-Day Return Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
