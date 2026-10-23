import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Layers, 
  ShoppingBag, 
  Users, 
  Boxes, 
  Store, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import Badge from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = ({ children, title = 'Atelier Administration' }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Add Product', path: '/admin/products/new', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-page text-content-primary transition-colors duration-200">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-themeBorder flex flex-col justify-between
          transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Admin Brand Header */}
          <div className="h-20 px-6 border-b border-themeBorder flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-luxury bg-primary flex items-center justify-center border border-accent/40">
                <span className="font-serif text-primary-foreground font-bold">S</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-content-primary">
                  SCENTORA
                </span>
                <span className="block text-[10px] uppercase tracking-luxury text-accent font-semibold">
                  Atelier Admin
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-full hover:bg-hoverSubtle text-content-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3.5 py-2.5 rounded-luxury text-xs font-medium tracking-wide transition-colors
                    ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold shadow-subtle'
                        : 'text-content-secondary hover:bg-hoverSubtle hover:text-content-primary'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-themeBorder space-y-3">
          <Link
            to="/"
            className="flex items-center space-x-2.5 px-3 py-2 rounded-luxury text-xs font-medium text-content-primary hover:bg-hoverSubtle border border-themeBorder"
          >
            <Store className="w-4 h-4 text-accent" />
            <span>Customer Storefront</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-luxury text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Navbar */}
        <header className="sticky top-0 z-30 h-20 bg-surface/90 backdrop-blur-md border-b border-themeBorder px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-luxury border border-themeBorder hover:bg-hoverSubtle"
            >
              <Menu className="w-5 h-5 text-content-primary" />
            </button>
            <h1 className="font-serif text-xl sm:text-2xl font-semibold text-content-primary truncate">
              {title}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Demo Storage (localStorage)</span>
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
