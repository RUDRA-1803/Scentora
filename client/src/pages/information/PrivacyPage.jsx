import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import Badge from '../../components/common/Badge';

export const PrivacyPage = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3 py-6 border-b border-themeBorder">
        <Badge variant="gold" size="sm">
          Transparency
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary max-w-lg mx-auto">
          Information practices and data guidelines for the Scentora academic web project.
        </p>
      </div>

      <div className="rounded-card bg-surface border border-themeBorder p-6 sm:p-8 shadow-card space-y-6 text-xs sm:text-sm text-content-secondary leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-content-primary">
            1. Nature of the Application
          </h2>
          <p>
            Scentora is an educational, full-stack demonstration project built to demonstrate modern React component architecture, resilient state management, and luxury UI/UX patterns. No personal sensitive data, banking credentials, or commercial data are stored on external tracking servers.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-content-primary">
            2. Local Browser Storage
          </h2>
          <p>
            Theme preferences, shopping cart quantities, wishlist entries, and demonstration order identifiers are stored strictly within the client’s browser using standard HTML5 <code>localStorage</code>. This data can be reset or cleared at any time through your browser settings.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-content-primary">
            3. Contact &amp; Inquiries
          </h2>
          <p>
            Any email or contact submissions entered during demonstration interactions are handled locally in mock state and are not sold, transmitted, or distributed to third-party marketing entities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
