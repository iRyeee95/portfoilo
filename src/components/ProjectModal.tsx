import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, ChevronDown, ChevronUp, Crosshair, Copy, Check } from 'lucide-react';
import SmartImg from './SmartImg';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Mode selection: Percentage vs Fixed Pixels
  const [usePxMode, setUsePxMode] = useState<boolean>(true);
  
  // Preset or customized states for single video overlay positioning
  const [overlayTop, setOverlayTop] = useState<number>(10.0);
  const [overlayWidth, setOverlayWidth] = useState<number>(60.0);
  const [overlayLeft, setOverlayLeft] = useState<number>(50.0);
  
  // States for Responsive % Mode (Default & highly recommended for multi-video layout alignment)
  const [respTop, setRespTop] = useState<number>(44.2);
  const [respWidth, setRespWidth] = useState<number>(24.0);
  const [respGap, setRespGap] = useState<number>(1.8);
  const [respLeft, setRespLeft] = useState<number>(50.0);
  const [respRatio, setRespRatio] = useState<number>(2.163); // Aspect ratio, 1125/520 = 2.163

  // States for Fixed Px Mode (Default configured to user specifications)
  const [pxTop, setPxTop] = useState<number>(16460); // Vertical offset in pixels from top of long image
  const [pxWidth, setPxWidth] = useState<number>(462);
  const [pxHeight, setPxHeight] = useState<number>(1000);
  const [pxGap, setPxGap] = useState<number>(40);
  const [pxLeft, setPxLeft] = useState<number>(50.0); // Center position %

  const [isTunerOpen, setIsTunerOpen] = useState<boolean>(false);
  const [videoRadius, setVideoRadius] = useState<number>(28); // Corner radius of videos in pixels
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // Tuner controller is closed/hidden by default as requested.
  // Can be manually reactivated at any time by adding ?tuner=true to the URL
  const [showTunerControl] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('tuner=true') || window.location.hash.includes('tuner');
    }
    return false;
  });

  const scrollToVideo = () => {
    const el = document.getElementById('project-video-overlay-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Sync state if project changes or has pre-configured specs
  useEffect(() => {
    if (project) {
      const prefix = project.id;
      
      // If project has explicit detailVideoConfig, apply it directly
      if (project.detailVideoConfig) {
        const cfg = project.detailVideoConfig;
        if (cfg.mode) setUsePxMode(cfg.mode === 'pixels');
        if (cfg.pxTop !== undefined) setPxTop(cfg.pxTop);
        if (cfg.pxWidth !== undefined) setPxWidth(cfg.pxWidth);
        if (cfg.pxHeight !== undefined) setPxHeight(cfg.pxHeight);
        if (cfg.pxGap !== undefined) setPxGap(cfg.pxGap);
        if (cfg.pxLeft !== undefined) setPxLeft(cfg.pxLeft);
        if (cfg.respTop !== undefined) setRespTop(cfg.respTop);
        if (cfg.respWidth !== undefined) setRespWidth(cfg.respWidth);
        if (cfg.respGap !== undefined) setRespGap(cfg.respGap);
        if (cfg.respLeft !== undefined) setRespLeft(cfg.respLeft);
        if (cfg.respRatio !== undefined) setRespRatio(cfg.respRatio);
        if (cfg.videoRadius !== undefined) setVideoRadius(cfg.videoRadius);
        return;
      }

      const savedUsePx = localStorage.getItem(`${prefix}_usePxMode`);
      if (savedUsePx !== null) setUsePxMode(JSON.parse(savedUsePx));

      const savedRespTop = localStorage.getItem(`${prefix}_respTop`);
      const savedRespWidth = localStorage.getItem(`${prefix}_respWidth`);
      const savedRespGap = localStorage.getItem(`${prefix}_respGap`);
      const savedRespLeft = localStorage.getItem(`${prefix}_respLeft`);
      const savedRespRatio = localStorage.getItem(`${prefix}_respRatio`);
      const savedVideoRadius = localStorage.getItem(`${prefix}_videoRadius`);

      const savedPxTop = localStorage.getItem(`${prefix}_pxTop`);
      const savedPxWidth = localStorage.getItem(`${prefix}_pxWidth`);
      const savedPxHeight = localStorage.getItem(`${prefix}_pxHeight`);
      const savedPxGap = localStorage.getItem(`${prefix}_pxGap`);
      const savedPxLeft = localStorage.getItem(`${prefix}_pxLeft`);

      if (prefix === 'nordmuseet' || prefix === 'cny') {
        setUsePxMode(true);
        setPxTop(savedPxTop !== null ? JSON.parse(savedPxTop) : 16460);
        setPxWidth(savedPxWidth !== null ? JSON.parse(savedPxWidth) : 462);
        setPxHeight(savedPxHeight !== null ? JSON.parse(savedPxHeight) : 1000);
        setPxGap(savedPxGap !== null ? JSON.parse(savedPxGap) : 40);
        setPxLeft(savedPxLeft !== null ? JSON.parse(savedPxLeft) : 50.0);
        setVideoRadius(savedVideoRadius !== null ? JSON.parse(savedVideoRadius) : 28);
      } else {
        setRespTop(savedRespTop !== null ? JSON.parse(savedRespTop) : 15.0);
        setRespWidth(savedRespWidth !== null ? JSON.parse(savedRespWidth) : 60.0);
        setRespLeft(savedRespLeft !== null ? JSON.parse(savedRespLeft) : 50.0);
        setVideoRadius(savedVideoRadius !== null ? JSON.parse(savedVideoRadius) : 16);
        // Single video fallback:
        setOverlayTop(15.0);
        setOverlayWidth(70.0);
        setOverlayLeft(50.0);
      }
    }
  }, [project]);

  // Auto-saving to localStorage on state changes
  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_usePxMode`, JSON.stringify(usePxMode));
    }
  }, [usePxMode, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_respTop`, JSON.stringify(respTop));
    }
  }, [respTop, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_respWidth`, JSON.stringify(respWidth));
    }
  }, [respWidth, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_respGap`, JSON.stringify(respGap));
    }
  }, [respGap, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_respLeft`, JSON.stringify(respLeft));
    }
  }, [respLeft, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_respRatio`, JSON.stringify(respRatio));
    }
  }, [respRatio, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_videoRadius`, JSON.stringify(videoRadius));
    }
  }, [videoRadius, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_pxTop`, JSON.stringify(pxTop));
    }
  }, [pxTop, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_pxWidth`, JSON.stringify(pxWidth));
    }
  }, [pxWidth, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_pxHeight`, JSON.stringify(pxHeight));
    }
  }, [pxHeight, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_pxGap`, JSON.stringify(pxGap));
    }
  }, [pxGap, project]);

  useEffect(() => {
    if (project) {
      localStorage.setItem(`${project.id}_pxLeft`, JSON.stringify(pxLeft));
    }
  }, [pxLeft, project]);

  // Prevent double scrollbars and lock background body scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="project-detail-root">
          {/* Transparent Backdrop that handles click close (Back Layer) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md cursor-zoom-out"
            id="project-detail-overlay"
            onClick={onClose}
          />

          {/* Scrollable Container (Front Layer) - No onClick to avoid scrollbar click closing bugs */}
          <div className="relative min-h-screen w-full flex justify-center py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6 lg:px-8 pointer-events-none">
            
            {/* Elegant Circular Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClose}
              className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 pointer-events-auto rounded-full bg-neutral-900/90 hover:bg-[#E1FF39] text-white hover:text-black p-3.5 shadow-2xl border border-neutral-800 hover:border-[#E1FF39] transition-all duration-300 group flex items-center justify-center cursor-pointer"
              title="关闭预览 (Close)"
              id="close-modal-btn"
            >
              <X className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
            </motion.button>

            {/* Long Content Card Panel - Enlarge to spacious 1560px/1760px for high-impact viewing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-full max-w-[1560px] 2xl:max-w-[1760px] bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-800/60 pointer-events-auto self-start z-10"
              id="modal-body"
            >
              <div className="relative w-full">
                {project.detailImageUrls && project.detailImageUrls.length > 0 ? (
                  project.detailImageUrls.map((url, idx) => (
                    <SmartImg
                      key={idx}
                      src={url}
                      fallbackUrl={project.fallbackUrl}
                      alt={`${project.title} detail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block select-none"
                    />
                  ))
                ) : (
                  <SmartImg
                    src={project.detailImageUrl || project.imageUrl}
                    fallbackUrl={project.fallbackUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto block select-none"
                  />
                )}

                {/* Absolutely overlaid/integrated video over the long image banner/mockup */}
                {project.detailVideoUrls && project.detailVideoUrls.length > 0 && (project.detailVideoPosition === 'overlay' || !project.detailVideoPosition) && (
                  <>
                    {usePxMode ? (
                      // Fixed Pixel Mode
                      <div
                        id="project-video-overlay-target"
                        className="absolute z-20 pointer-events-auto flex justify-center transition-all duration-300"
                        style={{
                          top: `${pxTop}px`,
                          left: `${pxLeft}%`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <div 
                          className="flex items-center"
                          style={{ gap: `${pxGap}px` }}
                        >
                          {project.detailVideoUrls.map((url, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: `${pxWidth}px`,
                                height: `${pxHeight}px`,
                                borderRadius: `${videoRadius}px`,
                              }}
                              className="overflow-hidden bg-black/10"
                            >
                              <video
                                src={url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover block"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Responsive % Mode (Maintains alignment on all screens)
                      <div
                        id="project-video-overlay-target"
                        className="absolute z-20 pointer-events-auto flex justify-center transition-all duration-300"
                        style={{
                          top: `${respTop}%`,
                          left: `${respLeft}%`,
                          transform: 'translateX(-50%)',
                          width: '100%',
                        }}
                      >
                        <div 
                          className="flex items-center justify-center w-full"
                          style={{ gap: `${respGap}%` }}
                        >
                          {project.detailVideoUrls.map((url, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: `${respWidth}%`,
                                aspectRatio: `1 / ${respRatio}`,
                                borderRadius: `${videoRadius}px`,
                              }}
                              className="overflow-hidden bg-black/10"
                            >
                              <video
                                src={url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover block"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Legacy / Fallback for Single video overlay */}
                {!project.detailVideoUrls && project.detailVideoUrl && (project.detailVideoPosition === 'overlay' || !project.detailVideoPosition) && (
                  <div
                    id="project-video-overlay-target"
                    className="absolute z-20 pointer-events-auto shadow-2xl transition-all duration-300"
                    style={{
                      top: `${overlayTop}%`,
                      left: `${overlayLeft}%`,
                      transform: 'translateX(-50%)',
                      width: `${overlayWidth}%`,
                    }}
                  >
                    <div 
                      className="w-full overflow-hidden border border-neutral-800/80 bg-black/90 aspect-16/9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                      style={{ borderRadius: `${videoRadius}px` }}
                    >
                      <video
                        src={project.detailVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain block"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>

          {/* Real-time Video Overlay Positioning Tuner (Shown if overlay custom video/videos are active) */}
          {showTunerControl && project && (project.detailVideoUrl || (project.detailVideoUrls && project.detailVideoUrls.length > 0)) && (project.detailVideoPosition === 'overlay' || !project.detailVideoPosition) && (
            <div className="fixed bottom-6 left-6 z-50 pointer-events-auto bg-neutral-900/95 border border-neutral-800/90 rounded-2xl p-4 sm:p-5 w-[330px] sm:w-[380px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-xs backdrop-blur-xl max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3 shrink-0">
                <div className="flex items-center gap-2 font-bold text-[#E1FF39] text-sm">
                  <Sliders className="w-4 h-4" />
                  <span>项目一视频调整面板 / Tuner</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={scrollToVideo}
                    className="px-2.5 py-1 bg-[#E1FF39]/15 hover:bg-[#E1FF39] text-[#E1FF39] hover:text-black border border-[#E1FF39]/40 rounded-md font-medium text-[11px] transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                    title="点击平滑滚动直接定位到长图中的视频"
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>定位视频</span>
                  </button>
                  <button 
                    onClick={() => setIsTunerOpen(!isTunerOpen)}
                    className="p-1 hover:bg-neutral-800 rounded-lg transition text-neutral-400 hover:text-white cursor-pointer"
                    title={isTunerOpen ? "折叠面板" : "展开面板"}
                  >
                    {isTunerOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isTunerOpen && (
                <div className="space-y-3.5 overflow-y-auto pr-1 select-none scrollbar-thin">
                  {/* Mode Selector for Multi-Video */}
                  {project.detailVideoUrls && project.detailVideoUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-950 rounded-lg select-none mb-1 border border-neutral-800/80">
                      <button
                        onClick={() => setUsePxMode(false)}
                        className={`py-1.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                          !usePxMode ? 'bg-[#E1FF39] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        🖥️ 响应式 % (自适应推荐)
                      </button>
                      <button
                        onClick={() => setUsePxMode(true)}
                        className={`py-1.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                          usePxMode ? 'bg-[#E1FF39] text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        📏 固宽 px 空间
                      </button>
                    </div>
                  )}

                  {project.detailVideoUrls && project.detailVideoUrls.length > 0 ? (
                    /* MULTI VIDEO TUNING */
                    !usePxMode ? (
                      /* responsive % controls */
                      <div className="space-y-2.5">
                        {/* ↕️ 垂直高度 (Top) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">↕️ 垂直高度 (Top)</span>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => setRespTop(prev => Math.max(0, +(prev - 0.1).toFixed(2)))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >-</button>
                              <input 
                                type="number"
                                step="0.05"
                                value={respTop}
                                onChange={(e) => setRespTop(parseFloat(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <button 
                                onClick={() => setRespTop(prev => Math.min(100, +(prev + 0.1).toFixed(2)))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >+</button>
                              <span className="text-neutral-500 font-mono">%</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.05"
                            value={respTop}
                            onChange={(e) => setRespTop(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 📐 单视频宽度 (Width) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">📐 单视频宽度 (Width)</span>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => setRespWidth(prev => Math.max(1, +(prev - 0.1).toFixed(2)))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >-</button>
                              <input 
                                type="number"
                                step="0.1"
                                value={respWidth}
                                onChange={(e) => setRespWidth(parseFloat(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <button 
                                onClick={() => setRespWidth(prev => Math.min(60, +(prev + 0.1).toFixed(2)))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >+</button>
                              <span className="text-neutral-500 font-mono">%</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="1"
                            max="60"
                            step="0.1"
                            value={respWidth}
                            onChange={(e) => setRespWidth(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* ↔️ 视频间距 (Gap) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">↔️ 视频间距 (Gap)</span>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => setRespGap(prev => Math.max(0, +(prev - 0.05).toFixed(2)))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >-</button>
                              <input 
                                type="number"
                                step="0.05"
                                value={respGap}
                                onChange={(e) => setRespGap(parseFloat(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <button 
                                onClick={() => setRespGap(prev => Math.min(20, +(prev + 0.05).toFixed(2)))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >+</button>
                              <span className="text-neutral-500 font-mono">%</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="20"
                            step="0.05"
                            value={respGap}
                            onChange={(e) => setRespGap(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 🎥 整体左右 (Left) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">🎥 整体水平居中 (Left)</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number"
                                step="0.1"
                                value={respLeft}
                                onChange={(e) => setRespLeft(parseFloat(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <span className="text-neutral-500 font-mono">%</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={respLeft}
                            onChange={(e) => setRespLeft(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 📱 视频比例 (H:W Ratio) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">📱 视频比例 (高宽比 H:W)</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number"
                                step="0.005"
                                value={respRatio}
                                onChange={(e) => setRespRatio(parseFloat(e.target.value) || 0)}
                                className="w-18 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0.5"
                            max="3.5"
                            step="0.005"
                            value={respRatio}
                            onChange={(e) => setRespRatio(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    ) : (
                      /* fixed px controls */
                      <div className="space-y-2.5">
                        {/* ↕️ Y轴位置 (Y-Offset) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">↕️ Y轴垂直距离 (pxTop)</span>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => setPxTop(prev => Math.max(0, prev - 10))} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >-10</button>
                              <input 
                                type="number"
                                step="5"
                                value={pxTop}
                                onChange={(e) => setPxTop(parseInt(e.target.value) || 0)}
                                className="w-20 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <button 
                                onClick={() => setPxTop(prev => prev + 10)} 
                                className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                              >+10</button>
                              <span className="text-neutral-500 font-mono">px</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="16000"
                            step="5"
                            value={pxTop}
                            onChange={(e) => setPxTop(parseInt(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 📏 单视频宽度 (Width) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">📏 单视频宽度 (Width)</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number"
                                step="2"
                                value={pxWidth}
                                onChange={(e) => {
                                  const newWidth = parseInt(e.target.value) || 100;
                                  setPxWidth(newWidth);
                                  setPxHeight(Math.round(newWidth * (1125 / 520)));
                                }}
                                className="w-18 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <span className="text-neutral-500 font-mono">px</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="100"
                            max="1200"
                            step="2"
                            value={pxWidth}
                            onChange={(e) => {
                              const newWidth = parseInt(e.target.value);
                              setPxWidth(newWidth);
                              setPxHeight(Math.round(newWidth * (1125 / 520)));
                            }}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 📐 单视频高度 (Height) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">📐 单视频高度 (Height)</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number"
                                step="2"
                                value={pxHeight}
                                onChange={(e) => {
                                  const newHeight = parseInt(e.target.value) || 100;
                                  setPxHeight(newHeight);
                                  setPxWidth(Math.round(newHeight / (1125 / 520)));
                                }}
                                className="w-18 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <span className="text-neutral-500 font-mono">px</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="100"
                            max="2500"
                            step="2"
                            value={pxHeight}
                            onChange={(e) => {
                              const newHeight = parseInt(e.target.value);
                              setPxHeight(newHeight);
                              setPxWidth(Math.round(newHeight / (1125 / 520)));
                            }}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* ↔️ 间隙大小 (Gap) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">↔️ 间隙大小 (Gap)</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number"
                                step="1"
                                value={pxGap}
                                onChange={(e) => setPxGap(parseInt(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <span className="text-neutral-500 font-mono">px</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="300"
                            step="1"
                            value={pxGap}
                            onChange={(e) => setPxGap(parseInt(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        {/* 🎥 整体居中 (Left) */}
                        <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 font-medium">🎥 整体水平居中 (Left)</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number"
                                step="0.5"
                                value={pxLeft}
                                onChange={(e) => setPxLeft(parseFloat(e.target.value) || 0)}
                                className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                              />
                              <span className="text-neutral-500 font-mono">%</span>
                            </div>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.5"
                            value={pxLeft}
                            onChange={(e) => setPxLeft(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    /* SINGLE VIDEO TUNING (LEGACY) */
                    <div className="space-y-2.5">
                      <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-300 font-medium">↕️ 垂直位置 (Top)</span>
                          <div className="flex items-center gap-1">
                            <input 
                              type="number"
                              step="0.1"
                              value={overlayTop}
                              onChange={(e) => setOverlayTop(parseFloat(e.target.value) || 0)}
                              className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                            />
                            <span className="text-neutral-500 font-mono">%</span>
                          </div>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={overlayTop}
                          onChange={(e) => setOverlayTop(parseFloat(e.target.value))}
                          className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-300 font-medium">↔️ 宽度大小 (Width)</span>
                          <div className="flex items-center gap-1">
                            <input 
                              type="number"
                              step="0.1"
                              value={overlayWidth}
                              onChange={(e) => setOverlayWidth(parseFloat(e.target.value) || 0)}
                              className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                            />
                            <span className="text-neutral-500 font-mono">%</span>
                          </div>
                        </div>
                        <input 
                          type="range"
                          min="10"
                          max="100"
                          step="0.1"
                          value={overlayWidth}
                          onChange={(e) => setOverlayWidth(parseFloat(e.target.value))}
                          className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-300 font-medium">🎥 左右位置 (Left)</span>
                          <div className="flex items-center gap-1">
                            <input 
                              type="number"
                              step="0.1"
                              value={overlayLeft}
                              onChange={(e) => setOverlayLeft(parseFloat(e.target.value) || 0)}
                              className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                            />
                            <span className="text-neutral-500 font-mono">%</span>
                          </div>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={overlayLeft}
                          onChange={(e) => setOverlayLeft(parseFloat(e.target.value))}
                          className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Global Border Radius Controller */}
                  <div className="space-y-1 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300 font-medium">🟡 视频圆角 (Radius)</span>
                      <div className="flex items-center gap-1">
                        <input 
                          type="number"
                          step="1"
                          value={videoRadius}
                          onChange={(e) => setVideoRadius(parseInt(e.target.value) || 0)}
                          className="w-16 px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-right text-[#E1FF39] font-mono text-[11px] focus:outline-none focus:border-[#E1FF39]"
                        />
                        <span className="text-neutral-500 font-mono">px</span>
                      </div>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={videoRadius}
                      onChange={(e) => setVideoRadius(parseInt(e.target.value))}
                      className="w-full accent-[#E1FF39] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Share/Export Parameter configurations for future edits */}
                  <div className="border-t border-neutral-800/80 pt-3 mt-2 space-y-2">
                    <button
                      onClick={() => {
                        const config = usePxMode ? {
                          mode: 'pixels',
                          pxTop,
                          pxWidth,
                          pxHeight,
                          pxGap,
                          pxLeft,
                          videoRadius
                        } : {
                          mode: 'responsive',
                          respTop,
                          respWidth,
                          respGap,
                          respLeft,
                          respRatio,
                          videoRadius
                        };
                        navigator.clipboard.writeText(JSON.stringify(config, null, 2));
                        setHasCopied(true);
                        setTimeout(() => setHasCopied(false), 2500);
                      }}
                      className="w-full py-2 px-3 bg-neutral-950 text-[#E1FF39] hover:bg-[#E1FF39] hover:text-neutral-950 border border-neutral-700 hover:border-[#E1FF39] rounded-lg font-semibold text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {hasCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>已成功复制微调配置到剪贴板！</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>复制微调参数 JSON</span>
                        </>
                      )}
                    </button>
                    {/* Display actual config briefly */}
                    <div className="bg-neutral-950/90 p-2.5 rounded-lg text-[10px] font-mono text-neutral-400 overflow-x-auto max-h-24 scrollbar-thin select-all border border-neutral-800/60">
                      {JSON.stringify(
                        usePxMode ? {
                          mode: 'pixels',
                          pxTop,
                          pxWidth,
                          pxHeight,
                          pxGap,
                          pxLeft,
                          videoRadius
                        } : {
                          mode: 'responsive',
                          respTop,
                          respWidth,
                          respGap,
                          respLeft,
                          respRatio,
                          videoRadius
                        },
                        null,
                        2
                      )}
                    </div>
                  </div>

                  <div className="border-t border-neutral-850 pt-2 text-[10.5px] text-neutral-400 leading-normal">
                    💡 拖动滑块或修改数字可实时调整视频大小与对齐槽位。微调会自动存入浏览器；点击右上角『定位视频』可随时跳转至视频视角。
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
