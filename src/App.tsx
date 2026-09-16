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
        
        <main className="relative z-10 mx-auto max-w-[1540px] 2xl:max-w-[1700px] px-4 sm:px-8 lg:px-12 py-20 lg:py-24" id="works-stage-container">
          <div className="space-y-12">
            {/* Immersive Swiss structural design statement */}
            <div className="flex flex-col space-y-3 pb-8" id="editorial-intro">
              <div className="inline-block bg-[#E1FF39] px-5 py-2.5 rounded-sm shadow-sm w-fit">
                <h2 translate="no" className="notranslate font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 uppercase leading-none">
                  {thirdScreenConfig.mainTitleLine1}
                </h2>
              </div>
              <p translate="no" className="notranslate text-neutral-400 font-mono text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight block pt-1">
                {thirdScreenConfig.mainTitleLine2}
              </p>
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
