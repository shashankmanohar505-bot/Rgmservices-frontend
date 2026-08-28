import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { Footer, WhatsAppIcon } from './BottomSections';
import { footerData } from '../mock/mock';
import SEO from './SEO';
import { 
  ShieldCheck, Trophy, Target, Heart, Award, CheckCircle2, 
  MapPin, Phone, Mail, Clock, ArrowRight, Zap, Radio, Lock, Eye, Users, ChevronRight
} from 'lucide-react';

export const AboutPage = () => {
  const stats = [
    { value: '5,000+', label: 'Protected Homes & Fleets', icon: ShieldCheck },
    { value: '500+', label: 'Cities Across India', icon: MapPin },
    { value: '99.9%', label: 'Uptime & App Reliability', icon: Zap },
    { value: '6 Months', label: 'Free Replacement Warranty', icon: Award },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Advanced AI Security",
      desc: 'Smart human detection, zero false alarms, and instant app push notifications on iOS & Android.',
    },
    {
      icon: Radio,
      title: 'Advanced GPS & Vehicle Tracking',
      desc: 'Real-time vehicle tracking, remote engine lock/cutoff, live voice listening & 10,000 mAh long battery backups.',
    },
    {
      icon: Trophy,
      title: 'Pioneers of DIY Setup',
      desc: 'Zero wiring, zero hassle. No technician needed. Simple setup that anyone can install in under 2 minutes.',
    },
    {
      icon: Lock,
      title: 'End-to-End Privacy',
      desc: 'Your privacy is paramount. Full encryption on Cloud & SD Card storage protects all video feeds.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07152e]">
      <SEO 
        title="About Us - RGMS Security & Innovation | AI Security Brand"
        description="Learn about RGMS Smarthome's mission to protect Indian homes and vehicle fleets with DIY AI security cameras, 4G solar surveillance, and vehicle GPS trackers since 2017."
        keywords="About RGMS, RGMS company history, smart home security brand India, vehicle security mission"
        canonical="/about"
      />
      <Header />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-[#041b54] via-[#082f89] to-[#041b54] text-white pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#cbd5e1] mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#01a345]" />
            <span className="text-[#01a345] font-bold uppercase tracking-wider">About Us</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#01a345]/20 text-[#01a345] border border-[#01a345]/40 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
              <Trophy size={14} className="text-[#01a345]" /> <span className="text-white">#BeyondTheLens — About RGMS</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Redefining Smart Security & Vehicle Intelligence Across India
            </h1>

            <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed font-medium">
              Since 2017, RGMS Smarthome has been empowering Indian households, commercial businesses, and vehicle fleets with cutting-edge AI security cameras, 4G solar surveillance, and engine-lock GPS trackers.
            </p>
          </div>

          {/* Stats Bar Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
            {stats.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center space-y-1">
                  <div className="w-10 h-10 bg-[#01a345]/20 text-[#01a345] rounded-xl flex items-center justify-center mx-auto mb-2 border border-[#01a345]/30">
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-white">{st.value}</p>
                  <p className="text-xs text-[#cbd5e1] font-semibold">{st.label}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Story & Vision Section */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-5">
            <span className="text-xs font-black text-[#01a345] uppercase tracking-wider bg-[#e2f5ec] px-3.5 py-1.5 rounded-full">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07152e] leading-tight">
              Crafting a Safer, Smarter Lifestyle for Every Indian Home & Vehicle
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed font-medium">
              RGMS was born out of a simple conviction: security shouldn’t require expensive technicians, complex wiring, or confusing contracts. We pioneered DIY 4G Solar Cameras and Plug-and-Play GPS Trackers so that anyone can secure their home, shop, or fleet within minutes.
            </p>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed font-medium">
              From our headquarters in Patna, Bihar, our engineering team continuously innovates to deliver high-definition optics, AI human detection, live voice monitoring, and robust anti-theft engine cutoffs tailored to Indian conditions.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://wa.me/917707019501?text=Hello%20RGMS%20Team!%20I%20want%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold px-6 py-3 rounded-full shadow-lg transition-all active:scale-95"
              >
                <WhatsAppIcon size={18} /> Talk to Security Expert
              </a>
              <Link
                to="/category/gps-trackers"
                className="inline-flex items-center gap-2 bg-[#082f89] hover:bg-[#0e45c4] text-white text-xs font-extrabold px-6 py-3 rounded-full shadow-lg transition-all active:scale-95"
              >
                Explore GPS Trackers <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Visual Image Box */}
          <div className="bg-gradient-to-br from-[#041b54] to-[#082f89] rounded-3xl p-8 text-white shadow-2xl space-y-6 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#01a345]/20 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#01a345] border border-white/10">
                <Target size={24} />
              </span>
              <div>
                <h3 className="text-lg font-black text-white">Our Core Mission</h3>
                <p className="text-xs text-[#cbd5e1]">Zero Hassle • Maximum Security</p>
              </div>
            </div>

            <p className="text-xs text-[#cbd5e1] leading-relaxed font-medium">
              &quot;To democratize smart security across India through affordable AI cameras, 4G solar surveillance, and vehicle anti-theft GPS trackers — backed by transparent warranties and 24/7 dedicated support.&quot;
            </p>

            <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#01a345]" />
                <span className="font-bold text-white">ISO 9001:2025 & BIS Certified Brand</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#01a345]" />
                <span className="font-bold text-white">Make in India Manufacturing Initiative</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#01a345]" />
                <span className="font-bold text-white">6 Months Replacement Warranty Included</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose RGMS Grid */}
      <section className="bg-white py-16 border-t border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-[#082f89] uppercase tracking-wider bg-[#e8eeff] px-3.5 py-1.5 rounded-full">
              Why Choose RGMS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07152e] mt-3">
              Built for Performance, Reliability & Peace of Mind
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-[#f8fafc] hover:bg-white rounded-3xl p-6 border border-slate-200/80 hover:shadow-xl transition-all duration-300 space-y-3 group">
                  <div className="w-12 h-12 bg-[#082f89] text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-[#07152e]">{val.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed font-medium">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Headquarters & Contact Section */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#041b54] to-[#082f89] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid lg:grid-cols-12 gap-8 items-center border border-white/10">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black text-[#01a345] uppercase tracking-wider bg-[#01a345]/20 px-3.5 py-1.5 rounded-full border border-[#01a345]/40">
              Official Headquarters
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Get in Touch with RGMS Team
            </h2>
            <p className="text-xs sm:text-sm text-[#cbd5e1] font-medium leading-relaxed">
              Have questions about dealer inquiries, bulk GPS orders, or technical setup? Visit our office or reach out directly to our customer care team.
            </p>

            <div className="space-y-3 pt-3 text-xs sm:text-sm font-semibold">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#01a345] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">Patna Headquarters:</p>
                  <p className="text-[#cbd5e1]">{footerData.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#01a345] shrink-0" />
                <p className="text-[#cbd5e1]"><strong className="text-white">Customer Care:</strong> {footerData.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#01a345] shrink-0" />
                <p className="text-[#cbd5e1]"><strong className="text-white">Email:</strong> {footerData.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#01a345] shrink-0" />
                <p className="text-[#cbd5e1]">{footerData.hours}</p>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Card */}
          <div className="lg:col-span-5 bg-white text-[#07152e] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-center">
            <div className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <WhatsAppIcon size={28} />
            </div>
            <h3 className="text-lg font-black text-[#07152e]">Instant WhatsApp Support</h3>
            <p className="text-xs text-[#64748b] font-medium">Chat live with our support specialists for quick assistance and live tracking setups.</p>
            <a
              href="https://wa.me/917707019501?text=Hello%20RGMS%20Team!%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold py-3.5 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon size={18} /> Chat on WhatsApp (+91 7707 019 501)
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
