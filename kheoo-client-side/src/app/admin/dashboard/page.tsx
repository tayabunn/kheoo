'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Package,
  DollarSign,
  ShoppingBag,
  Store,
  RefreshCw,
  Search,
  Plus,
  Minus,
  Edit,
  AlertTriangle,
  Receipt,
  Trash2,
  Printer,
  CreditCard,
  Smartphone,
  Tag,
  Barcode,
  RotateCcw,
  X,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Order, Product } from '../../../types/ecommerce';

interface PosCartItem {
  id: string; // unique item id (productId + size)
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
  availableStock: number;
}

interface CompletedSale {
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  items: PosCartItem[];
  subtotal: number;
  discount: number;
  discountType: 'flat' | 'percent';
  totalAmount: number;
  paymentMethod: string;
  cashReceived: number;
  changeAmount: number;
  timestamp: string;
}

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'overview' | 'pos' | 'products' | 'orders'>('overview');

  useEffect(() => {
    if (tabParam === 'pos') setActiveTab('pos');
    else if (tabParam === 'products') setActiveTab('products');
    else if (tabParam === 'orders') setActiveTab('orders');
    else setActiveTab('overview');
  }, [tabParam]);

  // Global Datasets
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [orderSourceFilter, setOrderSourceFilter] = useState<'ALL' | 'POS' | 'ONLINE'>('ALL');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('ALL');
  const [productStockFilter, setProductStockFilter] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');

  // Modals & Selection states
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [stockEditProduct, setStockEditProduct] = useState<Product | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    categoryId: 'anime',
    price: '',
    oldPrice: '',
    stock: '50',
    material: '100% Combed Cotton (240 GSM)',
    printQuality: 'High-Density Screen & Puff Print',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: 'Heavyweight oversized streetwear drop with high-density puff graphic.',
  });

  // POS State
  const [posSearch, setPosSearch] = useState('');
  const [posCategory, setPosCategory] = useState<string>('ALL');
  const [posCart, setPosCart] = useState<PosCartItem[]>([]);
  const [heldCart, setHeldCart] = useState<PosCartItem[] | null>(null);
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BKASH' | 'NAGAD' | 'CARD'>('CASH');
  const [cashTendered, setCashTendered] = useState<string>('');
  const [discountVal, setDiscountVal] = useState<string>('0');
  const [discountType, setDiscountType] = useState<'flat' | 'percent'>('flat');
  const [completedSale, setCompletedSale] = useState<CompletedSale | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  // Initial Mock Fallback Datasets
  const INITIAL_PRODUCTS: Product[] = [
    {
      id: 'p1',
      name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
      slug: 'naruto-sage-mode-drop-shoulder-tshirt',
      description: 'Sleek dark oversized fit tee with high-density puff print.',
      price: 34.99,
      oldPrice: 44.99,
      isNew: true,
      isBestSeller: true,
      isTrending: true,
      categoryId: 'anime',
      stock: 65,
      material: '100% Combed Cotton (240 GSM)',
      printQuality: 'Screen & Puff Print',
      rating: 4.9,
      reviewCount: 28,
      images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'],
      variants: [
        { id: 'v1', productId: 'p1', sku: 'ANM-NRT-S', size: 'S', color: 'Black', stock: 15 },
        { id: 'v2', productId: 'p1', sku: 'ANM-NRT-M', size: 'M', color: 'Black', stock: 20 },
        { id: 'v3', productId: 'p1', sku: 'ANM-NRT-L', size: 'L', color: 'Black', stock: 15 },
        { id: 'v4', productId: 'p1', sku: 'ANM-NRT-XL', size: 'XL', color: 'Black', stock: 15 },
      ],
    },
    {
      id: 'p2',
      name: 'Gojo Unlimited Void Oversized Drop Shoulder Tee',
      slug: 'gojo-unlimited-void-oversized-tee',
      description: 'Jujutsu Kaisen special edition tee featuring Gojo Domain Expansion.',
      price: 38.99,
      oldPrice: 49.99,
      isNew: true,
      isBestSeller: true,
      isTrending: true,
      categoryId: 'anime',
      stock: 8,
      material: '240 GSM Luxury Heavy Cotton',
      printQuality: 'High-Density Puff Print',
      rating: 5.0,
      reviewCount: 42,
      images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'],
      variants: [
        { id: 'v5', productId: 'p2', sku: 'ANM-GOJ-S', size: 'S', color: 'Black', stock: 2 },
        { id: 'v6', productId: 'p2', sku: 'ANM-GOJ-M', size: 'M', color: 'Black', stock: 3 },
        { id: 'v7', productId: 'p2', sku: 'ANM-GOJ-L', size: 'L', color: 'Black', stock: 3 },
      ],
    },
    {
      id: 'p3',
      name: 'Spider-Man Symbiote Vintage Drop Shoulder Tee',
      slug: 'spider-man-symbiote-vintage-tee',
      description: 'Dark symbiote venom web graphic print over washed charcoal.',
      price: 36.99,
      oldPrice: 45.99,
      isNew: false,
      isBestSeller: true,
      isTrending: true,
      categoryId: 'marvel',
      stock: 50,
      material: '240 GSM Heavyweight Cotton',
      printQuality: 'Vintage Acid Wash',
      rating: 4.8,
      reviewCount: 19,
      images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80'],
      variants: [
        { id: 'v8', productId: 'p3', sku: 'MRV-SPD-S', size: 'S', color: 'Charcoal', stock: 10 },
        { id: 'v9', productId: 'p3', sku: 'MRV-SPD-M', size: 'M', color: 'Charcoal', stock: 20 },
        { id: 'v10', productId: 'p3', sku: 'MRV-SPD-L', size: 'L', color: 'Charcoal', stock: 20 },
      ],
    },
    {
      id: 'p4',
      name: 'Batman Dark Knight Minimal Oversized Tee',
      slug: 'batman-dark-knight-minimal-tee',
      description: 'Gotham silhouette stealth oversized streetwear drop.',
      price: 35.99,
      oldPrice: 44.99,
      isNew: true,
      isBestSeller: false,
      isTrending: true,
      categoryId: 'dc',
      stock: 5,
      material: '100% Combed Cotton',
      printQuality: 'Minimal Screen Print',
      rating: 4.7,
      reviewCount: 15,
      images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'],
      variants: [
        { id: 'v11', productId: 'p4', sku: 'DC-BTM-M', size: 'M', color: 'Black', stock: 2 },
        { id: 'v12', productId: 'p4', sku: 'DC-BTM-L', size: 'L', color: 'Black', stock: 3 },
      ],
    },
  ];

  const INITIAL_ORDERS: Order[] = [
    {
      id: 'POS-892101',
      orderNumber: 'POS-892101',
      customerName: 'Walk-In Customer',
      customerEmail: 'counter@kheoo.com',
      customerPhone: '+880 1711 223344',
      shippingAddress: {
        fullName: 'Walk-in Store Customer',
        phone: '+880 1711 223344',
        address: 'KHEOO Flagship POS Register 01',
        city: 'Dhaka',
        postalCode: '1212',
      },
      items: [
        {
          id: 'item-1',
          productId: 'p1',
          productName: 'Naruto Sage Mode Heavyweight Tee',
          price: 34.99,
          quantity: 2,
          size: 'L',
          color: 'Black',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        },
      ],
      totalAmount: 69.98,
      status: 'delivered',
      paymentMethod: 'Cash',
      paymentStatus: 'paid',
      orderSource: 'POS',
      createdAt: '2026-09-26T21:40:00Z',
    },
    {
      id: 'POS-892095',
      orderNumber: 'POS-892095',
      customerName: 'Rahim Ahmed',
      customerEmail: 'rahim@gmail.com',
      customerPhone: '+880 1819 556677',
      shippingAddress: {
        fullName: 'Rahim Ahmed',
        phone: '+880 1819 556677',
        address: 'POS Counter Checkout',
        city: 'Dhaka',
        postalCode: '1212',
      },
      items: [
        {
          id: 'item-2',
          productId: 'p2',
          productName: 'Gojo Unlimited Void Oversized Tee',
          price: 38.99,
          quantity: 1,
          size: 'M',
          color: 'Black',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
        },
      ],
      totalAmount: 38.99,
      status: 'delivered',
      paymentMethod: 'bKash',
      paymentStatus: 'paid',
      orderSource: 'POS',
      createdAt: '2026-09-26T20:15:00Z',
    },
    {
      id: 'KHEOO-WEB-849201',
      orderNumber: 'KHEOO-WEB-849201',
      customerName: 'Tanvir Hossain',
      customerEmail: 'tanvir@gmail.com',
      customerPhone: '+880 1912 334455',
      shippingAddress: {
        fullName: 'Tanvir Hossain',
        phone: '+880 1912 334455',
        address: 'House 42, Road 11, Banani',
        city: 'Dhaka',
        postalCode: '1213',
      },
      items: [
        {
          id: 'item-3',
          productId: 'p3',
          productName: 'Spider-Man Symbiote Vintage Tee',
          price: 36.99,
          quantity: 1,
          size: 'XL',
          color: 'Charcoal',
          image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
        },
        {
          id: 'item-4',
          productId: 'p4',
          productName: 'Batman Dark Knight Minimal Tee',
          price: 35.99,
          quantity: 1,
          size: 'L',
          color: 'Black',
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
        },
      ],
      totalAmount: 72.98,
      status: 'processing',
      paymentMethod: 'Cash On Delivery',
      paymentStatus: 'pending',
      orderSource: 'ONLINE',
      createdAt: '2026-09-26T18:22:00Z',
    },
    {
      id: 'KHEOO-WEB-849198',
      orderNumber: 'KHEOO-WEB-849198',
      customerName: 'Siam Khan',
      customerEmail: 'siam.kheoo@gmail.com',
      customerPhone: '+880 1632 998877',
      shippingAddress: {
        fullName: 'Siam Khan',
        phone: '+880 1632 998877',
        address: 'Sector 4, Uttara',
        city: 'Dhaka',
        postalCode: '1230',
      },
      items: [
        {
          id: 'item-5',
          productId: 'p2',
          productName: 'Gojo Unlimited Void Oversized Tee',
          price: 38.99,
          quantity: 1,
          size: 'L',
          color: 'Black',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
        },
      ],
      totalAmount: 41.99,
      status: 'shipped',
      paymentMethod: 'bKash',
      paymentStatus: 'paid',
      orderSource: 'ONLINE',
      createdAt: '2026-09-26T16:05:00Z',
    },
  ];

  // Fetch / Sync Backend Data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [prodRes, ordRes] = await Promise.allSettled([
          fetch('http://localhost:5000/api/v1/products?limit=100'),
          fetch('http://localhost:5000/api/v1/orders?limit=100'),
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value.ok) {
          const pJson = await prodRes.value.json();
          if (pJson.success && Array.isArray(pJson.data) && pJson.data.length > 0) {
            setProducts(pJson.data);
          } else {
            setProducts(INITIAL_PRODUCTS);
          }
        } else {
          setProducts(INITIAL_PRODUCTS);
        }

        if (ordRes.status === 'fulfilled' && ordRes.value.ok) {
          const oJson = await ordRes.value.json();
          if (oJson.success && Array.isArray(oJson.data) && oJson.data.length > 0) {
            setOrders(oJson.data);
          } else {
            setOrders(INITIAL_ORDERS);
          }
        } else {
          setOrders(INITIAL_ORDERS);
        }
      } catch {
        setProducts(INITIAL_PRODUCTS);
        setOrders(INITIAL_ORDERS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute Live Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const posOrders = orders.filter((o) => o.orderSource === 'POS');
  const onlineOrders = orders.filter((o) => o.orderSource !== 'POS');
  const posRevenue = posOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const onlineRevenue = onlineOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const lowStockProducts = products.filter((p) => Number(p.stock) <= 10);

  // Audio Beep
  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  };

  // POS CART ACTIONS
  const handleAddToPosCart = (product: Product, size: string = 'L') => {
    playBeep();
    const lineId = `${product.id}-${size}`;
    const variantStock =
      product.variants?.find((v) => v.size === size)?.stock ?? product.stock ?? 10;

    setPosCart((prev) => {
      const existing = prev.find((item) => item.id === lineId);
      if (existing) {
        if (existing.quantity >= variantStock) {
          alert(`Max stock available is ${variantStock} units for size ${size}.`);
          return prev;
        }
        return prev.map((item) =>
          item.id === lineId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color: 'Black',
          image: product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
          quantity: 1,
          availableStock: variantStock,
        },
      ];
    });
  };

  const updateCartQty = (lineId: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((item) => {
          if (item.id === lineId) {
            const nextQty = item.quantity + delta;
            if (nextQty > item.availableStock) {
              alert(`Maximum stock reached (${item.availableStock} available).`);
              return item;
            }
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (lineId: string) => {
    setPosCart((prev) => prev.filter((item) => item.id !== lineId));
  };

  const clearCart = () => {
    if (posCart.length === 0) return;
    if (confirm('Clear the current POS register cart?')) {
      setPosCart([]);
      setCashTendered('');
      setDiscountVal('0');
    }
  };

  const handleHoldCart = () => {
    if (posCart.length === 0) return;
    setHeldCart(posCart);
    setPosCart([]);
  };

  const handleRecallCart = () => {
    if (!heldCart) return;
    setPosCart(heldCart);
    setHeldCart(null);
  };

  // Calculations
  const posSubtotal = posCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const parsedDiscount = parseFloat(discountVal) || 0;
  const discountAmount =
    discountType === 'percent'
      ? (posSubtotal * Math.min(parsedDiscount, 100)) / 100
      : Math.min(parsedDiscount, posSubtotal);
  const posGrandTotal = Math.max(0, posSubtotal - discountAmount);
  const tenderNumber = parseFloat(cashTendered) || 0;
  const changeDue = paymentMethod === 'CASH' && tenderNumber >= posGrandTotal ? tenderNumber - posGrandTotal : 0;

  // Complete In-Store POS Sale
  const handleCompleteSale = async () => {
    if (posCart.length === 0) {
      alert('POS cart is empty. Please select products first.');
      return;
    }

    if (paymentMethod === 'CASH' && tenderNumber < posGrandTotal) {
      alert(`Insufficient cash received. Total bill is $${posGrandTotal.toFixed(2)}`);
      return;
    }

    const orderNum = `POS-${Math.floor(100000 + Math.random() * 900000)}`;
    const saleRecord: CompletedSale = {
      orderNumber: orderNum,
      customerName: customerName || 'Walk-in Customer',
      customerPhone: customerPhone || 'N/A',
      items: [...posCart],
      subtotal: posSubtotal,
      discount: discountAmount,
      discountType,
      totalAmount: posGrandTotal,
      paymentMethod,
      cashReceived: paymentMethod === 'CASH' ? tenderNumber : posGrandTotal,
      changeAmount: changeDue,
      timestamp: new Date().toISOString(),
    };

    const newOrderObj: Order = {
      id: orderNum,
      orderNumber: orderNum,
      customerName: saleRecord.customerName,
      customerEmail: 'pos.register@kheoo.com',
      customerPhone: saleRecord.customerPhone,
      shippingAddress: {
        fullName: saleRecord.customerName,
        phone: saleRecord.customerPhone || '',
        address: 'POS Counter Checkout',
        city: 'Dhaka',
        postalCode: '1212',
      },
      items: posCart.map((i) => ({
        id: `item-${Date.now()}-${i.productId}`,
        productId: i.productId,
        productName: i.name,
        price: i.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
        image: i.image,
      })),
      totalAmount: posGrandTotal,
      status: 'delivered',
      paymentMethod: paymentMethod,
      paymentStatus: 'paid',
      orderSource: 'POS',
      createdAt: new Date().toISOString(),
    };

    // Update live state immediately
    setOrders((prev) => [newOrderObj, ...prev]);

    setProducts((prev) =>
      prev.map((prod) => {
        const soldInThis = posCart.filter((item) => item.productId === prod.id);
        if (soldInThis.length === 0) return prod;
        const totalSold = soldInThis.reduce((s, x) => s + x.quantity, 0);
        const updatedVariants = prod.variants?.map((v) => {
          const soldVariant = soldInThis.find((item) => item.size === v.size);
          if (soldVariant) {
            return { ...v, stock: Math.max(0, v.stock - soldVariant.quantity) };
          }
          return v;
        });
        return {
          ...prod,
          stock: Math.max(0, prod.stock - totalSold),
          variants: updatedVariants || prod.variants,
        };
      })
    );

    // Sync to backend
    fetch('http://localhost:5000/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrderObj),
    }).catch(() => {});

    setCompletedSale(saleRecord);
    setShowReceiptModal(true);
    setPosCart([]);
    setCashTendered('');
    setCustomerName('Walk-in Customer');
    setCustomerPhone('');
  };

  // Quick Restock Product
  const handleQuickRestock = (productId: string, amount: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newTotal = p.stock + amount;
          const updatedVars = p.variants?.map((v) => ({ ...v, stock: v.stock + Math.floor(amount / (p.variants?.length || 1)) }));
          return { ...p, stock: newTotal, variants: updatedVars || p.variants };
        }
        return p;
      })
    );
  };

  // Update Stock Modal
  const handleSaveStockModal = () => {
    if (!stockEditProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === stockEditProduct.id ? { ...p, stock: newStockVal } : p))
    );
    setStockEditProduct(null);
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (viewingOrder && viewingOrder.id === orderId) {
      setViewingOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    fetch(`http://localhost:5000/api/v1/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).catch(() => {});
  };

  // Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      alert('Please provide drop name and price.');
      return;
    }

    const priceNum = parseFloat(newProductForm.price) || 29.99;
    const oldPriceNum = parseFloat(newProductForm.oldPrice) || priceNum * 1.25;
    const stockNum = parseInt(newProductForm.stock) || 40;
    const newId = `p-${Date.now()}`;
    const slug = newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const createdProd: Product = {
      id: newId,
      name: newProductForm.name,
      slug,
      description: newProductForm.description,
      price: priceNum,
      oldPrice: oldPriceNum,
      isNew: true,
      isBestSeller: false,
      isTrending: true,
      categoryId: newProductForm.categoryId,
      stock: stockNum,
      material: newProductForm.material,
      printQuality: newProductForm.printQuality,
      rating: 5.0,
      reviewCount: 0,
      images: [newProductForm.image],
      variants: [
        { id: `v-${Date.now()}-1`, productId: newId, sku: `${newProductForm.categoryId.toUpperCase()}-S`, size: 'S', color: 'Black', stock: Math.floor(stockNum * 0.25) },
        { id: `v-${Date.now()}-2`, productId: newId, sku: `${newProductForm.categoryId.toUpperCase()}-M`, size: 'M', color: 'Black', stock: Math.floor(stockNum * 0.35) },
        { id: `v-${Date.now()}-3`, productId: newId, sku: `${newProductForm.categoryId.toUpperCase()}-L`, size: 'L', color: 'Black', stock: Math.floor(stockNum * 0.25) },
        { id: `v-${Date.now()}-4`, productId: newId, sku: `${newProductForm.categoryId.toUpperCase()}-XL`, size: 'XL', color: 'Black', stock: Math.floor(stockNum * 0.15) },
      ],
    };

    setProducts((prev) => [createdProd, ...prev]);
    setShowAddProductModal(false);
    setNewProductForm({
      name: '',
      categoryId: 'anime',
      price: '',
      oldPrice: '',
      stock: '50',
      material: '100% Combed Cotton (240 GSM)',
      printQuality: 'High-Density Screen & Puff Print',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      description: 'Heavyweight oversized streetwear drop with high-density puff graphic.',
    });
  };

  // Delete Product
  const handleDeleteProduct = (productId: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from inventory?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  // Filtered Datasets
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = productCategoryFilter === 'ALL' || p.categoryId === productCategoryFilter;
    const matchStock =
      productStockFilter === 'ALL' ||
      (productStockFilter === 'IN_STOCK' && p.stock > 10) ||
      (productStockFilter === 'LOW_STOCK' && p.stock <= 10 && p.stock > 0) ||
      (productStockFilter === 'OUT_OF_STOCK' && p.stock === 0);
    return matchSearch && matchCat && matchStock;
  });

  const filteredOrders = orders.filter((o) => {
    const orderId = (o.id || o.orderNumber || o._id || '').toLowerCase();
    const custName = (o.customerName || o.guestName || '').toLowerCase();
    const custPhone = o.customerPhone || '';
    const q = searchQuery.toLowerCase();

    const matchSearch =
      orderId.includes(q) ||
      custName.includes(q) ||
      custPhone.includes(searchQuery);
    const matchSource =
      orderSourceFilter === 'ALL' ||
      (orderSourceFilter === 'POS' && o.orderSource === 'POS') ||
      (orderSourceFilter === 'ONLINE' && o.orderSource !== 'POS');
    const matchStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    return matchSearch && matchSource && matchStatus;
  });

  const posFilteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(posSearch.toLowerCase()) ||
      p.variants?.some((v) => v.sku.toLowerCase().includes(posSearch.toLowerCase())) ||
      p.categoryId.toLowerCase().includes(posSearch.toLowerCase());
    const matchCat = posCategory === 'ALL' || p.categoryId === posCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Context-Specific Module Header (Zero Repetition) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            <span>KHEOO ADMIN</span>
            <span>/</span>
            <span className="text-black font-extrabold">
              {activeTab === 'overview' && 'DASHBOARD OVERVIEW'}
              {activeTab === 'pos' && '⚡ IN-STORE POS COUNTER'}
              {activeTab === 'products' && 'PRODUCTS & STOCK INVENTORY'}
              {activeTab === 'orders' && 'ORDERS & SALES FULFILLMENT'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight mt-1">
            {activeTab === 'overview' && 'Performance & Omnichannel Metrics'}
            {activeTab === 'pos' && 'POS Register Cashier Counter'}
            {activeTab === 'products' && 'Streetwear Catalog & Stock Levels'}
            {activeTab === 'orders' && 'Order History & Sales Audit'}
          </h1>
        </div>

        {/* Dynamic Context Actions */}
        <div className="flex items-center gap-2">
          {activeTab === 'overview' && (
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-600 bg-white border border-zinc-200 px-3 py-1.5">
              <Activity className="w-3.5 h-3.5 text-black" />
              <span>Shift Sync: Real-time</span>
            </div>
          )}

          {activeTab === 'products' && (
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-black"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Drop</span>
            </button>
          )}

          {activeTab === 'pos' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold bg-white border border-zinc-300 px-2.5 py-1 text-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Register 01 Active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DASHBOARD OVERVIEW VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 font-mono">
          {/* 4 Clean Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Revenue */}
            <div className="bg-white border border-zinc-200 p-5">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Gross Sales</span>
                <DollarSign className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl font-black text-black">${totalRevenue.toFixed(2)}</p>
              <div className="flex items-center gap-2 text-[10px] mt-2 font-bold">
                <span className="text-zinc-600">Online: ${onlineRevenue.toFixed(0)}</span>
                <span className="text-zinc-300">•</span>
                <span className="text-black font-extrabold">POS: ${posRevenue.toFixed(0)}</span>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white border border-zinc-200 p-5">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Volume</span>
                <ShoppingBag className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl font-black text-black">{orders.length} Orders</p>
              <div className="flex items-center gap-2 text-[10px] mt-2 font-bold text-zinc-600">
                <span>{onlineOrders.length} Web</span>
                <span className="text-zinc-300">•</span>
                <span className="text-black font-bold">{posOrders.length} In-Store</span>
              </div>
            </div>

            {/* In-Store Shift */}
            <div className="bg-white border border-zinc-200 p-5">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Today&apos;s POS Counter</span>
                <Store className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl font-black text-black">${posRevenue.toFixed(2)}</p>
              <span className="text-[10px] text-zinc-500 block mt-2 font-sans font-bold">
                {posOrders.length} In-Store Receipts Processed
              </span>
            </div>

            {/* Inventory Status */}
            <div className="bg-white border border-zinc-200 p-5">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Catalog Health</span>
                <Package className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl font-black text-black">{products.length} Drops</p>
              <span className="text-[10px] text-zinc-500 block mt-2 font-sans font-bold">
                {lowStockProducts.length > 0 ? `${lowStockProducts.length} low-stock items` : 'All items well-stocked'}
              </span>
            </div>
          </div>

          {/* Channel Revenue Comparison Bar */}
          <div className="bg-white border border-zinc-200 p-5">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-black uppercase tracking-wider text-black flex items-center gap-2">
                <Layers className="w-4 h-4" /> Omnichannel Channel Distribution
              </span>
              <span className="text-zinc-500 text-[11px]">
                Web: {totalRevenue > 0 ? Math.round((onlineRevenue / totalRevenue) * 100) : 0}% | POS: {totalRevenue > 0 ? Math.round((posRevenue / totalRevenue) * 100) : 0}%
              </span>
            </div>
            <div className="w-full h-3 bg-zinc-100 flex overflow-hidden border border-zinc-200">
              <div
                style={{ width: `${totalRevenue > 0 ? (onlineRevenue / totalRevenue) * 100 : 50}%` }}
                className="bg-black h-full transition-all duration-500"
                title="Online Web Sales"
              />
              <div
                style={{ width: `${totalRevenue > 0 ? (posRevenue / totalRevenue) * 100 : 50}%` }}
                className="bg-zinc-400 h-full transition-all duration-500"
                title="POS Counter Sales"
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-[11px] text-zinc-600 font-sans">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black inline-block" />
                <span className="font-bold text-black">Online Web Drops (${onlineRevenue.toFixed(2)})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-zinc-400 inline-block" />
                <span className="font-bold text-black">In-Store POS Counter (${posRevenue.toFixed(2)})</span>
              </div>
            </div>
          </div>

          {/* Low Stock Quick Restock Panel (if any) */}
          {lowStockProducts.length > 0 && (
            <div className="bg-white border border-zinc-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-black" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    Low Stock Alert (1-Click Instant Restock)
                  </h3>
                </div>
                <span className="text-[10px] text-zinc-500">Items with ≤ 10 units remaining</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="p-3 border border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-black truncate font-sans">{p.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Stock: <span className="font-black text-black">{p.stock} units</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleQuickRestock(p.id, 10)}
                        className="text-[10px] font-black uppercase px-2.5 py-1 bg-black text-white hover:bg-zinc-800"
                        title="Add +10 stock"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleQuickRestock(p.id, 25)}
                        className="text-[10px] font-black uppercase px-2.5 py-1 bg-white border border-black text-black hover:bg-zinc-100"
                        title="Add +25 stock"
                      >
                        +25
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders & Sales Feed */}
          <div className="bg-white border border-zinc-200">
            <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-black">
                  Live Sales Activity Stream
                </h3>
                <span className="text-[10px] text-zinc-500 font-sans">Latest omnichannel receipts and web dispatches</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                  <tr>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3.5 px-4 font-black text-black">{order.orderNumber || order.id}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 border ${
                            order.orderSource === 'POS'
                              ? 'bg-black text-white border-black'
                              : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                          }`}
                        >
                          {order.orderSource === 'POS' ? '⚡ POS' : '🌐 WEB'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className="font-bold text-black block">{order.customerName}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{order.customerPhone || 'N/A'}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 ${
                            order.status === 'delivered'
                              ? 'bg-black text-white'
                              : 'bg-zinc-100 text-zinc-700 border border-zinc-300'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-zinc-700">{order.paymentMethod || 'Cash'}</td>
                      <td className="py-3.5 px-4 font-black text-black">${Number(order.totalAmount).toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="px-2.5 py-1 text-[10px] font-black uppercase bg-zinc-100 hover:bg-black hover:text-white border border-zinc-300 transition-colors"
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. IN-STORE POS CASHIER TERMINAL VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
          {/* Left: Product Catalog & Fast Cashier Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top POS Filter & Barcode Bar */}
            <div className="bg-white border border-zinc-200 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Barcode className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    value={posSearch}
                    onChange={(e) => setPosSearch(e.target.value)}
                    placeholder="Scan SKU Barcode or Type Product Name..."
                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:border-black font-bold"
                  />
                </div>
                {posSearch && (
                  <button
                    onClick={() => setPosSearch('')}
                    className="p-2.5 bg-zinc-100 border border-zinc-300 hover:bg-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Quick Filters */}
              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'ANIME', 'MARVEL', 'DC'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPosCategory(cat)}
                    className={`text-[11px] font-black uppercase px-3 py-1.5 transition-colors border ${
                      posCategory === cat
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-zinc-700 hover:bg-zinc-100 border-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[640px] overflow-y-auto pr-1">
              {posFilteredProducts.map((product) => {
                const isOutOfStock = product.stock <= 0;
                return (
                  <div
                    key={product.id}
                    className="bg-white border border-zinc-200 p-3 flex flex-col justify-between hover:border-black transition-all group"
                  >
                    <div>
                      <div className="relative aspect-square w-full bg-zinc-100 mb-2 overflow-hidden">
                        <Image
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'}
                          alt={product.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-black text-white text-[9px] font-black px-1.5 py-0.5 uppercase">
                          {product.categoryId}
                        </span>
                        <span
                          className={`absolute bottom-1.5 right-1.5 text-[9px] font-black px-1.5 py-0.5 ${
                            product.stock <= 5
                              ? 'bg-black text-white border border-zinc-400'
                              : 'bg-white/90 text-black border border-zinc-300'
                          }`}
                        >
                          Stock: {product.stock}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-black line-clamp-1 leading-tight font-sans">
                        {product.name}
                      </h4>
                      <p className="text-sm font-black text-black mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Size Selector Buttons */}
                    <div className="mt-3 pt-2 border-t border-zinc-100">
                      <span className="text-[9px] text-zinc-400 uppercase block mb-1">
                        Tap Size to Add:
                      </span>
                      <div className="grid grid-cols-4 gap-1">
                        {['S', 'M', 'L', 'XL'].map((sz) => {
                          const variant = product.variants?.find((v) => v.size === sz);
                          const varStock = variant ? variant.stock : product.stock > 0 ? 5 : 0;
                          const noStock = varStock <= 0;

                          return (
                            <button
                              key={sz}
                              disabled={noStock || isOutOfStock}
                              onClick={() => handleAddToPosCart(product, sz)}
                              className={`py-1 text-[10px] font-black uppercase transition-all border ${
                                noStock
                                  ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed'
                                  : 'bg-zinc-50 hover:bg-black hover:text-white text-black border-zinc-300 active:scale-95'
                              }`}
                              title={`Size ${sz} (${varStock} in stock)`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: POS Counter Register Cart & Billing (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 p-5 flex flex-col justify-between space-y-4">
            <div>
              {/* POS Cart Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-black" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    Register Cart ({posCart.reduce((s, i) => s + i.quantity, 0)} Items)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {heldCart && (
                    <button
                      onClick={handleRecallCart}
                      className="text-[10px] font-black uppercase px-2 py-1 bg-zinc-200 text-black border border-zinc-400 hover:bg-zinc-300 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Recall Held
                    </button>
                  )}
                  <button
                    onClick={clearCart}
                    disabled={posCart.length === 0}
                    className="text-[10px] font-bold uppercase text-zinc-500 hover:text-black disabled:opacity-30"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="grid grid-cols-2 gap-2 mt-3 mb-3 font-sans">
                <div>
                  <label className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">Customer</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Walk-in Customer"
                    className="w-full px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 text-xs text-black focus:outline-none focus:border-black font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">Mobile No.</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+880 17..."
                    className="w-full px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 text-xs text-black focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 border-t border-b border-zinc-100 py-3">
                {posCart.length === 0 ? (
                  <div className="py-12 text-center text-zinc-400 text-xs">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <span>Cart is empty. Tap any drop size on the left to add.</span>
                  </div>
                ) : (
                  posCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 bg-zinc-50 border border-zinc-200 text-xs"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="font-bold text-black truncate font-sans text-xs">{item.name}</p>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                          <span className="font-black text-black bg-white px-1.5 py-0.2 border border-zinc-300">
                            SIZE: {item.size}
                          </span>
                          <span>${item.price.toFixed(2)} ea</span>
                        </div>
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-zinc-300 bg-white">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="p-1 hover:bg-zinc-100 text-black"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-black text-black text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="p-1 hover:bg-zinc-100 text-black"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-black text-black min-w-[50px] text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="text-zinc-400 hover:text-black p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Billing & Payment Controls */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-black">${posSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-600 gap-2">
                  <span className="flex items-center gap-1">
                    Discount:
                    <button
                      onClick={() => setDiscountType(discountType === 'flat' ? 'percent' : 'flat')}
                      className="text-[9px] font-black underline"
                    >
                      ({discountType === 'flat' ? '$' : '%'})
                    </button>
                  </span>
                  <div className="w-24">
                    <input
                      type="number"
                      value={discountVal}
                      onChange={(e) => setDiscountVal(e.target.value)}
                      placeholder="0"
                      className="w-full px-2 py-1 bg-zinc-50 border border-zinc-300 text-right text-xs font-bold focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-base font-black text-black pt-2 border-t border-zinc-200">
                  <span className="uppercase">Grand Total:</span>
                  <span>${posGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1.5">
                  Payment Mode:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'CASH', label: 'Cash', icon: DollarSign },
                    { id: 'BKASH', label: 'bKash', icon: Smartphone },
                    { id: 'NAGAD', label: 'Nagad', icon: Smartphone },
                    { id: 'CARD', label: 'Card', icon: CreditCard },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`py-2 px-1 text-[10px] font-black uppercase flex flex-col items-center gap-1 transition-all border ${
                          paymentMethod === m.id
                            ? 'bg-black text-white border-black'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-black border-zinc-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cash Tendered Calculator */}
              {paymentMethod === 'CASH' && (
                <div className="bg-zinc-50 border border-zinc-200 p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase text-zinc-500">Cash Received:</span>
                    <input
                      type="number"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value)}
                      placeholder={`$${posGrandTotal.toFixed(2)}`}
                      className="w-28 px-2 py-1 bg-white border border-zinc-300 text-right text-xs font-bold focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="flex gap-1 justify-end">
                    {[
                      { label: 'Exact', val: posGrandTotal },
                      { label: '$50', val: 50 },
                      { label: '$100', val: 100 },
                    ].map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCashTendered(pill.val.toString())}
                        className="text-[9px] font-black px-2 py-0.5 bg-white border border-zinc-300 hover:bg-zinc-200"
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  {tenderNumber >= posGrandTotal && (
                    <div className="flex justify-between text-xs font-black text-black pt-1 border-t border-zinc-200">
                      <span>Change Return:</span>
                      <span>${changeDue.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleHoldCart}
                  disabled={posCart.length === 0}
                  className="px-3 py-3 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-bold uppercase border border-zinc-300 disabled:opacity-40"
                  title="Hold Cart"
                >
                  Hold
                </button>
                <button
                  onClick={handleCompleteSale}
                  disabled={posCart.length === 0}
                  className="flex-1 py-3 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider border border-black flex items-center justify-center gap-2 disabled:opacity-40 active:scale-98 transition-all"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Charge & Print Receipt (${posGrandTotal.toFixed(2)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PRODUCTS & INVENTORY MANAGEMENT VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'products' && (
        <div className="space-y-4 font-mono">
          {/* Filter Bar & Search */}
          <div className="bg-white border border-zinc-200 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-zinc-500 mr-1">Category:</span>
              {['ALL', 'anime', 'marvel', 'dc'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProductCategoryFilter(cat)}
                  className={`text-xs font-bold uppercase px-3 py-1.5 border transition-all ${
                    productCategoryFilter === cat
                      ? 'bg-black text-white border-black'
                      : 'bg-zinc-50 text-zinc-700 hover:text-black border-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <span className="text-[10px] font-bold uppercase text-zinc-500 ml-3 mr-1">Stock Level:</span>
              {[
                { id: 'ALL', label: 'All' },
                { id: 'LOW_STOCK', label: 'Low Stock (≤10)' },
                { id: 'OUT_OF_STOCK', label: 'Out of Stock' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setProductStockFilter(st.id as any)}
                  className={`text-xs font-bold uppercase px-3 py-1.5 border transition-all ${
                    productStockFilter === st.id
                      ? 'bg-black text-white border-black'
                      : 'bg-zinc-50 text-zinc-700 hover:text-black border-zinc-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drop name, SKU..."
                className="w-full pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                  <tr>
                    <th className="py-3 px-4">Item & Drop</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Variant Stock</th>
                    <th className="py-3 px-4">Total Units</th>
                    <th className="py-3 px-4 text-right">Quick Restock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3.5 px-4 font-sans">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 bg-zinc-100 border border-zinc-200 flex-shrink-0">
                            <Image
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-black text-xs line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-zinc-400 font-mono">{p.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-zinc-100 text-black border border-zinc-300">
                          {p.categoryId}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-black">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-[10px]">
                        <div className="flex gap-1.5 flex-wrap">
                          {p.variants && p.variants.length > 0 ? (
                            p.variants.map((v) => (
                              <span
                                key={v.id}
                                className={`px-1.5 py-0.5 border ${
                                  v.stock <= 2
                                    ? 'bg-black text-white border-black font-black'
                                    : 'bg-white text-zinc-700 border-zinc-300'
                                }`}
                              >
                                {v.size}:{v.stock}
                              </span>
                            ))
                          ) : (
                            <span className="text-zinc-400">Standard</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-xs font-black px-2 py-0.5 ${
                            p.stock <= 5
                              ? 'bg-black text-white'
                              : p.stock <= 10
                              ? 'bg-zinc-200 text-black border border-zinc-400'
                              : 'text-black'
                          }`}
                        >
                          {p.stock}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleQuickRestock(p.id, -1)}
                            disabled={p.stock <= 0}
                            className="w-7 h-7 bg-white border border-zinc-300 hover:bg-zinc-100 flex items-center justify-center text-xs font-bold disabled:opacity-30"
                            title="Decrease 1"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => handleQuickRestock(p.id, 1)}
                            className="w-7 h-7 bg-white border border-zinc-300 hover:bg-zinc-100 flex items-center justify-center text-xs font-bold"
                            title="Increase 1"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => handleQuickRestock(p.id, 10)}
                            className="px-2 h-7 bg-black text-white hover:bg-zinc-800 text-[10px] font-black uppercase"
                            title="Restock +10"
                          >
                            +10
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setStockEditProduct(p);
                              setNewStockVal(p.stock);
                            }}
                            className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300"
                            title="Edit Stock"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 bg-zinc-100 hover:bg-black hover:text-white text-zinc-500 border border-zinc-300 transition-colors"
                            title="Delete Drop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ORDERS & FULFILLMENT MANAGEMENT VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-4 font-mono">
          {/* Filter Bar */}
          <div className="bg-white border border-zinc-200 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-zinc-500 mr-1">Channel:</span>
              {[
                { id: 'ALL', label: 'All Orders' },
                { id: 'POS', label: '⚡ POS Counter' },
                { id: 'ONLINE', label: '🌐 Online Web' },
              ].map((src) => (
                <button
                  key={src.id}
                  onClick={() => setOrderSourceFilter(src.id as any)}
                  className={`text-xs font-bold uppercase px-3 py-1.5 border transition-all ${
                    orderSourceFilter === src.id
                      ? 'bg-black text-white border-black'
                      : 'bg-zinc-50 text-zinc-700 hover:text-black border-zinc-200'
                  }`}
                >
                  {src.label}
                </button>
              ))}

              <span className="text-[10px] font-bold uppercase text-zinc-500 ml-3 mr-1">Status:</span>
              {['ALL', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`text-xs font-bold uppercase px-3 py-1.5 border transition-all ${
                    orderStatusFilter === st
                      ? 'bg-black text-white border-black'
                      : 'bg-zinc-50 text-zinc-700 hover:text-black border-zinc-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice, customer..."
                className="w-full pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                  <tr>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-3.5 px-4 font-black text-black">
                        {order.orderNumber || order.id}
                        <span className="block text-[10px] text-zinc-400 font-normal">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 border ${
                            order.orderSource === 'POS'
                              ? 'bg-black text-white border-black'
                              : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                          }`}
                        >
                          {order.orderSource === 'POS' ? '⚡ POS' : '🌐 WEB'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className="font-bold text-black block">{order.customerName}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{order.customerPhone || 'N/A'}</span>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-xs">
                        <span className="font-bold text-black block">
                          {order.items?.length || 1} Item(s)
                        </span>
                        <span className="text-[10px] text-zinc-500 truncate max-w-[180px] block">
                          {order.items?.map((i) => `${i.productName} (${i.size})`).join(', ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className="font-bold text-black">{order.paymentMethod || 'Cash'}</span>
                        <span className="block text-[10px] text-zinc-400 font-mono uppercase">
                          {order.paymentStatus || 'paid'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="px-2 py-1 bg-zinc-50 border border-zinc-300 text-[10px] font-black uppercase text-black focus:outline-none focus:border-black"
                        >
                          <option value="pending">PENDING</option>
                          <option value="processing">PROCESSING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 font-black text-black">
                        ${Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setViewingOrder(order)}
                          className="px-2.5 py-1 text-[10px] font-black uppercase bg-zinc-100 hover:bg-black hover:text-white border border-zinc-300 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW PRODUCT */}
      {/* ========================================================================= */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto font-mono text-black">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200">
              <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Streetwear Drop
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-1 hover:bg-zinc-100 text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="e.g. Zoro Ashura Blade Heavyweight Tee"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={newProductForm.categoryId}
                    onChange={(e) => setNewProductForm({ ...newProductForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black uppercase font-bold"
                  >
                    <option value="anime">Anime Streetwear</option>
                    <option value="marvel">Marvel Universe</option>
                    <option value="dc">DC Comics</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Initial Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: e.target.value })}
                    placeholder="50"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Selling Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    placeholder="34.99"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                    Compare Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProductForm.oldPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, oldPrice: e.target.value })}
                    placeholder="44.99"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                  Material Spec
                </label>
                <input
                  type="text"
                  value={newProductForm.material}
                  onChange={(e) => setNewProductForm({ ...newProductForm, material: e.target.value })}
                  placeholder="100% Combed Cotton (240 GSM)"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-zinc-700 block mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newProductForm.image}
                  onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-bold uppercase border border-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase border border-black"
                >
                  Publish Drop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: STOCK LEVEL EDITOR */}
      {/* ========================================================================= */}
      {stockEditProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-white border border-black p-6 w-full max-w-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                Edit Stock: {stockEditProduct.name}
              </h3>
              <button onClick={() => setStockEditProduct(null)} className="p-1 text-zinc-500 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-zinc-600 block mb-1">
                  Total Units in Stock:
                </label>
                <input
                  type="number"
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 text-sm font-black text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200">
                <button
                  onClick={() => setStockEditProduct(null)}
                  className="px-4 py-2 bg-zinc-100 text-black text-xs font-bold uppercase border border-zinc-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStockModal}
                  className="px-4 py-2 bg-black text-white text-xs font-black uppercase border border-black"
                >
                  Save Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ORDER DETAILS / INVOICE VIEW */}
      {/* ========================================================================= */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-white border border-black p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/logo/Kheoo-logo.png"
                  alt="KHEOO"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <div>
                  <h3 className="text-sm font-black uppercase text-black">
                    Invoice #{viewingOrder.orderNumber || viewingOrder.id}
                  </h3>
                  <span className="text-[10px] text-zinc-500">
                    Channel: {viewingOrder.orderSource || 'ONLINE'} • Status: {viewingOrder.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 hover:bg-zinc-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping Box */}
            <div className="grid grid-cols-2 gap-4 p-3 bg-zinc-50 border border-zinc-200 text-xs font-sans mb-4">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase font-mono block mb-1">
                  Customer Contact:
                </span>
                <p className="font-bold text-black">{viewingOrder.customerName}</p>
                <p className="text-zinc-600 text-[11px] font-mono">{viewingOrder.customerPhone}</p>
                <p className="text-zinc-600 text-[11px] font-mono">{viewingOrder.customerEmail}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase font-mono block mb-1">
                  Destination / Register:
                </span>
                <p className="text-black font-medium">{viewingOrder.shippingAddress?.address || 'In-Store POS Counter'}</p>
                <p className="text-zinc-600 text-[11px]">
                  {viewingOrder.shippingAddress?.city}, {viewingOrder.shippingAddress?.postalCode}
                </p>
                <p className="text-zinc-500 font-mono text-[10px] mt-1">
                  Payment: {viewingOrder.paymentMethod} ({viewingOrder.paymentStatus || 'paid'})
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 mb-4">
              <span className="text-[10px] font-bold uppercase text-zinc-400 block font-mono">
                Order Items:
              </span>
              {viewingOrder.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-zinc-200 text-xs">
                  <div>
                    <p className="font-bold text-black font-sans">{item.productName}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">
                      Size: {item.size} • Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-black text-black font-mono">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="border-t border-zinc-200 pt-3 space-y-1 text-xs font-mono">
              <div className="flex justify-between font-black text-sm text-black">
                <span>Total Amount:</span>
                <span>${Number(viewingOrder.totalAmount).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-zinc-200 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-zinc-500">Update Status:</span>
                <select
                  value={viewingOrder.status}
                  onChange={(e) => handleUpdateOrderStatus(viewingOrder.id, e.target.value)}
                  className="px-2 py-1 bg-zinc-50 border border-zinc-300 text-xs font-bold uppercase text-black"
                >
                  <option value="pending">PENDING</option>
                  <option value="processing">PROCESSING</option>
                  <option value="shipped">SHIPPED</option>
                  <option value="delivered">DELIVERED</option>
                  <option value="cancelled">CANCELLED</option>
                </select>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-black text-white text-xs font-black uppercase flex items-center gap-2 border border-black hover:bg-zinc-800"
              >
                <Printer className="w-3.5 h-3.5" /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: POS PRINTABLE THERMAL RECEIPT */}
      {/* ========================================================================= */}
      {showReceiptModal && completedSale && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black p-6 w-full max-w-sm font-mono text-black">
            <div className="text-center pb-3 border-b border-dashed border-zinc-400">
              <Image
                src="/assets/logo/Kheoo-logo.png"
                alt="KHEOO"
                width={48}
                height={48}
                className="w-12 h-12 mx-auto mb-1 object-contain"
              />
              <h2 className="text-sm font-black uppercase tracking-widest">KHEOO STREETWEAR</h2>
              <p className="text-[10px] text-zinc-600">Omnichannel Flagship Counter</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1">
                Invoice: {completedSale.orderNumber}
              </p>
              <p className="text-[9px] text-zinc-400">
                {new Date(completedSale.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="py-3 border-b border-dashed border-zinc-400 text-xs space-y-2">
              <div className="text-[10px] text-zinc-600 font-sans">
                Customer: <span className="font-bold text-black">{completedSale.customerName}</span>
                {completedSale.customerPhone && completedSale.customerPhone !== 'N/A' && (
                  <span className="block font-mono text-zinc-500">{completedSale.customerPhone}</span>
                )}
              </div>

              <div className="space-y-1 pt-1">
                {completedSale.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[180px]">
                      {item.name} ({item.size}) × {item.quantity}
                    </span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-3 border-b border-dashed border-zinc-400 space-y-1 text-xs">
              <div className="flex justify-between text-zinc-600 text-[11px]">
                <span>Subtotal:</span>
                <span>${completedSale.subtotal.toFixed(2)}</span>
              </div>
              {completedSale.discount > 0 && (
                <div className="flex justify-between text-zinc-600 text-[11px]">
                  <span>Discount:</span>
                  <span>-${completedSale.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-1 border-t border-zinc-200">
                <span>TOTAL:</span>
                <span>${completedSale.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 text-[11px] pt-1">
                <span>Paid via:</span>
                <span className="uppercase font-bold">{completedSale.paymentMethod}</span>
              </div>
              {completedSale.paymentMethod === 'CASH' && (
                <>
                  <div className="flex justify-between text-zinc-600 text-[11px]">
                    <span>Cash Received:</span>
                    <span>${completedSale.cashReceived.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-black text-[11px]">
                    <span>Change Returned:</span>
                    <span>${completedSale.changeAmount.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>

            <div className="text-center pt-3 space-y-1 text-[10px] text-zinc-500 font-sans">
              <p className="font-bold text-black uppercase">Thank you for shopping at KHEOO</p>
              <p className="text-[9px]">www.kheoo.com • #KHEOOStreetwear</p>
            </div>

            <div className="flex gap-2 pt-4 mt-2 border-t border-zinc-200 font-mono">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="flex-1 py-2 bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-bold uppercase border border-zinc-300"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase flex items-center justify-center gap-1.5 border border-black"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-8 font-mono flex items-center justify-center">Loading KHEOO Command Center...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
