import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Mail, Facebook, Instagram, Youtube, Phone, MapPin, ArrowUp, Lock, Award, ArrowUpRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { reviews, blogs, footerData } from '../mock/mock';
import { toast } from 'sonner';
import { QuickEnquiryModal, InlineEnquiryForm } from './QuickEnquiryModal';

export const WhatsAppIcon = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.55 4.11 1.516 5.842L.15 23.364l5.659-1.483C7.47 22.77 9.658 23.333 12 23.333c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.333c-1.92 0-3.744-.512-5.333-1.408l-.384-.216-3.35.877.892-3.264-.24-.384C2.632 15.344 2.133 13.72 2.133 12c0-5.44 4.427-9.867 9.867-9.867s9.867 4.427 9.867 9.867-4.427 9.867-9.867 9.867z"/>
  </svg>
);

export const CustomerLove = () => {
  const [idx, setIdx] = useState(0);
  const review = reviews[idx];

  return (
    <section className="bg-[#f1f5f9] py-14 md:py-16" data-testid="customer-love-section">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <h2 className="text-center text-h2 text-[#07152e] mb-10 md:mb-12">
          Customer Love is the real <span className="text-[#082f89]">Magic</span>
        </h2>
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-center">
          {/* Rating summary */}
          <div className="text-center">
            <p className="text-[46px] font-black text-[#082f89] leading-none">4+</p>
            <div className="flex justify-center gap-1 mt-3">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} size={20} className="fill-[#f5a623] text-[#f5a623]" />
              ))}
              <span className="relative inline-block">
                <Star size={20} className="fill-[#e2e8f0] text-[#e2e8f0]" />
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star size={20} className="fill-[#f5a623] text-[#f5a623]" />
                </span>
              </span>
            </div>
            <p className="text-[12.5px] text-[#64748b] mt-2 font-medium">Average Rating</p>
            <div className="flex justify-center items-center gap-4 mt-5">
              <img src="/assets/asset-32.svg" alt="Amazon" className="h-7 bg-white rounded-md px-2.5 py-1 shadow-sm box-content" />
              <img src="/assets/asset-33.png" alt="Flipkart" className="h-7 bg-white rounded-md px-2.5 py-1 shadow-sm box-content object-contain" />
            </div>
          </div>

          {/* Review card */}
          <div>
            <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(8,47,137,0.07)] border border-slate-100 p-6 md:p-7" key={review.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#e8eeff] text-[#082f89] text-[13px] font-bold flex items-center justify-center">
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-[#07152e]">{review.name}</p>
                    <p className="text-[11.5px] text-[#8b98ad]">{review.verified}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} className="fill-[#07152e] text-[#07152e]" />
                  ))}
                </div>
              </div>
              <p className="text-[13px] text-[#4a5568] leading-relaxed mt-4">{review.text}</p>
              <span className="inline-block bg-[#f1f5f9] text-[#1e2c45] text-[11.5px] font-bold px-3 py-1.5 rounded-lg mt-4">
                {review.product}
              </span>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={() => setIdx((idx - 1 + reviews.length) % reviews.length)} aria-label="Previous review" className="w-9 h-9 rounded-full border border-[#082f89] text-[#082f89] flex items-center justify-center hover:bg-[#082f89] hover:text-white transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setIdx((idx + 1) % reviews.length)} aria-label="Next review" className="w-9 h-9 rounded-full border border-[#082f89] text-[#082f89] flex items-center justify-center hover:bg-[#082f89] hover:text-white transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NewsletterCards = () => {
  const [email, setEmail] = useState('');
  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('You have successfully subscribed!');
    setEmail('');
  };

  return (
    <section className="bg-white py-12 md:py-16" data-testid="newsletter-section">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-5 md:gap-6">
        {/* Newsletter */}
        <div className="rounded-3xl bg-gradient-to-br from-[#e8eeff] to-[#f8fafc] p-6 sm:p-8 md:p-10 text-center border border-slate-200/60 shadow-[0_10px_30px_rgba(8,47,137,0.06)]">
          <span className="w-12 h-12 rounded-full bg-[#082f89] text-white flex items-center justify-center mx-auto mb-3.5 shadow-[0_8px_20px_rgba(8,47,137,0.35)]">
            <Mail size={19} />
          </span>
          <h3 className="text-[16px] sm:text-[17px] font-bold text-[#07152e]">Subscribe to newsletter</h3>
          <p className="text-[12px] sm:text-[12.5px] text-[#64748b] mt-1 font-medium">Get exclusive deals and updates</p>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2.5 mt-5 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Your email"
              className="flex-1 bg-white border border-slate-200 rounded-full px-4 py-2.5 text-[12.5px] outline-none focus:border-[#082f89] focus:ring-2 focus:ring-[#082f89]/20 transition-all text-[#1e2c45] placeholder:text-[#9aa7ba] min-w-0"
              data-testid="newsletter-email"
            />
            <button type="submit" className="btn-primary text-[12.5px] font-bold px-6 py-2.5 rounded-full shrink-0 h-10 flex items-center justify-center shadow-md active:scale-95" data-testid="newsletter-submit">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bulk enquiry */}
        <div className="rounded-3xl bg-gradient-to-br from-[#e2f5ec] to-[#f8fafc] p-6 sm:p-8 md:p-10 text-center border border-slate-200/60 shadow-[0_10px_30px_rgba(1,163,69,0.06)]">
          <span className="w-12 h-12 rounded-full bg-[#01a345] text-white flex items-center justify-center mx-auto mb-3.5 shadow-[0_8px_20px_rgba(1,163,69,0.35)]">
            <WhatsAppIcon size={22} />
          </span>
          <h3 className="text-[16px] sm:text-[17px] font-bold text-[#07152e]">Bulk enquiry?</h3>
          <p className="text-[12px] sm:text-[12.5px] text-[#64748b] mt-1 font-medium">Reach us on WhatsApp</p>
          <a
            href="https://wa.me/917707019501"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#01a345] hover:bg-[#018a3a] text-white text-[12.5px] font-bold px-6 py-2.5 rounded-full mt-5 transition-all duration-200 shadow-[0_6px_16px_rgba(1,163,69,0.3)] hover:-translate-y-0.5 active:scale-95"
            data-testid="whatsapp-cta"
          >
            <WhatsAppIcon size={16} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};

