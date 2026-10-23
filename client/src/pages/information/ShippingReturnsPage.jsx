import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Gift } from 'lucide-react';
import Badge from '../../components/common/Badge';

export const ShippingReturnsPage = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center space-y-3 py-6 border-b border-themeBorder">
        <Badge variant="gold" size="sm">
          Policy Guidelines
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
          Shipping &amp; Return Policies
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary max-w-lg mx-auto">
          Transparent delivery timelines, temperature packaging, and our test-before-unsealing guarantee.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-content-secondary leading-relaxed">
        {/* Shipping */}
        <section className="rounded-card bg-surface border border-themeBorder p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center space-x-3 text-content-primary">
            <Truck className="w-5 h-5 text-accent" />
            <h2 className="font-serif text-xl font-semibold">Pan-India Express Delivery</h2>
          </div>
          <p>
            All full-size flacons and coffrets are dispatched in shock-absorbing, climate-insulated packaging via our premier air courier partners (Bluedart, Delhivery Express).
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Complimentary Shipping:</strong> Automatically applied to all orders of ₹3,000 or greater.</li>
            <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad):</strong> Delivered in 2 to 3 business days.</li>
            <li><strong>Rest of India:</strong> Delivered in 3 to 5 business days.</li>
            <li><strong>Tracking:</strong> Real-time SMS and email tracking numbers are provided upon dispatch.</li>
          </ul>
        </section>

        {/* Returns & Test Guarantee */}
        <section className="rounded-card bg-surface border border-themeBorder p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center space-x-3 text-content-primary">
            <Gift className="w-5 h-5 text-accent" />
            <h2 className="font-serif text-xl font-semibold">The 2ml Sample Guarantee</h2>
          </div>
          <p>
            We recognize that selecting an extrait online requires confidence. Every full-size bottle arrives accompanied by an identical complimentary 2ml discovery atomizer.
          </p>
          <p>
            Please test the 2ml sample first. If the fragrance does not perfectly resonate with your skin chemistry, you may return the main bottle unopened with its holographic security seal intact within 7 calendar days for a full refund or exchange.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
