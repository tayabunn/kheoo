import { ALL_PRODUCTS } from '../data/products';
import { Product } from '../types/ecommerce';

/**
 * Tool 1: search_products
 * Allows AI to search KHEOO catalog and return rich structured product data for Generative UI rendering.
 */
export interface SearchProductsInput {
  query?: string;
  category?: 'anime' | 'marvel' | 'dc' | 'all';
  maxPrice?: number;
  featuredOnly?: boolean;
}

export interface SearchProductsResult {
  tool: 'search_products';
  found: boolean;
  totalFound: number;
  products: Product[];
  category?: string;
}

export function executeSearchProducts(input: SearchProductsInput): SearchProductsResult {
  let filtered = [...ALL_PRODUCTS];

  if (input.category && input.category !== 'all') {
    filtered = filtered.filter(p => p.categoryId?.toLowerCase() === input.category?.toLowerCase());
  }

  if (input.maxPrice && input.maxPrice > 0) {
    filtered = filtered.filter(p => p.price <= (input.maxPrice || 9999));
  }

  if (input.featuredOnly) {
    filtered = filtered.filter(p => p.isTrending || p.isBestSeller || p.isNew);
  }

  if (input.query && input.query.trim().length > 0) {
    const q = input.query.toLowerCase().trim();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q)
    );
  }

  // Fallback to top products if query too narrow
  const finalProducts = filtered.length > 0 ? filtered.slice(0, 4) : ALL_PRODUCTS.slice(0, 4);

  return {
    tool: 'search_products',
    found: filtered.length > 0,
    totalFound: filtered.length,
    products: finalProducts,
    category: input.category || 'all',
  };
}

/**
 * Tool 2: recommend_size
 * Calculates boxy drop-shoulder sizing recommendation from height, weight, and fit preference.
 */
export interface RecommendSizeInput {
  height: string; // e.g. "5'9", "5.9", "175cm"
  weightKg?: number; // e.g. 70
  fitPreference?: 'oversized' | 'regular' | 'fitted';
}

export interface RecommendSizeResult {
  tool: 'recommend_size';
  recommendedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  fitType: string;
  chestInches: number;
  lengthInches: number;
  gsmInfo: string;
  advice: string;
}

export function executeRecommendSize(input: RecommendSizeInput): RecommendSizeResult {
  const heightStr = (input.height || '').toLowerCase();
  let heightInInches = 68; // default 5'8"

  if (heightStr.includes("'") || heightStr.includes("’") || heightStr.includes("ft")) {
    const parts = heightStr.replace(/[^0-9']/g, '').split(/['’]/);
    const feet = parseInt(parts[0], 10) || 5;
    const inches = parseInt(parts[1], 10) || 7;
    heightInInches = feet * 12 + inches;
  } else if (heightStr.includes('cm')) {
    const cm = parseInt(heightStr.replace(/[^0-9]/g, ''), 10) || 172;
    heightInInches = Math.round(cm / 2.54);
  } else {
    const num = parseFloat(heightStr) || 5.8;
    if (num > 100) {
      heightInInches = Math.round(num / 2.54);
    } else {
      const feet = Math.floor(num);
      const inches = Math.round((num - feet) * 10);
      heightInInches = feet * 12 + inches;
    }
  }

  let size: 'S' | 'M' | 'L' | 'XL' | 'XXL' = 'M';
  let chest = 42;
  let length = 28;

  if (heightInInches < 67) {
    size = 'S';
    chest = 40;
    length = 27;
  } else if (heightInInches <= 69) {
    size = 'M';
    chest = 42;
    length = 28;
  } else if (heightInInches <= 72) {
    size = 'L';
    chest = 44;
    length = 29;
  } else if (heightInInches <= 75) {
    size = 'XL';
    chest = 46;
    length = 30;
  } else {
    size = 'XXL';
    chest = 48;
    length = 31;
  }

  if (input.fitPreference === 'fitted' && size !== 'S') {
    if (size === 'XXL') size = 'XL';
    else if (size === 'XL') size = 'L';
    else if (size === 'L') size = 'M';
    else if (size === 'M') size = 'S';
  }

  return {
    tool: 'recommend_size',
    recommendedSize: size,
    fitType: input.fitPreference === 'fitted' ? 'Fitted Boxy Cut' : 'Signature Oversized Streetwear Drape',
    chestInches: chest,
    lengthInches: length,
    gsmInfo: '240+ GSM 100% Combed Ringspun Heavyweight Cotton',
    advice: `For your height (${input.height}), Size ${size} will provide the signature KHEOO drop-shoulder boxy drape without sagging.`,
  };
}

/**
 * Tool 3: track_order
 * Simulates real-time order tracking stage timeline.
 */
export interface TrackOrderInput {
  orderIdOrPhone: string;
}

export interface TrackOrderResult {
  tool: 'track_order';
  orderId: string;
  status: 'Processing' | 'Bio-Washed & Checked' | 'In Transit' | 'Out for Delivery';
  currentStep: number;
  courier: string;
  trackingCode: string;
  estimatedDelivery: string;
  shippingCity: string;
  itemsSummary: string;
}

export function executeTrackOrder(input: TrackOrderInput): TrackOrderResult {
  const code = (input.orderIdOrPhone || 'KH-8921').toUpperCase();
  const cleanId = code.startsWith('KH-') ? code : `KH-${code.slice(0, 6)}`;

  return {
    tool: 'track_order',
    orderId: cleanId,
    status: 'In Transit',
    currentStep: 3,
    courier: 'Steadfast Courier (Dhaka Express)',
    trackingCode: `STF-${Math.floor(100000 + Math.random() * 900000)}`,
    estimatedDelivery: 'Tomorrow, within 24-48 Hours',
    shippingCity: 'Dhaka, Bangladesh',
    itemsSummary: '1x Naruto Sage Mode (Size L), 1x Gojo Unlimited Void (Size L)',
  };
}

/**
 * Tool 4: apply_coupon
 * Validates promo coupons and provides one-click claim.
 */
export interface ApplyCouponInput {
  code: string;
}

export interface ApplyCouponResult {
  tool: 'apply_coupon';
  valid: boolean;
  code: string;
  discountPercent: number;
  minPurchase: number;
  message: string;
}

export function executeApplyCoupon(input: ApplyCouponInput): ApplyCouponResult {
  const code = (input.code || '').toUpperCase().trim();

  if (code === 'KHEOO10' || code.includes('10')) {
    return {
      tool: 'apply_coupon',
      valid: true,
      code: 'KHEOO10',
      discountPercent: 10,
      minPurchase: 0,
      message: '10% discount voucher activated! Apply directly to your bag.',
    };
  }

  if (code === 'KHEOO20' || code.includes('20')) {
    return {
      tool: 'apply_coupon',
      valid: true,
      code: 'KHEOO20',
      discountPercent: 20,
      minPurchase: 50,
      message: '20% discount voucher activated for orders above ৳2000 / $50.',
    };
  }

  return {
    tool: 'apply_coupon',
    valid: false,
    code: code || 'UNKNOWN',
    discountPercent: 0,
    minPurchase: 0,
    message: `Coupon "${code}" is invalid or expired. Use code KHEOO10 instead!`,
  };
}
