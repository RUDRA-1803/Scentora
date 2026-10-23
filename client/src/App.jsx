import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import MainLayout from './layouts/MainLayout';
import NotificationToast from './components/common/NotificationToast';

// Storefront Customer Pages
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import CategoryPage from './pages/categories/CategoryPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import SearchPage from './pages/search/SearchPage';
import WishlistPage from './pages/wishlist/WishlistPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderSuccessPage from './pages/checkout/OrderSuccessPage';
import OrdersPage from './pages/orders/OrdersPage';
import ProfilePage from './pages/account/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AboutPage from './pages/information/AboutPage';
import ContactPage from './pages/information/ContactPage';
import ShippingReturnsPage from './pages/information/ShippingReturnsPage';
import PrivacyPage from './pages/information/PrivacyPage';
import TermsPage from './pages/information/TermsPage';
import NotFoundPage from './pages/common/NotFoundPage';

// Developer Showcase (Preserved Phase 1 Dev Screen)
import DesignSystemPage from './pages/dev/DesignSystemPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';

// Automatic scroll-to-top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <AuthProvider>
                <Router>
                  <ScrollToTop />
                  <NotificationToast />

                  <Routes>
                    {/* =========================================
                        ADMIN ROUTES (Separate dedicated layout)
                       ========================================= */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/products" element={<AdminProductsPage />} />
                    <Route path="/admin/products/new" element={<AdminProductFormPage />} />
                    <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
                    <Route path="/admin/categories" element={<AdminCategoriesPage />} />
                    <Route path="/admin/orders" element={<AdminOrdersPage />} />
                    <Route path="/admin/customers" element={<AdminCustomersPage />} />
                    <Route path="/admin/inventory" element={<AdminInventoryPage />} />

                    {/* =========================================
                        CUSTOMER STOREFRONT ROUTES (MainLayout)
                       ========================================= */}
                    <Route
                      path="/"
                      element={
                        <MainLayout>
                          <HomePage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/products"
                      element={
                        <MainLayout>
                          <ProductsPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/category/:category"
                      element={
                        <MainLayout>
                          <CategoryPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/products/:id"
                      element={
                        <MainLayout>
                          <ProductDetailPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/search"
                      element={
                        <MainLayout>
                          <SearchPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <MainLayout>
                          <WishlistPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        <MainLayout>
                          <CartPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <MainLayout>
                          <CheckoutPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/order-success/:id"
                      element={
                        <MainLayout>
                          <OrderSuccessPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <MainLayout>
                          <OrdersPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <MainLayout>
                          <ProfilePage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <MainLayout>
                          <LoginPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <MainLayout>
                          <RegisterPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={
                        <MainLayout>
                          <ForgotPasswordPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <MainLayout>
                          <AboutPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <MainLayout>
                          <ContactPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/shipping-returns"
                      element={
                        <MainLayout>
                          <ShippingReturnsPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/privacy"
                      element={
                        <MainLayout>
                          <PrivacyPage />
                        </MainLayout>
                      }
                    />
                    <Route
                      path="/terms"
                      element={
                        <MainLayout>
                          <TermsPage />
                        </MainLayout>
                      }
                    />

                    {/* Preserved Phase 1 Developer Showcase */}
                    <Route
                      path="/dev/design-system"
                      element={
                        <MainLayout>
                          <DesignSystemPage />
                        </MainLayout>
                      }
                    />

                    {/* 404 Not Found Catch-All */}
                    <Route
                      path="*"
                      element={
                        <MainLayout>
                          <NotFoundPage />
                        </MainLayout>
                      }
                    />
                  </Routes>
                </Router>
              </AuthProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
