import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, size, isNew, isBestSeller, isTrending, sort, page = '1', limit = '12' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (category && typeof category === 'string') {
      const catObj = await prisma.category.findUnique({
        where: { slug: category },
      });
      if (catObj) {
        where.categoryId = catObj.id;
      }
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (isNew === 'true') where.isNew = true;
    if (isBestSeller === 'true') where.isBestSeller = true;
    if (isTrending === 'true') where.isTrending = true;

    if (size && typeof size === 'string') {
      where.variants = {
        some: {
          size: { equals: size, mode: 'insensitive' },
        },
      };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'rating') orderBy = { rating: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error fetching product by slug:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
