import React from 'react';
import { Package, Users, CheckCircle2, Award, MapPin } from 'lucide-react';

const stats = [
  { icon: Package, title: '50,000+', subtitle: 'UNITS SOLD' },
  { icon: Users, title: '5,000+', subtitle: 'HAPPY CLIENTS' },
  { icon: CheckCircle2, title: '25,000+', subtitle: 'ORDERS FULFILLED' },
  { icon: Award, title: '5+', subtitle: 'YEARS OF EXPERIENCE' },
  { icon: MapPin, title: 'Pan India', subtitle: 'TECH PRESENCE' },
];

const StatMarquee = () => {
  // Duplicate list to ensure smooth scrolling coverage
  const trackItems = [...stats, ...stats, ...stats];

  return (
    <section className="bg-gradient-to-r from-[#020b22] via-[#041b54] to-[#020b22] py-4 border-y border-[#082f89]/50 overflow-hidden relative z-10 text-white shadow-md">
      <div
        className="marquee-mask py-0 my-0 border-none bg-transparent"
        role="region"
        aria-label="RGMS Key Statistics"
      >
        <div className="marquee-track gap-12 sm:gap-16">
          {trackItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 sm:gap-16 shrink-0">
              <div className="flex items-center gap-4 py-1">
                <item.icon size={24} className="text-[#01a345] shrink-0" />
                <div>
                  <p className="text-[14px] sm:text-[16px] font-black text-white leading-none">{item.title}</p>
                  <p className="text-[9.5px] sm:text-[10.5px] text-[#94a3b8] font-bold tracking-wider uppercase mt-1.5">{item.subtitle}</p>
                </div>
              </div>
              <div className="w-[1.5px] h-7 bg-white/15 shrink-0" />
            </div>
          ))}
        </div>
        <div className="marquee-track gap-12 sm:gap-16" aria-hidden="true">
          {trackItems.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-12 sm:gap-16 shrink-0">
              <div className="flex items-center gap-4 py-1">
                <item.icon size={24} className="text-[#01a345] shrink-0" />
                <div>
                  <p className="text-[14px] sm:text-[16px] font-black text-white leading-none">{item.title}</p>
                  <p className="text-[9.5px] sm:text-[10.5px] text-[#94a3b8] font-bold tracking-wider uppercase mt-1.5">{item.subtitle}</p>
                </div>
              </div>
              <div className="w-[1.5px] h-7 bg-white/15 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatMarquee;
