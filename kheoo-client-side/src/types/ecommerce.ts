export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
  price?: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  _count?: {
    products: number;
  };
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  details?: string;
  price: number;
  oldPrice?: number;
  isNew: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  categoryId: string;
  category?: Category;
  stock: number;
  material: string;
  printQuality: string;
  rating: number;
  reviewCount: number;
  images: string[];
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  variantId?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id?: string;
  _id?: string;
  orderNumber: string;
  guestEmail?: string;
  guestName?: string;
  customerName?: string;
  customerPhone?: string;
  status: 'PENDING' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderSource?: 'ONLINE' | 'POS';
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  cashReceived?: number;
  changeAmount?: number;
  notes?: string;
  shippingAddress: string;
  items: OrderItem[];
  createdAt: string;
}

