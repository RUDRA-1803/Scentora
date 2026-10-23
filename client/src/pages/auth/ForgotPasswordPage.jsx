import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="py-12 px-4 max-w-md mx-auto">
      <div className="rounded-card bg-surface border border-themeBorder p-8 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
            Reset Password
          </h1>
          <p className="text-xs text-content-secondary">
            Enter your email to receive simulated password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-content-primary">
                Instructions Dispatched (Demo)
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed">
                If an account exists under <strong>{email}</strong>, recovery instructions have been simulated for this demo.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/login">
                <Button variant="primary" size="md" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              icon={Mail}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center text-xs text-content-secondary hover:text-accent font-medium space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
