import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import { storeApi } from '../../services/scentoraApi';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      try {
        await storeApi.subscribe(email);
        setSubscribed(true);
        setSubscribeError('');
        setEmail('');
      } catch (err) {
        setSubscribeError(err.message);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-themeBorder transition-colors duration-200 mt-20">
      {/* Newsletter Ribbon */}
      <div className="border-b border-themeBorder bg-hoverSubtle/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-lg text-center md:text-left">
              <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
                Private Circle
              </span>
              <h3 className="font-serif text-2xl font-semibold text-content-primary">
                Join the Scentora Olfactory Circle
              </h3>
              <p className="text-xs text-content-secondary mt-1">
                Receive private previews of limited seasonal extraits, bespoke invitations, and master perfumer insights.
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2.5 rounded-luxury border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the Private Circle. Check your inbox for your 10% welcome privilege (Code: SCENT10).</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-content-secondary" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-surface border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="sm" className="whitespace-nowrap">
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </form>
              )}
              {subscribeError && !subscribed && (
                <p className="mt-2 text-[11px] text-red-500 font-medium">{subscribeError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-luxury bg-primary flex items-center justify-center border border-accent/40 shadow-subtle">
                <span className="font-serif text-primary-foreground text-base font-bold">S</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-content-primary">
                SCENTORA
              </span>
            </div>
            <p className="text-xs text-content-secondary leading-relaxed max-w-sm">
              Discover Your Signature Scent. A luxury fragrance and lifestyle atelier curating rare artisanal extraits, aged ouds, and solar florals inspired by Grasse, Florence, and Mysore.
            </p>
            <div className="pt-2 text-xs text-content-secondary flex flex-wrap gap-4">
              <span className="inline-flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>100% Certified Essences</span>
              </span>
              <span className="inline-flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Cruelty-Free Formulations</span>
              </span>
            </div>
          </div>

          {/* Fragrance Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-content-primary">
              The Collections
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              <li>
                <Link to="/products" className="hover:text-accent transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link to="/category/bestsellers" className="hover:text-accent transition-colors">
                  Iconic Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/category/men" className="hover:text-accent transition-colors">
                  For Him (Men)
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-accent transition-colors">
                  For Her (Women)
                </Link>
              </li>
              <li>
                <Link to="/category/unisex" className="hover:text-accent transition-colors">
                  Genderless Accords
                </Link>
              </li>
              <li>
                <Link to="/category/gift-sets" className="hover:text-accent transition-colors">
                  Coffrets &amp; Discovery Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care & Experience */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-content-primary">
              Client Atelier
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  The Scentora Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact Our Concierge
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-accent transition-colors">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Administration & Architecture */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-content-primary">
              Project Architecture
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              <li>
                <Link to="/dev/design-system" className="hover:text-accent transition-colors">
                  Design System Showcase
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-themeBorder flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-content-secondary">
          <p>
            &copy; {currentYear} Scentora Luxury Parfumerie. All rights reserved. Built as a professional full-stack MERN college project.
          </p>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span>INR (₹)</span>
            <span>•</span>
            <span>Pan-India Delivery</span>
            <span>•</span>
            <span className="text-accent">MERN Stack</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
