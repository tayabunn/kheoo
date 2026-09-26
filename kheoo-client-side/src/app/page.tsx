import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { NewArrivals } from '../components/home/NewArrivals';
import { NextDropCountdown } from '../components/home/NextDropCountdown';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Newsletter } from '../components/home/Newsletter';
import { Product } from '../types/ecommerce';

async function getHomeProducts(): Promise<Product[]> {
  let apiProducts: Product[] = [];
  try {
    const res = await fetch('http://localhost:5000/api/v1/products', {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        apiProducts = data.data;
      }
    }
  } catch (err) {
    console.log('Backend API offline during SSR, using static fallback dataset');
  }

  if (apiProducts.length >= 10) {
    return apiProducts;
  }

  // Combine API products with static fallback to ensure at least 10 items (5 per row)
  const existingIds = new Set(apiProducts.map((p) => p.id || (p as any)._id));
  const additionalProducts = fallbackProducts.filter((p) => !existingIds.has(p.id));
  return [...apiProducts, ...additionalProducts].slice(0, 10);
}

const fallbackProducts: Product[] = [
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
    {
      id: 'p5',
      name: 'Attack on Titan Survey Corps Heavyweight Tee',
      slug: 'attack-on-titan-survey-corps-tee',
      description: 'Wings of Freedom embroidered graphic on vintage heavy cotton.',
      price: 35.99,
      oldPrice: 45.99,
      isNew: true,
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
      id: 'p6',
      name: 'Jujutsu Kaisen Sukuna King of Curses Tee',
      slug: 'sukuna-king-of-curses-tee',
      description: 'Malevolent Shrine back graphic with crimson foil print details.',
      price: 37.99,
      oldPrice: 48.99,
      isNew: true,
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
      id: 'p7',
      name: 'Cyberpunk Neo Tokyo Graphic Drop Tee',
      slug: 'cyberpunk-neo-tokyo-tee',
      description: 'Futuristic Kanji street typography with neon graphic back print.',
      price: 33.99,
      oldPrice: 42.99,
      isNew: false,
      isBestSeller: true,
      isTrending: true,
      categoryId: 'streetwear',
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
      id: 'p8',
      name: 'One Piece Gear 5 Sun God Nika Graphic Tee',
      slug: 'one-piece-gear-5-nika-tee',
      description: 'Luffy Gear 5 drum of liberation full-color back print.',
      price: 39.99,
      oldPrice: 49.99,
      isNew: true,
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
      id: 'p9',
      name: 'Demon Slayer Tanjiro Hinokami Kagura Tee',
      slug: 'tanjiro-hinokami-kagura-tee',
      description: 'Flame Breathing solar dragon sword motif with metallic gold ink.',
      price: 36.99,
      oldPrice: 46.99,
      isNew: false,
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
      id: 'p10',
      name: 'Dragon Ball Z Super Saiyan God Son Goku Tee',
      slug: 'dbz-super-saiyan-goku-tee',
      description: 'Vintage distress print of Goku powering up in Kaio-ken Aura.',
      price: 34.99,
      oldPrice: 44.99,
      isNew: true,
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
  ];

export default async function HomePage() {
  const products = await getHomeProducts();

  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <NewArrivals products={products} />
      <NextDropCountdown />
      <WhyChooseUs />
    </div>
  );
}
