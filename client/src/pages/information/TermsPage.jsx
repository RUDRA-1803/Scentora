import React from 'react';
import Badge from '../../components/common/Badge';

export const TermsPage = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3 py-6 border-b border-themeBorder">
        <Badge variant="gold" size="sm">
          Guidelines
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary max-w-lg mx-auto">
          Academic terms of use for the Scentora e-commerce demonstration platform.
        </p>
      </div>

      <div className="rounded-card bg-surface border border-themeBorder p-6 sm:p-8 shadow-card space-y-6 text-xs sm:text-sm text-content-secondary leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-content-primary">
            1. College Project Scope
          </h2>
          <p>
            This website represents the frontend phase of <strong>Scentora — A Web-Based E-Commerce Platform</strong>. All products, prices in INR, concentrations, and order IDs are created for educational demonstration and UI prototyping purposes.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-content-primary">
            2. Intellectual Property &amp; Photography
          </h2>
          <p>
            Photography assets used across the catalogue are curated from Unsplash under open royalty-free creative licenses for non-commercial educational portfolio presentation.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-content-primary">
            3. No Financial Transactions
          </h2>
          <p>
            The checkout and order confirmation processes are entirely client-side simulated interactions. No credit cards are charged and no actual physical shipments will be dispatched.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
