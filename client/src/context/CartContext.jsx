import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useProducts } from './ProductContext';
import { accountApi, storeApi } from '../services/scentoraApi';
import { useAccountSync } from '../hooks/useAccountSync';

const CartContext = createContext(null);
const STORAGE_KEY_CART = 'scentora_cart_v1';

/**
 * Combines the saved account cart with lines added as a guest.
 * Quantities for the same product are added together.
 */
const mergeCarts = (serverItems, localItems) => {
  const merged = new Map(serverItems.map((item) => [item.product.id, { ...item }]));
  localItems.forEach((item) => {
    const existing = merged.get(item.product.id);
    if (existing) existing.quantity += item.quantity;
    else merged.set(item.product.id, { ...item });
  });
  return [...merged.values()];
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { products } = useProducts();

  const [storedItems, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Error reading stored cart:', e);
      return [];
    }
  });

  const [coupon, setCoupon] = useState(null); // e.g. { code: 'SCENT10', discountPercent: 10 }
  const [lastNotification, setLastNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(storedItems));
    } catch (e) {
      console.warn('Could not persist cart to localStorage', e);
    }
  }, [storedItems]);

  useAccountSync({
    user,
    value: storedItems,
    setValue: setItems,
    load: accountApi.getCart,
    save: accountApi.saveCart,
    merge: mergeCarts,
    empty: [],
  });

  // Always show current catalogue data (price, stock) and drop products that were removed
  const items = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return storedItems
      .filter((item) => byId.has(item.product.id))
      .map((item) => ({ ...item, product: byId.get(item.product.id) }));
  }, [storedItems, products]);

  const notify = (message) => {
    setLastNotification({ id: Date.now(), message });
    setTimeout(() => setLastNotification(null), 3000);
  };

  const stockOf = (productId) => products.find((p) => p.id === productId)?.stock ?? Infinity;

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const addQty = Math.max(1, Number(quantity) || 1);
    const stock = stockOf(product.id);
    const inCart = storedItems.find((item) => item.product.id === product.id)?.quantity || 0;

    if (inCart >= stock) {
      notify(stock === 0 ? `${product.name} is currently out of stock.` : `Only ${stock} unit(s) of ${product.name} are available.`);
      return;
    }
    const finalQty = Math.min(addQty, stock - inCart);

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + finalQty,
        };
        return updated;
      } else {
        return [...prev, { product, quantity: finalQty }];
      }
    });

    notify(`Added ${product.name} (${finalQty}) to your shopping cart.`);
  };

  const removeFromCart = (productId) => {
    const item = storedItems.find((i) => i.product.id === productId);
    if (item) notify(`Removed ${item.product.name} from your cart.`);
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const validQty = Math.min(Math.max(1, Number(quantity) || 1), Math.max(1, stockOf(productId)));
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = async (code) => {
    try {
      const validCoupon = await storeApi.validateCoupon(code);
      setCoupon(validCoupon);
      notify(`Promo code ${validCoupon.code} applied: ${validCoupon.discountPercent}% discount added!`);
      return { success: true, message: `${validCoupon.discountPercent}% discount applied successfully.` };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    notify('Promo code removed.');
  };

  // Calculations (display only — the server recalculates totals when the order is placed)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountAmount = coupon
    ? Math.round((subtotal * coupon.discountPercent) / 100)
    : 0;

  const freeShippingThreshold = 3000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCharge = subtotal > 0 && !isFreeShipping ? 250 : 0;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // 18% GST (already inclusive or broken down for demo transparency)
  const taxEstimate = Math.round(subtotal * 0.18);
  const total = Math.max(0, subtotal - discountAmount + shippingCharge);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discountAmount,
        coupon,
        applyCoupon,
        removeCoupon,
        shippingCharge,
        isFreeShipping,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        taxEstimate,
        total,
        lastNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
