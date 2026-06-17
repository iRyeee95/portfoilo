import React from 'react';
import { designerProfile } from '../data/projects';
import { Award, Briefcase, CheckCircle, GraduationCap, Grid, Heart, ShieldAlert } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="py-6 space-y-12" id="about-section">
      {/* Editorial Cover Intro */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
        {/* Left column: Short visual statement (5 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="relative overflow-hidden bg-neutral-100 rounded-lg border border-neutral-200 aspect-square max-w-[320px]">
            {/* Visual placeholder for the designer's portrait/stamp */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
              alt="Designer Portrait Placeholder"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-110"
            />
            {/* Stamp stamp overlay */}
            <div className="absolute bottom-2 left-2 bg-neutral-900 border border-neutral-800 text-[8px] font-mono text-white px-2 py-1 rounded">
              HAN_LI_ART_DIR_2026
            </div>
          </div>

          <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-lg space-y-2">
            <span className="text-[10px] font-mono text-neutral-400 block uppercase font-bold">DESIGN PHILOSOPHY:</span>
            <p className="text-xs text-neutral-600 font-sans italic leading-relaxed">
              "{designerProfile.philosophy}"
            </p>
          </div>
        </div>

        {/* Right column: About text & Detailed Bio (7 Cols) */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">THE ORIGIN STORY //</span>
            <h3 className="font-sans text-2xl font-black text-neutral-900 leading-tight">
              Bridging Rigorous Structural Logic with Tactile Artistic Symmetries
            </h3>
          </div>

          <p className="text-sm font-sans text-neutral-600 leading-relaxed max-w-2xl">
            {designerProfile.aboutText}
          </p>

          {/* Core Skills Matrix section */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <h4 className="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-wider">
              CORE DISCIPLINARY MATRICES :
            </h4>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {designerProfile.skills.map((skillGroup, i) => (
                <div key={i} className="space-y-2">
                  <span className="text-xs font-mono font-bold text-neutral-900 border-b border-neutral-200 pb-1.5 block">
                    {skillGroup.category}
                  </span>
                  <ul className="text-xs text-neutral-500 font-sans space-y-1.5">
                    {skillGroup.list.map((skill, j) => (
                      <li key={j} className="flex items-start gap-1">
                        <span className="text-neutral-300 select-none">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CV Career & Awards split track */}
      <div className="grid grid-cols-1 gap-12 pt-6 border-t border-neutral-200 md:grid-cols-12">
        {/* CV Career timeline list (7 Cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-neutral-900">
            <Briefcase className="h-4 w-4" />
            <h4 className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-900">
              PROFESSIONAL TIMELINE
            </h4>
          </div>

          <div className="relative border-l border-neutral-200 pl-4 ml-2 space-y-6">
            {designerProfile.experience.map((exp, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white bg-neutral-900 ring-2 ring-neutral-100 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">{exp.period}</span>
                <h5 className="font-sans text-sm font-bold text-neutral-900">{exp.role}</h5>
                <p className="text-xs text-neutral-500 font-mono italic mt-0.5">{exp.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Awards & Recognitions (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-neutral-900">
            <Award className="h-4 w-4" />
            <h4 className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-900">
              AWARDS & RECOGNITION
            </h4>
          </div>

          <div className="space-y-4">
            {designerProfile.awards.map((award, i) => (
              <div key={i} className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 flex items-start gap-3">
                <div className="bg-amber-100 text-amber-800 font-mono text-[10px] px-1.5 py-1 rounded font-bold">
                  {award.year}
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-sans text-xs font-bold text-neutral-900">{award.title}</h5>
                  <p className="text-[10px] text-neutral-500 font-mono">{award.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Partner & Client ticker logomarks */}
      <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-4 text-center">
          SELECTED CLIENTS & COLLABORATORS REGISTRY
        </span>
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-6 font-mono font-bold text-xs text-neutral-400">
          {designerProfile.clients.map((client, i) => (
            <div key={i} className="flex h-12 items-center justify-center border border-neutral-200/60 bg-white rounded-md px-2 hover:text-neutral-700 hover:border-neutral-300 transition-colors">
              // {client.toUpperCase().replace(' ', '_')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
