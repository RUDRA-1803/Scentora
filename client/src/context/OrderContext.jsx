import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext(null);
const STORAGE_KEY_ORDERS = 'scentora_orders_v1';

const INITIAL_SAMPLE_ORDERS = [
  {
    id: 'SC-ORD-89241',
    createdAt: '2026-03-12T14:22:00Z',
    customer: {
      fullName: 'Aaditya Sharma',
      email: 'aaditya.sharma@example.com',
      phone: '+91 98765 43210',
      address: '42 Marine Drive, Nariman Point',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400021',
    },
    items: [
      {
        id: 'sc-01',
        name: 'Santal Impérial',
        brand: 'Maison Scentora',
        price: 8499,
        quantity: 1,
        volume: 100,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'sc-16',
        name: 'Le Coffret Découverte Impérial',
        brand: 'Maison Scentora',
        price: 5200,
        quantity: 1,
        volume: 50,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80',
      },
    ],
    subtotal: 13699,
    discount: 1370,
    shipping: 0,
    total: 12329,
    paymentMethod: 'Credit / Debit Card (Demo)',
    status: 'Delivered',
    trackingNumber: 'DEL-IND-884920',
  },
  {
    id: 'sc-ORD-74195',
    createdAt: '2026-03-18T10:15:00Z',
    customer: {
      fullName: 'Natasha Singhal',
      email: 'natasha.s@example.com',
      phone: '+91 98112 34567',
      address: '15 Barakhamba Road, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110001',
    },
    items: [
      {
        id: 'sc-03',
        name: 'Rose Éthérée de Grasse',
        brand: 'Fleur Royale',
        price: 7600,
        quantity: 1,
        volume: 75,
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=400&q=80',
      },
    ],
    subtotal: 7600,
    discount: 0,
    shipping: 0,
    total: 7600,
    paymentMethod: 'UPI / NetBanking (Demo)',
    status: 'Shipped',
    trackingNumber: 'BLUEDART-559201',
  },
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored orders:', e);
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not persist orders to localStorage', e);
    }
  }, [orders]);

  const createDemoOrder = (orderData) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      ...orderData,
      id: `SC-ORD-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      trackingNumber: `SC-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    if (!orderId) return null;
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase()) || null;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createDemoOrder,
        getOrderById,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;
