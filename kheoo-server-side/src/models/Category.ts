import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: Schema.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    image: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory>('Category', categorySchema);
