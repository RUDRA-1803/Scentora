/**
 * Demo accounts. Passwords are hashed by the seeder before saving.
 */
export const SEED_USERS = [
  {
    name: 'Scentora Atelier Admin',
    email: 'admin@scentora.com',
    password: 'scentora2026',
    role: 'admin',
  },
  {
    name: 'Scentora Connoisseur',
    email: 'connoisseur@scentora.com',
    password: 'perfume123',
    phone: '+91 98765 43210',
    address: { street: '42 Marine Drive, Nariman Point', city: 'Mumbai', state: 'Maharashtra', postalCode: '400021' },
    preferences: { fragranceFamily: 'Woody Oriental', newsletter: true },
  },
  {
    name: 'Aaditya Sharma',
    email: 'aaditya.sharma@example.com',
    password: 'perfume123',
    phone: '+91 98765 43210',
    address: { street: '42 Marine Drive, Nariman Point', city: 'Mumbai', state: 'Maharashtra', postalCode: '400021' },
    preferences: { fragranceFamily: 'Woody Oriental', newsletter: true },
  },
  {
    name: 'Natasha Singhal',
    email: 'natasha.s@example.com',
    password: 'perfume123',
    phone: '+91 98112 34567',
    address: { street: '15 Barakhamba Road, Connaught Place', city: 'New Delhi', state: 'Delhi', postalCode: '110001' },
    preferences: { fragranceFamily: 'Floral', newsletter: true },
  },
  {
    name: 'Meera Chawla',
    email: 'meera.chawla@example.com',
    password: 'perfume123',
    phone: '+91 94220 11223',
    address: { street: '7 Koregaon Park Lane', city: 'Pune', state: 'Maharashtra', postalCode: '411001' },
    preferences: { fragranceFamily: 'Fresh Citrus', newsletter: false },
  },
];
