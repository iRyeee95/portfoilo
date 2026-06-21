import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SplitText from './SplitText';
import savedConfigData from '../data/config.json';
const savedConfig = savedConfigData as any;

interface WelcomeHeroProps {
  onEnter: () => void;
  onNavigateSection?: (section: 'biography' | 'works' | 'motion' | 'contact') => void;
}

export default function WelcomeHero({ onEnter, onNavigateSection }: WelcomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [imgError, setImgError] = useState(false);
  
  // Interactive styling state for the user uploaded custom PNG
  const [imgWidth, setImgWidth] = useState<number>(() => {
    const saved = savedConfig.welcome_img_width || localStorage.getItem('welcome_img_width');
    return saved ? parseInt(saved, 10) : 1610;
  });
  const [leftMargin, setLeftMargin] = useState<number>(() => {
    const saved = savedConfig.welcome_img_left_margin || localStorage.getItem('welcome_img_left_margin');
    return saved ? parseInt(saved, 10) : 55;
  });
  const [topOffset, setTopOffset] = useState<number>(() => {
    const saved = savedConfig.welcome_img_top_offset || localStorage.getItem('welcome_img_top_offset');
    return saved ? parseInt(saved, 10) : 180;
  });
  const [maxHeight, setMaxHeight] = useState<number>(() => {
    const saved = savedConfig.welcome_img_max_height || localStorage.getItem('welcome_img_max_height');
    return saved ? parseInt(saved, 10) : 500;
  });
  // Custom video background mask opacity (0 to 100)
  const [maskOpacity, setMaskOpacity] = useState<number>(() => {
    const saved = savedConfig.welcome_mask_opacity || localStorage.getItem('welcome_mask_opacity');
    return saved ? parseInt(saved, 10) : 52;
  });
  // Custom video background mask vertical height / gradient spread width (10 to 100)
  const [maskHeight, setMaskHeight] = useState<number>(() => {
    const saved = savedConfig.welcome_mask_height || localStorage.getItem('welcome_mask_height');
    return saved ? parseInt(saved, 10) : 65;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('welcome_img_width', imgWidth.toString());
  }, [imgWidth]);

  useEffect(() => {
    localStorage.setItem('welcome_img_left_margin', leftMargin.toString());
  }, [leftMargin]);

  useEffect(() => {
    localStorage.setItem('welcome_img_top_offset', topOffset.toString());
  }, [topOffset]);

  useEffect(() => {
    localStorage.setItem('welcome_img_max_height', maxHeight.toString());
  }, [maxHeight]);

  useEffect(() => {
    localStorage.setItem('welcome_mask_opacity', maskOpacity.toString());
  }, [maskOpacity]);

  useEffect(() => {
    localStorage.setItem('welcome_mask_height', maskHeight.toString());
  }, [maskHeight]);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video play request interrupted:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white font-sans flex flex-col justify-between" id="welcome-fullscreen-video-hero">
      {/* Background HTML5 Loop Video */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-100 scale-100"
          poster="https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80"
        >
          {/* Main user uploaded file from /public */}
          <source src="/welcome-bg.mp4" type="video/mp4" />
          {/* Fallback source to keep development preview active */}
          <source src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f2a15d070007cd82548483f9801be9c4b7bce1d&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        {/* Abstract Swiss Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Soft Vignette Overlay to ensure text readability - Opacity and span width are fully adjustable */}
        <div 
          className="absolute inset-0 transition-all duration-300 pointer-events-none" 
          style={{ 
            opacity: maskOpacity / 100,
            background: `linear-gradient(to top, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.45) ${maskHeight * 0.45}%, rgba(255, 255, 255, 0) ${maskHeight}%)`
          }}
        />
      </div>

      {/* Top branding centered navigation bar with #E1FF39 hover accent rounded rectangle */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-center">
        {/* Navigation Bar */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button 
            onClick={() => onNavigateSection?.('biography')}
            className="font-sans text-[11px] font-extrabold tracking-widest text-neutral-900 hover:bg-[#E1FF39] hover:text-neutral-950 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer uppercase select-none"
          >
            ABOUT ME
          </button>
          <button 
            onClick={() => onNavigateSection?.('works')}
            className="font-sans text-[11px] font-extrabold tracking-widest text-neutral-900 hover:bg-[#E1FF39] hover:text-neutral-950 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer uppercase select-none"
          >
            PROJECTS
          </button>
          <button 
            onClick={() => onNavigateSection?.('motion')}
            className="font-sans text-[11px] font-extrabold tracking-widest text-neutral-900 hover:bg-[#E1FF39] hover:text-neutral-950 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer uppercase select-none"
          >
            MOTION EFFECTS
          </button>
          <button 
            onClick={() => onNavigateSection?.('contact')}
            className="font-sans text-[11px] font-extrabold tracking-widest text-neutral-900 hover:bg-[#E1FF39] hover:text-neutral-950 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer uppercase select-none"
          >
            CONTACT
          </button>
        </nav>
      </div>

      {/* Centerpiece Monolithic Typography block */}
      <div 
        className="relative z-10 w-full max-w-none px-4 sm:px-6 lg:px-8 my-auto flex flex-col items-start space-y-6"
        style={{ 
          textAlign: 'left', 
          width: '100%', 
          marginLeft: `${leftMargin}px`,
          transform: `translateY(${topOffset}px)`,
          transition: 'margin-left 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        <div 
          className="space-y-3 w-full transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-4"
          style={{ 
            maxWidth: `${imgWidth}px`
          }}
        >
          <img
            src="/welcome-text.png"
            alt="Welcome Title"
            referrerPolicy="no-referrer"
            className="block h-auto max-w-full select-none"
            style={{ 
              pointerEvents: 'none',
              maxHeight: `${maxHeight}px`,
              width: `${imgWidth}px`
            }}
            onError={(e) => {
              console.warn("Retrying png file load or loading default asset representation.");
            }}
          />
        </div>

        {/* Call to actions */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onEnter}
            className="group px-6 py-3.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer hover:opacity-90"
            id="enter-studio-btn"
            style={{ 
              marginLeft: '0px', 
              backgroundColor: '#E1FF39' 
            }}
          >
            <span style={{ color: '#000000' }}>ENTER DESIGN STUDIO</span>
            <ArrowDown className="h-4 w-4 transform group-hover:translate-y-1 transition-transform" style={{ color: '#000000' }} />
          </button>
        </div>
      </div>



    </div>
  );
}

