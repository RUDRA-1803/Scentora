import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productApi, categoryApi, adminApi } from '../services/scentoraApi';
import AppStatusScreen from '../components/common/AppStatusScreen';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [loadError, setLoadError] = useState(null);

  const loadCatalogue = useCallback(async () => {
    setStatus('loading');
    try {
      const [productList, categoryList] = await Promise.all([productApi.list(), categoryApi.list()]);
      setProducts(productList);
      setCategories(categoryList);
      setStatus('ready');
    } catch (error) {
      setLoadError(error.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadCatalogue();
  }, [loadCatalogue]);

  // Lookup helper
  const getProductById = (id) => {
    if (!id) return null;
    return products.find((p) => p.id === id || p.slug === id) || null;
  };

  // Admin mutation helpers — each throws an Error with a readable message on failure
  const addProduct = async (newProduct) => {
    const created = await productApi.create(newProduct);
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  // Optimistic so rapid edits (e.g. inventory steppers) feel instant; reverted if the server rejects
  const updateProduct = async (id, updatedFields) => {
    const previous = products.find((p) => p.id === id);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));

    try {
      const saved = await productApi.update(id, updatedFields);
      setProducts((prev) => prev.map((p) => (p.id === id ? saved : p)));
      return saved;
    } catch (error) {
      if (previous) setProducts((prev) => prev.map((p) => (p.id === id ? previous : p)));
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    await productApi.remove(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = async (category) => {
    const created = await categoryApi.create(category);
    setCategories((prev) => [...prev, created]);
    return created;
  };

  const deleteCategory = async (id) => {
    await categoryApi.remove(id);
    setCategories((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
  };

  const resetToSeedData = async () => {
    await adminApi.resetCatalogue();
    const [productList, categoryList] = await Promise.all([productApi.list(), categoryApi.list()]);
    setProducts(productList);
    setCategories(categoryList);
  };

  // The storefront is built entirely on the catalogue, so wait for it before rendering
  if (status !== 'ready') {
    return (
      <AppStatusScreen
        message="Curating the collection…"
        error={status === 'error' ? loadError : null}
        onRetry={loadCatalogue}
      />
    );
  }

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
        reloadCatalogue: loadCatalogue,
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
