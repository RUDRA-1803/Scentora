import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  LogOut, 
  Package,
  Layers,
  LogIn,
  UserPlus
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setAccountMenuOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const accountLinks = [
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'My Orders', path: '/orders', icon: Package },
    { label: 'Design System Demo', path: '/dev/design-system', icon: Layers },
  ];

  const mobileAccountLinks = [
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'My Orders', path: '/orders', icon: Package },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, count: wishlistCount },
    { label: 'Shopping Cart', path: '/cart', icon: ShoppingBag, count: itemCount },
  ];

  const navLinks = [
    { label: 'Shop All', path: '/products' },
    { label: 'Men', path: '/category/men' },
    { label: 'Women', path: '/category/women' },
    { label: 'Unisex', path: '/category/unisex' },
    { label: 'Bestsellers', path: '/category/bestsellers' },
    { label: 'Gift Sets', path: '/category/gift-sets' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200 shadow-subtle">
      {/* 1. Promotional Announcement Bar */}
      <div className="bg-brand-charcoal text-brand-gold py-1.5 px-4 text-center text-[11px] font-medium tracking-luxury uppercase border-b border-brand-gold/20 flex items-center justify-center space-x-2">
        <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
        <span>Complimentary Discovery Sample with Orders Over ₹3,000 • Free Delivery Across India</span>
      </div>

      {/* 2. Main Storefront Navbar */}
      <div className="bg-surface/95 backdrop-blur-md border-b border-themeBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 rounded-luxury text-content-primary hover:bg-hoverSubtle border border-themeBorder"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo & Editorial Typography */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-luxury bg-primary flex items-center justify-center border border-accent/40 shadow-subtle group-hover:scale-105 transition-transform duration-200">
              <span className="font-serif text-primary-foreground text-xl font-bold">S</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-wider text-content-primary group-hover:text-accent transition-colors">
                SCENTORA
              </span>
              <p className="text-[10px] uppercase tracking-luxury text-content-secondary font-medium hidden sm:block">
                Discover Your Signature Scent
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase font-medium tracking-wider text-content-secondary">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-150 hover:text-accent py-1 relative ${
                    isActive ? 'text-accent font-semibold' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search, Wishlist, Cart & Account Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <Search className="w-3.5 h-3.5 absolute left-3 text-content-secondary" />
              <input
                type="text"
                placeholder="Search fragrances, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-60 pl-8 pr-3 py-1.5 text-xs rounded-full bg-hoverSubtle/60 border border-themeBorder text-content-primary placeholder:text-content-secondary/70 focus:outline-none focus:border-accent focus:w-64 transition-all duration-200"
              />
            </form>

            {isAuthenticated ? (
              <>
                {/* Wishlist Link */}
                <Link
                  to="/wishlist"
                  aria-label={`Wishlist containing ${wishlistCount} items`}
                  title="View Wishlist"
                  className="relative p-2 rounded-full border border-themeBorder bg-surface text-content-primary hover:bg-hoverSubtle hover:border-accent transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-brand-charcoal text-[10px] font-bold flex items-center justify-center shadow-subtle">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Link */}
                <Link
                  to="/cart"
                  aria-label={`Shopping cart containing ${itemCount} items`}
                  title="View Shopping Cart"
                  className="relative p-2 rounded-full border border-themeBorder bg-surface text-content-primary hover:bg-hoverSubtle hover:border-accent transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-subtle">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* Account Dropdown Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    aria-label="Account options"
                    aria-expanded={accountMenuOpen}
                    className="p-2 rounded-full border border-themeBorder bg-surface text-content-primary hover:bg-hoverSubtle hover:border-accent transition-colors flex items-center"
                  >
                    <User className="w-4 h-4" />
                  </button>

                  {accountMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setAccountMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-card bg-surface border border-themeBorder shadow-elevated py-2 z-50 animate-in fade-in duration-150">
                        <div className="px-4 py-2 border-b border-themeBorder">
                          <p className="text-xs font-semibold text-content-primary truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-content-secondary truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="py-1 text-xs">
                          {accountLinks.map(({ label, path, icon: Icon }) => (
                            <Link
                              key={path}
                              to={path}
                              onClick={() => setAccountMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-content-primary hover:bg-hoverSubtle"
                            >
                              <Icon className="w-3.5 h-3.5 mr-2.5 text-accent" />
                              <span>{label}</span>
                            </Link>
                          ))}
                        </div>

                        <div className="pt-1 border-t border-themeBorder">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full text-left flex items-center px-4 py-2 text-xs text-red-500 hover:bg-hoverSubtle"
                          >
                            <LogOut className="w-3.5 h-3.5 mr-2.5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Theme Toggle */}
            <div className="h-5 w-px bg-themeBorder hidden sm:block" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-surface border-r border-themeBorder shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-themeBorder">
                <div className="flex items-center space-x-2">
                  <span className="font-serif text-xl font-bold tracking-wider text-content-primary">
                    SCENTORA
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-hoverSubtle text-content-secondary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-content-secondary" />
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
                />
              </form>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium rounded-luxury hover:bg-hoverSubtle text-content-primary"
                >
                  Home
                </NavLink>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium rounded-luxury hover:bg-hoverSubtle text-content-primary"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-4 border-t border-themeBorder space-y-2 text-xs">
                <span className="uppercase tracking-widest text-content-secondary font-semibold block px-3">
                  {isAuthenticated ? 'My Account' : 'Account'}
                </span>
                {isAuthenticated ? (
                  <>
                    <div className="px-3 pb-1">
                      <p className="font-semibold text-content-primary truncate">{user.name}</p>
                      <p className="text-[11px] text-content-secondary truncate">{user.email}</p>
                    </div>
                    {mobileAccountLinks.map(({ label, path, icon: Icon, count }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center px-3 py-1.5 text-content-primary hover:text-accent"
                      >
                        <Icon className="w-3.5 h-3.5 mr-2.5 text-accent" />
                        <span>{label}</span>
                        {count > 0 && <span className="ml-auto text-content-secondary">{count}</span>}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-1.5 text-red-500 hover:text-red-600"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2.5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-3 py-1.5 text-content-primary hover:text-accent"
                    >
                      <LogIn className="w-3.5 h-3.5 mr-2.5 text-accent" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-3 py-1.5 text-content-primary hover:text-accent"
                    >
                      <UserPlus className="w-3.5 h-3.5 mr-2.5 text-accent" />
                      <span>Create Account</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-themeBorder flex items-center justify-between">
              <span className="text-xs text-content-secondary">Theme</span>
              <ThemeToggle showLabel={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
