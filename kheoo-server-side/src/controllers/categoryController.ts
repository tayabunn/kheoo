import { Request, Response } from 'express';
import { Category } from '../models/Category';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error: any) {
    console.error('Error fetching categories from MongoDB:', error);
    res.status(500).json({ success: false, message: 'Server error fetching categories' });
  }
};
