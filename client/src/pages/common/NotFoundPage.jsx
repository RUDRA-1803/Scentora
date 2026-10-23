import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import Button from '../../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="py-24 px-4 text-center max-w-lg mx-auto space-y-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-hoverSubtle border border-themeBorder flex items-center justify-center text-accent">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-luxury text-accent font-semibold block">
          Error 404 &bull; Page Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
          Lost in Olfactory Reverie
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
          The passage you are seeking cannot be found. The scent trail may have dispersed or the flacon has been retired from our library.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
        <Link to="/">
          <Button variant="primary" size="md" className="flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="secondary" size="md" className="flex items-center space-x-2">
            <span>Explore Fragrance Catalogue</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
