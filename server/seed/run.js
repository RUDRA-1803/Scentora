/**
 * CLI seeder.
 *   npm run seed         — fills empty collections only
 *   npm run seed:reset   — wipes Scentora data and reseeds everything
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedDatabase } from './seeder.js';

dotenv.config();

const reset = process.argv.includes('--reset');

try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  const result = await seedDatabase({ reset });
  console.log(`✅ Seed complete${reset ? ' (reset)' : ''}:`, result);
} catch (error) {
  console.error('❌ Seeding failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
