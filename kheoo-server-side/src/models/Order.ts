import { Schema, model, Document } from 'mongoose';

export interface IOrderItem {
  productId?: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  guestEmail?: string;
  guestName?: string;
  customerName?: string;
  customerPhone?: string;
  shippingAddress?: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  orderSource: 'ONLINE' | 'POS';
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  cashReceived?: number;
  changeAmount?: number;
  notes?: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  items: IOrderItem[];
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: String },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, default: 'L' },
  color: { type: String, default: 'Black' },
  image: { type: String },
});

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    guestEmail: { type: String, default: 'pos@kheoo.com' },
    guestName: { type: String, default: 'Walk-in Customer' },
    customerName: { type: String },
    customerPhone: { type: String },
    shippingAddress: { type: String, default: 'In-Store Counter' },
    paymentMethod: { type: String, default: 'Cash' },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PENDING', 'REFUNDED'],
      default: 'PAID',
    },
    orderSource: {
      type: String,
      enum: ['ONLINE', 'POS'],
      default: 'ONLINE',
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    cashReceived: { type: Number, default: 0 },
    changeAmount: { type: Number, default: 0 },
    notes: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
    },
    items: [orderItemSchema],
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>('Order', orderSchema);

