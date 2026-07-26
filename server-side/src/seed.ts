import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { Category } from './models/Category';
import { Product } from './models/Product';
import { Coupon } from './models/Coupon';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing old MongoDB collections...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});

    console.log('Inserting Categories...');
    await Category.insertMany([
      { name: 'Anime Streetwear', slug: 'anime', description: 'Naruto, Gojo, Titan & Demon Slayer Prints' },
      { name: 'Marvel Drop Shoulders', slug: 'marvel', description: 'Spider-Man Symbiote & Venom Editions' },
      { name: 'DC Gothic Tactical', slug: 'dc', description: 'Batman & Joker Dark Graphic Tees' },
    ]);

    console.log('Inserting Products...');
    await Product.insertMany([
      {
        name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
        slug: 'naruto-sage-mode-drop-shoulder-tshirt',
        description: 'Sleek dark oversized fit tee with high-density puff print of Naruto in Six Paths Sage Mode.',
        price: 34.99,
        oldPrice: 44.99,
        isNewProduct: true,
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
        variants: [
          { size: 'S', stock: 15 },
          { size: 'M', stock: 20 },
          { size: 'L', stock: 15 },
          { size: 'XL', stock: 15 },
        ],
      },
      {
        name: 'Gojo Unlimited Void Oversized Drop Shoulder Tee',
        slug: 'gojo-unlimited-void-oversized-tee',
        description: 'Jujutsu Kaisen special edition tee featuring Gojo Domain Expansion graphic print.',
        price: 38.99,
        oldPrice: 49.99,
        isNewProduct: true,
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
        variants: [
          { size: 'M', stock: 15 },
          { size: 'L', stock: 15 },
          { size: 'XL', stock: 10 },
        ],
      },
      {
        name: 'Spider-Man Symbiote Vintage Drop Shoulder Tee',
        slug: 'spider-man-symbiote-vintage-tee',
        description: 'Dark symbiote venom web graphic print over washed charcoal heavyweight cotton.',
        price: 36.99,
        oldPrice: 45.99,
        isNewProduct: false,
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
        variants: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 20 },
          { size: 'L', stock: 20 },
        ],
      },
      {
        name: 'Batman Dark Knight Tactical Oversized Tee',
        slug: 'batman-dark-knight-tactical-tee',
        description: 'Gotham City silhouette with tactical bat logo stencil print.',
        price: 32.99,
        oldPrice: 42.99,
        isNewProduct: true,
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
        variants: [
          { size: 'M', stock: 10 },
          { size: 'L', stock: 10 },
          { size: 'XL', stock: 10 },
        ],
      },
    ]);

    console.log('Inserting Coupons...');
    await Coupon.insertMany([
      { code: 'KHEOO10', discountPercent: 10, minPurchase: 0, isActive: true },
      { code: 'KHEOO20', discountPercent: 20, minPurchase: 50, isActive: true },
    ]);

    console.log('MongoDB Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
    process.exit(1);
  }
};

seedData();
