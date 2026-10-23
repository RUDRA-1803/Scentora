import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and message inquiry.');
      return;
    }

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 py-6 border-b border-themeBorder">
        <Badge variant="gold" size="sm">
          Atelier Concierge
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
          Contact Our Fragrance Concierge
        </h1>
        <p className="text-xs sm:text-sm text-content-secondary max-w-lg mx-auto">
          Have inquiries regarding custom formulations, discovery sets, or orders? Our concierge team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form (7 cols) */}
        <div className="lg:col-span-7 rounded-card bg-surface border border-themeBorder p-6 sm:p-8 shadow-card space-y-6">
          <h2 className="font-serif text-xl font-semibold text-content-primary pb-3 border-b border-themeBorder">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-content-primary">
                Inquiry Received (Demo)
              </h3>
              <p className="text-xs text-content-secondary max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your demonstration inquiry has been recorded. Our team simulates responses within 24 business hours.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
              >
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Aaditya Sharma"
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="aaditya@example.com"
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Fragrance Consultation / Order Inquiry"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-widest text-content-secondary">
                  Message Details
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your olfactory preferences or order questions..."
                  className="w-full px-3.5 py-2.5 rounded-luxury text-sm bg-surface text-content-primary border border-themeBorder focus:outline-none focus:border-accent"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </Button>
            </form>
          )}
        </div>

        {/* Right: Atelier Hours & Placeholders (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4 text-xs">
            <h3 className="font-serif text-base font-semibold text-content-primary pb-2 border-b border-themeBorder">
              Concierge Hours &bull; India
            </h3>

            <div className="space-y-3 text-content-secondary">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <strong className="text-content-primary block">Operating Hours</strong>
                  <span>Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <strong className="text-content-primary block">Atelier Support Email</strong>
                  <span>concierge@scentora.com (Demo Inquiries)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <strong className="text-content-primary block">Distribution Hub</strong>
                  <span>Mumbai &bull; New Delhi &bull; Bengaluru (Express Hubs)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-card bg-hoverSubtle/50 border border-themeBorder text-xs text-content-secondary space-y-2">
            <span className="font-semibold text-content-primary block">
              College Project Transparency Note
            </span>
            <p>
              This contact interface is constructed for academic demonstration of form handling, responsive design, and input validation. No commercial solicitation takes place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
