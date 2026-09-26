import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../types/ecommerce';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  discountAmount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: 'cart-init-1',
          productId: 'p1',
          product: {
            id: 'p1',
            name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
            slug: 'naruto-sage-mode-drop-shoulder-tshirt',
            description: 'Sleek dark oversized fit tee with high-density puff print.',
            price: 34.99,
            oldPrice: 44.99,
            isNew: true,
            isBestSeller: true,
            isTrending: true,
            categoryId: 'cat1',
            stock: 65,
            material: '100% Combed Heavyweight Cotton (240 GSM)',
            printQuality: 'Screen & Puff Print',
            rating: 4.9,
            reviewCount: 28,
            images: [
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
            ],
          },
          size: 'L',
          color: 'Obsidian Black',
          quantity: 1,
        },
      ],
      isOpen: false,
      couponCode: null,
      discountAmount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.size === size && item.color === color
          );

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems, isOpen: true };
          }

          const newItem: CartItem = {
            id: `${product.id}-${size}-${color}-${Date.now()}`,
            productId: product.id,
            product,
            size,
            color,
            quantity,
          };

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, discountAmount: discount });
      },

      removeCoupon: () => {
        set({ couponCode: null, discountAmount: 0 });
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discountAmount: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discountAmount;
        const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
        return Math.max(0, subtotal - discount + shippingFee);
      },
    }),
    {
      name: 'nexwear-cart',
      partialize: (state) => ({ items: state.items, couponCode: state.couponCode, discountAmount: state.discountAmount }),
    }
  )
);
