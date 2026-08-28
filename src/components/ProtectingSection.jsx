import React from 'react';
import { Award, Wrench, Signal, ShieldCheck, Wifi, Headset, UserCheck, LayoutGrid, Video, Lock } from 'lucide-react';
import { protectingFeatures, futureFeatures } from '../mock/mock';

const iconMap = { award: Award, wrench: Wrench, signal: Signal, shieldcheck: ShieldCheck, wifi: Wifi, headset: Headset };
const futureIconMap = { user: UserCheck, grid: LayoutGrid, video: Video, lock: Lock };

const FeatureCard = ({ f }) => {
  const Icon = iconMap[f.icon];
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 card-lift shadow-sm">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-9 h-9 rounded-xl bg-[#e8eeff] flex items-center justify-center shrink-0">
          <Icon size={17} className="text-[#082f89]" strokeWidth={2} />
        </span>
        <h3 className="text-[14px] font-bold text-[#07152e] leading-tight">{f.title}</h3>
      </div>
      <p className="text-[12.5px] text-[#64748b] leading-relaxed mb-4">{f.desc}</p>
      <a href="#top" className="text-[12.5px] font-bold text-[#082f89] hover:underline inline-flex items-center gap-1 group">
        {f.link.replace(' →', '')}
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </a>
    </div>
  );
};

const PhoneMockup = () => (
  <div className="relative mx-auto w-[220px] md:w-[250px]" aria-hidden>
    <div className="rounded-[36px] bg-gradient-to-b from-[#0e45c4] to-[#082f89] p-[10px] shadow-[0_30px_60px_rgba(8,47,137,0.35)]">
      <div className="rounded-[28px] bg-gradient-to-b from-[#082f89] via-[#041b54] to-[#020d2d] h-[430px] md:h-[480px] relative overflow-hidden">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#01081a] rounded-full" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(8,47,137,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(8,47,137,0.35) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            transform: 'perspective(300px) rotateX(55deg)',
            transformOrigin: 'bottom',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#082f89]/30 blur-2xl" />
        </div>
      </div>
    </div>
  </div>
);

const ProtectingSection = () => {
  const left = protectingFeatures.filter((f) => f.side === 'left');
  const right = protectingFeatures.filter((f) => f.side === 'right');

  return (
    <>
      <section className="bg-white py-16 md:py-20" data-testid="protecting-section">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-h2 text-[#07152e]">
              Protecting <span className="text-[#082f89]">1.6 Crore+</span> Indians
            </h2>
            <p className="text-[13.5px] text-[#64748b] mt-2.5 max-w-xl mx-auto font-medium">
              Our AI-powered cameras set the standard for smart security with cutting edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
            <div className="space-y-5 md:space-y-6">
              {left.map((f) => <FeatureCard key={f.title} f={f} />)}
            </div>
            <PhoneMockup />
            <div className="space-y-5 md:space-y-6">
              {right.map((f) => <FeatureCard key={f.title} f={f} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-20" data-testid="future-ready-section">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-h2 text-[#07152e]">
              Future-ready. <span className="text-[#082f89]">Right now.</span>
            </h2>
            <p className="text-[13.5px] text-[#64748b] mt-2.5 max-w-xl mx-auto font-medium">
              Our AI-powered cameras don&apos;t just record — they understand, analyze, and protect.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
            {futureFeatures.map((f) => {
              const Icon = futureIconMap[f.icon];
              return (
                <div key={f.title} className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 text-center card-lift shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e8eeff] flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon size={18} className="text-[#082f89]" strokeWidth={2} />
                  </div>
                  <h3 className="text-[12.5px] sm:text-[13.5px] font-bold text-[#07152e] mb-1.5 sm:mb-2.5">{f.title}</h3>
                  <p className="text-[11px] sm:text-[12px] text-[#8b98ad] leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProtectingSection;
