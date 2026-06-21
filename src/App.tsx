/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import WelcomeHero from './components/WelcomeHero';
import ProfileResumeScreen from './components/ProfileResumeScreen';
import MotionShowcaseScreen from './components/MotionShowcaseScreen';
import ContactCooperationScreen from './components/ContactCooperationScreen';
import InteractiveDotGrid from './components/InteractiveDotGrid';
import { projects, thirdScreenConfig } from './data/projects';
import { Project, ProjectCategory } from './types';
import { MoveRight } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<'biography' | 'works' | 'motion' | 'contact'>('works');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const welcomeRef = useRef<HTMLDivElement>(null);
  const profileResumeRef = useRef<HTMLDivElement>(null);
  const portfolioStageRef = useRef<HTMLDivElement>(null);
  const motionStageRef = useRef<HTMLDivElement>(null);
  const contactStageRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper to navigate between contiguous screen sections
  const handleNavigateSection = (section: 'biography' | 'works' | 'motion' | 'contact') => {
    setActiveSection(section);
    if (section === 'biography') {
      profileResumeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'works') {
      portfolioStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'motion') {
      motionStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'contact') {
      contactStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-brand-lime selection:text-neutral-950 font-sans" id="application-stage">
      
      {/* SCREEN 1: Fullscreen Immersive Video Welcome Hero */}
      <div ref={welcomeRef}>
        <WelcomeHero 
          onEnter={() => handleNavigateSection('biography')} 
          onNavigateSection={handleNavigateSection}
        />
      </div>

      {/* SCREEN 2: Dedicated Standalone Biography Profile Card & Career Timeline */}
      <div ref={profileResumeRef} className="scroll-mt-0">
        <ProfileResumeScreen onScrollToWorks={() => handleNavigateSection('works')} />
      </div>

      {/* SCREEN 3: Selected Design Works (Intro + Project Grid) */}
      <div 
        ref={portfolioStageRef} 
        className="relative bg-white text-neutral-950 w-full overflow-hidden scroll-mt-24"
        id="works-stage-outer-container"
      >
        <InteractiveDotGrid />
        
        {/* Soft background ambient glow blobs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#E1FF39]/3 rounded-full blur-[120px] pointer-events-none select-none z-0" />
        
        <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" id="works-stage-container">
          <div className="space-y-12">
            {/* Immersive Swiss structural design statement */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end pb-12" id="editorial-intro">
              <div className="md:col-span-8 space-y-4">
                <h2 translate="no" className="notranslate font-sans text-4xl font-extrabold tracking-tighter text-neutral-900 sm:text-6xl max-w-3xl leading-none uppercase h-[60px] pl-0 bg-[#E1FF39]">
                  {thirdScreenConfig.mainTitleLine1} <br />
                  <span translate="no" className="notranslate text-[#ebebeb] font-mono text-[40px]">{thirdScreenConfig.mainTitleLine2}</span>
                </h2>
              </div>
            </div>

            {/* Project Grid Catalog */}
            <ProjectGrid
              projects={projects}
              onSelectProject={setSelectedProject}
            />
          </div>
        </main>
      </div>

      {/* SCREEN 4: Dynamic video motion showcasing screen (Opposite Scrolling direction rows) */}
      <div ref={motionStageRef} className="scroll-mt-0">
        <MotionShowcaseScreen />
      </div>

      {/* SCREEN 5: Grid-based Contact, Cooperation & Inquiry Board (WeChat, Phone, Mail) */}
      <div ref={contactStageRef} className="scroll-mt-0">
        <ContactCooperationScreen />
      </div>

      {/* Selected Project Full Detailed Specs Modal popup */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />


    </div>
  );
}
