import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useProducts } from './ProductContext';
import { accountApi } from '../services/scentoraApi';
import { useAccountSync } from '../hooks/useAccountSync';

const WishlistContext = createContext(null);
const STORAGE_KEY_WISHLIST = 'scentora_wishlist_v1';

// Saved account wishlist first, then anything new the guest added
const mergeWishlists = (serverProducts, localProducts) => {
  const ids = new Set(serverProducts.map((p) => p.id));
  return [...serverProducts, ...localProducts.filter((p) => !ids.has(p.id))];
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { products } = useProducts();

  const [storedWishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Error reading stored wishlist:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(storedWishlist));
    } catch (e) {
      console.warn('Could not persist wishlist to localStorage', e);
    }
  }, [storedWishlist]);

  useAccountSync({
    user,
    value: storedWishlist,
    setValue: setWishlist,
    load: accountApi.getWishlist,
    save: accountApi.saveWishlist,
    merge: mergeWishlists,
    empty: [],
  });

  // Current catalogue data only; products removed from the catalogue disappear
  const wishlist = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return storedWishlist.filter((item) => byId.has(item.id)).map((item) => byId.get(item.id));
  }, [storedWishlist, products]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
