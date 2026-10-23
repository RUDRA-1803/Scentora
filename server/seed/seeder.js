import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { INITIAL_PRODUCTS } from './data/products.js';
import { CATEGORIES } from './data/categories.js';
import { SEED_USERS } from './data/users.js';
import { SEED_ORDERS } from './data/orders.js';

const productDocs = () => INITIAL_PRODUCTS.map(({ id, ...product }) => ({ _id: id, ...product }));
const categoryDocs = () => CATEGORIES.map(({ id, ...category }) => ({ _id: id, ...category }));

/**
 * Seeds products and categories. With reset, existing catalogue data is replaced;
 * without it, a collection is only seeded when empty.
 */
export const seedCatalogue = async ({ reset = false } = {}) => {
  const result = { products: 0, categories: 0 };

  if (reset) await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);

  if (reset || (await Product.estimatedDocumentCount()) === 0) {
    result.products = (await Product.insertMany(productDocs())).length;
  }
  if (reset || (await Category.estimatedDocumentCount()) === 0) {
    result.categories = (await Category.insertMany(categoryDocs())).length;
  }
  return result;
};

const seedUsers = async () => {
  if ((await User.estimatedDocumentCount()) > 0) return 0;

  for (const { password, ...fields } of SEED_USERS) {
    const user = new User(fields);
    await user.setPassword(password);
    await user.save();
  }
  return SEED_USERS.length;
};

const seedOrders = async () => {
  if ((await Order.estimatedDocumentCount()) > 0) return 0;

  const users = await User.find({ email: { $in: SEED_ORDERS.map((o) => o.userEmail) } });
  const idByEmail = new Map(users.map((u) => [u.email, u._id]));

  const docs = SEED_ORDERS.map(({ userEmail, ...order }) => ({ ...order, user: idByEmail.get(userEmail) || null }));
  return (await Order.insertMany(docs)).length;
};

/**
 * Seeds every collection. With reset, all Scentora data is wiped first.
 */
export const seedDatabase = async ({ reset = false } = {}) => {
  if (reset) await Promise.all([User.deleteMany({}), Order.deleteMany({})]);

  const catalogue = await seedCatalogue({ reset });
  const users = await seedUsers();
  const orders = await seedOrders();
  return { ...catalogue, users, orders };
};
