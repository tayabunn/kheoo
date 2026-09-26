import { Schema, model, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minPurchase: number;
  isActive: boolean;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number },
    discountAmount: { type: Number },
    minPurchase: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Coupon = model<ICoupon>('Coupon', couponSchema);
