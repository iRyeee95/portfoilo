import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
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

  // States for Fixed Px Mode
  const [pxTop, setPxTop] = useState<number>(7145); // Vertical offset in pixels from top of long image
  const [pxWidth, setPxWidth] = useState<number>(370);
  const [pxHeight, setPxHeight] = useState<number>(800);
  const [pxGap, setPxGap] = useState<number>(40);
  const [pxLeft, setPxLeft] = useState<number>(50.0); // Center position %

  const [isTunerOpen, setIsTunerOpen] = useState<boolean>(false);
  const [videoRadius, setVideoRadius] = useState<number>(28); // Corner radius of videos in pixels

  const [showTunerControl] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('tuner=true') || window.location.hash.includes('tuner');
    }
    return false;
  });

  // Sync state if project changes or has pre-configured specs
  useEffect(() => {
    if (project) {
      const prefix = project.id;
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
        setRespTop(savedRespTop !== null ? JSON.parse(savedRespTop) : 44.2);
        setRespWidth(savedRespWidth !== null ? JSON.parse(savedRespWidth) : 24.0);
        setRespGap(savedRespGap !== null ? JSON.parse(savedRespGap) : 1.8);
        setRespLeft(savedRespLeft !== null ? JSON.parse(savedRespLeft) : 50.0);
        setRespRatio(savedRespRatio !== null ? JSON.parse(savedRespRatio) : 2.163);
        setVideoRadius(savedVideoRadius !== null ? JSON.parse(savedVideoRadius) : 28);
        
        setPxTop(savedPxTop !== null ? JSON.parse(savedPxTop) : 7145);
        setPxWidth(savedPxWidth !== null ? JSON.parse(savedPxWidth) : 370);
        setPxHeight(savedPxHeight !== null ? JSON.parse(savedPxHeight) : 800);
        setPxGap(savedPxGap !== null ? JSON.parse(savedPxGap) : 40);
        setPxLeft(savedPxLeft !== null ? JSON.parse(savedPxLeft) : 50.0);
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
          <div className="relative min-h-screen w-full flex justify-center py-6 md:py-16 px-2 sm:px-6 lg:px-8 pointer-events-none">
            
            {/* Elegant Circular Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClose}
              className="fixed top-6 right-6 z-50 pointer-events-auto rounded-full bg-neutral-900/80 hover:bg-[#E1FF39] text-white hover:text-black p-3 shadow-lg border border-neutral-800 hover:border-[#E1FF39] transition-all duration-300 group flex items-center justify-center cursor-pointer"
              title="关闭预览 (Close)"
              id="close-modal-btn"
            >
              <X className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
            </motion.button>

            {/* Long Content Card Panel - Enlarge to 1220px to match grid width perfectly */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-full max-w-[1220px] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-neutral-800/60 pointer-events-auto self-start z-10"
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
            <div className="fixed bottom-6 left-6 z-50 pointer-events-auto bg-neutral-900/95 border border-neutral-800/80 rounded-xl p-4 w-80 shadow-2xl text-xs backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
                <div className="flex items-center gap-1.5 font-bold text-[#E1FF39]">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>视频层位置微调 / Position Tuner</span>
                </div>
                <button 
                  onClick={() => setIsTunerOpen(!isTunerOpen)}
                  className="p-1 hover:bg-neutral-800 rounded transition text-neutral-400 hover:text-white"
                >
                  {isTunerOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isTunerOpen && (
                <div className="space-y-3.5">
                  {/* Mode Selector for Multi-Video */}
                  {project.detailVideoUrls && project.detailVideoUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-950 rounded-lg select-none mb-2 border border-neutral-850">
                      <button
                        onClick={() => setUsePxMode(false)}
                        className={`py-1 rounded text-[10px] sm:text-xs font-medium transition ${
                          !usePxMode ? 'bg-[#E1FF39] text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        🖥️ 响应式 % 比例
                      </button>
                      <button
                        onClick={() => setUsePxMode(true)}
                        className={`py-1 rounded text-[10px] sm:text-xs font-medium transition ${
                          usePxMode ? 'bg-[#E1FF39] text-black' : 'text-neutral-400 hover:text-white'
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
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">↕️ 垂直高度 (Top)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{respTop.toFixed(1)}%</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={respTop}
                            onChange={(e) => setRespTop(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">📐 单视频宽度 (Width)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{respWidth.toFixed(1)}%</span>
                          </div>
                          <input 
                            type="range"
                            min="1"
                            max="50"
                            step="0.1"
                            value={respWidth}
                            onChange={(e) => setRespWidth(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">↔️ 视频间距 (Gap)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{respGap.toFixed(1)}%</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="15"
                            step="0.1"
                            value={respGap}
                            onChange={(e) => setRespGap(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">🎥 整体左右 (Left)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{respLeft.toFixed(1)}%</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={respLeft}
                            onChange={(e) => setRespLeft(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">📱 视频比例 (H:W Ratio)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{respRatio.toFixed(3)}</span>
                          </div>
                          <input 
                            type="range"
                            min="0.5"
                            max="3.0"
                            step="0.005"
                            value={respRatio}
                            onChange={(e) => setRespRatio(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    ) : (
                      /* fixed px controls */
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">↕️ Y轴位置 (Y-Offset)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{pxTop} px</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="8000"
                            step="5"
                            value={pxTop}
                            onChange={(e) => setPxTop(parseInt(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">📏 单视频宽度 (Width)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{pxWidth} px</span>
                          </div>
                          <input 
                            type="range"
                            min="100"
                            max="1000"
                            step="2"
                            value={pxWidth}
                            onChange={(e) => {
                              const newWidth = parseInt(e.target.value);
                              setPxWidth(newWidth);
                              setPxHeight(Math.round(newWidth * (1125 / 520)));
                            }}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">📐 单视频高度 (Height)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{pxHeight} px</span>
                          </div>
                          <input 
                            type="range"
                            min="100"
                            max="2163"
                            step="2"
                            value={pxHeight}
                            onChange={(e) => {
                              const newHeight = parseInt(e.target.value);
                              setPxHeight(newHeight);
                              setPxWidth(Math.round(newHeight / (1125 / 520)));
                            }}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">↔️ 间隙大小 (Gap)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{pxGap} px</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="200"
                            step="1"
                            value={pxGap}
                            onChange={(e) => setPxGap(parseInt(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">🎥 整体居中 (Left)</span>
                            <span className="text-[#E1FF39] font-mono font-medium">{pxLeft.toFixed(1)}%</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            step="0.5"
                            value={pxLeft}
                            onChange={(e) => setPxLeft(parseFloat(e.target.value))}
                            className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    /* SINGLE VIDEO TUNING (LEGACY) */
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">↕️ 垂直位置 (Top)</span>
                          <span className="text-[#E1FF39] font-mono font-medium">{overlayTop.toFixed(1)}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={overlayTop}
                          onChange={(e) => setOverlayTop(parseFloat(e.target.value))}
                          className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">↔️ 宽度大小 (Width)</span>
                          <span className="text-[#E1FF39] font-mono font-medium">{overlayWidth.toFixed(1)}%</span>
                        </div>
                        <input 
                          type="range"
                          min="10"
                          max="100"
                          step="0.1"
                          value={overlayWidth}
                          onChange={(e) => setOverlayWidth(parseFloat(e.target.value))}
                          className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">🎥 左右位置 (Left)</span>
                          <span className="text-[#E1FF39] font-mono font-medium">{overlayLeft.toFixed(1)}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={overlayLeft}
                          onChange={(e) => setOverlayLeft(parseFloat(e.target.value))}
                          className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Global Border Radius Controller */}
                  <div className="space-y-1 pt-2.5 border-t border-neutral-800">
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-medium font-sans">🟡 视频圆角大小 (Radius)</span>
                      <span className="text-[#E1FF39] font-mono font-semibold">{videoRadius} px</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={videoRadius}
                      onChange={(e) => setVideoRadius(parseInt(e.target.value))}
                      className="w-full accent-[#E1FF39] h-1 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Share/Export Parameter configurations for future edits */}
                  <div className="border-t border-neutral-800 pt-2.5 mt-2 space-y-2">
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
                        alert('已复制当前微调配置到剪贴板！🎉\n您可以直接发送此参数以作记录保存。');
                      }}
                      className="w-full py-1.5 px-3 bg-neutral-950 text-[#E1FF39] border border-neutral-800 hover:border-[#E1FF39] rounded font-medium text-[10px] sm:text-xs transition duration-205 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      📋 复制当前微调配置 JSON
                    </button>
                    {/* Display actual config briefly */}
                    <div className="bg-neutral-950/70 p-2 rounded text-[9px] font-mono whitespace-pre text-neutral-400 overflow-x-auto max-h-24 scrollbar-thin select-all">
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

                  <div className="border-t border-neutral-850 pt-2 text-[10px] text-neutral-500 leading-normal">
                    💡 拖动滑块可以把视频微调到长图里最完美的设备外壳/槽位中。推荐使用『响应式百分比』模式以自适应各种屏幕大小。
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
