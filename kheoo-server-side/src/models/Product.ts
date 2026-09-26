import { Schema, model, Document } from 'mongoose';

export interface IProductVariant {
  size: string;
  color?: string;
  stock: number;
  sku?: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  isNewProduct: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  categoryId: string;
  stock: number;
  material: string;
  printQuality: string;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: IProductVariant[];
}

const productVariantSchema = new Schema<IProductVariant>({
  size: { type: String, required: true },
  color: { type: String, default: 'Black' },
  stock: { type: Number, default: 20 },
  sku: { type: String },
});

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    isNewProduct: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    categoryId: { type: String, required: true },
    stock: { type: Number, default: 50 },
    material: { type: String, default: '100% Combed Heavyweight Cotton (240 GSM)' },
    printQuality: { type: String, default: 'High-Density Screen & Puff Print' },
    rating: { type: Number, default: 4.9 },
    reviewCount: { type: Number, default: 12 },
    images: [{ type: String }],
    variants: [productVariantSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for frontend compatibility (isNew)
productSchema.virtual('isNew').get(function () {
  return this.isNewProduct;
});

// Indexes for fast searching & filtering
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ categoryId: 1 });

export const Product = model<IProduct>('Product', productSchema);
