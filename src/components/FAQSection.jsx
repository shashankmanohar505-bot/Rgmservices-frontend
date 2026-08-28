import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircleQuestion, Sparkles, Search, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './BottomSections';

export const faqsList = [
  {
    category: 'General',
    q: 'Do RGMS security cameras require a monthly subscription fee?',
    a: 'No! All RGMS smart security cameras come with lifetime free mobile app access. You can watch live streams, use 2-way talk, receive instant motion alerts, and view SD card recordings without paying any monthly subscription fees.',
  },
  {
    category: 'Cameras',
    q: 'How does the DIY 2-minute setup work for RGMS cameras?',
    a: 'RGMS cameras are designed for 100% plug-and-play installation. Simply plug in the camera (or mount the 4G solar camera), download the free RGMS App on Android/iOS, scan the QR code on the device, and your live stream is active within 2 minutes. No technician required.',
  },
  {
    category: 'GPS Trackers',
    q: 'How does the GPS remote engine cutoff / immobilizer feature work?',
    a: 'RGMS GPS Trackers connect to your bike, car, or commercial vehicle ignition relay. In case of theft or unauthorized usage, you can send a remote engine lock command directly from the RGMS GPS mobile app, bringing the vehicle engine to a safe stop instantly.',
  },
  {
    category: 'Solar & 4G',
    q: 'Do RGMS 4G Solar Cameras work in areas without home WiFi or electric outlets?',
    a: 'Yes! RGMS 4G Solar Surveillance Cameras feature built-in high-capacity rechargeable batteries powered by an industrial-grade solar panel. They connect to the internet using a standard 4G SIM card (Jio, Airtel, Vi), making them 100% wire-free and independent of electric power or local WiFi.',
  },
  {
    category: 'Customer Support',
    q: 'What customer support channels do you offer across India?',
    a: 'We provide dedicated customer care and live technical support operating across 500+ Indian cities. You can easily reach our team via WhatsApp (+91 7707 019 501) or direct phone call for help with device setup or usage.',
  },
  {
    category: 'Privacy & Security',
    q: 'Is my video footage private, encrypted, and secure from hackers?',
    a: 'Your privacy is guaranteed. RGMS uses bank-grade AES 256-bit encryption for both Cloud and SD Card storage. Video streams are encrypted end-to-end, ensuring that only authenticated devices signed into your personal RGMS account can view recordings.',
  },
  {
    category: 'AI Features',
    q: 'How does AI Human & Motion Detection reduce false alarms?',
    a: 'RGMS cameras are equipped with onboard AI vision algorithms that recognize human shapes and body movements. It intelligently filters out false triggers caused by passing pets, wind-blown trees, insects, or light shifts, reducing false notifications by over 95%.',
  },
];

const categories = ['All', 'General', 'Cameras', 'GPS Trackers', 'Solar & 4G', 'Customer Support'];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqsList.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#f8fafc] py-16 lg:py-24 border-t border-slate-200/80 relative overflow-hidden" data-testid="faq-section">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#082f89]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#01a345]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#e8eeff] border border-[#082f89]/20 text-[#082f89] text-[11.5px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <MessageCircleQuestion size={14} className="text-[#01a345]" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#07152e] tracking-tight">
            Frequently Asked <span className="text-[#082f89]">Questions</span>
          </h2>
          <p className="text-sm text-[#64748b] mt-3 font-medium">
            Everything you need to know about RGMS Smart Security Cameras, GPS Trackers, Solar setups & dedicated support.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search any question (e.g. support, installation, GPS lock, 4G SIM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs sm:text-sm text-[#07152e] focus:outline-none focus:border-[#082f89] focus:ring-2 focus:ring-[#082f89]/10 transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#082f89] text-white shadow-md'
                    : 'bg-white text-[#64748b] hover:bg-slate-100 hover:text-[#07152e] border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
              <HelpCircle size={32} className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-bold text-[#07152e]">No questions found matching your search.</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for keywords like &quot;support&quot;, &quot;GPS&quot;, or &quot;solar&quot;.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-[#082f89]/40 shadow-md ring-1 ring-[#082f89]/20' 
                      : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#07152e] hover:text-[#082f89] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 leading-snug">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? 'bg-[#01a345]' : 'bg-slate-300'}`} />
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#082f89] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#01a345]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#64748b] leading-relaxed font-medium border-t border-slate-100/80 mt-1">
                      <p className="pt-3">{faq.a}</p>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#01a345]">
                        <CheckCircle2 size={13} /> Official RGMS Verified Answer
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-14 max-w-3xl mx-auto bg-gradient-to-br from-[#041b54] to-[#082f89] rounded-3xl p-6 sm:p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-white">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] font-medium">Our security support experts are ready to assist you live on WhatsApp.</p>
          </div>

          <a
            href="https://wa.me/917707019501?text=Hello%20RGMS!%20I%20have%20a%20question%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold px-6 py-3.5 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 shrink-0"
          >
            <WhatsAppIcon size={18} /> Chat on WhatsApp (+91 7707 019 501)
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
