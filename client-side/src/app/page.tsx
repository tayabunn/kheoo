import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { NewArrivals } from '../components/home/NewArrivals';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Newsletter } from '../components/home/Newsletter';
import { Product } from '../types/ecommerce';

async function getHomeProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:5000/api/v1/products', {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (err) {
    console.log('Backend API offline during SSR, using static fallback dataset');
  }

  // Fallback static dataset for build-time resilience
  return [
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
}

export default async function HomePage() {
  const products = await getHomeProducts();

  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <NewArrivals products={products} />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
}
