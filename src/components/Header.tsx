import React, { useState, useEffect } from 'react';
import { ProjectCategory } from '../types';
import { Sparkles, Compass, Clock, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  activeSection: 'biography' | 'works' | 'motion' | 'contact';
  onNavigateSection: (section: 'biography' | 'works' | 'motion' | 'contact') => void;
}

export default function Header({
  activeSection,
  onNavigateSection
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-40" id="site-header">
      {/* Top utility row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span translate="no" className="notranslate text-neutral-800 font-medium">XUZIYI STUDIO</span>
            <span className="text-neutral-300">|</span>
            <span translate="no" className="notranslate hidden sm:inline">SENIOR VISUAL & MOTION DESIGN</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500">
            <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded border border-neutral-100">
              <Clock className="h-3 w-3 text-neutral-400" />
              <span>CN TIME:</span>
              <span className="text-neutral-900 font-semibold tabular-nums select-none">{timeStr || '12:00:00'}</span>
            </div>
            <div className="hidden md:block">
              <span>LAT: 31.2304° N</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main branding & navigation row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="author-branding">
            <h1 translate="no" className="notranslate font-sans text-3xl font-extrabold tracking-tighter text-neutral-900 sm:text-4xl">
              XUZIYI / 许子熠
            </h1>
            <p className="mt-1.5 text-sm font-mono text-neutral-500 max-w-md">
              Constructing structural grid logic, typographic systems, and tactile physical presence inside virtual viewport.
            </p>
          </div>

          <nav className="flex flex-wrap gap-1 bg-neutral-100 p-1 rounded-lg self-start md:self-end" id="main-navigation">
            <button
              onClick={() => onNavigateSection('biography')}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-all duration-200 ${
                activeSection === 'biography'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              id="nav-bio"
            >
              [ BIOGRAPHY / CV ]
            </button>
            <button
              onClick={() => onNavigateSection('works')}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-all duration-200 ${
                activeSection === 'works'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              id="nav-works"
            >
              [ SELECTED WORKS ]
            </button>
            <button
              onClick={() => onNavigateSection('motion')}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-all duration-200 ${
                activeSection === 'motion'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              id="nav-motion"
            >
              [ MOTION ENGINE ]
            </button>
            <button
              onClick={() => onNavigateSection('contact')}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-md transition-all duration-200 ${
                activeSection === 'contact'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              id="nav-contact"
            >
              [ COOPERATION & CONTACT ]
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
