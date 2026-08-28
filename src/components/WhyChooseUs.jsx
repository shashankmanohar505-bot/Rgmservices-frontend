import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Wrench, 
  Car, 
  Award, 
  Lock, 
  BadgePercent, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Headphones,
  Zap,
  Star,
  BrainCircuit,
  Bot,
  Cpu
} from 'lucide-react';
import { WhatsAppIcon } from './BottomSections';

export const whyChooseFeatures = [
  {
    icon: BrainCircuit,
    title: 'AI Human & Motion Detection',
    subtitle: 'Zero False Alarms',
    description: 'Smart AI algorithms filter out pets, wind, and rain, sending instant high-priority push alerts to your smartphone when real threats occur.',
    badge: 'AI Powered',
    color: 'from-[#082f89] to-[#041b54]',
  },
  {
    icon: Wrench,
    title: 'DIY 2-Minute Setup',
    subtitle: 'Zero Technician Cost',
    description: 'True plug-and-play installation with zero complicated wiring. DIY wireless & 4G solar options ready to install straight out of the box.',
    badge: 'Easy Setup',
    color: 'from-[#01a345] to-[#007a33]',
  },
  {
    icon: Car,
    title: 'Remote Vehicle Engine Lock',
    subtitle: 'Anti-Theft GPS Tech',
    description: 'Real-time vehicle tracking, engine cutoff immobilizer via app, geofence alerts, and live audio monitoring for total fleet security.',
    badge: 'Anti-Theft',
    color: 'from-[#082f89] to-[#0e45c4]',
  },
  {
    icon: Award,
    title: 'Dedicated Customer Care',
    subtitle: 'Pan-India Service',
    description: 'Enjoy complete peace of mind with dedicated customer service and technical support active across 500+ cities in India.',
    badge: '24/7 support',
    color: 'from-[#01a345] to-[#007a33]',
  },
  {
    icon: Lock,
    title: 'Bank-Grade Data Encryption',
    subtitle: '100% Privacy Secured',
    description: 'AES 256-bit encryption safeguards your cloud and local SD card recordings, ensuring only authorized family members can access video feeds.',
    badge: 'Encrypted',
    color: 'from-[#041b54] to-[#082f89]',
  },
  {
    icon: BadgePercent,
    title: 'Zero Monthly Subscriptions',
    subtitle: 'Pay Once, Free Forever',
    description: 'No hidden recurring charges. Enjoy lifetime access to mobile app live viewing, 2-way audio, motion alerts, and remote playback for free.',
    badge: 'Lifetime Free App',
    color: 'from-[#01a345] to-[#082f89]',
  },
];

export const statsData = [
  { value: '5,000+', label: 'Protected Homes & Fleets', icon: ShieldCheck },
  { value: '500+', label: 'Cities Across India', icon: Zap },
  { value: '99.9%', label: 'App & Cloud Uptime', icon: CheckCircle2 },
  { value: '4.9 ★', label: 'Average Customer Rating', icon: Star },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#ffffff] py-16 lg:py-24 relative overflow-hidden" data-testid="why-choose-us-section">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#082f89]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#01a345]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#e8eeff] border border-[#082f89]/20 text-[#082f89] text-[11.5px] sm:text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={14} className="text-[#01a345]" />
            <span>The RGMS Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07152e] tracking-tight leading-tight">
            Why <span className="text-[#082f89]">5,000+</span> Customers Choose <span className="text-[#01a345]">RGMS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748b] mt-4 font-medium leading-relaxed">
            From smart AI home surveillance to anti-theft vehicle GPS tracking, RGMS delivers industry-leading reliability, effortless DIY installation, and unmatched privacy.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {whyChooseFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(8,47,137,0.04)] hover:shadow-[0_16px_36px_rgba(8,47,137,0.12)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Corner Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-slate-100 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} strokeWidth={2.2} />
                    </div>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider px-3 py-1 bg-slate-100 text-[#07152e] rounded-full border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-black text-[#07152e] group-hover:text-[#082f89] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-[#01a345] uppercase tracking-wide mt-1 mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Trust Line */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between relative z-10 text-xs font-bold text-[#082f89]">
                  <span className="flex items-center gap-1.5 text-[#07152e] group-hover:text-[#082f89] transition-colors">
                    <CheckCircle2 size={15} className="text-[#01a345]" /> Tested & Verified
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[#082f89]">
                    Learn More <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Stats Bar */}
        <div className="bg-gradient-to-r from-[#041b54] via-[#082f89] to-[#041b54] rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden mb-12 border border-white/10">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10 text-center">
            {statsData.map((st, idx) => {
              const StatIcon = st.icon;
              return (
                <div key={idx} className="space-y-1.5 p-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2 text-[#01a345] border border-white/15">
                    <StatIcon size={20} />
                  </div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {st.value}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[#cbd5e1]">
                    {st.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#082f89]/10 text-[#082f89] flex items-center justify-center shrink-0">
              <Headphones size={28} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-[#07152e]">Need Help Choosing the Right Security Setup?</h4>
              <p className="text-xs sm:text-sm text-[#64748b] font-medium mt-0.5">Talk with our Indian security specialists for tailored camera & GPS recommendations.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917707019501?text=Hello%20RGMS!%20I%20want%20to%20know%20why%20I%20should%20choose%20RGMS%20for%20my%20home/vehicle."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold px-5 py-3 rounded-full shadow-md transition-all active:scale-95"
            >
              <WhatsAppIcon size={16} /> Chat on WhatsApp
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#082f89] hover:bg-[#0e45c4] text-white text-xs font-extrabold px-5 py-3 rounded-full shadow-md transition-all active:scale-95"
            >
              Shop All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
