import React, { useRef, useState } from 'react';
import { Play, Pause, Film, Layers, Clock, Maximize, ArrowRight, Eye } from 'lucide-react';
import SmartVideo from './SmartVideo';
import InteractiveDotGrid from './InteractiveDotGrid';

interface MotionCardProps {
  key?: string;
  videoUrl: string;
  title: string;
  category: string;
  resolution: string;
  fps: string;
  index: string;
  description: string;
  onPreview: (url: string, title: string) => void;
}

function MotionCard({ videoUrl }: MotionCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div 
      className="flex-shrink-0 w-[240px] sm:w-[380px] aspect-video rounded-xl overflow-hidden relative group/mcard transition-all duration-300"
    >
      {/* Background Video Stream using SmartVideo */}
      <SmartVideo
        ref={videoRef}
        baseName={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.01] opacity-100 group-hover/mcard:scale-120 transition-transform duration-700 ease-out"
      />
    </div>
  );
}

interface VerticalVideoCardProps {
  key?: string;
  video: {
    id: string;
    url: string;
    placeholderUrl?: string;
    title: string;
    category: string;
    resolution: string;
    description: string;
  };
}

function VerticalVideoCard({ video }: VerticalVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div 
      className="relative w-full aspect-[9/20] bg-neutral-950 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
    >
      <SmartVideo
        ref={videoRef}
        baseName={video.url}
        placeholderUrl={video.placeholderUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.04] transition-transform duration-750 ease-out group-hover:scale-[1.08]"
      />
      {/* 渐变遮罩 (渐变黑色遮罩高度为视频的1/10，即原高度的二分之一，透明度为#000000的0%-80%，更自然的过渡) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-10 pointer-events-none"
      />
      {/* 文字内容 (在hover且下方显现) */}
      <div 
        className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none"
      >
        <h3 className="font-sans text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
          {video.title}
        </h3>
      </div>
    </div>
  );
}


// Visual layout configuration constants adjusted and saved by the user
const CAROUSEL_CONFIG = {
  cardWidthPercent: 95,
  centerScale: 1.22,
  sideScale: 0.82,
  sideTranslateX: 36,
  sideOpacity: 0.75,
  marginTopPx: 200,
};

