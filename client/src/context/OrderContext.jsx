import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { orderApi } from '../services/scentoraApi';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const userId = user?.id ?? null;
  const isAdmin = user?.role === 'admin';

  // Customers see their own history; administrators see every order
  const refreshOrders = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      return;
    }
    setOrdersLoading(true);
    try {
      setOrders(await (isAdmin ? orderApi.all() : orderApi.mine()));
    } catch (error) {
      console.warn('Could not load orders:', error.message);
    } finally {
      setOrdersLoading(false);
    }
  }, [userId, isAdmin]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  /**
   * Places an order. The server prices it, checks stock and returns the saved order.
   * Throws an Error with a readable message on failure.
   */
  const createOrder = async (orderData) => {
    const created = await orderApi.create(orderData);
    setOrders((prev) => [created, ...prev]);
    return created;
  };

  const getOrderById = (orderId) => {
    if (!orderId) return null;
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase()) || null;
  };

  // For deep links (e.g. refreshing the confirmation page) when the order is not in memory
  const fetchOrderById = (orderId) => orderApi.get(orderId);

  const updateOrderStatus = async (orderId, newStatus) => {
    const saved = await orderApi.updateStatus(orderId, newStatus);
    setOrders((prev) => prev.map((order) => (order.id === orderId ? saved : order)));
    return saved;
  };

  const deleteOrder = async (orderId) => {
    await orderApi.remove(orderId);
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        ordersLoading,
        refreshOrders,
        createOrder,
        getOrderById,
        fetchOrderById,
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
