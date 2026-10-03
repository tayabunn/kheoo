'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  Send,
  RotateCcw,
  ShoppingBag,
  Minimize2,
  Maximize2,
  Flame,
  Shirt,
  Ruler,
  Truck,
  Tag,
  Check,
  Copy,
  Square,
  ArrowDown,
  ExternalLink,
  Plus,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '../../store/useCartStore';
import { useQuickViewStore } from '../../store/useQuickViewStore';
import { Product } from '../../types/ecommerce';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolResult?: any;
  isStreaming?: boolean;
  isError?: boolean;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { icon: Flame, label: '🔥 Top Anime Drops', query: 'Show me the trending anime drop shoulder t-shirts' },
  { icon: Ruler, label: '📏 Size & Fit Advice', query: "I am 5'10, what size drop shoulder tee should I buy?" },
  { icon: Truck, label: '🚚 Track Order', query: 'Track my order KH-8921' },
  { icon: Tag, label: '🏷️ Promo Coupons', query: 'Give me active discount promo codes' },
  { icon: Shirt, label: '💎 240 GSM Fabric', query: 'Tell me about the 240+ GSM combed cotton fabric quality' },
];

export const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const cartAddItem = useCartStore((state) => state.addItem);
  const cartApplyCoupon = useCartStore((state) => state.applyCoupon);
  const openCart = useCartStore((state) => state.openCart);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Welcome to KHEOO AI Stylist!**\n\nI'm your personal streetwear shopping assistant.\n\nAsk me anything or pick a quick option:\n• 🔥 **Explore Anime, Marvel & DC Heavyweight Drops**\n• 📏 **Get Your Exact Oversized Fit Sizing**\n• 🚚 **Live Order Tracking (Dhaka & Nationwide)**\n• 🏷️ **Claim 10% or 20% OFF Promo Vouchers**\n\nHow can I elevate your style today?`,
      timestamp: new Date(),
    },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isAutoScrollEnabled = useRef<boolean>(true);

  // Scroll detection to manage auto-pin vs jump button
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 60;
    isAutoScrollEnabled.current = isAtBottom;
    setShowScrollBottom(!isAtBottom);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    setShowScrollBottom(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, scrollToBottom]);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Real Token-by-Token Streaming Message Sender
  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isGenerating) return;

    const userMessageId = Date.now().toString();
    const assistantMessageId = (Date.now() + 1).toString();

    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date(),
    };

    const initialAssistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    if (!queryText) setInput('');
    setIsGenerating(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const apiMessages = [...messages, userMessage]
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages.length > 0 ? apiMessages : [{ role: 'user', content: textToSend }],
          stream: true,
        }),
        signal: abortController.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Server returned ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let toolData: any = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const rawChunk = decoder.decode(value, { stream: true });
        const lines = rawChunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.replace(/^data:\s*/, '').trim();
            if (!jsonStr) continue;

            try {
              const parsed = JSON.parse(jsonStr);

              if (parsed.type === 'tool') {
                toolData = parsed.data;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId ? { ...msg, toolResult: toolData } : msg
                  )
                );
              } else if (parsed.type === 'token') {
                accumulatedText += parsed.content;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: accumulatedText, isStreaming: true }
                      : msg
                  )
                );
                if (isAutoScrollEnabled.current) {
                  scrollToBottom(false);
                }
              } else if (parsed.type === 'done') {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: accumulatedText, isStreaming: false }
                      : msg
                  )
                );
              }
            } catch {
              // ignore parse errors for partial chunks
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: msg.content ? `${msg.content} *(Stopped)*` : '*(Generation stopped)*',
                  isStreaming: false,
                }
              : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content:
                    '⚠️ Unable to complete request. Please check your connection or tap **Retry** below.',
                  isStreaming: false,
                  isError: true,
                }
              : msg
          )
        );
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
      if (isAutoScrollEnabled.current) {
        scrollToBottom(true);
      }
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleRetryLastMessage = (failedMsgId: string) => {
    const msgIndex = messages.findIndex((m) => m.id === failedMsgId);
    if (msgIndex > 0) {
      const prevUserMsg = messages[msgIndex - 1];
      if (prevUserMsg && prevUserMsg.role === 'user') {
        setMessages((prev) => prev.filter((m) => m.id !== failedMsgId));
        handleSendMessage(prevUserMsg.content);
      }
    }
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    if (isGenerating) handleStopGeneration();
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `✨ Chat reset! How can I assist with your streetwear drip today?`,
        timestamp: new Date(),
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parseMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100 font-semibold">$1</strong>')
      .replace(
        /`(.*?)`/g,
        '<span class="bg-[#a3d633]/10 text-[#a3d633] px-1.5 py-0.5 rounded text-[12px] font-mono border border-[#a3d633]/20 font-semibold">$1</span>'
      );
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
        const cleanLine = trimmed.replace(/^[\s•\-\*]+/, '').trim();
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-zinc-300 text-xs sm:text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3d633] mt-2 shrink-0" />
            <span className="flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(cleanLine) }} />
          </div>
        );
      }

      if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
        const heading = trimmed.replace(/^#+/, '').trim();
        return (
          <h4 key={idx} className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#a3d633] mt-2.5 mb-1 flex items-center gap-1.5">
            <span>{heading}</span>
          </h4>
        );
      }

      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p
          key={idx}
          className="my-1 text-zinc-300 leading-relaxed text-xs sm:text-sm"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(trimmed) }}
        />
      );
    });
  };

  // ==========================================
  // GENERATIVE UI COMPONENT RENDERERS
  // ==========================================

  const renderToolComponent = (tool: any) => {
    if (!tool) return null;

    // 1. Tool: search_products (Interactive Product Carousel)
    if (tool.tool === 'search_products' && Array.isArray(tool.products)) {
      return (
        <div className="mt-3 pt-2.5 border-t border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
            <span className="flex items-center gap-1.5 text-[#a3d633] font-bold">
              <Shirt className="w-3.5 h-3.5" /> Recommended Drop Shoulder Tees:
            </span>
            <Link href="/shop" className="text-zinc-400 hover:text-white flex items-center gap-1">
              View All <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tool.products.map((p: Product) => (
              <div
                key={p.id}
                style={{ borderRadius: '12px' }}
                className="bg-black border border-zinc-800 p-2.5 flex flex-col justify-between"
              >
                <div className="flex gap-2.5 items-start">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 bg-zinc-900 shrink-0 overflow-hidden relative rounded-md">
                    <Image
                      src={p.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{p.name}</h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">240 GSM Combed Cotton</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-[#a3d633] font-mono">${p.price.toFixed(2)}</span>
                      {p.oldPrice && (
                        <span className="text-[10px] text-zinc-500 line-through font-mono">
                          ${p.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-2.5 pt-2 border-t border-zinc-900">
                  <button
                    onClick={() => openQuickView(p)}
                    style={{ borderRadius: '6px' }}
                    className="flex-1 py-1.5 px-2 text-[10px] font-bold bg-zinc-900 text-zinc-200 border border-zinc-800 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> Quick View
                  </button>
                  <button
                    onClick={() => {
                      cartAddItem(p, 'L', 'Obsidian Black', 1);
                      openCart();
                    }}
                    style={{ borderRadius: '6px' }}
                    className="flex-1 py-1.5 px-2 text-[10px] font-bold bg-[#a3d633] text-black flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 2. Tool: recommend_size (Sizing Recommendation Card)
    if (tool.tool === 'recommend_size') {
      return (
        <div
          style={{ borderRadius: '12px' }}
          className="mt-3 p-3 bg-zinc-950 border border-[#a3d633]/40 space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#a3d633] font-mono">
              <Ruler className="w-3.5 h-3.5" /> Tailored Fit Recommendation
            </div>
            <span className="px-2 py-0.5 text-[11px] font-black bg-[#a3d633] text-black rounded font-mono">
              Size {tool.recommendedSize}
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">{tool.advice}</p>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div className="bg-zinc-900 p-2 border border-zinc-800 rounded">
              <span className="text-zinc-500 block text-[9px] uppercase">Chest Measurement</span>
              <span className="text-white font-bold">{tool.chestInches}&quot; (Inches)</span>
            </div>
            <div className="bg-zinc-900 p-2 border border-zinc-800 rounded">
              <span className="text-zinc-500 block text-[9px] uppercase">Body Length</span>
              <span className="text-white font-bold">{tool.lengthInches}&quot; (Inches)</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-900 flex justify-between items-center">
            <span>{tool.gsmInfo}</span>
            <Link href="/size-guide" className="text-[#a3d633] hover:underline">
              Full Size Chart →
            </Link>
          </div>
        </div>
      );
    }

    // 3. Tool: track_order (Order Tracking Timeline)
    if (tool.tool === 'track_order') {
      return (
        <div
          style={{ borderRadius: '12px' }}
          className="mt-3 p-3.5 bg-zinc-950 border border-zinc-800 space-y-3 font-sans"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">Order Tracking</span>
              <span className="text-xs font-bold text-white font-mono">{tool.orderId}</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#a3d633]/15 text-[#a3d633] border border-[#a3d633]/30 rounded font-mono">
              {tool.status}
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-2 py-1 font-mono text-[11px]">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Check className="w-3.5 h-3.5 text-[#a3d633] shrink-0" />
              <span>1. Order Confirmed &amp; Bio-Washed</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Check className="w-3.5 h-3.5 text-[#a3d633] shrink-0" />
              <span>2. Quality Tested (240+ GSM Checked)</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#a3d633] font-bold">
              <Truck className="w-3.5 h-3.5 text-[#a3d633] shrink-0 animate-pulse" />
              <span>3. Handed to {tool.courier}</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-600">
              <div className="w-3.5 h-3.5 rounded-full border border-zinc-700 shrink-0" />
              <span>4. Final Delivery ({tool.shippingCity})</span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
            <span>Code: {tool.trackingCode}</span>
            <span className="text-[#a3d633] font-bold">ETA: {tool.estimatedDelivery}</span>
          </div>
        </div>
      );
    }

    // 4. Tool: apply_coupon (Interactive Coupon Card)
    if (tool.tool === 'apply_coupon') {
      const isClaimed = appliedCoupon === tool.code;

      return (
        <div
          style={{ borderRadius: '12px' }}
          className="mt-3 p-3.5 bg-gradient-to-r from-[#a3d633]/10 via-zinc-950 to-[#a3d633]/5 border border-[#a3d633]/40 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#a3d633] font-mono">
              <Tag className="w-3.5 h-3.5 text-[#a3d633]" /> Exclusive Drop Shoulder Voucher
            </div>
            <span className="text-xs font-black text-[#a3d633] font-mono">
              {tool.discountPercent}% OFF
            </span>
          </div>

          <p className="text-xs text-zinc-300">{tool.message}</p>

          <div className="flex items-center gap-2 pt-1">
            <code className="px-3 py-1.5 bg-black border border-[#a3d633]/60 text-[#a3d633] font-mono font-bold text-xs rounded">
              {tool.code}
            </code>
            <button
              onClick={() => {
                cartApplyCoupon(tool.code, tool.discountPercent);
                setAppliedCoupon(tool.code);
                openCart();
              }}
              disabled={isClaimed}
              style={{ borderRadius: '6px' }}
              className="flex-1 py-1.5 px-3 bg-[#a3d633] text-black font-bold text-xs flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
            >
              {isClaimed ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Voucher Applied!
                </>
              ) : (
                'Apply to Bag ➔'
              )}
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Floating Launcher Trigger (Mobile responsive positioning & sizing) */}
      <div className={`fixed z-50 ${isOpen ? 'inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-10 sm:right-10 flex flex-col items-end' : 'bottom-4 right-4 sm:bottom-10 sm:right-10'}`}>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              style={{ borderRadius: '9999px' }}
              className="relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 bg-black text-white border-2 border-zinc-700 ring-2 ring-[#a3d633]/60 ring-offset-2 ring-offset-black cursor-pointer select-none"
              aria-label="Open KHEOO AI Stylist Assistant"
            >
              {/* Stable subtle ambient backlight aura */}
              <span
                style={{ borderRadius: '9999px' }}
                className="absolute -inset-1 bg-gradient-to-r from-[#a3d633]/20 via-transparent to-[#a3d633]/20 blur-sm pointer-events-none"
              />

              {/* Centered pure white KHEOO Logo */}
              <Image
                src="/assets/logo/Kheoo-logo.png"
                alt="KHEOO Logo"
                width={36}
                height={36}
                className="w-7 h-7 sm:w-9 sm:h-9 object-contain brightness-0 invert relative z-10"
              />

              {/* Stable #a3d633 Online Status Micro-Badge */}
              <span
                style={{ borderRadius: '9999px' }}
                className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-black border-2 border-zinc-900 flex items-center justify-center z-20"
                title="AI Stylist Online"
              >
                <span
                  style={{ borderRadius: '9999px' }}
                  className="w-1.5 h-1.5 bg-[#a3d633] inline-block"
                />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* AI Chatbot Floating Window (Full Mobile Viewport Fit) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: 1,
                y: 0,
                height: isMinimized ? '58px' : 'min(640px, calc(100dvh - 16px))',
              }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.18 }}
              style={{ borderRadius: '16px' }}
              className="w-full sm:w-[460px] md:w-[490px] max-w-[520px] bg-[#0c0c10] border border-zinc-800 flex flex-col overflow-hidden text-zinc-200 font-sans z-50 relative shadow-2xl"
            >
              {/* Header */}
              <div className="px-3.5 py-3 sm:px-5 sm:py-3.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ borderRadius: '8px' }}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1 shrink-0 overflow-hidden"
                  >
                    <Image
                      src="/assets/logo/Kheoo-logo.png"
                      alt="KHEOO Logo"
                      width={28}
                      height={28}
                      className="w-6 h-6 object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold tracking-wide text-white uppercase font-mono truncate">
                        KHEOO AI Stylist
                      </span>
                      <span
                        style={{ borderRadius: '9999px' }}
                        className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold bg-[#a3d633]/15 text-[#a3d633] border border-[#a3d633]/30 shrink-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a3d633] mr-1 inline-block" />
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-zinc-400">
                  <button
                    onClick={clearChat}
                    title="Reset Chat"
                    style={{ borderRadius: '6px' }}
                    className="p-1.5 sm:p-2 text-zinc-400 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    title={isMinimized ? 'Expand' : 'Minimize'}
                    style={{ borderRadius: '6px' }}
                    className="p-1.5 sm:p-2 text-zinc-400 transition cursor-pointer"
                  >
                    {isMinimized ? <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close (Esc)"
                    style={{ borderRadius: '6px' }}
                    className="p-1.5 sm:p-2 text-zinc-400 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages Scroll Feed with aria-live for accessibility */}
                  <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    aria-live="polite"
                    aria-label="Conversation messages"
                    className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 text-xs sm:text-sm bg-[#0c0c10] relative"
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          style={{
                            borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                          }}
                          className={`max-w-[92%] sm:max-w-[90%] p-3 sm:p-3.5 text-xs sm:text-sm relative ${
                            msg.role === 'user'
                              ? 'bg-[#a3d633] text-black font-semibold'
                              : msg.isError
                              ? 'bg-red-950/40 border border-red-800/80 text-red-200'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                          ) : (
                            <div className="relative">
                              {/* If assistant is still thinking before first token */}
                              {msg.isStreaming && !msg.content && (
                                <div className="flex items-center gap-2 text-zinc-400 py-1">
                                  <div className="w-4 h-4 border-2 border-[#a3d633] border-t-transparent rounded-full animate-spin" />
                                  <span className="text-xs">Consulting KHEOO streetwear engine...</span>
                                </div>
                              )}

                              {renderFormattedContent(msg.content)}

                              {/* Generative UI Tool Calling Result Component */}
                              {msg.toolResult && renderToolComponent(msg.toolResult)}

                              {/* Streaming pulsing cursor */}
                              {msg.isStreaming && msg.content && (
                                <span className="inline-block w-2 h-4 bg-[#a3d633] ml-1 translate-y-0.5 animate-pulse" />
                              )}

                              {/* Action controls on assistant bubble */}
                              <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-zinc-500">
                                {msg.isError ? (
                                  <button
                                    onClick={() => handleRetryLastMessage(msg.id)}
                                    className="text-[#a3d633] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                                  >
                                    <RotateCcw className="w-3 h-3" /> Retry query
                                  </button>
                                ) : (
                                  <span />
                                )}

                                {!msg.isStreaming && msg.content && (
                                  <button
                                    onClick={() => copyToClipboard(msg.content, msg.id)}
                                    style={{ borderRadius: '4px' }}
                                    className="p-1 text-zinc-500 hover:text-white transition cursor-pointer"
                                    title="Copy text"
                                  >
                                    {copiedId === msg.id ? (
                                      <Check className="w-3 h-3 text-[#a3d633]" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        <div className="flex items-center gap-1.5 mt-1 px-1 text-[9px] sm:text-[10px] text-zinc-500 font-mono">
                          <span>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Floating "Jump to latest" Affordance */}
                  <AnimatePresence>
                    {showScrollBottom && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={() => scrollToBottom(true)}
                        style={{ borderRadius: '9999px' }}
                        className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-3 py-1.5 border border-zinc-700 shadow-md flex items-center gap-1.5 z-10 cursor-pointer font-mono"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-[#a3d633]" />
                        <span>Jump to latest</span>
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Quick Action Suggestion Pills Carousel */}
                  <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-900 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
                    {QUICK_ACTIONS.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={i}
                          disabled={isGenerating}
                          onClick={() => handleSendMessage(item.query)}
                          style={{ borderRadius: '9999px' }}
                          className="whitespace-nowrap px-3 py-1 text-[11px] sm:text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                        >
                          <Icon className="w-3 h-3 text-[#a3d633]" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Input Footer & Stop Button */}
                  <div className="p-3 sm:p-3.5 bg-zinc-950 border-t border-zinc-800 shrink-0">
                    <div className="relative flex items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        disabled={isGenerating}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDownInput}
                        placeholder={
                          isGenerating
                            ? 'AI is generating answer...'
                            : 'Ask about drops, sizing, order status...'
                        }
                        style={{ borderRadius: '10px' }}
                        className="w-full bg-zinc-900 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm pl-3.5 pr-14 py-2.5 sm:py-3 border border-zinc-800 focus:outline-none focus:border-[#a3d633] disabled:opacity-75"
                      />

                      {/* Dynamic Send / Stop Button */}
                      {isGenerating ? (
                        <button
                          onClick={handleStopGeneration}
                          style={{ borderRadius: '8px' }}
                          className="absolute right-1.5 p-1.5 sm:p-2 bg-red-500 text-white cursor-pointer font-bold flex items-center gap-1 text-xs"
                          title="Stop Generation"
                        >
                          <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                          <span>Stop</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSendMessage()}
                          disabled={!input.trim()}
                          style={{ borderRadius: '8px' }}
                          className="absolute right-1.5 p-1.5 sm:p-2 bg-[#a3d633] text-black disabled:opacity-30 cursor-pointer font-bold"
                          title="Send Message (Enter)"
                        >
                          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mt-2 text-[10px] sm:text-xs text-zinc-500 flex justify-between items-center px-0.5">
                      <span className="text-zinc-500 font-mono truncate text-[10px]">
                        KHEOO AI • Streetwear Stylist
                      </span>
                      <Link
                        href="/shop"
                        className="text-[#a3d633] flex items-center gap-1 font-semibold text-[10px] sm:text-xs shrink-0 ml-2"
                      >
                        <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>Browse Drops</span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
