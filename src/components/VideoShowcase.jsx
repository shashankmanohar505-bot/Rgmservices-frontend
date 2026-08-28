import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VideoShowcase = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen(); // Safari
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen(); // IE11
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#020b22] to-[#041b54] py-16 md:py-20 relative overflow-hidden text-white" data-testid="video-showcase-section">
      {/* Glow background effects */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#082f89]/30 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#01a345]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Grid line backdrop overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-[#01a345]/20 text-[#01a345] text-[11px] font-black uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full border border-[#01a345]/40 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#01a345] animate-pulse" />
            Product Showcase
          </span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-black text-white leading-tight tracking-tight">
            RGMS in <span className="bg-gradient-to-r from-blue-400 to-[#01a345] bg-clip-text text-transparent">Real Life</span>
          </h2>
          <p className="text-[#94a3b8] text-[13.5px] md:text-[14.5px] mt-4 leading-relaxed font-semibold">
            Watch a quick, casual video walkthrough of our products in action.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Video Container Frame */}
          <div className="relative bg-[#020b22]/40 backdrop-blur-md rounded-3xl p-2 md:p-3 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-[#01a345]/40 transition-all duration-500 group">
            {/* The Video Element */}
            <div className="relative aspect-video rounded-[20px] overflow-hidden bg-black shadow-inner">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/video/video-01.mp4"
                playsInline
                loop
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/45 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <button 
                    aria-label="Play video"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#01a345] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(1,163,69,0.5)] scale-95 hover:scale-105 hover:bg-[#018a3a] transition-all duration-300"
                  >
                    <Play size={26} className="ml-1 fill-white" />
                  </button>
                </div>
              )}

              {/* Custom Control Overlay (Only visible when hovering the player) */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlay} 
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5 fill-white" />}
                  </button>
                  <button 
                    onClick={toggleMute} 
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
                <button 
                  onClick={handleFullscreen} 
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
