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
  guestEmail: string;
  guestName: string;
  shippingAddress: string;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
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
    guestEmail: { type: String, required: true },
    guestName: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, default: 'Cash On Delivery' },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
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
