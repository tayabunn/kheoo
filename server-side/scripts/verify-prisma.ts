import { prisma } from '../lib/prisma';

async function verify() {
  try {
    const userCount = await prisma.user.count();
    console.log(`Found ${userCount} user(s) in database.`);
    console.log('✅ Connected');
  } catch (error) {
    console.error('❌ Verification failed with error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