export const Blogs = () => (
  <section className="bg-[#f8fafc] py-12 md:py-16" data-testid="blogs-section">
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
      <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
        <div>
          <h2 className="text-[24px] sm:text-[32px] font-black text-[#07152e] tracking-tight">Blogs</h2>
          <p className="text-[13px] sm:text-[13.5px] text-[#64748b] mt-1 sm:mt-2 font-medium">Security tips, product guides, and industry insights</p>
        </div>
        <button className="bg-white border border-[#d4dce7] hover:border-[#082f89] hover:text-[#082f89] text-[#1e2c45] text-[12px] sm:text-[12.5px] font-bold px-4 sm:px-5 py-2 rounded-full transition-colors shrink-0 hover:-translate-y-0.5 duration-200 shadow-sm active:scale-95">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {blogs.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(8,47,137,0.06)] border border-slate-100 card-lift cursor-pointer group" data-testid={`blog-${b.id}`}>
            <div className="h-[150px] overflow-hidden bg-[#f1f5f9]">
              <img src={b.image} alt="" loading="lazy" decoding="async" draggable={false} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 select-none pointer-events-none" />
            </div>
            <div className="p-4 sm:p-5">
              <span className="inline-block bg-[#e8eeff] text-[#082f89] text-[10px] sm:text-[10.5px] font-bold px-2.5 py-1 rounded-md mb-2 uppercase tracking-[0.08em]">Blog</span>
              <h3 className="text-[13px] font-bold text-[#07152e] leading-snug mb-1.5 line-clamp-2 min-h-[34px]">{b.title}</h3>
              {b.excerpt && <p className="text-[11.5px] text-[#8b98ad] leading-relaxed mb-2 line-clamp-2">{b.excerpt}</p>}
              <span className="text-[12px] font-bold text-[#082f89] group-hover:underline inline-flex items-center gap-1">
                Read More <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('You have successfully subscribed to RGMS VIP!');
    setEmail('');
  };

  return (
    <>
      <InlineEnquiryForm />
      <footer className="bg-[#020b22] pt-14 md:pt-20 pb-8 relative text-white overflow-hidden border-t-2 border-[#082f89]/60" data-testid="footer">
        {/* Glow background effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#082f89]/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[250px] bg-[#01a345]/15 blur-[120px] pointer-events-none rounded-full" />

        {/* Grid line backdrop overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">


        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Col 1: Brand Hero (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block bg-white rounded-2xl px-4 py-2.5 shadow-[0_10px_30px_rgba(8,47,137,0.3)] border border-slate-100">
              <img src="/assets/rgms-logo-transparent.png" alt="RGMS Smarthome" className="h-10 md:h-11 w-auto object-contain" />
            </div>

            <div className="inline-flex items-center gap-2 bg-[#01a345]/20 text-[#01a345] text-[11px] font-black uppercase tracking-[0.14em] px-3.5 py-1 rounded-full border border-[#01a345]/40 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#01a345] animate-pulse" />
              Next-Gen AI Security Brand
            </div>

            <p className="text-[#94a3b8] text-[13px] leading-relaxed max-w-sm font-medium">
              {footerData.about}
            </p>

            <div className="pt-2">
              <p className="text-[11.5px] font-extrabold text-white uppercase tracking-[0.12em] mb-3">Connect With Us</p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Facebook, href: '#top', label: 'Facebook' },
                  { Icon: Instagram, href: '#top', label: 'Instagram' },
                  { Icon: Youtube, href: '#top', label: 'YouTube' },
                  { Icon: WhatsAppIcon, href: 'https://wa.me/917707019501', label: 'WhatsApp' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#082f89] text-[#e8eeff] hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#01a345]" />
              <p className="text-white text-[13px] font-black uppercase tracking-[0.14em]">Explore Categories</p>
            </div>
            <ul className="space-y-2.5">
              {footerData.categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={c.slug === 'products' ? '/products' : `/category/${c.slug}`}
                    className="text-[#cbd5e1] hover:text-[#01a345] text-[13px] font-semibold transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={13} className="text-[#082f89] group-hover:text-[#01a345] group-hover:translate-x-1 transition-transform" />
                    <span>{c.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care & Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#082f89]" />
              <p className="text-white text-[13px] font-black uppercase tracking-[0.14em]">Customer Care</p>
            </div>
            <ul className="space-y-2.5">
              {footerData.information.map((item) => {
                const isExternal = item.path.startsWith('http');
                return (
                  <li key={item.label}>
                    {isExternal ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#cbd5e1] hover:text-[#01a345] text-[13px] font-medium transition-colors flex items-center gap-1.5 group"
                      >
                        <ChevronRight size={13} className="text-[#082f89] group-hover:text-[#01a345] group-hover:translate-x-1 transition-transform" />
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="text-[#cbd5e1] hover:text-white text-[13px] font-medium transition-colors flex items-center gap-1.5 group"
                      >
                        <ChevronRight size={13} className="text-[#082f89] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Contact HQ & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f00102]" />
              <p className="text-white text-[13px] font-black uppercase tracking-[0.14em]">Headquarters & VIP</p>
            </div>

            <div className="space-y-3 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#01a345] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#e8eeff] text-[12.5px] font-extrabold">{footerData.phone}</p>
                  <p className="text-[#94a3b8] text-[11px] font-medium">{footerData.hours}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#01a345] shrink-0" />
                <p className="text-[#e8eeff] text-[12.5px] font-extrabold">{footerData.email}</p>
              </div>

              <div className="flex items-start gap-3 pt-1 border-t border-white/10">
                <MapPin size={16} className="text-[#01a345] shrink-0 mt-0.5" />
                <p className="text-[#94a3b8] text-[11.5px] leading-relaxed font-medium">{footerData.address}</p>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-[11.5px] font-extrabold text-[#01a345] uppercase tracking-[0.12em] mb-2.5">Join RGMS Insider VIP</p>
              <form onSubmit={subscribe} className="flex bg-[#082f89] rounded-full p-1 border border-white/20 focus-within:ring-2 focus-within:ring-[#01a345] transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  aria-label="Newsletter email"
                  className="flex-1 bg-transparent px-3.5 text-[12.5px] text-white placeholder:text-[#94a3b8] outline-none min-w-0 font-medium"
                  data-testid="footer-newsletter-email"
                />
                <button type="submit" className="bg-[#01a345] hover:bg-[#018a3a] text-white text-[12px] font-bold px-4 py-2 rounded-full shrink-0 flex items-center gap-1 transition-all active:scale-95 shadow-md" data-testid="footer-newsletter-submit">
                  <span>JOIN</span>
                  <ArrowUpRight size={14} />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Payment badges & Certification Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[11.5px] font-bold text-[#94a3b8] uppercase tracking-wider mr-2">Secure Payments:</span>
            {['UPI', 'VISA', 'Mastercard', 'RuPay', 'Paytm', 'NetBanking', 'COD'].map((p) => (
              <span key={p} className="bg-white/10 border border-white/10 text-white text-[11px] font-extrabold px-3 py-1 rounded-md shadow-sm">
                {p}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11.5px] text-[#94a3b8] font-bold">
            <span className="inline-flex items-center gap-1 text-[#01a345]"><CheckCircle2 size={13} /> ISO 9001:2025</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[#01a345]"><CheckCircle2 size={13} /> BIS Certified</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-white"><Award size={13} className="text-[#FF9933]" /> Make in India</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#94a3b8] font-medium text-center md:text-left">
          <p>{footerData.copyright}</p>
          <p className="text-[11.5px] font-semibold text-[#cbd5e1]">
            Developed & Maintained by{' '}
            <a
              href="https://webfloratechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#01a345] hover:text-white font-extrabold transition-colors underline underline-offset-4"
            >
              Webflora Technologies
            </a>
          </p>
          <div className="flex items-center gap-5 text-[11.5px]">
            <a href="#top" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#top" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#top" className="hover:text-white transition-colors">Shipping Policy</a>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp API Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
        <a
          href="https://wa.me/917707019501?text=Hello%20RGMS%20Team!%20I%20have%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          data-testid="floating-whatsapp-btn"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.45)] border-2 border-white transition-all duration-300 hover:scale-105 active:scale-95 group font-extrabold text-xs"
        >
          <WhatsAppIcon size={20} className="text-white shrink-0" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <button
          onClick={() => setIsEnquiryModalOpen(true)}
          aria-label="Quick Enquiry"
          className="inline-flex items-center gap-2 bg-[#082f89] hover:bg-[#0e45c4] text-white px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(8,47,137,0.45)] border-2 border-white transition-all duration-300 hover:scale-105 active:scale-95 group font-extrabold text-xs"
        >
          <MessageSquare size={18} className="text-white shrink-0" />
          <span className="hidden sm:inline">Quick Enquiry</span>
        </button>
      </div>

      {/* Floating Direct Call Button */}
      <a
        href="tel:+917707019501"
        aria-label="Call Support"
        data-testid="direct-call-button"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#082f89] hover:bg-[#01a345] text-white flex items-center justify-center z-40 shadow-[0_10px_30px_rgba(8,47,137,0.5)] border-2 border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <Phone size={20} className="group-hover:rotate-12 transition-transform" />
      </a>

      <QuickEnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} />
    </footer>
    </>
  );
};
