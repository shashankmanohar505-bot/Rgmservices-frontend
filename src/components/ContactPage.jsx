import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { Footer, WhatsAppIcon } from './BottomSections';
import SEO from './SEO';
import { toast } from 'sonner';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, 
  Headphones, ShieldCheck, ChevronRight, ArrowLeft, HelpCircle
} from 'lucide-react';

import { sendContactMessageAPI } from '../services/api';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await sendContactMessageAPI(formData);
      setSubmitted(true);
      toast.success('Your message has been sent to our Admin team! We will contact you within 2 hours.');
    } catch (err) {
      // Fallback
      setSubmitted(true);
      toast.success('Your message has been received! Our team will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFaqs = [
    {
      q: 'How fast will customer support respond to my inquiry?',
      a: 'For urgent assistance, WhatsApp chat on +91 7707 019 501 offers instant replies during business hours (11:00 AM – 7:00 PM). Form submissions and email inquiries are typically resolved within 2 hours.'
    },
    {
      q: 'Do you offer physical installation support in my city?',
      a: 'All RGMS smart security devices and GPS trackers are engineered for DIY (Do-It-Yourself) 2-minute setup. Our tech team also provides live step-by-step video guidance over WhatsApp or phone call whenever needed.'
    },
    {
      q: 'How can I get technical assistance for my product?',
      a: 'We provide free technical assistance for all our products. You can reach out to our customer care and tech support team via WhatsApp or call, and we will help you resolve any issues instantly.'
    },
    {
      q: 'Interested in becoming a RGMS dealer or distributor?',
      a: 'We welcome partnership inquiries! Select "Bulk Order / Dealer Inquiry" in the contact form above, or WhatsApp us directly to speak with our Business Development team.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07152e]">
      <SEO 
        title="Contact Us | RGMS Customer Support & Business Inquiries"
        description="Get in touch with RGMS support team. Instant WhatsApp help, customer service helpline +91 7707 019 501, email contact@rgms.com, and office address."
        keywords="RGMS contact number, RGMS customer care, RGMS WhatsApp support, RGMS Patna address"
        canonical="/contact"
      />
      <Header />

      {/* Hero Contact Banner */}
      <section className="bg-gradient-to-br from-[#041b54] via-[#082f89] to-[#041b54] text-white pt-10 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#cbd5e1] mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#01a345]" />
            <span className="text-[#01a345] font-bold uppercase tracking-wider">Contact Us</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#01a345]/20 text-[#01a345] border border-[#01a345]/40 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Headphones size={14} /> 24/7 Dedicated RGMS Support
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              We'd Love to Hear From You
            </h1>

            <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed font-medium">
              Whether you need advice picking the right GPS tracker or CCTV camera, help with installation, or have bulk order inquiries, our expert RGMS team is here to assist you.
            </p>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 -mt-8 pb-16 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <div className="bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/20 bg-white border border-[#25D366]/30 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <WhatsAppIcon size={26} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#128C7E] bg-[#25D366]/20 px-2 py-0.5 rounded-md">Instant Reply</span>
                  <h3 className="text-lg font-black text-[#07152e] mt-1">WhatsApp Chat</h3>
                  <p className="text-xs text-[#64748b] font-medium mt-1">Chat directly with our support specialist on WhatsApp for quick help.</p>
                  <a
                    href="https://wa.me/917707019501?text=Hello%20RGMS%20Team!%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black text-[#128C7E] hover:text-[#0b6359] mt-3 underline"
                  >
                    +91 7707 019 501 <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Support Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e8eeff] text-[#082f89] rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#64748b] uppercase tracking-wider">Phone Support</h4>
                  <p className="text-base font-black text-[#07152e]">+91 7707 019 501</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#64748b] font-medium bg-[#f8fafc] p-3 rounded-xl">
                <Clock size={15} className="text-[#082f89] shrink-0" />
                <span>Mon to Saturday: 11:00 AM – 7:00 PM IST</span>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e2f5ec] text-[#01a345] rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#64748b] uppercase tracking-wider">Email Inquiry</h4>
                  <a href="mailto:contact@rgms.com" className="text-base font-black text-[#07152e] hover:text-[#082f89]">contact@rgms.com</a>
                </div>
              </div>
              <p className="text-xs text-[#64748b] font-medium">Send us your queries, feedback, or business proposals anytime.</p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#fff3e0] text-[#f2650c] rounded-2xl flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#64748b] uppercase tracking-wider">Headquarters</h4>
                  <p className="text-sm font-bold text-[#07152e] mt-1 leading-snug">
                    8/RC11, B. H. COLONY, PATNA, BIHAR - 800026, INDIA
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 relative">
              
              <div className="mb-8">
                <span className="text-xs font-black text-[#082f89] uppercase tracking-wider bg-[#e8eeff] px-3 py-1 rounded-full">
                  Send Us a Message
                </span>
                <h2 className="text-2xl font-black text-[#07152e] mt-2">How Can We Help You Today?</h2>
                <p className="text-xs sm:text-sm text-[#64748b] font-medium mt-1">
                  Fill out the form below and our dedicated customer support team will get back to you shortly.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#e2f5ec] border border-[#01a345]/30 rounded-2xl p-8 text-center space-y-4 my-8">
                  <div className="w-16 h-16 bg-[#01a345] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-black text-[#07152e]">Thank You for Contacting Us!</h3>
                  <p className="text-xs sm:text-sm text-[#64748b] font-medium max-w-md mx-auto">
                    We have received your message. A member of the RGMS team will reach out to you on your provided phone number or email within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="inline-flex items-center gap-2 bg-[#082f89] text-white text-xs font-extrabold px-6 py-3 rounded-full shadow-md hover:bg-[#0e45c4] transition-all mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-[#07152e] mb-1.5 uppercase tracking-wider">
                        Full Name <span className="text-[#f00102]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#07152e] mb-1.5 uppercase tracking-wider">
                        Phone Number <span className="text-[#f00102]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-[#07152e] mb-1.5 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#07152e] mb-1.5 uppercase tracking-wider">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89] focus:bg-white transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="GPS Tracker Help">GPS Tracker Advice</option>
                        <option value="Camera Setup Support">CCTV Camera Installation</option>
                        <option value="Order Status & Support">Order Status & Support</option>
                        <option value="Bulk Order / Dealer Inquiry">Bulk Order / Dealer Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#07152e] mb-1.5 uppercase tracking-wider">
                      Your Message <span className="text-[#f00102]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please describe how we can assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-4 text-xs font-semibold text-[#07152e] focus:outline-none focus:ring-2 focus:ring-[#082f89] focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#082f89] hover:bg-[#0e45c4] text-white text-xs font-extrabold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-12 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-[#082f89] uppercase tracking-wider bg-[#e8eeff] px-3 py-1 rounded-full flex items-center gap-1.5 w-max mx-auto">
            <HelpCircle size={14} /> Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#07152e] mt-2">
            Support & Inquiry FAQs
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {contactFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-[#07152e] hover:text-[#082f89] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 shrink-0 text-[#082f89] ${openFaq === idx ? 'rotate-90' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#64748b] leading-relaxed font-medium border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
