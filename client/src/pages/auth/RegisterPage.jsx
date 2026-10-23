import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedTerms) {
      setError('Please accept the Scentora Terms & Privacy Guidelines.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    const result = await register({ fullName, email, password });
    setIsSubmitting(false);
    if (result.success) navigate('/profile');
    else setError(result.message);
  };

  const handleQuickFill = () => {
    setFullName('Vikramaditya Roy');
    setEmail('vikram.roy@example.com');
    setPassword('secret123');
    setConfirmPassword('secret123');
    setAgreedTerms(true);
    setError('');
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
            Join Scentora
          </h1>
          <p className="text-xs text-content-secondary">
            Create an atelier account to save favorites and track private orders.
          </p>
        </div>

        {/* Quick Fill Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[11px] text-accent hover:underline font-semibold"
          >
            ⚡ Auto-Fill Demo Registration
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setError('');
            }}
            placeholder="Aaditya Sharma"
            icon={User}
          />

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
            <label className="block text-xs font-medium uppercase tracking-widest text-content-secondary">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="At least 6 characters"
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

          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-widest text-content-secondary">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder="Re-enter password"
              className="w-full px-3.5 py-2.5 rounded-luxury text-sm bg-surface text-content-primary border border-themeBorder focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-start space-x-2 text-xs text-content-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => {
                  setAgreedTerms(e.target.checked);
                  setError('');
                }}
                className="accent-[#D4AF72] mt-0.5"
              />
              <span>
                I accept the Scentora{' '}
                <Link to="/terms" className="text-accent hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-content-secondary">
          <span>Already have an account? </span>
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
