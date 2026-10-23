import { request } from './api';

/**
 * Typed wrappers around every Scentora backend endpoint.
 * Each function resolves with the response payload or throws an Error with a readable message.
 */

export const authApi = {
  login: (email, password) => request('post', '/auth/login', { email, password }),
  adminLogin: (email, password) => request('post', '/auth/admin/login', { email, password }),
  register: (userData) => request('post', '/auth/register', userData),
  me: () => request('get', '/auth/me'),
};

export const productApi = {
  list: () => request('get', '/products'),
  create: (product) => request('post', '/products', product),
  update: (id, fields) => request('put', `/products/${encodeURIComponent(id)}`, fields),
  remove: (id) => request('delete', `/products/${encodeURIComponent(id)}`),
};

export const categoryApi = {
  list: () => request('get', '/categories'),
  create: (category) => request('post', '/categories', category),
  remove: (id) => request('delete', `/categories/${encodeURIComponent(id)}`),
};

export const orderApi = {
  create: (order) => request('post', '/orders', order),
  mine: () => request('get', '/orders/mine'),
  all: () => request('get', '/orders'),
  get: (id) => request('get', `/orders/${encodeURIComponent(id)}`),
  updateStatus: (id, status) => request('patch', `/orders/${encodeURIComponent(id)}/status`, { status }),
  remove: (id) => request('delete', `/orders/${encodeURIComponent(id)}`),
};

export const accountApi = {
  updateProfile: (fields) => request('put', '/account/profile', fields),
  getCart: () => request('get', '/account/cart'),
  saveCart: (items) =>
    request('put', '/account/cart', {
      items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
    }),
  getWishlist: () => request('get', '/account/wishlist'),
  saveWishlist: (products) => request('put', '/account/wishlist', { productIds: products.map((p) => p.id) }),
};

export const adminApi = {
  customers: () => request('get', '/admin/customers'),
  resetCatalogue: () => request('post', '/admin/reset-catalogue'),
};

export const storeApi = {
  validateCoupon: (code) => request('post', '/coupons/validate', { code }),
  contact: (inquiry) => request('post', '/contact', inquiry),
  subscribe: (email) => request('post', '/newsletter', { email }),
};