export default function MotionShowcaseScreen() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; isVertical?: boolean } | null>(null);

  // Keep track of the video element references for the carousel
  const carouselRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // 3-Card Carousel State for position swaps without stream reloading
  const [carouselPositions, setCarouselPositions] = useState<Record<string, 'left' | 'center' | 'right'>>({
    v1: 'center',
    v2: 'left',
    v3: 'right',
  });

  const carouselVideos = [
    { id: 'v1', url: '/carousel_1-1.mp4?v=20260616_v4', title: '极光PDF宣发视频' },
    { id: 'v2', url: '/carousel_2-1.mp4?v=20260616_v4', title: '海外录制剪辑软件ONE Recorder推广视频' },
    { id: 'v3', url: '/carousel_3-1.mp4?v=20260616_v4', title: 'AI看图项目竞标演示' },
  ];

  const handleCarouselClick = (id: string, currentPos: 'left' | 'center' | 'right') => {
    if (currentPos === 'center') {
      // If the clicked video is already in the center, replay from the beginning
      const activeVideo = carouselRefs.current[id];
      if (activeVideo) {
        activeVideo.currentTime = 0;
        activeVideo.play().catch(() => {});
      }
      return;
    }
    
    setCarouselPositions(prev => {
      const next = { ...prev };
      const leftKey = Object.keys(prev).find(k => prev[k] === 'left')!;
      const centerKey = Object.keys(prev).find(k => prev[k] === 'center')!;
      const rightKey = Object.keys(prev).find(k => prev[k] === 'right')!;

      if (currentPos === 'right') {
        // Right becomes Center, Center becomes Left, Left becomes Right
        next[rightKey] = 'center';
        next[centerKey] = 'left';
        next[leftKey] = 'right';
      } else if (currentPos === 'left') {
        // Left becomes Center, Center becomes Right, Right becomes Left
        next[leftKey] = 'center';
        next[centerKey] = 'right';
        next[rightKey] = 'left';
      }

      // Replay the newly centered video from starting point
      setTimeout(() => {
        const activeVideo = carouselRefs.current[id];
        if (activeVideo) {
          activeVideo.currentTime = 0;
          activeVideo.play().catch(() => {});
        }
      }, 50);

      return next;
    });
  };

  // High-fidelity curated visual loops (7 items on Row 1)
  const leftScrollingVideos = [
    {
      id: 'm1',
      title: 'Procedural Refractions',
      category: '3D KINETIC SPLINES',
      resolution: '4K Cinema',
      fps: '60',
      index: '01',
      description: 'Active Octane lighting refraction bending color caustics across liquid fluid metal curves.',
      url: '/motion_1.mp4?v=20260615'
    },
    {
      id: 'm2',
      title: 'Chronometric Grid',
      category: 'TYPOGRAPHIC MOTION',
      resolution: 'UHD 1:1',
      fps: '30',
      index: '02',
      description: 'Overlapping coordinate typography changing positions responding to scroll velocity values.',
      url: '/motion_2.mp4?v=20260615'
    },
    {
      id: 'm3',
      title: 'Topographic Shift',
      category: 'GEOMETRIC SCAN',
      resolution: '2K Cinema',
      fps: '60',
      index: '03',
      description: 'Abstract digital terrain meshes moving with linear scan line wave algorithms.',
      url: '/motion_3.mp4?v=20260615'
    },
    {
      id: 'm4',
      title: 'Prism Geometry',
      category: 'OPTICAL ILLUSION',
      resolution: '4K Cinema',
      fps: '120',
      index: '04',
      description: 'Symmetrical glass shard matrices slicing white light into continuous spectrally dispersed beams.',
      url: '/motion_4.mp4?v=20260615'
    },
    {
      id: 'm5',
      title: 'Organic Light Array',
      category: 'VOLUMETRIC ATMOSPHERE',
      resolution: '8K Master',
      fps: '24',
      index: '05',
      description: 'Warm smoke cascades catching laser filaments in quiet dark exhibition galleries.',
      url: '/motion_5.mp4?v=20260615'
    },
    {
      id: 'm6',
      title: 'Kinetic Mechanics',
      category: '3D GEOMETRY',
      resolution: '4K Master',
      fps: '60',
      index: '06',
      description: 'Rotating physical gears of abstract typography intersecting with industrial precision.',
      url: '/motion_6.mp4?v=20260615'
    },
    {
      id: 'm7',
      title: 'Fluid Vortices',
      category: 'GENERATIVE FLUID',
      resolution: '4K Master',
      fps: '60',
      index: '07',
      description: 'Turbulent density flow parameters driving multi-colored gaseous smoke streams.',
      url: '/motion_7.mp4?v=20260615'
    }
  ];

  // High-fidelity curated visual loops (Row 2 - Swiss Grids and Scans)
  const rightScrollingVideos = [
    {
      id: 'm8',
      title: 'Axonometric Grid Waves',
      category: 'SWISS WIREFRAME',
      resolution: '3K Cinema',
      fps: '60',
      index: '08',
      description: 'Isometric landscape lines undulating slowly, representing digital topography algorithms.',
      url: '/motion_8.mp4?v=20260615'
    },
    {
      id: 'm9',
      title: 'Cadmium Refraction Studies',
      category: 'COLOR STUDY',
      resolution: '4K Cinema',
      fps: '50',
      index: '09',
      description: 'Bold red oil droplets suspended in liquid state rotating against absolute dark.',
      url: '/motion_9.mp4?v=20260615'
    },
    {
      id: 'm10',
      title: 'Chronophotography Loop',
      category: 'ARCHIVAL FRAME',
      resolution: 'HD Master',
      fps: '24',
      index: '10',
      description: 'Restructured historical sequences of geometric layouts animated frame-by-frame.',
      url: '/motion_10.mp4?v=20260615'
    },
    {
      id: 'm11',
      title: 'Lidar Distance Mesh',
      category: 'TACTICAL SCAN',
      resolution: '4K Cinema',
      fps: '60',
      index: '11',
      description: 'Precise point-cloud coordinates scanning physical object structures to reveal interior void frames.',
      url: '/motion_11.mp4?v=20260615'
    },
    {
      id: 'm8-dup',
      title: 'Axonometric Grid Waves',
      category: 'SWISS WIREFRAME',
      resolution: '3K Cinema',
      fps: '60',
      index: '08',
      description: 'Isometric landscape lines undulating slowly, representing digital topography algorithms.',
      url: '/motion_8.mp4?v=20260615'
    },
    {
      id: 'm9-dup',
      title: 'Cadmium Refraction Studies',
      category: 'COLOR STUDY',
      resolution: '4K Cinema',
      fps: '50',
      index: '09',
      description: 'Bold red oil droplets suspended in liquid state rotating against absolute dark.',
      url: '/motion_9.mp4?v=20260615'
    },
    {
      id: 'm10-dup',
      title: 'Chronophotography Loop',
      category: 'ARCHIVAL FRAME',
      resolution: 'HD Master',
      fps: '24',
      index: '10',
      description: 'Restructured historical sequences of geometric layouts animated frame-by-frame.',
      url: '/motion_10.mp4?v=20260615'
    },
    {
      id: 'm11-dup',
      title: 'Lidar Distance Mesh',
      category: 'TACTICAL SCAN',
      resolution: '4K Cinema',
      fps: '60',
      index: '11',
      description: 'Precise point-cloud coordinates scanning physical object structures to reveal interior void frames.',
      url: '/motion_11.mp4?v=20260615'
    }
  ];

  const verticalVideos = [
    {
      id: 'vert1',
      url: '/publicvertical_1.mp4?v=20260616_v11',
      title: '极光PDF宣发视频',
      category: 'AURORA PDF',
      resolution: '720 × 1600',
      description: '针对移动端深度定制的微距折射粒子美学与几何空间变幻演示。'
    },
    {
      id: 'vert2',
      url: '/publicvertical_2_new.mp4?v=20260616_v11',
      title: '海外录制剪辑软件ONE Recorder推广视频',
      category: 'ONE RECORDER',
      resolution: '1080 × 1920',
      description: '海外高级录屏与视频剪辑工具的多端全生态极速联动宣发视频。'
    },
    {
      id: 'vert3',
      url: '/publicvertical_3.mp4?v=20260616_v11',
      title: 'AI看图项目竞标演示',
      category: 'AI VIEWER',
      resolution: '720 × 1600',
      description: '下一代智能化看图与AIGC图像生态交互重构竞标动态演示。'
    }
  ];

  // Open modal lightbox preview
  const handleOpenPreview = (url: string, title: string, isVertical = false) => {
    setSelectedVideo({ url, title, isVertical });
  };

  return (
    <section 
      className="min-h-screen bg-white text-neutral-950 relative flex flex-col justify-between py-16 scroll-mt-0 overflow-hidden"
      id="dynamic-motion-showcase"
    >
      <InteractiveDotGrid />




      {/* Title & Introduction Block */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="relative bg-[#ffffff] rounded-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 md:items-end gap-6">
          <div className="md:col-span-7 space-y-4">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-neutral-950 uppercase leading-none">
              动态视觉表达 <br />
              <span className="text-[60px] font-normal text-[#E1FF39] tracking-tight leading-none uppercase not-italic block mt-1">#MOTION DESIGN</span>
            </h2>
          </div>
          <div className="md:col-span-5 border-l-2 border-neutral-200 pl-5 text-xs text-neutral-800 font-mono space-y-2 leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shadow-[0_0_6px_rgba(0,0,0,0.2)] animate-pulse" />
              <span className="text-neutral-800 text-[10px] uppercase font-mono tracking-tight font-medium">Hover on videos to discover dynamic behavior</span>
            </div>
          </div>
        </div>
      </div>



      {/* DOUBLE MARCH CAROUSEL ENGINE: Scrolling left and right smoothly */}
      <div className="my-auto py-10 space-y-6 select-none relative z-10">
        
        {/* ROW 1: Scrolling Left Marquee */}
        <div className="w-full overflow-hidden flex relative">
          {/* Subtle fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-left flex gap-6 px-4">
            {/* Render list twice to ensure seamless looped repeat */}
            {[...leftScrollingVideos, ...leftScrollingVideos].map((video, idx) => (
              <MotionCard
                key={`${video.id}-left-${idx}`}
                videoUrl={video.url}
                title={video.title}
                category={video.category}
                resolution={video.resolution}
                fps={video.fps}
                index={video.index}
                description={video.description}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right Marquee */}
        <div className="w-full overflow-hidden flex relative">
          {/* Subtle fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-right flex gap-6 px-4">
            {/* Render list twice to ensure seamless looped repeat */}
            {[...rightScrollingVideos, ...rightScrollingVideos].map((video, idx) => (
              <MotionCard
                key={`${video.id}-right-${idx}`}
                videoUrl={video.url}
                title={video.title}
                category={video.category}
                resolution={video.resolution}
                fps={video.fps}
                index={video.index}
                description={video.description}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>
        </div>

      </div>

      {/* THREE-CARD 3D CAROUSEL PLAYGROUND CONFIGURATION CANVAS */}
      <div 
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-0 transition-all duration-500"
        style={{ marginTop: `${CAROUSEL_CONFIG.marginTopPx}px` }}
      >
        {/* 3D CAROUSEL CONTROLLER */}
        <div className="relative w-full aspect-video flex items-center justify-center overflow-visible select-none">
          {carouselVideos.map((video) => {
            const pos = carouselPositions[video.id];
            
            const isCenter = pos === 'center';
            const isLeft = pos === 'left';
            
            // Generate inline styles on the fly based on dynamic state configs
            const cardWidthStyle = `${CAROUSEL_CONFIG.cardWidthPercent}%`;
            const opacityStyle = isCenter ? 1.0 : CAROUSEL_CONFIG.sideOpacity;
            
            let transformStyle = '';
            if (isCenter) {
              transformStyle = `translateX(0px) scale(${CAROUSEL_CONFIG.centerScale})`;
            } else if (isLeft) {
              transformStyle = `translateX(-${CAROUSEL_CONFIG.sideTranslateX}%) scale(${CAROUSEL_CONFIG.sideScale})`;
            } else {
              transformStyle = `translateX(${CAROUSEL_CONFIG.sideTranslateX}%) scale(${CAROUSEL_CONFIG.sideScale})`;
            }

            const dynamicStyle: React.CSSProperties = {
              width: cardWidthStyle,
              zIndex: isCenter ? 20 : 10,
              opacity: opacityStyle,
              transform: transformStyle,
              transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            };

            const borderRound = isCenter ? 'rounded-3xl' : 'rounded-2xl';
            const cursorMode = isCenter ? '' : 'cursor-pointer';
            const hoverBrightness = isCenter ? '' : 'hover:brightness-105';
            const shadowEffects = isCenter ? 'shadow-[0_15px_30px_rgba(0,0,0,0.2)]' : 'shadow-[0_6px_12px_rgba(0,0,0,0.08)]';
            const borderStyle = isCenter ? 'border border-neutral-950/15' : 'border border-neutral-950/10';

            const positionClasses = `absolute aspect-video overflow-hidden group ${borderRound} ${cursorMode} ${hoverBrightness} ${shadowEffects} ${borderStyle}`;

            return (
              <div 
                key={video.id}
                className={positionClasses}
                style={dynamicStyle}
                onClick={() => handleCarouselClick(video.id, pos)}
              >
                <SmartVideo
                  ref={el => { carouselRefs.current[video.id] = el; }}
                  baseName={video.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-750 ease-out group-hover:scale-[1.05]"
                />
                
                {/* 渐变遮罩 (渐变黑色遮罩高度为视频的1/10，即接近15%的高度，自然展现0%-80%渐变) */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-10 pointer-events-none"
                />
                {/* 文字内容 (在hover时从下方平滑过渡显现) */}
                <div 
                  className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-20 flex flex-col justify-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none"
                >
                  <h3 className="font-sans text-xs sm:text-sm md:text-base font-extrabold text-white tracking-tight leading-snug">
                    {video.title}
                  </h3>
                </div>

                {/* Click and rotation indicator overlay for side background cards */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-neutral-950/15 group-hover:bg-neutral-950/5 transition-colors duration-500 flex items-center justify-center">
                    <span className="bg-neutral-950/85 backdrop-blur-md text-[#E1FF39] text-[10px] font-mono py-1.5 px-3.5 rounded-full font-bold uppercase tracking-wider scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-md">
                      点击切换 / SWAP
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>



      {/* VERTICAL DISPLAY SECTION & MOBILE COHESION */}
      <div 
        className="relative z-10 mx-auto w-full max-w-[1484px] px-4 sm:px-6 lg:px-8 pb-32"
        style={{ marginTop: `calc(${CAROUSEL_CONFIG.marginTopPx}px + 40px)` }}
      >
        {/* Cards columns with side-by-side on desktop, naturally stacked scrolling on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {verticalVideos.map((video) => (
            <VerticalVideoCard
              key={video.id}
              video={video}
            />
          ))}
        </div>
      </div>



      {/* CINEMATIC PREVIEW LIGHTBOX INTERFACE */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className={`bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between ${
              selectedVideo.isVertical 
                ? 'w-full max-w-[340px] sm:max-w-[380px] h-[85vh] max-h-[85vh]' 
                : 'w-full max-w-5xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close trigger */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 text-white hover:text-[#E1FF39] bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800 font-mono text-[10px] uppercase cursor-pointer transition-colors"
            >
              [ CLOSE_ESC ]
            </button>

            {/* Video Canvas */}
            <div className={`w-full bg-black relative flex items-center justify-center ${
              selectedVideo.isVertical ? 'h-full flex-grow' : 'aspect-video'
            }`}>
              <SmartVideo
                baseName={selectedVideo.url}
                autoPlay
                controls
                loop
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lightbox details */}
            <div className="p-5 bg-neutral-950 flex flex-col items-start justify-between gap-3 border-t border-neutral-800/60 flex-shrink-0 text-left">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#E1FF39] uppercase tracking-widest font-bold">// MOTION SOURCE MONITOR</span>
                <h3 className="font-sans text-sm sm:text-base font-extrabold text-white uppercase truncate max-w-xs">{selectedVideo.title}</h3>
                <p className="text-[10px] text-neutral-400 font-mono">Status: Stream online • format: {selectedVideo.isVertical ? 'vertical 9:20' : 'landscape 16:9'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
