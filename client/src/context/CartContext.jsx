import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY_CART = 'scentora_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
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
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist cart to localStorage', e);
    }
  }, [items]);

  const notify = (message) => {
    setLastNotification({ id: Date.now(), message });
    setTimeout(() => setLastNotification(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const addQty = Math.max(1, Number(quantity) || 1);

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + addQty,
        };
        return updated;
      } else {
        return [...prev, { product, quantity: addQty }];
      }
    });

    notify(`Added ${product.name} (${addQty}) to your shopping cart.`);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        notify(`Removed ${item.product.name} from your cart.`);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    const validQty = Math.max(1, Number(quantity) || 1);
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

  const applyCoupon = (code) => {
    const cleaned = (code || '').trim().toUpperCase();
    if (cleaned === 'SCENT10') {
      setCoupon({ code: 'SCENT10', discountPercent: 10 });
      notify('Promo code SCENT10 applied: 10% discount added!');
      return { success: true, message: '10% discount applied successfully.' };
    }
    return { success: false, message: 'Invalid or expired promo code. Try SCENT10.' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    notify('Promo code removed.');
  };

  // Calculations
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
