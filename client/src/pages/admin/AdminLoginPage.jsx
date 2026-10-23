import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Store, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState('admin@scentora.com');
  const [password, setPassword] = useState('scentora2026');

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(email, password);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-page text-content-primary transition-colors duration-200">
      <div className="w-full max-w-md rounded-card bg-surface border border-themeBorder p-8 shadow-card space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-luxury bg-primary flex items-center justify-center border border-accent/40 mx-auto shadow-subtle">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-content-primary">
            Scentora Atelier Console
          </h1>
          <p className="text-xs text-content-secondary">
            Catalogue, Inventory &amp; Order Administration
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-3.5 rounded-luxury bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 space-y-1">
          <div className="flex items-center space-x-1.5 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Demonstration Access</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            This is a frontend administrative prototype. No server authentication is enforced. Any email/password will allow access for evaluation.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Admin Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <Input
            label="Security Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
          />

          <Button type="submit" variant="primary" size="lg" className="w-full flex items-center justify-center space-x-2">
            <span>Enter Atelier Console</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-2 border-t border-themeBorder text-center">
          <Link
            to="/"
            className="inline-flex items-center text-xs text-content-secondary hover:text-accent font-medium space-x-1"
          >
            <Store className="w-3.5 h-3.5 mr-1" />
            <span>Return to Public Customer Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
