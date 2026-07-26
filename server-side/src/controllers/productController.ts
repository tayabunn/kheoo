import { Request, Response } from 'express';

// Sample dataset ready to be replaced with MongoDB / Mongoose Model queries
const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
    slug: 'naruto-sage-mode-drop-shoulder-tshirt',
    description: 'Sleek dark oversized fit tee with high-density puff print of Naruto in Six Paths Sage Mode.',
    price: 34.99,
    oldPrice: 44.99,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    categoryId: 'anime',
    stock: 65,
    material: '100% Combed Heavyweight Cotton (240 GSM)',
    printQuality: 'Screen & Puff Print',
    rating: 4.9,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p2',
    name: 'Gojo Unlimited Void Oversized Drop Shoulder Tee',
    slug: 'gojo-unlimited-void-oversized-tee',
    description: 'Jujutsu Kaisen special edition tee featuring Gojo Domain Expansion graphic print.',
    price: 38.99,
    oldPrice: 49.99,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    categoryId: 'anime',
    stock: 40,
    material: '240 GSM Luxury Heavy Cotton',
    printQuality: 'High-Density Puff Print',
    rating: 5.0,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p3',
    name: 'Spider-Man Symbiote Vintage Drop Shoulder Tee',
    slug: 'spider-man-symbiote-vintage-tee',
    description: 'Dark symbiote venom web graphic print over washed charcoal heavyweight cotton.',
    price: 36.99,
    oldPrice: 45.99,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    categoryId: 'marvel',
    stock: 50,
    material: '240 GSM Heavyweight Cotton',
    printQuality: 'Vintage Acid Wash Screen Print',
    rating: 4.8,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p4',
    name: 'Batman Dark Knight Tactical Oversized Tee',
    slug: 'batman-dark-knight-tactical-tee',
    description: 'Gotham City silhouette with tactical bat logo stencil print.',
    price: 32.99,
    oldPrice: 42.99,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    categoryId: 'dc',
    stock: 30,
    material: '240 GSM 100% Ringspun Cotton',
    printQuality: 'Tactical Stencil Print',
    rating: 4.7,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    ],
  },
];

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, isNew, isBestSeller, isTrending } = req.query;

    let filtered = [...MOCK_PRODUCTS];

    if (category && typeof category === 'string') {
      filtered = filtered.filter((p) => p.categoryId.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (isNew === 'true') filtered = filtered.filter((p) => p.isNew);
    if (isBestSeller === 'true') filtered = filtered.filter((p) => p.isBestSeller);
    if (isTrending === 'true') filtered = filtered.filter((p) => p.isTrending);

    res.json({
      success: true,
      data: filtered,
      pagination: {
        page: 1,
        limit: 12,
        total: filtered.length,
        totalPages: 1,
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
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

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
