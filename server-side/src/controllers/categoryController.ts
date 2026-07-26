import { Request, Response } from 'express';

const MOCK_CATEGORIES = [
  { id: 'cat-anime', name: 'Anime Streetwear', slug: 'anime' },
  { id: 'cat-marvel', name: 'Marvel Drop Shoulders', slug: 'marvel' },
  { id: 'cat-dc', name: 'DC Gothic Tactical', slug: 'dc' },
];

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ success: true, data: MOCK_CATEGORIES });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Server error fetching categories' });
  }
};
