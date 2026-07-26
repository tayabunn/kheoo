import { prisma } from '../lib/prisma';

async function main() {
  console.log('Seeding NexWear Streetwear Database...');

  // Clean existing tables in reverse dependency order
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.banner.deleteMany();

  // 1. Create Categories
  const animeCategory = await prisma.category.create({
    data: {
      name: 'Anime',
      slug: 'anime',
      description: 'Iconic streetwear designs inspired by legendary anime sagas.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    },
  });

  const marvelCategory = await prisma.category.create({
    data: {
      name: 'Marvel',
      slug: 'marvel',
      description: 'Heavyweight graphic drop shoulders featuring Marvel heroes & villains.',
      image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
    },
  });

  const dcCategory = await prisma.category.create({
    data: {
      name: 'DC Comics',
      slug: 'dc',
      description: 'Dark, edgy, tactical streetwear tees showcasing the DC universe.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    },
  });

  // Subcategories
  const narutoSub = await prisma.category.create({
    data: {
      name: 'Naruto',
      slug: 'naruto',
      parentId: animeCategory.id,
      description: 'Hidden Leaf & Akatsuki inspired streetwear graphics.',
    },
  });

  const spidermanSub = await prisma.category.create({
    data: {
      name: 'Spider-Man',
      slug: 'spider-man',
      parentId: marvelCategory.id,
      description: 'Web-slinging drop shoulder oversized fits.',
    },
  });

  const batmanSub = await prisma.category.create({
    data: {
      name: 'Batman',
      slug: 'batman',
      parentId: dcCategory.id,
      description: 'Gotham Gothic dark theme graphic tees.',
    },
  });

  // 2. Create Products
  const productsData = [
    {
      name: 'Naruto Sage Mode Heavyweight Drop Shoulder Tee',
      slug: 'naruto-sage-mode-drop-shoulder-tshirt',
      description: 'Sleek dark oversized fit tee with high-density puff print of Naruto in Six Paths Sage Mode on the back and subtle Konoha emblem on the chest.',
      details: 'Fabric: 100% Combed Heavyweight Cotton (240 GSM)\nFit: Oversized Drop Shoulder\nPrint: Screen & Puff Print\nNeckline: Thick Ribbed Crewneck\nPre-shrunk fabric.',
      price: 34.99,
      oldPrice: 44.99,
      isNew: true,
      isBestSeller: true,
      isTrending: true,
      categoryId: animeCategory.id,
      stock: 65,
      rating: 4.9,
      reviewCount: 28,
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      ],
    },
    {
      name: 'Gojo Unlimited Void Oversized Drop Shoulder Tee',
      slug: 'gojo-unlimited-void-oversized-tee',
      description: 'Jujutsu Kaisen special edition tee featuring Satoru Gojos Domain Expansion graphic print across the back in glowing cyan typography.',
      details: '240 GSM Luxury Heavy Cotton. Acid-wash vintage black aesthetic. Double-needle stitching throughout for maximum durability.',
      price: 38.99,
      oldPrice: 49.99,
      isNew: true,
      isBestSeller: true,
      isTrending: true,
      categoryId: animeCategory.id,
      stock: 40,
      rating: 5.0,
      reviewCount: 42,
      images: [
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      ],
    },
    {
      name: 'Spider-Man Symbiote Vintage Drop Shoulder Tee',
      slug: 'spider-man-symbiote-vintage-tee',
      description: 'Dark symbiote venom web graphic print over washed charcoal heavyweight cotton. Premium boxy silhouette.',
      details: 'Material: 240 GSM Heavyweight Cotton\nWash: Vintage Charcoal Acid Wash\nRibbing: 1.25" Heavy Crew Neck Collar',
      price: 36.99,
      oldPrice: 45.99,
      isNew: false,
      isBestSeller: true,
      isTrending: true,
      categoryId: marvelCategory.id,
      stock: 50,
      rating: 4.8,
      reviewCount: 19,
      images: [
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      ],
    },
    {
      name: 'Batman Dark Knight Tactical Oversized Tee',
      slug: 'batman-dark-knight-tactical-tee',
      description: 'Gotham City silhouette with tactical bat logo stencil print. Engineered for street aesthetic and extreme comfort.',
      details: '100% Ringspun Cotton, 240 GSM Heavy Fabric, Anti-pilling technology, Custom inner neck taping.',
      price: 32.99,
      oldPrice: 42.99,
      isNew: true,
      isBestSeller: false,
      isTrending: true,
      categoryId: dcCategory.id,
      stock: 30,
      rating: 4.7,
      reviewCount: 15,
      images: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      ],
    },
    {
      name: 'Attack on Titan Survey Corps Wings of Freedom Tee',
      slug: 'aot-survey-corps-wings-of-freedom-tee',
      description: 'Minimalist front crest and bold back wings of freedom emblem in metallic silver puff ink on pitch black cotton.',
      details: '240 GSM Heavy Weight Fabric, Boxy streetwear cut, Reinforced seams.',
      price: 35.99,
      oldPrice: 44.99,
      isNew: false,
      isBestSeller: true,
      isTrending: false,
      categoryId: animeCategory.id,
      stock: 55,
      rating: 4.9,
      reviewCount: 31,
      images: [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      ],
    },
    {
      name: 'Joker Why So Serious Gothic Drop Shoulder Tee',
      slug: 'joker-why-so-serious-gothic-tee',
      description: 'Dark splatter print featuring iconic Joker quote in distressed streetwear typography across chest and shoulders.',
      details: '240 GSM 100% Pure Cotton, Pigment washed black, Relaxed drop shoulder sleeve.',
      price: 33.99,
      oldPrice: 41.99,
      isNew: true,
      isBestSeller: false,
      isTrending: true,
      categoryId: dcCategory.id,
      stock: 45,
      rating: 4.8,
      reviewCount: 22,
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      ],
    },
  ];

  for (const prod of productsData) {
    const createdProduct = await prisma.product.create({
      data: prod,
    });

    // Create Variants (S, M, L, XL, XXL)
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    for (const sz of sizes) {
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: `${prod.slug.toUpperCase()}-${sz}`,
          size: sz,
          color: 'Obsidian Black',
          stock: 15,
        },
      });
    }
  }

  // 3. Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'NEXWEAR10',
        discountPercent: 10,
        minPurchase: 30,
      },
      {
        code: 'STREETWEAR20',
        discountPercent: 20,
        minPurchase: 75,
      },
    ],
  });

  // 4. Create Banners
  await prisma.banner.createMany({
    data: [
      {
        title: 'DROP SHOULDER STREETWEAR COLLECTION',
        subtitle: '240+ GSM Heavyweight Cotton. Engineered for Ultimate Fit & Comfort.',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1600&auto=format&fit=crop&q=80',
        buttonText: 'EXPLORE DROP 01',
        link: '/shop',
        position: 1,
      },
      {
        title: 'ANIME X STREETWEAR COLLAB',
        subtitle: 'Naruto, Gojo & Titan Survey Corps High-Density Prints.',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80',
        buttonText: 'SHOP ANIME DROP',
        link: '/anime',
        position: 2,
      },
    ],
  });

  console.log('NexWear Database Seeded Successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
