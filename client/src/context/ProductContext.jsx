import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/categories';

const ProductContext = createContext(null);

const STORAGE_KEY_PRODUCTS = 'scentora_products_v1';
const STORAGE_KEY_CATEGORIES = 'scentora_categories_v1';

export const ProductProvider = ({ children }) => {
  // Load products from localStorage or fall back to INITIAL_PRODUCTS
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored products:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load categories from localStorage or fall back to INITIAL_CATEGORIES
  const [categories, setCategories] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored categories:', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.warn('Could not save categories to localStorage', e);
    }
  }, [categories]);

  // Lookup helper
  const getProductById = (id) => {
    if (!id) return null;
    return products.find((p) => p.id === id || p.slug === id) || null;
  };

  // Admin mutation helpers
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `sc-${Date.now().toString(36)}`,
      createdAt: newProduct.createdAt || new Date().toISOString(),
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
      rating: Number(newProduct.rating) || 5.0,
      reviewCount: Number(newProduct.reviewCount) || 0,
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedFields,
            price: Number(updatedFields.price !== undefined ? updatedFields.price : p.price),
            stock: Number(updatedFields.stock !== undefined ? updatedFields.stock : p.stock),
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = (category) => {
    const newCat = {
      ...category,
      id: category.slug || `cat-${Date.now().toString(36)}`,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
  };

  const resetToSeedData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_CATEGORIES);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        resetToSeedData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext;
