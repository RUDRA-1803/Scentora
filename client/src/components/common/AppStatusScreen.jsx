import React from 'react';
import { Loader2, ServerCrash } from 'lucide-react';
import Button from './Button';

/**
 * Full-page placeholder shown while the app waits on the backend,
 * or when the backend cannot be reached.
 */
export const AppStatusScreen = ({ message = 'Loading…', error = null, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-page text-content-primary">
    <div className="text-center space-y-4 max-w-sm">
      {error ? (
        <>
          <ServerCrash className="w-10 h-10 mx-auto text-accent" />
          <h1 className="font-serif text-2xl font-semibold">Atelier Temporarily Unavailable</h1>
          <p className="text-xs text-content-secondary leading-relaxed">{error}</p>
          {onRetry && (
            <Button variant="primary" size="md" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </>
      ) : (
        <>
          <Loader2 className="w-8 h-8 mx-auto text-accent animate-spin" />
          <p className="text-xs uppercase tracking-luxury text-content-secondary">{message}</p>
        </>
      )}
    </div>
  </div>
);

export default AppStatusScreen;
