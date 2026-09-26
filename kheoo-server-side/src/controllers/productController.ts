import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, size, isNew, isBestSeller, isTrending, sort, page = '1', limit = '12' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const filter: any = {};

    if (category && typeof category === 'string') {
      const catObj = await Category.findOne({ slug: category.toLowerCase() });
      if (catObj) {
        filter.categoryId = catObj.slug;
      } else {
        filter.categoryId = category.toLowerCase();
      }
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (isNew === 'true') filter.isNewProduct = true;
    if (isBestSeller === 'true') filter.isBestSeller = true;
    if (isTrending === 'true') filter.isTrending = true;

    if (size && typeof size === 'string') {
      filter['variants.size'] = { $regex: new RegExp(`^${size}$`, 'i') };
    }

    let sortOptions: any = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'rating') sortOptions = { rating: -1 };

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOptions).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error: any) {
    console.error('Error fetching products from MongoDB:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    const product = await Product.findOne({ slug: slug.toLowerCase() });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error fetching product by slug from MongoDB:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
