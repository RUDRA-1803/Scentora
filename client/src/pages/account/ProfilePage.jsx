import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Package, Heart, Sparkles, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { orders } = useOrders();
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || 'Aaditya Sharma',
    email: user?.email || 'aaditya.sharma@example.com',
    phone: user?.phone || '+91 98765 43210',
    street: user?.address?.street || '42 Marine Drive, Nariman Point',
    city: user?.address?.city || 'Mumbai',
    state: user?.address?.state || 'Maharashtra',
    postalCode: user?.address?.postalCode || '400021',
    fragranceFamily: user?.preferences?.fragranceFamily || 'Woody Oriental',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError('');
    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
      preferences: {
        fragranceFamily: formData.fragranceFamily,
        newsletter: true,
      },
    });

    if (!result.success) {
      setSaveError(result.message);
      return;
    }
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-themeBorder flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
            Client Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            My Connoisseur Profile
          </h1>
          <p className="text-xs text-content-secondary mt-1">
            Manage your personal details, delivery addresses, and olfactory preferences.
          </p>
        </div>

        <Badge variant="gold" size="sm">
          Privilege Patron
        </Badge>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-luxury bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Profile changes saved successfully to your Scentora account.</span>
        </div>
      )}

      {saveError && (
        <div className="p-3.5 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
          {saveError}
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/orders"
          className="luxury-card p-5 flex items-center space-x-4 hover:border-accent group"
        >
          <div className="p-3 rounded-luxury bg-hoverSubtle text-accent group-hover:scale-105 transition-transform">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-content-secondary">Total Orders</span>
            <span className="font-serif text-lg font-bold text-content-primary block">
              {orders.length} Completed
            </span>
          </div>
        </Link>

        <Link
          to="/wishlist"
          className="luxury-card p-5 flex items-center space-x-4 hover:border-accent group"
        >
          <div className="p-3 rounded-luxury bg-hoverSubtle text-accent group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-content-secondary">Saved Registry</span>
            <span className="font-serif text-lg font-bold text-content-primary block">
              {wishlistCount} Creations
            </span>
          </div>
        </Link>

        <Link
          to="/cart"
          className="luxury-card p-5 flex items-center space-x-4 hover:border-accent group"
        >
          <div className="p-3 rounded-luxury bg-hoverSubtle text-accent group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-content-secondary">Shopping Cart</span>
            <span className="font-serif text-lg font-bold text-content-primary block">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </Link>
      </div>

      {/* Profile Details Form & Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-themeBorder">
            <h2 className="font-serif text-xl font-semibold text-content-primary">
              Personal &amp; Delivery Information
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </Button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <div className="pt-2 border-t border-themeBorder space-y-4">
                <Input
                  label="Primary Delivery Street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <Input
                    label="PIN Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                    Full Name
                  </span>
                  <p className="font-semibold text-content-primary text-sm mt-0.5">
                    {user?.name}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                    Email Address
                  </span>
                  <p className="font-semibold text-content-primary text-sm mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                  Contact Phone
                </span>
                <p className="font-semibold text-content-primary text-sm mt-0.5">
                  {user?.phone}
                </p>
              </div>

              <div className="pt-3 border-t border-themeBorder">
                <span className="text-[10px] uppercase text-content-secondary tracking-wider block mb-1">
                  Default Delivery Address
                </span>
                <p className="text-content-primary font-medium leading-relaxed">
                  {user?.address?.street}, {user?.address?.city}, {user?.address?.state} —{' '}
                  {user?.address?.postalCode}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Olfactory Preferences Card (4 cols) */}
        <div className="lg:col-span-4 rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-themeBorder">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="font-serif text-lg font-semibold text-content-primary">
              Olfactory Preferences
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-content-secondary block">
                Primary Profile
              </span>
              <p className="font-semibold text-content-primary mt-1">
                {user?.preferences?.fragranceFamily || 'Woody Oriental (Sandalwood & Amber)'}
              </p>
            </div>

            <div className="pt-2 border-t border-themeBorder">
              <span className="text-[10px] uppercase tracking-wider text-content-secondary block mb-1">
                Atelier Privileges
              </span>
              <ul className="space-y-1.5 text-content-secondary">
                <li className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Complimentary Discovery Testers</span>
                </li>
                <li className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Private Seasonal Extraits Preview</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-themeBorder">
              <button
                type="button"
                onClick={logout}
                className="w-full text-center py-2 rounded-luxury text-xs text-red-500 hover:bg-red-500/10 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
