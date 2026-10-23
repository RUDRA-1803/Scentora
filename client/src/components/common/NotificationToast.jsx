import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const NotificationToast = () => {
  const { lastNotification } = useCart();

  if (!lastNotification) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="flex items-center space-x-3 px-4 py-3 rounded-card bg-surface border border-accent shadow-elevated text-content-primary max-w-sm">
        <div className="p-1.5 rounded-full bg-brand-gold/20 text-accent">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <p className="text-xs font-medium">{lastNotification.message}</p>
      </div>
    </aside>
  );
};

export default NotificationToast;
