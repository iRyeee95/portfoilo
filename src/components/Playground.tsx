import React, { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Eye, Shuffle, Layers, Scissors, Undo } from 'lucide-react';

interface StyleSet {
  name: string;
  font: string;
  tracking: number; // in pixels
  leading: number;  // unitless ratio
  align: 'left' | 'center' | 'right' | 'justify';
  columns: number;
  showGuides: boolean;
  contrastMode: 'dark' | 'light';
}

const HISTORICAL_PRESETS: Record<string, StyleSet> = {
  swiss1957: {
    name: 'The Swiss School (1957)',
    font: 'Helvetica-system, sans-serif',
    tracking: -1,
    leading: 1.15,
    align: 'left',
    columns: 2,
    showGuides: true,
    contrastMode: 'light'
  },
  baroque1720: {
    name: 'Classic Editorial (1720)',
    font: 'Georgia, serif',
    tracking: 1,
    leading: 1.618,
    align: 'justify',
    columns: 1,
    showGuides: false,
    contrastMode: 'light'
  },
  brutalist2026: {
    name: 'Modern Neo-Brutalist (2026)',
    font: 'monospace',
    tracking: 4,
    leading: 1.4,
    align: 'center',
    columns: 2,
    showGuides: true,
    contrastMode: 'dark'
  }
};

