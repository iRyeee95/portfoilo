import React from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Eye } from 'lucide-react';
import SmartImg from './SmartImg';

// =========================================================================
// 滚动入场已调优配置参数 / Fine-tuned Scroll Animation Configuration
// =========================================================================
export const GRID_ANIMATION_CONFIG = {
  initialY: 60,            // 初始垂直偏移量 (像素)
  duration: 1.2,           // 缓动时间 (秒)
  staggerDelay: 0.15,      // 逐个卡片出现时的延迟间距 (秒)
  triggerAmount: 0.1,      // 触发视口比例 (0.1 = 10% 可见)
  once: false,             // 是否仅触发一次
  ease: [0.16, 1, 0.3, 1], // Swiss Smooth 缓动曲线
};

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function ProjectGrid({ projects, onSelectProject }: ProjectGridProps) {
  return (
    <div className="py-8 relative" id="projects-grid-section" style={{ width: '1220px', paddingTop: '80px' }}>
      
      {projects.length === 0 ? (
        <div className="text-center py-24 bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
          <p className="text-sm font-mono text-neutral-400">NO PROJECTS FOUND IN THIS CATEGORY REGISTRATION.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {projects.map((project, idx) => {
              // Column-wise stagger delay (left card vs right card of each row)
              const colIndex = idx % 2;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: GRID_ANIMATION_CONFIG.initialY }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ 
                    once: GRID_ANIMATION_CONFIG.once, 
                    amount: GRID_ANIMATION_CONFIG.triggerAmount 
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: GRID_ANIMATION_CONFIG.duration, 
                    ease: GRID_ANIMATION_CONFIG.ease, 
                    delay: colIndex * GRID_ANIMATION_CONFIG.staggerDelay 
                  }}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => onSelectProject(project)}
                  id={`project-card-${project.id}`}
                >
                {/* Image Showcase Frame */}
                <div className="relative overflow-hidden bg-neutral-100 border border-neutral-200 rounded-lg aspect-16/10 mb-4">
                  {/* Aesthetic Grid overlay which appears on hover */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
 
                  {/* Visual gradient to ensure coordinate labels are readable */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 opacity-60 z-1 pointer-events-none" />

                  <SmartImg
                    src={project.imageUrl}
                    alt={project.title}
                    fallbackUrl={project.fallbackUrl}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.04]"
                  />

                  {/* Interactive Trigger Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-2px z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium rounded-md bg-white text-neutral-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 select-none">
                      <Eye className="h-3 w-3" /> EXPLORE DETAILS
                    </span>
                  </div>
                </div>

                {/* Typography metadata section */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-sans text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-sans tracking-wide">
                      {project.subtitle}
                    </p>
                  </div>
                  
                  <div className="text-right self-center">
                    <span className="text-[10px] font-mono text-neutral-400 block group-hover:text-neutral-900 transition-colors select-none">
                      VIEW →
                    </span>
                  </div>
                </div>

                {/* Highlight line with animations */}
                <div className="w-full h-[1px] bg-neutral-100 group-hover:bg-neutral-300 transition-colors mt-4 self-end" />
              </motion.div>
            )})}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

