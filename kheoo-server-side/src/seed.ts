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
      {
        name: 'Attack on Titan Survey Corps Heavyweight Tee',
        slug: 'attack-on-titan-survey-corps-tee',
        description: 'Wings of Freedom embroidered graphic on vintage heavy cotton.',
        price: 35.99,
        oldPrice: 45.99,
        isNewProduct: true,
        isBestSeller: true,
        isTrending: true,
        categoryId: 'anime',
        stock: 45,
        material: '240 GSM Premium Heavy Cotton',
        printQuality: 'High-Density Puff & Embroidery',
        rating: 4.9,
        reviewCount: 31,
        images: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Jujutsu Kaisen Sukuna King of Curses Tee',
        slug: 'sukuna-king-of-curses-tee',
        description: 'Malevolent Shrine back graphic with crimson foil print details.',
        price: 37.99,
        oldPrice: 48.99,
        isNewProduct: true,
        isBestSeller: false,
        isTrending: true,
        categoryId: 'anime',
        stock: 25,
        material: '240 GSM Heavyweight Cotton',
        printQuality: 'Screen & Foil Print',
        rating: 4.8,
        reviewCount: 22,
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Cyberpunk Neo Tokyo Graphic Drop Tee',
        slug: 'cyberpunk-neo-tokyo-tee',
        description: 'Futuristic Kanji street typography with neon graphic back print.',
        price: 33.99,
        oldPrice: 42.99,
        isNewProduct: false,
        isBestSeller: true,
        isTrending: true,
        categoryId: 'anime',
        stock: 55,
        material: '100% Combed Cotton (240 GSM)',
        printQuality: 'HD Screen Print',
        rating: 4.7,
        reviewCount: 18,
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'One Piece Gear 5 Sun God Nika Graphic Tee',
        slug: 'one-piece-gear-5-nika-tee',
        description: 'Luffy Gear 5 drum of liberation full-color back print.',
        price: 39.99,
        oldPrice: 49.99,
        isNewProduct: true,
        isBestSeller: true,
        isTrending: true,
        categoryId: 'anime',
        stock: 60,
        material: '240 GSM Luxury Heavy Cotton',
        printQuality: 'Full-Color HD Screen Print',
        rating: 5.0,
        reviewCount: 54,
        images: [
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Demon Slayer Tanjiro Hinokami Kagura Tee',
        slug: 'tanjiro-hinokami-kagura-tee',
        description: 'Flame Breathing solar dragon sword motif with metallic gold ink.',
        price: 36.99,
        oldPrice: 46.99,
        isNewProduct: false,
        isBestSeller: false,
        isTrending: true,
        categoryId: 'anime',
        stock: 35,
        material: '240 GSM Heavyweight Cotton',
        printQuality: 'Screen & Metallic Print',
        rating: 4.8,
        reviewCount: 16,
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        ],
      },
      {
        name: 'Dragon Ball Z Super Saiyan God Son Goku Tee',
        slug: 'dbz-super-saiyan-goku-tee',
        description: 'Vintage distress print of Goku powering up in Kaio-ken Aura.',
        price: 34.99,
        oldPrice: 44.99,
        isNewProduct: true,
        isBestSeller: true,
        isTrending: false,
        categoryId: 'anime',
        stock: 40,
        material: '240 GSM 100% Cotton',
        printQuality: 'Vintage Acid Wash Screen Print',
        rating: 4.9,
        reviewCount: 27,
        images: [
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
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