export default function Playground() {
  const [style, setStyle] = useState<StyleSet>({
    name: 'Custom Calibration',
    font: 'sans-serif',
    tracking: 0,
    leading: 1.5,
    align: 'left',
    columns: 2,
    showGuides: true,
    contrastMode: 'light'
  });

  const [testText, setTestText] = useState(
    'THE GEOMETRY OF ACCIDENTAL SILENCE. Visual composition is not an ornamental addition to structured thinking; it is the physical architecture of thought itself. Every millimeter of tracking is a choice. Every unit of white space is a breath of oxygen that guides the human eye through dense semantic noise. Symmetrical layout brings stability, while asymmetrical displacement fosters tension.'
  );

  const applyPreset = (presetKey: string) => {
    const preset = HISTORICAL_PRESETS[presetKey];
    if (preset) {
      setStyle({ ...preset });
    }
  };

  const handleRandomize = () => {
    const fonts = ['sans-serif', 'serif', 'monospace'];
    const aligns: ('left' | 'center' | 'right' | 'justify')[] = ['left', 'center', 'right', 'justify'];
    const trackings = [-2, -1, 0, 2, 4, 8];
    const leadings = [1.1, 1.3, 1.5, 1.618, 1.8];
    const cols = [1, 2, 3];
    const contrasts: ('dark' | 'light')[] = ['dark', 'light'];

    setStyle({
      name: 'Generative Calibration',
      font: fonts[Math.floor(Math.random() * fonts.length)],
      align: aligns[Math.floor(Math.random() * aligns.length)],
      tracking: trackings[Math.floor(Math.random() * trackings.length)],
      leading: leadings[Math.floor(Math.random() * leadings.length)],
      columns: cols[Math.floor(Math.random() * cols.length)],
      showGuides: Math.random() > 0.4,
      contrastMode: contrasts[Math.floor(Math.random() * contrasts.length)]
    });
  };

  const cssTypographyStyle = {
    fontFamily: style.font === 'sans-serif' ? '"Inter", sans-serif' : style.font === 'serif' ? 'Georgia, serif' : '"JetBrains Mono", monospace',
    letterSpacing: `${style.tracking}px`,
    lineHeight: style.leading,
    textAlign: style.align,
    columnCount: style.columns,
    columnGap: '2.5rem',
  };

  return (
    <div className="py-6 space-y-8" id="design-playground">
      {/* Editorial explanation */}
      <div>
        <h2 className="font-sans text-2xl font-black tracking-tight text-neutral-900">
          DESIGN GRID PLAYGROUND
        </h2>
        <p className="mt-1 text-sm text-neutral-500 font-mono">
          Explore historical layout math. Calibrate custom parameters of typography, grids, and alignment tension.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Control Panel: 5 Cols */}
        <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-xl border border-neutral-200 font-mono text-xs space-y-6" id="playground-controls">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-neutral-200 pb-2">
              <span className="font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> SYSTEM CALIBRATION
              </span>
              <button
                onClick={handleRandomize}
                className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] transition-colors"
                title="Generate randomized grid layout"
              >
                <Shuffle className="h-3 w-3" /> SHUFFLE
              </button>
            </div>

            {/* Quick Historical Presets Card */}
            <div className="bg-white p-3 rounded-lg border border-neutral-200 space-y-2 mb-4">
              <span className="text-[10px] text-neutral-400 block mb-1">HISTORICAL ALIGNMENT REGISTERS:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyPreset('swiss1957')}
                  className="px-2 py-1.5 rounded text-[10px] bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-900 font-medium truncate"
                  title="Swiss 1957"
                >
                  Swiss '57
                </button>
                <button
                  onClick={() => applyPreset('baroque1720')}
                  className="px-2 py-1.5 rounded text-[10px] bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-900 font-medium truncate"
                  title="Baroque 1720"
                >
                  Baroque '72
                </button>
                <button
                  onClick={() => applyPreset('brutalist2026')}
                  className="px-2 py-1.5 rounded text-[10px] bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-900 font-medium truncate"
                  title="Brutalist 2026"
                >
                  Neo-Brute
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Font selection */}
              <div>
                <label className="text-neutral-400 block mb-1">FONT CLASSIFICATION:</label>
                <select
                  value={style.font}
                  onChange={(e) => setStyle({ ...style, font: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded px-2 py-1.5 text-neutral-900 focus:outline-hidden focus:border-neutral-400"
                >
                  <option value="sans-serif">Sans-Symmetrical (Inter)</option>
                  <option value="serif">Editorial Serif (Georgia)</option>
                  <option value="monospace">Mono-Mechanical (JetBrains)</option>
                </select>
              </div>

              {/* Tracking slider */}
              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>CHARACTER TRACKING:</span>
                  <span className="text-neutral-900 font-bold">{style.tracking}px</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="16"
                  value={style.tracking}
                  onChange={(e) => setStyle({ ...style, tracking: parseInt(e.target.value) })}
                  className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                />
              </div>

              {/* Leading slider */}
              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>LEADING (LINE ALTITUDE):</span>
                  <span className="text-neutral-900 font-bold">{style.leading}</span>
                </div>
                <input
                  type="range"
                  min="0.9"
                  max="2.5"
                  step="0.05"
                  value={style.leading}
                  onChange={(e) => setStyle({ ...style, leading: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
                />
              </div>

              {/* Text align buttons */}
              <div>
                <label className="text-neutral-400 block mb-1.5">SEMANTIC ALIGNMENT:</label>
                <div className="grid grid-cols-4 gap-1 bg-neutral-100 p-0.5 rounded">
                  {(['left', 'center', 'right', 'justify'] as const).map((dir) => {
                    const isSelected = style.align === dir;
                    return (
                      <button
                        key={dir}
                        onClick={() => setStyle({ ...style, align: dir })}
                        className={`py-1 flex items-center justify-center rounded transition-colors ${
                          isSelected ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-400 hover:text-neutral-700'
                        }`}
                        title={`Align ${dir}`}
                      >
                        {dir === 'left' && <AlignLeft className="h-3.5 w-3.5" />}
                        {dir === 'center' && <AlignCenter className="h-3.5 w-3.5" />}
                        {dir === 'right' && <AlignRight className="h-3.5 w-3.5" />}
                        {dir === 'justify' && <AlignJustify className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column structure switcher */}
              <div>
                <label className="text-neutral-400 block mb-1.5">GRID COLUMN SPLIT:</label>
                <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-0.5 rounded">
                  {[1, 2, 3].map((col) => {
                    const isSelected = style.columns === col;
                    return (
                      <button
                        key={col}
                        onClick={() => setStyle({ ...style, columns: col })}
                        className={`py-1 text-[10px] rounded transition-colors ${
                          isSelected ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-400 hover:text-neutral-700'
                        }`}
                      >
                        {col} COLUMN{col > 1 ? 'S' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assist Guides, Dark mode Toggle Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border border-neutral-200">
                  <input
                    type="checkbox"
                    checked={style.showGuides}
                    onChange={(e) => setStyle({ ...style, showGuides: e.target.checked })}
                    className="rounded text-neutral-900 focus:ring-opacity-0 h-3.5 w-3.5 accent-neutral-900"
                  />
                  <span className="text-[10px] text-neutral-600 font-bold">GOLDEN RATIO GUIDES</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border border-neutral-200">
                  <input
                    type="checkbox"
                    checked={style.contrastMode === 'dark'}
                    onChange={(e) => setStyle({ ...style, contrastMode: e.target.checked ? 'dark' : 'light' })}
                    className="rounded text-neutral-900 focus:ring-opacity-0 h-3.5 w-3.5 accent-neutral-900"
                  />
                  <span className="text-[10px] text-neutral-600 font-bold">DARK CANVAS</span>
                </label>
              </div>
            </div>
          </div>

          {/* Code output section */}
          <div className="bg-neutral-950 text-neutral-400 p-3.5 rounded-lg border border-neutral-800 space-y-2 mt-4 text-[10px]">
            <span className="text-amber-400 font-mono block select-none">// EXPORT CSS VARIABLES:</span>
            <pre className="overflow-x-auto whitespace-pre font-mono leading-relaxed" id="code-output">
{`.layout-container {
  display: block;
  font-family: "${style.font === 'sans-serif' ? 'Inter' : style.font === 'serif' ? 'Georgia' : 'JetBrains Mono'}";
  letter-spacing: ${style.tracking}px;
  line-height: ${style.leading};
  text-align: ${style.align};
  column-count: ${style.columns};
  column-gap: 40px;
}`}
            </pre>
          </div>
        </div>

        {/* Right Active Preview: 7 Cols */}
        <div className="lg:col-span-7 flex flex-col items-stretch space-y-4" id="playground-preview">
          {/* Custom preview container card */}
          <div
            className={`relative flex-1 p-8 sm:p-12 rounded-xl transition-colors duration-300 font-sans min-h-[360px] border flex flex-col justify-center overflow-hidden ${
              style.contrastMode === 'dark'
                ? 'bg-neutral-950 border-neutral-800 text-neutral-50 shadow-inner'
                : 'bg-white border-neutral-200 text-neutral-950 shadow-xs'
            }`}
          >
            {/* Golden ratio overlay guide line templates */}
            {style.showGuides && (
              <div className="absolute inset-0 pointer-events-none z-10 select-none">
                {/* Horizontal Golden Proportions */}
                <div className="absolute top-[38.2%] left-0 right-0 h-[1px] bg-red-400/40 border-dashed border-t" />
                <div className="absolute top-[61.8%] left-0 right-0 h-[1px] bg-red-400/40 border-dashed border-t" />
                {/* Vertical columns guideline boxes when columns > 1 */}
                <div className="absolute inset-y-0 left-[38.2%] w-[1px] bg-sky-400/30 border-dashed border-l" />
                <div className="absolute inset-y-0 left-[61.8%] w-[1px] bg-sky-400/30 border-dashed border-l" />

                {/* Grid tag details */}
                <span className="absolute top-2 right-4 text-[8px] font-mono text-red-500/80 bg-red-50 px-1 py-0.5 rounded font-bold uppercase tracking-widest">
                  GOLDEN_RATIO_CALIB_ACTIVE (Φ = 1.618)
                </span>
              </div>
            )}

            {/* Custom Interactive typography box */}
            <div style={cssTypographyStyle} className="transition-all duration-300 relative z-2 text-sm md:text-base selection:bg-amber-300 selection:text-neutral-950">
              {testText}
            </div>
          </div>

          {/* Test input template box */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
            <label className="text-xs font-mono text-neutral-400 block uppercase font-bold">
              Input Experimental Text Body:
            </label>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full text-xs font-mono border border-neutral-200 focus:border-neutral-400 focus:outline-hidden p-2 rounded-lg resize-y bg-neutral-50 text-neutral-800"
              rows={3}
              placeholder="Inject custom sentence to analyze the visual density..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
