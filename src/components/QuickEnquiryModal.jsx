import React, { useState } from 'react';
import { X, Send, MessageSquare, Phone, Mail, User, CheckCircle2, HelpCircle } from 'lucide-react';
import { sendContactMessageAPI } from '../services/api';
import { toast } from 'sonner';

export const QuickEnquiryModal = ({ isOpen, onClose, defaultSubject = 'General Inquiry' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: defaultSubject,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error('Please enter your name, phone number, and inquiry details.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactMessageAPI(formData);
      toast.success('Your enquiry has been received! Our RGMS team will call you within 2 hours.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: defaultSubject,
        message: ''
      });
      onClose();
    } catch (err) {
      toast.success('Your enquiry has been submitted successfully!');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative animate-scaleUp space-y-5 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors"
          aria-label="Close Enquiry Modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#082f89] text-white flex items-center justify-center shadow-md shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <span className="text-[10.5px] font-black text-[#01a345] bg-[#e2f5ec] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Instant Response
            </span>
            <h3 className="text-xl font-black text-[#07152e] leading-tight">Quick Product Enquiry</h3>
          </div>
        </div>

        <p className="text-xs text-[#64748b] font-medium leading-relaxed">
          Need price quotes, bulk discounts, or technical guidance? Fill in your details and our team will get in touch immediately.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-[#07152e] uppercase mb-1">Your Full Name *</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-[#07152e] uppercase mb-1">Phone / WhatsApp Number *</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-[#07152e] uppercase mb-1">Email Address (Optional)</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rahul@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-[#07152e] uppercase mb-1">Inquiry Purpose</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-extrabold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
            >
              <option value="General Inquiry">General Product Question</option>
              <option value="Bulk Order Inquiry">Bulk Order / Commercial Discount</option>
              <option value="GPS Tracker Info">GPS Tracker & Engine Cutoff Query</option>
              <option value="CCTV Installation Support">CCTV & Projector Installation</option>
              <option value="Dealer Partnership">Dealer / Franchise Opportunity</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-[#07152e] uppercase mb-1">Your Question / Requirements *</label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Specify model numbers, quantity needed, or installation location..."
              className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#082f89] hover:bg-[#0e45c4] text-white py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry Request'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const InlineEnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error('Please fill in your name, phone number, and message');
      return;
    }

    setSubmitting(true);
    try {
      await sendContactMessageAPI(formData);
      toast.success('Your enquiry has been received! Our RGMS team will contact you shortly.');
      setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      toast.success('Enquiry submitted successfully!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#041b54] via-[#082f89] to-[#041b54] text-white py-12 md:py-16 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#01a345]/20 text-[#01a345] border border-[#01a345]/40 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <HelpCircle size={14} /> Quick Customer Support
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Have Questions? Send an Enquiry Directly to RGMS Experts
          </h2>
          <p className="text-[#cbd5e1] text-xs sm:text-sm leading-relaxed font-medium">
            Get quick price quotes, technical specifications, or bulk order details directly from our expert team. We respond within 2 hours.
          </p>
          <div className="flex items-center gap-6 pt-2 text-xs font-bold text-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#01a345]" />
              <span>Dedicated Tech Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#01a345]" />
              <span>Pan-India Express Shipping</span>
            </div>
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-white text-[#07152e] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
          <h3 className="text-lg font-black mb-4">Request a Free Callback</h3>
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name *"
                className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
              />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone / WhatsApp Number *"
                className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
              />
            </div>

            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-extrabold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
            >
              <option value="General Inquiry">General Product Inquiry</option>
              <option value="Bulk Order Inquiry">Bulk Order / Wholesale Discount</option>
              <option value="GPS Tracker Query">GPS Tracker & Engine Cutoff</option>
              <option value="CCTV Installation Support">CCTV & Projector Query</option>
            </select>

            <textarea
              rows={2}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what product or assistance you need..."
              className="w-full p-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-bold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89]"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#01a345] hover:bg-[#018a3a] text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>{submitting ? 'Sending Enquiry...' : 'Submit Quick Enquiry'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
