import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, adminLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Return to the page that required sign-in, if any
  const destination = location.state?.from || '/profile';

  const signIn = async (authCall, target) => {
    setError('');
    setIsSubmitting(true);
    const result = await authCall();
    setIsSubmitting(false);
    if (result.success) navigate(target);
    else setError(result.message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError('Password must contain at least 4 characters.');
      return;
    }

    signIn(() => login(email, password), destination);
  };

  const handleQuickCustomer = () => {
    setEmail('connoisseur@scentora.com');
    setPassword('perfume123');
    signIn(() => login('connoisseur@scentora.com', 'perfume123'), destination);
  };

  const handleQuickAdmin = () => {
    setEmail('admin@scentora.com');
    setPassword('scentora2026');
    signIn(() => adminLogin('admin@scentora.com', 'scentora2026'), '/admin');
  };

  return (
    <div className="py-12 px-4 max-w-md mx-auto">
      <div className="rounded-card bg-surface border border-themeBorder p-8 shadow-card space-y-6">
        {/* Brand Monogram */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-luxury bg-primary flex items-center justify-center border border-accent/40 mx-auto shadow-subtle">
            <span className="font-serif text-primary-foreground text-2xl font-bold">S</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
            Welcome Back
          </h1>
          <p className="text-xs text-content-secondary">
            Sign in to access your Scentora private registry &amp; orders.
          </p>
        </div>

        {/* Demo Credentials Quick-Fill Buttons */}
        <div className="p-3.5 rounded-luxury bg-hoverSubtle border border-themeBorder text-xs space-y-2">
          <span className="font-semibold text-content-primary block text-[11px] uppercase tracking-wider">
            Quick Demo Access (One-Click Testing)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="flex-1 py-1.5 px-2 rounded bg-surface border border-themeBorder text-content-primary hover:border-accent font-medium text-[11px]"
            >
              Sign In as Customer
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="flex-1 py-1.5 px-2 rounded bg-surface border border-themeBorder text-accent hover:border-accent font-medium text-[11px]"
            >
              Sign In as Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="name@example.com"
            icon={Mail}
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-medium uppercase tracking-widest text-content-secondary">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-accent hover:underline text-[11px]"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-luxury text-sm bg-surface text-content-primary border border-themeBorder focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-content-secondary hover:text-content-primary"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#D4AF72]"
              />
              <span className="text-content-secondary">Remember this device</span>
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            <span>Sign In to Atelier</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-content-secondary">
          <span>Don&rsquo;t have a private account? </span>
          <Link to="/register" className="text-accent font-semibold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
