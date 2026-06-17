import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { designerProfile } from '../data/projects';
import { 
  Briefcase,
  Camera,
  Sliders,
  Image,
  Type,
  CreditCard,
  Code as CodeIcon,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  LayoutGrid,
  Info
} from 'lucide-react';
import InteractiveDotGrid from './InteractiveDotGrid';

interface ProfileResumeScreenProps {
  onScrollToWorks: () => void;
}

export default function ProfileResumeScreen({ onScrollToWorks }: ProfileResumeScreenProps) {
  // 3D Tilt calculations for the physical ID Badge
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Outer screen side position for the badge: ALWAYS on the left as per requested "我还是需要工作牌保持在左侧"
  const badgePosition = 'left';

  // Badge inner layout format: 'side' (horizontal) or 'stack' (vertical)
  const [innerLayout, setInnerLayout] = useState<'side' | 'stack'>(() => {
    return (localStorage.getItem('badge_inner_layout') as 'side' | 'stack') || 'side';
  });

  // Relative alignment within the photo-text flex flow (e.g. 'left' / 'right' or 'top' / 'bottom')
  const [photoPosition, setPhotoPosition] = useState<'left' | 'right' | 'top' | 'bottom'>(() => {
    return (localStorage.getItem('photo_pos') as any) || 'left';
  });

  // Text content alignment inside the elements
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(() => {
    return (localStorage.getItem('badge_text_align') as 'left' | 'center' | 'right') || 'left';
  });

  // Badge Photo url/base64 state
  const [badgePhoto, setBadgePhoto] = useState(() => {
    return localStorage.getItem('badge_photo') || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
  });

  // Direct image file reference hidden input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Copy indicator states for Tel and Email
  const [copiedTel, setCopiedTel] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveringTel, setHoveringTel] = useState(false);
  const [hoveringEmail, setHoveringEmail] = useState(false);

  const handleCopy = (text: string, type: 'tel' | 'email') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'tel') {
        setCopiedTel(true);
        setTimeout(() => setCopiedTel(false), 1500);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1500);
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // Client-side text customisations (linked to contentEditable)
  const [name, setName] = useState(() => {
    const saved = localStorage.getItem('badge_name');
    if (!saved || saved === '李瀚' || saved === '韩李' || saved !== '许\n子熠') {
      localStorage.setItem('badge_name', '许\n子熠');
      return '许\n子熠';
    }
    return saved;
  });
  const [englishName, setEnglishName] = useState(() => localStorage.getItem('badge_eng_name') || 'HAN LI');
  const [yearsExp, setYearsExp] = useState(() => localStorage.getItem('badge_years_exp') || '7+ YEARS EXP');
  const [birthday, setBirthday] = useState(() => localStorage.getItem('badge_birthday') || '1995.10.16');
  const [tel, setTel] = useState(() => {
    const saved = localStorage.getItem('badge_tel');
    if (!saved || saved === '+46 (8) 545-09-500') return '153-7735-6930';
    return saved;
  });
  const [email, setEmail] = useState(() => {
    const saved = localStorage.getItem('badge_email');
    if (!saved || saved === 'collaborate@han-li.design') return 'xuziyi905@outlook.com';
    return saved;
  });

  const [introText, setIntroText] = useState(() => 
    localStorage.getItem('resume_intro_text') || 
    'Archived timeline of professional layout strategy, art direction, and visual design operations across Stockholm, Zürich, and Paris.'
  );

  // --- Dynamic Layout Customizations (The Working Deck Parameters) ---
  const [photoWidthRatio, setPhotoWidthRatio] = useState(() => Number(localStorage.getItem('badge_photo_width_ratio') || '3')); // col-span out of 5 (1 to 4)
  const [photoRadius, setPhotoRadius] = useState(() => Number(localStorage.getItem('badge_photo_radius') || '12')); // border-radius in px
  const [photoScale, setPhotoScale] = useState(() => Number(localStorage.getItem('badge_photo_scale') || '100')); // image width/height scale %
  const [photoXOffset, setPhotoXOffset] = useState(() => Number(localStorage.getItem('badge_photo_x_offset') || '0')); // shift x in px
  const [photoYOffset, setPhotoYOffset] = useState(() => Number(localStorage.getItem('badge_photo_y_offset') || '0')); // shift y in px

  const [nameSize, setNameSize] = useState(() => Number(localStorage.getItem('badge_name_size') || '38')); // px
  const [nameLineHeight, setNameLineHeight] = useState(() => Number(localStorage.getItem('badge_name_lh') || '42')); // px
  const [engNameSize, setEngNameSize] = useState(() => Number(localStorage.getItem('badge_eng_size') || '19')); // px
  const [labelSize, setLabelSize] = useState(() => Number(localStorage.getItem('badge_label_size') || '10')); // px
  const [valueSize, setValueSize] = useState(() => Number(localStorage.getItem('badge_value_size') || '15')); // px
  const [telEmailSize, setTelEmailSize] = useState(() => Number(localStorage.getItem('badge_telemail_size') || '14')); // px

  const [cardMinHeight, setCardMinHeight] = useState(() => Number(localStorage.getItem('badge_card_height') || '730')); // px card height
  const [cardWidth, setCardWidth] = useState(() => Number(localStorage.getItem('badge_card_width') || '395')); // px card width
  const [cardPadding, setCardPadding] = useState(() => Number(localStorage.getItem('badge_card_padding') || '28')); // px inner padding
  const [badgeBg, setBadgeBg] = useState(() => localStorage.getItem('badge_card_bg') || '#121214'); // Hex matte bg
  const [backBadgeBg, setBackBadgeBg] = useState(() => localStorage.getItem('badge_card_back_bg') || '#E1FF39'); // Hex neon back plate bg
  
  const [cardRotateOffset, setCardRotateOffset] = useState(() => Number(localStorage.getItem('badge_card_rotate') || '-16')); // degrees rotation
  const [cardTranslateX, setCardTranslateX] = useState(() => Number(localStorage.getItem('badge_card_tx') || '-55')); // px
  const [cardTranslateY, setCardTranslateY] = useState(() => Number(localStorage.getItem('badge_card_ty') || '16')); // px
  const [tiltSensitivity, setTiltSensitivity] = useState(() => Number(localStorage.getItem('badge_tilt_sens') || '15')); // slider sensitivity
  
  const [showFloatingIcons, setShowFloatingIcons] = useState(() => localStorage.getItem('badge_show_float') !== 'false');
  const [floatScale, setFloatScale] = useState(() => Number(localStorage.getItem('badge_float_scale') || '125')); // hover scale ratio

  // Menu Active Category under parameters sliding panel
  const [tunerTab, setTunerTab] = useState<'photo' | 'type' | 'card' | 'code'>('photo');
  const [copiedCodeConfig, setCopiedCodeConfig] = useState(false);

  // Collapsing the working badge tuner
  const [showBadgeTuner, setShowBadgeTuner] = useState(false);

  // Controls visibility of both workspace/tuner panel containers, closed by default as user requested
  const [showTunerPanels, setShowTunerPanels] = useState(false);

  // States for Resume Content/Typography Customization on the right
  const [timelineColor, setTimelineColor] = useState(() => localStorage.getItem('resume_timeline_color') || '#E1FF39');
  const [roleFontSize, setRoleFontSize] = useState(() => Number(localStorage.getItem('resume_role_fs') || '22')); // px
  const [descFontSize, setDescFontSize] = useState(() => Number(localStorage.getItem('resume_desc_fs') || '16')); // px
  const [periodFontSize, setPeriodFontSize] = useState(() => Number(localStorage.getItem('resume_period_fs') || '16')); // px
  const [timelineSpacing, setTimelineSpacing] = useState(() => Number(localStorage.getItem('resume_timeline_spacing') || '32')); // px margin-bottom
  
  // Tab for Right Side Word Tuner (edit list vs adjust layout)
  const [resumeTunerTab, setResumeTunerTab] = useState<'content' | 'education' | 'type'>('content');
  const [editingIndex, setEditingIndex] = useState<number>(0);

  // Quick State Setters with localStorage syncing matching the requirements
  const setAndSave = (key: string, value: any, setter: (val: any) => void) => {
    setter(value);
    localStorage.setItem(key, String(value));
  };

  const setAndSaveList = (key: string, value: any[], setter: (val: any[]) => void) => {
    setter(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const applyPreset = (presetName: 'default' | 'cinematic' | 'minimal' | 'bigPhoto') => {
    const presets = {
      default: {
        photoWidthRatio: 3,
        photoRadius: 12,
        photoScale: 100,
        photoXOffset: 0,
        photoYOffset: 0,
        nameSize: 38,
        nameLineHeight: 42,
        engNameSize: 19,
        labelSize: 10,
        valueSize: 15,
        telEmailSize: 14,
        cardMinHeight: 730,
        cardWidth: 395,
        cardPadding: 28,
        badgeBg: '#121214',
        backBadgeBg: '#E1FF39',
        cardRotateOffset: -16,
        cardTranslateX: -55,
        cardTranslateY: 16,
        tiltSensitivity: 15,
        showFloatingIcons: true,
        floatScale: 125,
      },
      cinematic: {
        photoWidthRatio: 2,
        photoRadius: 8,
        photoScale: 110,
        photoXOffset: 0,
        photoYOffset: -10,
        nameSize: 42,
        nameLineHeight: 46,
        engNameSize: 22,
        labelSize: 9,
        valueSize: 14,
        telEmailSize: 13,
        cardMinHeight: 680,
        cardWidth: 420,
        cardPadding: 24,
        badgeBg: '#09090b',
        backBadgeBg: '#00FFE0',
        cardRotateOffset: -10,
        cardTranslateX: -40,
        cardTranslateY: 10,
        tiltSensitivity: 12,
        showFloatingIcons: true,
        floatScale: 115,
      },
      minimal: {
        photoWidthRatio: 1,
        photoRadius: 16,
        photoScale: 90,
        photoXOffset: 0,
        photoYOffset: 0,
        nameSize: 46,
        nameLineHeight: 50,
        engNameSize: 20,
        labelSize: 8,
        valueSize: 13,
        telEmailSize: 12,
        cardMinHeight: 640,
        cardWidth: 350,
        cardPadding: 20,
        badgeBg: '#151515',
        backBadgeBg: '#FF1493',
        cardRotateOffset: -5,
        cardTranslateX: -25,
        cardTranslateY: 5,
        tiltSensitivity: 8,
        showFloatingIcons: false,
        floatScale: 100,
      },
      bigPhoto: {
        photoWidthRatio: 4,
        photoRadius: 20,
        photoScale: 130,
        photoXOffset: -10,
        photoYOffset: -20,
        nameSize: 32,
        nameLineHeight: 36,
        engNameSize: 16,
        labelSize: 11,
        valueSize: 16,
        telEmailSize: 15,
        cardMinHeight: 760,
        cardWidth: 400,
        cardPadding: 32,
        badgeBg: '#1c1917',
        backBadgeBg: '#FFAA00',
        cardRotateOffset: -20,
        cardTranslateX: -65,
        cardTranslateY: 20,
        tiltSensitivity: 20,
        showFloatingIcons: true,
        floatScale: 135,
      }
    };

    const selected = presets[presetName];
    // Sync to state & localStorage
    Object.entries(selected).forEach(([key, val]) => {
      localStorage.setItem(`badge_${key}`, String(val));
    });

    setPhotoWidthRatio(selected.photoWidthRatio);
    setPhotoRadius(selected.photoRadius);
    setPhotoScale(selected.photoScale);
    setPhotoXOffset(selected.photoXOffset);
    setPhotoYOffset(selected.photoYOffset);
    setNameSize(selected.nameSize);
    setNameLineHeight(selected.nameLineHeight);
    setEngNameSize(selected.engNameSize);
    setLabelSize(selected.labelSize);
    setValueSize(selected.valueSize);
    setTelEmailSize(selected.telEmailSize);
    setCardMinHeight(selected.cardMinHeight);
    setCardWidth(selected.cardWidth || 395);
    setCardPadding(selected.cardPadding);
    setBadgeBg(selected.badgeBg);
    setBackBadgeBg(selected.backBadgeBg);
    setCardRotateOffset(selected.cardRotateOffset);
    setCardTranslateX(selected.cardTranslateX);
    setCardTranslateY(selected.cardTranslateY);
    setTiltSensitivity(selected.tiltSensitivity);
    setShowFloatingIcons(selected.showFloatingIcons);
    setFloatScale(selected.floatScale);
  };

  const [educationList, setEducationList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('resume_education_list');
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem('resume_awards_list');
      if (oldSaved) return JSON.parse(oldSaved);
    } catch (e) {
      console.error(e);
    }
    return ['Zürich University of the Arts / 苏黎世艺术大学'];
  });

  const [experienceList, setExperienceList] = useState(() => {
    try {
      const saved = localStorage.getItem('resume_experience_list');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        period: '2023 - Present',
        role: 'Independent Art Director & Visual Craftsman',
        company: 'Paris / Stockholm',
        description: 'Designing custom dynamic identity grids, brand system typography rules, and interactive layout solutions for digital exhibits and contemporary museums.'
      },
      {
        period: '2021 - 2023',
        role: 'Senior Identity & Interaction Designer',
        company: 'Studio Zürich-Mitte',
        description: 'Managed print design posters, architectural type systems, and book catalogs with strict focus on geometric proportions and Swiss grid discipline.'
      },
      {
        period: '2019 - 2021',
        role: 'Typographer & Layout Designer',
        company: 'Design Bureau Berlin',
        description: 'Curated high-contrast typography, large format graphics, and layout hierarchies for historical retrospective booklets and design exhibitions in Berlin.'
      }
    ];
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setBadgePhoto(base64data);
        localStorage.setItem('badge_photo', base64data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (hoveringTel || hoveringEmail) {
      setTilt({ x: 0, y: 0 });
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // Range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // Range: -0.5 to 0.5
    setTilt({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Helper to format text before colon (English/Chinese) in bold/emphasis for every single line
  const renderFormattedDescription = (text: string) => {
    if (!text) return '';
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const match = line.match(/^([^：:]+)([：:])([\s\S]*)$/);
      const content = match ? (
        <>
          <strong className="font-extrabold text-neutral-950 font-sans">{match[1]}</strong>
          <span className="font-sans font-extrabold text-neutral-950">{match[2]}</span>
          <span>{match[3]}</span>
        </>
      ) : (
        line
      );
      return (
        <React.Fragment key={index}>
          {content}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <section
      className="min-h-screen bg-white text-neutral-950 relative flex flex-col justify-between py-16 sm:py-20 scroll-mt-0 selection:bg-[#E1FF39] selection:text-neutral-950 overflow-hidden"
      id="personal-profile-resume-screen"
    >
      {/* Interactive Canvas Dot Grid Background */}
      <InteractiveDotGrid />

      {/* Background architectural mesh & elegant layouts */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#E1FF39]/3 rounded-full blur-[140px] pointer-events-none select-none z-0" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-neutral-100 rounded-full blur-[100px] pointer-events-none select-none z-0" />

      {/* Top Section Registry Label deleted as per user request */}

      {/* Main Core Identity Grid: Expanded layout to spread screen content & enrich visual density */}
      <div className="relative z-10 mx-auto w-full max-w-7xl xl:max-w-[1340px] px-4 sm:px-8 lg:px-10 my-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-stretch">
          
          {/* COLUMN 1: The Dynamic Hanging ID Badge with Scattered, Non-blocking Floating Design Icons */}
          <div className={`lg:col-span-5 relative z-20 flex flex-col items-center justify-start pt-4 lg:pt-8 transition-all duration-500 ease-in-out ${
            badgePosition === 'left' ? 'lg:pr-4 lg:order-1' : 'lg:pl-4 lg:order-2'
          }`}>
            
            {/* Lanyard Mounting & Suspension System */}
            <motion.div 
              className="relative z-45 w-full flex flex-col items-center"
              style={{ transformOrigin: "top center", maxWidth: `${cardWidth}px` }}
              initial={{ y: -600, rotate: -32, opacity: 0 }}
              whileInView={{ y: 0, rotate: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                y: {
                  type: "spring",
                  stiffness: 120,
                  damping: 11,
                  mass: 1.6,
                  restSpeed: 0.001
                },
                rotate: {
                  type: "spring",
                  stiffness: 35,
                  damping: 4.5,
                  mass: 1.2,
                  delay: 0.05
                },
                opacity: {
                  duration: 0.2
                }
              }}
            >
              
              {/* Premium Fabric Lanyard Ribbon in Neon Lime Green (#E1FF39) */}
              <div className="absolute -top-[140px] w-10 h-[170px] bg-[#E1FF39] rounded-b-md shadow-[0_4px_12px_rgba(225,255,57,0.2)] border border-[#E1FF39]/40 flex flex-col items-center justify-end pb-3 z-0 overflow-hidden select-none">
                {/* Woven strap stitch detail lines */}
                <div className="absolute left-[3px] top-0 bottom-0 w-[0.5px] border-l border-dashed border-black/15" />
                <div className="absolute right-[3px] top-0 bottom-0 w-[0.5px] border-r border-dashed border-black/15" />
                


                {/* Secure brass circular eyelet button near ribbon fold */}
                <div className="w-[18px] h-[18px] rounded-full bg-neutral-950 border border-neutral-700/60 shadow-inner flex items-center justify-center relative mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-900" />
                </div>
              </div>

              {/* Lanyard Rope Toggle Buckle & Minimal Loop - Premium tactile rubber/metal braided cord locks and tactical loops */}
              <div className="relative mt-2 flex flex-col items-center z-25 select-none pointer-events-none -mb-[38px] h-20 w-full animate-fade-in">
                <svg className="w-16 h-22 drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]" viewBox="0 0 44 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Two braided nylon straps coming from the top holding loop */}
                  <path d="M16 0 L16 25" stroke="url(#braid-rope-grad)" strokeWidth="3" strokeDasharray="3 1.5" />
                  <path d="M28 0 L28 25" stroke="url(#braid-rope-grad)" strokeWidth="3" strokeDasharray="1.5 3" />
                  <path d="M16 0 L16 25" stroke="#111" strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M28 0 L28 25" stroke="#111" strokeWidth="1" strokeOpacity="0.4" />

                  {/* Cylindrical Double-Hole Matte Carbon Cord Lock sliding buckle */}
                  <rect x="10" y="24" width="24" height="24" rx="6" fill="url(#cord-lock-grad)" stroke="#09090b" strokeWidth="1.5" />
                  
                  {/* Sliding metal tension adjustment button with brushed titanium finish */}
                  <rect x="13" y="19" width="18" height="6" rx="1.5" fill="url(#titanium-bt-grad)" stroke="#18181b" strokeWidth="1" />
                  <line x1="16" y1="21" x2="28" y2="21" stroke="#fff" strokeWidth="0.8" opacity="0.3" />

                  {/* Miniature laser-etched design logotype on the cord-lock buckle facade */}
                  <rect x="17" y="32" width="10" height="2" rx="0.5" fill="#E1FF39" opacity="0.85" />
                  <circle cx="22" cy="40" r="2.5" fill="url(#titanium-bt-grad)" stroke="#000" strokeWidth="1" />
                  <circle cx="22" cy="40" r="1" fill="#E1FF39" />

                  {/* Looping nylon rope extending down and securely looping through the card's top horizontal slot */}
                  {/* Loop part passing down behind the slot back wall */}
                  <path d="M17 48 C17 48, 14 55, 14 62 C14 74, 18 83, 22 83 C26 83, 30 74, 30 62 C30 55, 27 48, 27 48" stroke="url(#braid-rope-grad)" strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M17 48 C17 48, 14 55, 14 62 C14 74, 18 83, 22 83 C26 83, 30 74, 30 62 C30 55, 27 48, 27 48" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />

                  {/* Shiny chromium collar locking ring looping inside the slot to link rope and card */}
                  <path d="M16 64 C16 57, 28 57, 28 64" stroke="url(#titanium-bt-grad)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 63.5 C18 59, 26 59, 26 63.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

                  {/* High gloss reflections and rich neon lanyard thread details */}
                  <defs>
                    <linearGradient id="braid-rope-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e1b4b" />
                      <stop offset="30%" stopColor="#e1ff39" />
                      <stop offset="45%" stopColor="#18181b" />
                      <stop offset="70%" stopColor="#e1ff39" />
                      <stop offset="100%" stopColor="#09090b" />
                    </linearGradient>
                    <linearGradient id="cord-lock-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2e2e33" />
                      <stop offset="40%" stopColor="#18181b" />
                      <stop offset="75%" stopColor="#0f0f11" />
                      <stop offset="100%" stopColor="#050506" />
                    </linearGradient>
                    <linearGradient id="titanium-bt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f4f4f5" />
                      <stop offset="30%" stopColor="#a1a1aa" />
                      <stop offset="60%" stopColor="#71717a" />
                      <stop offset="100%" stopColor="#27272a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Interactive 3D Card Stage - Holds overlapping physical cards */}
              <div 
                className="w-full mt-2 relative perspective-1000 group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                
                {/* FLOATING LOGOS - Rendered conditionally with custom floatScale */}
                {showFloatingIcons && (
                  <>
                    {/* 1. FIGMA FLOATING LOGO */}
                    <div 
                      className="absolute z-35 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500 ease-out pointer-events-none select-none"
                      style={{
                        top: isHovered ? '-115px' : '-15px',
                        left: isHovered ? '-145px' : '-35px',
                        transform: `rotate(${isHovered ? -45 : 0}deg) scale(${isHovered ? floatScale / 100 : 0.75})`,
                        opacity: isHovered ? 1 : 0,
                        backgroundColor: '#FFECE6',
                        borderColor: 'rgba(242, 78, 30, 0.45)',
                        boxShadow: isHovered ? '0 16px 40px rgba(242,78,29,0.4)' : 'none',
                      }}
                      title="Figma Layouts"
                    >
                      <svg className="w-5.5 h-5.5" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5C0 14.75 4.25 19 9.5 19H19V0Z" fill={isHovered ? "#F24E1E" : "#737373"}/>
                        <path d="M19 0V19H28.5C33.75 19 38 14.75 38 9.5C38 4.25 33.75 0 28.5 0H19Z" fill={isHovered ? "#FF7262" : "#737373"}/>
                        <path d="M19 19H9.5C4.25 19 0 23.25 0 28.5C0 33.75 4.25 38 9.5 38H19V19Z" fill={isHovered ? "#A259FF" : "#737373"}/>
                        <path d="M28.5 19C23.25 19 19 23.25 19 28.5C19 33.75 23.25 38 28.5 38C33.75 38 38 33.75 38 28.5C38 23.25 33.75 19 28.5 19Z" fill={isHovered ? "#1ABCFE" : "#737373"}/>
                        <path d="M19 38H9.5C4.25 38 0 42.25 0 47.5C0 52.75 4.25 57 9.5 57C14.75 57 19 52.75 19 47.5V38Z" fill={isHovered ? "#0ACF83" : "#737373"}/>
                      </svg>
                    </div>

                    {/* 2. ADOBE AFTER EFFECTS (Ae) FLOATING LOGO */}
                    <div 
                      className="absolute z-35 w-11 h-11 rounded-2xl flex items-center justify-center border font-sans font-black text-xs tracking-tight transition-all duration-500 ease-out pointer-events-none select-none"
                      style={{
                        top: isHovered ? '145px' : '95px',
                        right: isHovered ? '-145px' : '-35px',
                        transform: `rotate(${isHovered ? 55 : 0}deg) scale(${isHovered ? floatScale / 100 : 0.75})`,
                        opacity: isHovered ? 1 : 0,
                        backgroundColor: '#121235',
                        borderColor: 'rgba(153, 153, 255, 0.45)',
                        color: '#9999FF',
                        boxShadow: isHovered ? '0 16px 40px rgba(153,153,255,0.4)' : 'none',
                      }}
                      title="After Effects Motion"
                    >
                      Ae
                    </div>

                    {/* 3. ADOBE PHOTOSHOP (Ps) FLOATING LOGO */}
                    <div 
                      className="absolute z-35 w-11 h-11 rounded-2xl flex items-center justify-center border font-sans font-black text-xs tracking-tight transition-all duration-500 ease-out pointer-events-none select-none"
                      style={{
                        bottom: isHovered ? '145px' : '95px',
                        left: isHovered ? '-145px' : '-35px',
                        transform: `rotate(${isHovered ? -45 : 0}deg) scale(${isHovered ? floatScale / 100 : 0.75})`,
                        opacity: isHovered ? 1 : 0,
                        backgroundColor: '#061726',
                        borderColor: 'rgba(49, 168, 255, 0.45)',
                        color: '#31A8FF',
                        boxShadow: isHovered ? '0 16px 40px rgba(49,168,255,0.4)' : 'none',
                      }}
                      title="Photoshop Layouts"
                    >
                      Ps
                    </div>

                    {/* 4. BLENDER FLOATING LOGO */}
                    <div 
                      className="absolute z-35 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500 ease-out pointer-events-none select-none"
                      style={{
                        bottom: isHovered ? '-105px' : '-10px',
                        right: isHovered ? '-145px' : '-35px',
                        transform: `rotate(${isHovered ? 45 : 0}deg) scale(${isHovered ? floatScale / 100 : 0.75})`,
                        opacity: isHovered ? 1 : 0,
                        backgroundColor: '#FAF0E6',
                        borderColor: 'rgba(234, 118, 0, 0.45)',
                        boxShadow: isHovered ? '0 16px 40px rgba(234,118,0,0.4)' : 'none',
                      }}
                      title="Blender 3D"
                    >
                      <svg className="w-6.5 h-6" viewBox="0 0 181 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(.281 0 0 .281 -41.8 -43.7)">
                          <g transform="matrix(21.6 0 0 21.6 -4857 7665)">
                            <path d="m243-334c0.106-1.89 1.03-3.56 2.43-4.74 1.37-1.16 3.21-1.87 5.23-1.87 2.01 0 3.85 0.709 5.22 1.87 1.4 1.18 2.32 2.85 2.43 4.74 0.106 1.94-0.675 3.75-2.04 5.09-1.4 1.36-3.38 2.22-5.61 2.22s-4.22-0.854-5.61-2.22c-1.37-1.34-2.15-3.14-2.04-5.08z" fill="#fff"/>
                          </g>
                          <g transform="matrix(11.1 0 0 11.1 -2215 4153)">
                            <path d="m243-334c0.106-1.89 1.03-3.56 2.43-4.74 1.37-1.16 3.21-1.87 5.23-1.87 2.01 0 3.85 0.709 5.22 1.87 1.4 1.18 2.32 2.85 2.43 4.74 0.106 1.94-0.675 3.75-2.04 5.09-1.4 1.36-3.38 2.22-5.61 2.22s-4.22-0.854-5.61-2.22c-1.37-1.34-2.15-3.14-2.04-5.08z" fill="#20558A"/>
                            <path d="m231-330c0.013 0.74 0.249 2.18 0.603 3.3 0.744 2.38 2.01 4.58 3.76 6.51 1.8 1.99 4.02 3.59 6.58 4.73 2.69 1.19 5.61 1.8 8.64 1.8 3.03-4e-3 5.95-0.624 8.64-1.83 2.56-1.15 4.78-2.75 6.58-4.75 1.76-1.95 3.02-4.15 3.76-6.53 0.375-1.2 0.612-2.42 0.707-3.64 0.093-1.2 0.054-2.41-0.117-3.62-0.334-2.35-1.15-4.56-2.4-6.56-1.14-1.85-2.62-3.46-4.38-4.82l4e-3 -3e-3 -17.7-13.6c-0.016-0.012-0.029-0.025-0.046-0.036-1.16-0.892-3.12-0.889-4.39 5e-3 -1.29 0.904-1.44 2.4-0.29 3.34l-5e-3 5e-3 7.39 6.01-22.5 0.024h-0.03c-1.86 2e-3 -3.65 1.22-4 2.77-0.364 1.57 0.9 2.88 2.84 2.88l-3e-3 7e-3 11.4-0.022-20.4 15.6c-0.026 0.019-0.054 0.039-0.078 0.058-1.92 1.47-2.54 3.92-1.33 5.46 1.23 1.57 3.84 1.58 5.78 9e-3l11.1-9.1s-0.162 1.23-0.149 1.96zm28.6 4.11c-2.29 2.33-5.5 3.66-8.96 3.66-3.47 6e-3 -6.68-1.3-8.97-3.63-1.12-1.14-1.94-2.44-2.45-3.83-0.497-1.37-0.69-2.82-0.562-4.28 0.121-1.43 0.547-2.8 1.23-4.03 0.668-1.21 1.59-2.31 2.72-3.24 2.23-1.81 5.06-2.8 8.02-2.8 2.97-4e-3 5.8 0.969 8.03 2.78 1.13 0.924 2.05 2.02 2.72 3.23 0.683 1.23 1.11 2.59 1.23 4.03 0.126 1.46-0.067 2.91-0.564 4.28-0.508 1.4-1.33 2.7-2.45 3.84z" fill={isHovered ? "#ea7600" : "#737373"}/>
                          </g>
                        </g>
                      </svg>
                    </div>

                    {/* 5. TAPNOW FLOATING LOGO */}
                    <div 
                      className="absolute z-35 w-12 h-12 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 ease-out pointer-events-none select-none overflow-hidden"
                      style={{
                        top: isHovered ? '-115px' : '-15px',
                        right: isHovered ? '-145px' : '-35px',
                        transform: `rotate(${isHovered ? 15 : 0}deg) scale(${isHovered ? floatScale / 100 : 0.75})`,
                        opacity: isHovered ? 1 : 0,
                        backgroundColor: '#09080d',
                        borderColor: '#2d1b4e',
                        boxShadow: isHovered ? '0 16px 40px rgba(217,70,239,0.35)' : 'none',
                      }}
                      title="TapNow AI Video & Face Swap"
                    >
                      <img 
                        src="/topnow logo.png" 
                        alt="TapNow AI" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* 6. JIMENG (即梦) FLOATING LOGO */}
                    <div 
                      className="absolute z-35 w-12 h-12 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 ease-out pointer-events-none select-none overflow-hidden"
                      style={{
                        top: isHovered ? '145px' : '95px',
                        left: isHovered ? '-145px' : '-35px',
                        transform: `rotate(${isHovered ? -15 : 0}deg) scale(${isHovered ? floatScale / 100 : 0.75})`,
                        opacity: isHovered ? 1 : 0,
                        backgroundColor: '#070709',
                        borderColor: '#1e1e1e',
                        boxShadow: isHovered ? '0 16px 40px rgba(0,242,254,0.3)' : 'none',
                      }}
                      title="即梦 Jimeng AI Editor"
                    >
                      <img 
                        src="/jimeng logo.png" 
                        alt="即梦 AI" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </>
                )}

                {/* THE OVERLAPPING DOUBLE CARDS SYSTEM */}
                <div 
                  className="w-full relative select-none"
                  style={{ transformStyle: 'preserve-3d', minHeight: `${cardMinHeight}px` }}
                >
                  
                  {/* CARD A (BACKGROUND TILTED CARD): Bright Neon Back-Plate - customizable offsets */}
                  <div
                    className="absolute inset-0 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col justify-between transition-transform duration-300 ease-out select-none overflow-hidden"
                    style={{
                      transform: `perspective(1000px) rotateX(${tilt.y * 0.8}deg) rotateY(${tilt.x * 0.8}deg) translateZ(-40px) rotate(${cardRotateOffset}deg) translate(${cardTranslateX}px, ${cardTranslateY}px) scale(0.98)`,
                      transformStyle: 'preserve-3d',
                      backgroundColor: backBadgeBg,
                      border: `1px solid ${backBadgeBg}80`,
                      padding: `${cardPadding}px`,
                      boxShadow: isHovered 
                        ? `0 20px 50px rgba(0,0,0,0.12), 0 0 35px ${backBadgeBg}60` 
                        : '0 8px 24px rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Woven technical grid pattern overlaid on back card */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:10px_10px] opacity-40 z-0 pointer-events-none" />
                    
                    {/* Large Bold Printed Vertical Branding in Deep Carbon Black */}
                    <div className="absolute left-5 top-4 text-[56px] font-mono font-black text-neutral-950/80 leading-none tracking-widest pointer-events-none select-none z-10" style={{ writingMode: 'vertical-rl' }}>
                      DESIGN
                    </div>
                    <div className="absolute right-5 bottom-4 text-sm font-mono font-extrabold text-neutral-900 leading-none tracking-widest uppercase pointer-events-none select-none z-10">
                      2026
                    </div>
                  </div>

                  {/* CARD B (FOREGROUND MATTE CARBON CARD): The Premium Main Work Badge */}
                  <div
                    className="absolute inset-0 rounded-[24px] overflow-hidden transition-[transform,box-shadow,background-color] duration-300 ease-out select-none flex flex-col justify-between border border-neutral-800/80"
                    style={{
                      backgroundColor: badgeBg,
                      padding: `${cardPadding}px`,
                      transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px) scale(${isHovered ? 1.025 : 1})`,
                      transformStyle: 'preserve-3d',
                      boxShadow: isHovered 
                        ? `0 32px 75px rgba(0,0,0,0.45), 0 0 45px ${backBadgeBg}25` 
                        : '0 16px 40px rgba(0,0,0,0.25)',
                    }}
                    id="designer-hanging-badge"
                  >
                    {/* Horizontal metal-lined lanyard cutout slot slot centered near top */}
                    <div className="absolute top-4 inset-x-0 flex justify-center z-20 pointer-events-none">
                      <div className="w-[44px] h-3.5 rounded-full bg-neutral-950 border border-neutral-700/60 shadow-inner flex items-center justify-center">
                        <div className="w-[34px] h-1.5 rounded-full" style={{ backgroundColor: badgeBg }} />
                      </div>
                    </div>

                    {/* Card Inner elements structure */}
                    <div className="flex flex-col h-full justify-between mt-5 z-10">
                      
                      {/* Grid design with a dynamic columns ratio layout: Left custom-width portrait, Right details */}
                      <div 
                        className="grid gap-5 px-1 mt-4 items-stretch"
                        style={{ gridTemplateColumns: `${photoWidthRatio}fr ${5 - photoWidthRatio}fr` }}
                      >
                        
                        {/* Vivid Color User Portrait block - occupies dynamic columns ratio */}
                        <div 
                          className="relative aspect-[3/4] overflow-hidden border border-neutral-800 bg-neutral-900 flex shrink-0 items-center justify-center shadow-inner"
                          style={{
                            borderRadius: `${photoRadius}px`
                          }}
                        >
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-950 to-transparent z-15 pointer-events-none" />
                          
                          {/* Photo scaled and translated with custom adjustments */}
                          <img
                            src={badgePhoto}
                            alt="Han Li Personal Portrait"
                            referrerPolicy="no-referrer"
                            className="absolute object-cover"
                            style={{
                              width: `${photoScale}%`,
                              height: `${photoScale}%`,
                              transform: `translate(${photoXOffset}px, ${photoYOffset}px)`
                            }}
                          />
                        </div>

                        {/* Name & English Name Block to the right */}
                        <div className="flex flex-col justify-center text-left py-2 pl-2">
                          <span 
                            className="font-mono text-[#E1FF39]/90 font-bold block leading-none uppercase tracking-widest mb-1.5 select-none"
                            style={{ fontSize: `${labelSize}px`, color: backBadgeBg }}
                          >
                            NOME / 姓名
                          </span>
                          
                          {/* Inline editable name */}
                          <span 
                            className="font-sans font-black text-white block select-none mb-1 cursor-text outline-none hover:bg-white/5 rounded px-1 transition-colors whitespace-pre-line"
                            style={{ fontSize: `${nameSize}px`, lineHeight: `${nameLineHeight}px` }}
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const val = e.currentTarget.innerText.trim();
                              if (val) {
                                setName(val);
                                localStorage.setItem('badge_name', val);
                              }
                            }}
                          >
                            {name}
                          </span>
                          
                          {/* Inline editable EN name */}
                          <span 
                            className="font-mono text-neutral-400 font-semibold block uppercase tracking-tight select-none cursor-text outline-none hover:bg-white/5 rounded px-1 transition-colors"
                            style={{ fontSize: `${engNameSize}px` }}
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const val = e.currentTarget.innerText.trim();
                              if (val) {
                                setEnglishName(val);
                                localStorage.setItem('badge_eng_name', val);
                              }
                            }}
                          >
                            {englishName}
                          </span>
                        </div>
                      </div>

                      {/* Beautifully formatted grid for all secondary information - Scaled up text and paddings */}
                      <div className="border-t border-dashed border-neutral-800 pt-4 mt-4 flex-1 flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-5 text-left">
                          
                          {/* Years Exp block */}
                          <div className="col-span-2 flex flex-col items-start px-1">
                            <span 
                              className="font-mono text-neutral-500 block uppercase tracking-wider mb-1 select-none"
                              style={{ fontSize: `${labelSize}px` }}
                            >
                              YEARS EXP / 工作年限
                            </span>
                            <span 
                              className="font-sans font-extrabold tracking-tight block px-1.5 py-0.5 select-none cursor-text outline-none hover:bg-white/5 rounded-md transition-colors"
                              style={{ fontSize: `${valueSize}px`, color: backBadgeBg }}
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const val = e.currentTarget.innerText.trim();
                                if (val) {
                                  setYearsExp(val);
                                  localStorage.setItem('badge_years_exp', val);
                                }
                              }}
                            >
                              {yearsExp}
                            </span>
                          </div>

                          {/* Date of Birth block */}
                          <div className="border-t border-neutral-800/60 pt-3 flex flex-col items-start px-1">
                            <span 
                              className="font-mono text-neutral-500 block uppercase tracking-wider mb-1 select-none"
                              style={{ fontSize: `${labelSize}px` }}
                            >
                              DATE OF BIRTH / 生日
                            </span>
                            <span 
                              className="font-mono font-bold text-neutral-300 block select-none cursor-text outline-none hover:bg-white/5 rounded-md transition-colors"
                              style={{ fontSize: `${valueSize}px` }}
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => {
                                const val = e.currentTarget.innerText.trim();
                                if (val) {
                                  setBirthday(val);
                                  localStorage.setItem('badge_birthday', val);
                                }
                              }}
                            >
                              {birthday}
                            </span>
                          </div>

                          {/* Tel Block */}
                          <div className="relative border-t border-neutral-800/60 border-l border-neutral-800/40 pl-4 pt-1.5 flex flex-col justify-center">
                            <div 
                              onClick={() => handleCopy(tel, 'tel')}
                              onMouseEnter={() => setHoveringTel(true)}
                              onMouseLeave={() => setHoveringTel(false)}
                              className="relative w-full flex flex-col items-start cursor-pointer hover:bg-[#E1FF39]/12 border border-transparent hover:border-[#E1FF39]/25 rounded-md p-1.5 transition-all duration-200 z-50 animate-fade-in"
                              title="点击复制电话/微信 / Click to copy"
                            >
                              {hoveringTel && (
                                <div className="absolute left-1/2 -translate-x-1/2 -top-10 animate-bounce pointer-events-none z-50">
                                  <div 
                                    className="text-neutral-950 text-[10px] font-mono font-black py-1 px-3 rounded-md shadow-[0_4px_15px_rgba(225,255,57,0.6)] whitespace-nowrap flex items-center gap-1 border border-white/20"
                                    style={{ backgroundColor: backBadgeBg }}
                                  >
                                    <span>⚡ 点击复制 / CLICK TO COPY</span>
                                  </div>
                                  <div className="w-1.5 h-1.5 rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2" style={{ backgroundColor: backBadgeBg }} />
                                </div>
                              )}

                              <span 
                                className="font-mono block w-full uppercase tracking-wider mb-1 transition-colors duration-200"
                                style={{ 
                                  fontSize: `${labelSize}px`,
                                  color: copiedTel ? backBadgeBg : '#737373' 
                                }}
                              >
                                {copiedTel ? '★ COPIED / 已复制' : 'TEL / 电话 / 微信'}
                              </span>
                              <span 
                                className="font-mono font-bold block transition-colors duration-200"
                                style={{ 
                                  fontSize: `${valueSize}px`,
                                  color: copiedTel ? backBadgeBg : hoveringTel ? backBadgeBg : '#d4d4d4'
                                }}
                              >
                                {tel}
                              </span>
                            </div>
                          </div>

                          {/* Email Block */}
                          <div className="relative col-span-2 border-t border-neutral-800/60 pt-2.5 flex flex-col justify-center px-1">
                            <div 
                              onClick={() => handleCopy(email, 'email')}
                              onMouseEnter={() => setHoveringEmail(true)}
                              onMouseLeave={() => setHoveringEmail(false)}
                              className="relative w-full flex flex-col items-start cursor-pointer hover:bg-[#E1FF39]/12 border border-transparent hover:border-[#E1FF39]/25 rounded-md p-1.5 transition-all duration-200 z-50 animate-fade-in"
                              title="点击复制电子邮箱 / Click to copy"
                            >
                              {hoveringEmail && (
                                <div className="absolute left-1/2 -translate-x-1/2 -top-10 animate-bounce pointer-events-none z-50">
                                  <div 
                                    className="text-neutral-950 text-[10px] font-mono font-black py-1 px-3 rounded-md shadow-[0_4px_15px_rgba(225,255,57,0.6)] whitespace-nowrap flex items-center gap-1 border border-white/20"
                                    style={{ backgroundColor: backBadgeBg }}
                                  >
                                    <span>⚡ 点击复制 / CLICK TO COPY</span>
                                  </div>
                                  <div className="w-1.5 h-1.5 rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2" style={{ backgroundColor: backBadgeBg }} />
                                </div>
                              )}

                              <span 
                                className="font-mono block w-full uppercase tracking-wider mb-1 transition-colors duration-200"
                                style={{ 
                                  fontSize: `${labelSize}px`,
                                  color: copiedEmail ? backBadgeBg : '#737373' 
                                }}
                              >
                                {copiedEmail ? '★ COPIED / 已复制' : 'EMAIL / 邮箱'}
                              </span>
                              <span 
                                className="font-mono font-semibold border-b block truncate w-full transition-colors duration-200"
                                style={{ 
                                  fontSize: `${telEmailSize}px`,
                                  color: copiedEmail ? backBadgeBg : hoveringEmail ? backBadgeBg : '#f5f5f5',
                                  borderColor: copiedEmail ? backBadgeBg : hoveringEmail ? backBadgeBg : 'rgba(255,255,255,0.15)' 
                                }}
                              >
                                {email}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Hidden Browser File Input handler */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </motion.div>

            {/* --- COLLAPSIBLE ID BADGE DECK TUNER --- */}
            {showTunerPanels && (
              <div className="w-full max-w-[395px] mt-8 bg-[#09090b]/90 rounded-2xl p-5 border border-neutral-800/85 shadow-2xl relative z-40 select-none animate-fade-in text-left">
              <button
                type="button"
                onClick={() => setShowBadgeTuner(!showBadgeTuner)}
                className="w-full flex items-center justify-between text-xs font-sans font-black text-neutral-300 hover:text-white transition-all cursor-pointer border-b border-neutral-800/70 pb-3 mb-4"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#E1FF39]" style={{ color: backBadgeBg }} />
                  <span className="text-xs tracking-widest text-neutral-100 uppercase font-bold">
                    ID Badge Tuner / 工作牌微调台
                  </span>
                  <span className="text-[9px] font-normal text-neutral-500 px-1.5 py-0.5 border border-neutral-800 rounded bg-white/5">
                    {showBadgeTuner ? '折叠' : '展开'}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showBadgeTuner ? 'rotate-180 text-[#E1FF39]' : 'text-neutral-500'}`} style={showBadgeTuner ? { color: backBadgeBg } : {}} />
              </button>

              {showBadgeTuner && (
                <>
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => applyPreset('default')}
                      className="text-[10px] font-mono text-[#E1FF39] bg-[#E1FF39]/10 px-2 py-0.5 rounded border border-[#E1FF39]/20 hover:bg-[#E1FF39]/23 transition-all duration-200 active:scale-95 flex items-center gap-1 cursor-pointer"
                      style={{ color: backBadgeBg, backgroundColor: `${backBadgeBg}15`, borderColor: `${backBadgeBg}25` }}
                      title="重置所有参数为默认 / Reset all parameters"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      RECODE
                    </button>
                  </div>

              {/* Archetype Quick Presets (快速预设风格) */}
              <div className="grid grid-cols-4 gap-1.5 mb-4 max-w-full">
                <button
                  type="button"
                  onClick={() => applyPreset('default')}
                  className="text-[9.5px] py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-[#E1FF39]/40 hover:text-white transition-all font-sans font-extrabold cursor-pointer"
                >
                  标准默认
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('cinematic')}
                  className="text-[9.5px] py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-cyan-400/40 hover:text-white transition-all font-sans font-extrabold cursor-pointer"
                >
                  宽屏冷青
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('minimal')}
                  className="text-[9.5px] py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-pink-500/40 hover:text-white transition-all font-sans font-extrabold cursor-pointer"
                >
                  极简暗粉
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('bigPhoto')}
                  className="text-[9.5px] py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-orange-400/40 hover:text-white transition-all font-sans font-extrabold cursor-pointer"
                >
                  头像特写
                </button>
              </div>

              {/* Slider Deck Tab selectors */}
              <div className="flex border-b border-neutral-800 mb-4 h-8 gap-1">
                {(['photo', 'type', 'card', 'code'] as const).map((tab) => {
                  const labelMap = {
                    photo: { text: '📸 头像', icon: Image },
                    type: { text: '✍️ 文字', icon: Type },
                    card: { text: '💳 卡片', icon: CreditCard },
                    code: { text: '📋 导出', icon: CodeIcon },
                  };
                  const isActive = tunerTab === tab;
                  const Icon = labelMap[tab].icon;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setTunerTab(tab)}
                      className={`flex-1 flex items-center justify-center gap-1 text-[10px] pb-1.5 font-sans font-bold border-b-2 transition-all transition-colors cursor-pointer ${
                        isActive 
                          ? 'border-[#E1FF39] text-[#E1FF39]' 
                          : 'border-transparent text-neutral-500 hover:text-neutral-300'
                      }`}
                      style={isActive ? { borderColor: backBadgeBg, color: backBadgeBg } : {}}
                    >
                      <Icon className="w-3 h-3" />
                      {labelMap[tab].text}
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT: PHOTO CROPPER */}
              {tunerTab === 'photo' && (
                <div className="space-y-3.5">
                  {/* Photo Width cols ratio (1 to 4 out of 5 columns) */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">照片宽度比 (占5格中的几格)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{photoWidthRatio.toFixed(2)} / 5 ({(photoWidthRatio / 5 * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_width_ratio', Math.max(0.5, Number((photoWidthRatio - 0.05).toFixed(2))), setPhotoWidthRatio)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="0.5" max="4.5" step="0.05" 
                        value={photoWidthRatio} 
                        onChange={(e) => setAndSave('badge_photo_width_ratio', Number(Number(e.target.value).toFixed(2)), setPhotoWidthRatio)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_width_ratio', Math.min(4.5, Number((photoWidthRatio + 0.05).toFixed(2))), setPhotoWidthRatio)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Photo Zoom/Scale */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">相片缩放尺度 (Scale)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{photoScale.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_scale', Math.max(50, Number((photoScale - 0.1).toFixed(1))), setPhotoScale)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="50" max="250" step="0.1" 
                        value={photoScale} 
                        onChange={(e) => setAndSave('badge_photo_scale', Number(Number(e.target.value).toFixed(1)), setPhotoScale)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_scale', Math.min(250, Number((photoScale + 0.1).toFixed(1))), setPhotoScale)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Photo Left/Right offset */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">相片水平偏移 (X Offset)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{photoXOffset.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_x_offset', Math.max(-100, Number((photoXOffset - 0.1).toFixed(1))), setPhotoXOffset)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="-100" max="100" step="0.1" 
                        value={photoXOffset} 
                        onChange={(e) => setAndSave('badge_photo_x_offset', Number(Number(e.target.value).toFixed(1)), setPhotoXOffset)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_x_offset', Math.min(100, Number((photoXOffset + 0.1).toFixed(1))), setPhotoXOffset)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Photo Top/Bottom offset */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">相片垂直偏移 (Y Offset)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{photoYOffset.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_y_offset', Math.max(-100, Number((photoYOffset - 0.1).toFixed(1))), setPhotoYOffset)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="-100" max="100" step="0.1" 
                        value={photoYOffset} 
                        onChange={(e) => setAndSave('badge_photo_y_offset', Number(Number(e.target.value).toFixed(1)), setPhotoYOffset)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_y_offset', Math.min(100, Number((photoYOffset + 0.1).toFixed(1))), setPhotoYOffset)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Photo Roundness */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">相片倒角弧度 (Radius)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{photoRadius.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_radius', Math.max(0, Number((photoRadius - 0.1).toFixed(1))), setPhotoRadius)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="0" max="40" step="0.1" 
                        value={photoRadius} 
                        onChange={(e) => setAndSave('badge_photo_radius', Number(Number(e.target.value).toFixed(1)), setPhotoRadius)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_photo_radius', Math.min(40, Number((photoRadius + 0.1).toFixed(1))), setPhotoRadius)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: TYPOGRAPHY CUSTOMIZATIONS */}
              {tunerTab === 'type' && (
                <div className="space-y-3.5">
                  {/* Name Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">中文姓名尺寸 (Name Font)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{nameSize.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => {
                          const size = Math.max(16, Number((nameSize - 0.1).toFixed(1)));
                          setAndSave('badge_name_size', size, setNameSize);
                          setAndSave('badge_name_lh', Number((size + 4).toFixed(1)), setNameLineHeight);
                        }}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="16" max="64" step="0.1" 
                        value={nameSize} 
                        onChange={(e) => {
                          const size = Number(Number(e.target.value).toFixed(1));
                          setAndSave('badge_name_size', size, setNameSize);
                          setAndSave('badge_name_lh', Number((size + 4).toFixed(1)), setNameLineHeight);
                        }}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const size = Math.min(64, Number((nameSize + 0.1).toFixed(1)));
                          setAndSave('badge_name_size', size, setNameSize);
                          setAndSave('badge_name_lh', Number((size + 4).toFixed(1)), setNameLineHeight);
                        }}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* English Name Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">英文姓名尺寸 (EN Name Font)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{engNameSize.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_eng_size', Math.max(10, Number((engNameSize - 0.1).toFixed(1))), setEngNameSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="10" max="32" step="0.1" 
                        value={engNameSize} 
                        onChange={(e) => setAndSave('badge_eng_size', Number(Number(e.target.value).toFixed(1)), setEngNameSize)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_eng_size', Math.min(32, Number((engNameSize + 0.1).toFixed(1))), setEngNameSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Labels (e.g. NOME / YEARS EXP) Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">信息项标签尺寸 (Label Font)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{labelSize.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_label_size', Math.max(6, Number((labelSize - 0.1).toFixed(1))), setLabelSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="6" max="18" step="0.1" 
                        value={labelSize} 
                        onChange={(e) => setAndSave('badge_label_size', Number(Number(e.target.value).toFixed(1)), setLabelSize)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_label_size', Math.min(18, Number((labelSize + 0.1).toFixed(1))), setLabelSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Secondary Values (e.g. 7+ Years, Birthday, Tel) Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">普通项内容尺寸 (Value Font)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{valueSize.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_value_size', Math.max(10, Number((valueSize - 0.1).toFixed(1))), setValueSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="10" max="24" step="0.1" 
                        value={valueSize} 
                        onChange={(e) => setAndSave('badge_value_size', Number(Number(e.target.value).toFixed(1)), setValueSize)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_value_size', Math.min(24, Number((valueSize + 0.1).toFixed(1))), setValueSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Email text Font Size (which requires more narrow bounds to prevent truncation) */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">邮箱文本内容尺寸 (Email Font)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{telEmailSize.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_telemail_size', Math.max(8, Number((telEmailSize - 0.1).toFixed(1))), setTelEmailSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="8" max="20" step="0.1" 
                        value={telEmailSize} 
                        onChange={(e) => setAndSave('badge_telemail_size', Number(Number(e.target.value).toFixed(1)), setTelEmailSize)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_telemail_size', Math.min(20, Number((telEmailSize + 0.1).toFixed(1))), setTelEmailSize)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: CARD DECK GEOMETRIES */}
              {tunerTab === 'card' && (
                <div className="space-y-3.5">
                  {/* Card Min Height */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">工作牌总高度 (Card Height)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{cardMinHeight.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_height', Math.max(400, Number((cardMinHeight - 0.1).toFixed(1))), setCardMinHeight)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="400" max="1000" step="0.1" 
                        value={cardMinHeight} 
                        onChange={(e) => setAndSave('badge_card_height', Number(Number(e.target.value).toFixed(1)), setCardMinHeight)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_height', Math.min(1000, Number((cardMinHeight + 0.1).toFixed(1))), setCardMinHeight)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Card Width */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">工作牌总宽度 (Card Width)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{cardWidth.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_width', Math.max(280, Number((cardWidth - 0.1).toFixed(1))), setCardWidth)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="280" max="550" step="0.1" 
                        value={cardWidth} 
                        onChange={(e) => setAndSave('badge_card_width', Number(Number(e.target.value).toFixed(1)), setCardWidth)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_width', Math.min(550, Number((cardWidth + 0.1).toFixed(1))), setCardWidth)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Card Inner Padding */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">卡片内部留白 (Inner Padding)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{cardPadding.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_padding', Math.max(8, Number((cardPadding - 0.1).toFixed(1))), setCardPadding)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="8" max="48" step="0.1" 
                        value={cardPadding} 
                        onChange={(e) => setAndSave('badge_card_padding', Number(Number(e.target.value).toFixed(1)), setCardPadding)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_padding', Math.min(48, Number((cardPadding + 0.1).toFixed(1))), setCardPadding)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Back Card Rotations angle */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">底色硬板偏转角 (Backplate Angle)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{cardRotateOffset.toFixed(1)}°</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_rotate', Math.max(-45, Number((cardRotateOffset - 0.1).toFixed(1))), setCardRotateOffset)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="-45" max="15" step="0.1" 
                        value={cardRotateOffset} 
                        onChange={(e) => setAndSave('badge_card_rotate', Number(Number(e.target.value).toFixed(1)), setCardRotateOffset)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_rotate', Math.min(15, Number((cardRotateOffset + 0.1).toFixed(1))), setCardRotateOffset)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Back Card Translate X */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">底色硬板水平移动 (Backplate Shift X)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{cardTranslateX.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_tx', Math.max(-200, Number((cardTranslateX - 0.1).toFixed(1))), setCardTranslateX)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="-200" max="100" step="0.1" 
                        value={cardTranslateX} 
                        onChange={(e) => setAndSave('badge_card_tx', Number(Number(e.target.value).toFixed(1)), setCardTranslateX)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_tx', Math.min(100, Number((cardTranslateX + 0.1).toFixed(1))), setCardTranslateX)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Back Card Translate Y */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">底色硬板垂直移动 (Backplate Shift Y)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: backBadgeBg }}>{cardTranslateY.toFixed(1)}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_ty', Math.max(-150, Number((cardTranslateY - 0.1).toFixed(1))), setCardTranslateY)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="-150" max="150" step="0.1" 
                        value={cardTranslateY} 
                        onChange={(e) => setAndSave('badge_card_ty', Number(Number(e.target.value).toFixed(1)), setCardTranslateY)}
                        className="flex-1 accent-[#E1FF39] h-1"
                        style={{ accentColor: backBadgeBg }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('badge_card_ty', Math.min(150, Number((cardTranslateY + 0.1).toFixed(1))), setCardTranslateY)}
                        className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs font-bold leading-none select-none cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Theme Colors selector */}
                  <div className="grid grid-cols-2 gap-3.5 pt-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-400 font-sans">主卡底色</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded border border-neutral-800">
                        <input 
                          type="color" 
                          value={badgeBg} 
                          onChange={(e) => setAndSave('badge_card_bg', e.target.value, setBadgeBg)}
                          className="w-6 h-6 bg-transparent rounded cursor-pointer border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300 uppercase">{badgeBg}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-400 font-sans">背板底板</span>
                      <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded border border-neutral-800">
                        <input 
                          type="color" 
                          value={backBadgeBg} 
                          onChange={(e) => setAndSave('badge_card_back_bg', e.target.value, setBackBadgeBg)}
                          className="w-6 h-6 bg-transparent rounded cursor-pointer border-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-300 uppercase">{backBadgeBg}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enable floating logos Toggle */}
                  <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800/80 mt-1">
                    <span className="text-[10px] text-neutral-300 font-sans font-bold">显示背景悬浮工具图标</span>
                    <button
                      type="button"
                      onClick={() => setAndSave('badge_show_float', !showFloatingIcons, setShowFloatingIcons)}
                      className={`text-[9.5px] font-mono px-3 py-1 rounded transition-all leading-none border cursor-pointer select-none ${
                        showFloatingIcons 
                          ? 'bg-[#E1FF39]/12 border-[#E1FF39]/30 text-[#E1FF39]' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                      }`}
                      style={showFloatingIcons ? { color: backBadgeBg, borderColor: `${backBadgeBg}30`, backgroundColor: `${backBadgeBg}12` } : {}}
                    >
                      {showFloatingIcons ? 'ON / 开启' : 'OFF / 隐藏'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: CODE BAKE EXPORT */}
              {tunerTab === 'code' && (
                <div className="space-y-3.5">
                  <div className="rounded-lg bg-neutral-950 p-3.5 border border-neutral-800/70 font-mono text-[10px] text-zinc-400 overflow-x-auto max-h-[190px] overflow-y-auto leading-relaxed relative">
                    <button
                      type="button"
                      className="absolute right-2 top-2 p-1 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all cursor-pointer"
                      title="Copy code configuration snippet"
                      onClick={() => {
                        const jsonCode = JSON.stringify({
                          photoWidthRatio,
                          photoRadius,
                          photoScale,
                          photoXOffset,
                          photoYOffset,
                          nameSize,
                          engNameSize,
                          labelSize,
                          valueSize,
                          telEmailSize,
                          cardMinHeight,
                          cardWidth,
                          cardPadding,
                          badgeBg,
                          backBadgeBg,
                          cardRotateOffset,
                          cardTranslateX,
                          cardTranslateY,
                          tiltSensitivity,
                          showFloatingIcons,
                          floatScale
                        }, null, 2);
                        navigator.clipboard.writeText(jsonCode);
                        setCopiedCodeConfig(true);
                        setTimeout(() => setCopiedCodeConfig(false), 2000);
                      }}
                    >
                      {copiedCodeConfig ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    
                    <span className="text-neutral-500 block pb-1">// Working Badge Settings Code</span>
                    <span className="text-[#FF79C6]">const </span>
                    <span className="text-[#50FA7B]">badgeConfig </span>= &#123;
                    <div className="pl-3.5">
                      <div>photoWidthRatio: <span className="text-[#BD93F9]">{photoWidthRatio}</span>,</div>
                      <div>photoRadius: <span className="text-[#BD93F9]">{photoRadius}</span>,</div>
                      <div>photoScale: <span className="text-[#BD93F9]">{photoScale}</span>,</div>
                      <div>photoXOffset: <span className="text-[#BD93F9]">{photoXOffset}</span>,</div>
                      <div>photoYOffset: <span className="text-[#BD93F9]">{photoYOffset}</span>,</div>
                      <div>nameSize: <span className="text-[#BD93F9]">{nameSize}</span>,</div>
                      <div>engNameSize: <span className="text-[#BD93F9]">{engNameSize}</span>,</div>
                      <div>labelSize: <span className="text-[#BD93F9]">{labelSize}</span>,</div>
                      <div>valueSize: <span className="text-[#BD93F9]">{valueSize}</span>,</div>
                      <div>cardMinHeight: <span className="text-[#BD93F9]">{cardMinHeight}</span>,</div>
                      <div>cardWidth: <span className="text-[#BD93F9]">{cardWidth}</span>,</div>
                      <div>cardPadding: <span className="text-[#BD93F9]">{cardPadding}</span>,</div>
                      <div>badgeBg: <span className="text-[#F1FA8C]">"{badgeBg}"</span>,</div>
                      <div>backBadgeBg: <span className="text-[#F1FA8C]">"{backBadgeBg}"</span>,</div>
                      <div>cardRotateOffset: <span className="text-[#BD93F9]">{cardRotateOffset}</span>,</div>
                      <div>cardTranslateX: <span className="text-[#BD93F9]">{cardTranslateX}</span>,</div>
                      <div>cardTranslateY: <span className="text-[#BD93F9]">{cardTranslateY}</span></div>
                    </div>
                    &#125;;
                  </div>
                  <div className="text-[9.5px] font-sans text-neutral-500 italic flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#E1FF39] shrink-0" style={{ color: backBadgeBg }} />
                    <span>微调完成后，点击右上角复制，即可将配置永久保存在您的代码中！</span>
                  </div>
                </div>
              )}
                </>
              )}
            </div>
            )}

            {/* --- NEW: RESUME CONTENT & TYPOGRAPHY TUNER (右侧文字与简历内容微调台) --- */}
            {showTunerPanels && (
              <div className="w-full max-w-[395px] mt-6 bg-[#09090b]/95 rounded-2xl p-5 border border-neutral-800/90 shadow-2xl relative z-40 select-none animate-fade-in text-left">
              <div className="flex items-center justify-between border-b border-neutral-800/70 pb-3 mb-4">
                <div className="flex items-center gap-2 font-sans">
                  <span className="text-sm">📝</span>
                  <span className="text-xs font-black tracking-widest text-[#E1FF39] uppercase font-bold" style={{ color: timelineColor }}>
                    Resume Tuner / 文字与排版微调台
                  </span>
                </div>
                <span className="text-[9px] font-mono bg-[#E1FF39]/10 text-[#E1FF39] px-1.5 py-0.5 rounded border border-[#E1FF39]/30" style={{ color: timelineColor, borderColor: timelineColor, backgroundColor: `${timelineColor}10` }}>
                  ACTIVE
                </span>
              </div>

              {/* Tab Selector inside Resume Tuner */}
              <div className="flex border-b border-neutral-805 mb-4 h-8 gap-0.5">
                {(['content', 'education', 'type'] as const).map((tab) => {
                  const labelMap = {
                    content: { text: '💼 履历内容', icon: Briefcase },
                    education: { text: '🎓 教育背景', icon: null },
                    type: { text: '🎨 样式间距', icon: Type },
                  };
                  const isActive = resumeTunerTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setResumeTunerTab(tab)}
                      className={`flex-1 flex items-center justify-center gap-1 text-[9.5px] pb-1.5 font-sans font-bold border-b-2 transition-all cursor-pointer ${
                        isActive 
                          ? 'border-[#E1FF39] text-[#E1FF39]' 
                          : 'border-transparent text-neutral-500 hover:text-neutral-300'
                      }`}
                      style={isActive ? { borderColor: timelineColor, color: timelineColor } : {}}
                    >
                      {tab === 'content' && <Briefcase className="w-3 h-3 text-[#E1FF39]" style={{ color: timelineColor }} />}
                      {tab === 'education' && <span className="text-[10px] leading-none shrink-0" style={{ color: timelineColor }}>🎓</span>}
                      {tab === 'type' && <Type className="w-3 h-3 text-[#E1FF39]" style={{ color: timelineColor }} />}
                      {labelMap[tab].text}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: CONTENT EDITING (履历编辑) */}
              {resumeTunerTab === 'content' && (
                <div className="space-y-4">
                  {/* Item Selector Chips */}
                  <div className="flex flex-wrap gap-1 mb-2 max-h-[85px] overflow-y-auto pr-1">
                    {experienceList.map((_: any, i: number) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEditingIndex(i)}
                        className={`text-[9.5px] px-2.5 py-1 rounded transition-all cursor-pointer font-extrabold ${
                          editingIndex === i
                            ? 'bg-white text-black font-extrabold'
                            : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-850'
                        }`}
                      >
                        学识履历 {i + 1}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newItem = {
                          period: '2026 - Present',
                          role: 'Independent Visual Specialist / 独立视觉创意官',
                          company: 'Paris / Shanghai',
                          description: '动态视觉策划：定制化交互式布局解构方案与学术型字形标定理论。'
                        };
                        const updated = [...experienceList, newItem];
                        setAndSaveList('resume_experience_list', updated, setExperienceList);
                        setEditingIndex(updated.length - 1);
                      }}
                      className="text-[9px] px-2 py-1 rounded bg-emerald-950/45 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 transition-all cursor-pointer font-bold"
                    >
                      + 新增经历
                    </button>
                  </div>

                  {experienceList[editingIndex] && (
                    <div className="space-y-3 p-3 bg-neutral-950 rounded-lg border border-neutral-900 text-left">
                      {/* Period */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[8.5px] text-neutral-500 font-mono uppercase">时间周期 / Period</label>
                        <input
                          type="text"
                          value={experienceList[editingIndex].period || ''}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[editingIndex] = { ...updated[editingIndex], period: e.target.value };
                            setAndSaveList('resume_experience_list', updated, setExperienceList);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-500 font-mono"
                        />
                      </div>

                      {/* Role */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[8.5px] text-neutral-500 font-mono uppercase">职务名称 / Position Role</label>
                        <input
                          type="text"
                          value={experienceList[editingIndex].role || ''}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[editingIndex] = { ...updated[editingIndex], role: e.target.value };
                            setAndSaveList('resume_experience_list', updated, setExperienceList);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-550 font-sans font-bold"
                        />
                      </div>

                      {/* Company */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[8.5px] text-neutral-500 font-mono uppercase">机构名称与地域 / Affiliation & Location</label>
                        <input
                          type="text"
                          value={experienceList[editingIndex].company || ''}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[editingIndex] = { ...updated[editingIndex], company: e.target.value };
                            setAndSaveList('resume_experience_list', updated, setExperienceList);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-550 font-sans"
                        />
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[8.5px] text-neutral-500 font-sans uppercase">工作职责描述 (双语/提示：用冒号“：”分隔可高亮并自动排版)</label>
                        <textarea
                          rows={4}
                          value={experienceList[editingIndex].description || ''}
                          onChange={(e) => {
                            const updated = [...experienceList];
                            updated[editingIndex] = { ...updated[editingIndex], description: e.target.value };
                            setAndSaveList('resume_experience_list', updated, setExperienceList);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-500 font-sans leading-relaxed resize-none"
                        />
                      </div>

                      {/* Delete Item button */}
                      {experienceList.length > 1 && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = experienceList.filter((_, i: number) => i !== editingIndex);
                              setAndSaveList('resume_experience_list', updated, setExperienceList);
                              setEditingIndex(Math.max(0, editingIndex - 1));
                            }}
                            className="text-[9px] px-2 py-1 text-rose-400 hover:text-white hover:bg-rose-950 border border-rose-955 rounded transition-all cursor-pointer font-bold"
                          >
                            🗑️ 删除此经历条目
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: EDUCATION EDITING (教育背景) */}
              {resumeTunerTab === 'education' && (
                <div className="space-y-4">
                  <div className="text-left text-[10px] text-neutral-400">
                    履历底部毕业院校与学术合作背景
                  </div>

                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 animate-fade-in font-sans">
                    {educationList.map((edu: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-neutral-950 p-2 rounded border border-neutral-900 justify-between">
                        <input
                          type="text"
                          value={edu}
                          onChange={(e) => {
                            const updated = [...educationList];
                            updated[idx] = e.target.value;
                            setAndSaveList('resume_education_list', updated, setEducationList);
                          }}
                          className="bg-transparent text-xs text-white border-none focus:outline-none flex-1 font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = educationList.filter((_, i: number) => i !== idx);
                            setAndSaveList('resume_education_list', updated, setEducationList);
                          }}
                          className="text-neutral-500 hover:text-rose-500 px-1 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-1.5 pt-1 font-sans">
                    <input
                      id="new-edu-input-field"
                      type="text"
                      placeholder="例如: 北京大学数字艺术系 / Peking University"
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none font-sans"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = (e.currentTarget as HTMLInputElement).value.trim();
                          if (val) {
                            const updated = [...educationList, val];
                            setAndSaveList('resume_education_list', updated, setEducationList);
                            (e.currentTarget as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const inputEl = document.getElementById('new-edu-input-field') as HTMLInputElement;
                        const val = inputEl?.value.trim();
                        if (val) {
                          const updated = [...educationList, val];
                          setAndSaveList('resume_education_list', updated, setEducationList);
                          inputEl.value = '';
                        }
                      }}
                      className="px-3 py-1 rounded bg-white text-black font-extrabold text-[10px] cursor-pointer"
                    >
                      新增
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: TYPOGRAPHY / LAYOUT (学识间距) */}
              {resumeTunerTab === 'type' && (
                <div className="space-y-4 font-sans animate-fade-in">
                  {/* Spacing / Vertical Gaps */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400">履历经历条目间距 (Vertical Gap)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: timelineColor }}>{timelineSpacing}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_timeline_spacing', Math.max(12, timelineSpacing - 2), setTimelineSpacing)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="12" max="80" step="2" 
                        value={timelineSpacing} 
                        onChange={(e) => setAndSave('resume_timeline_spacing', Number(e.target.value), setTimelineSpacing)}
                        className="flex-1 h-1"
                        style={{ accentColor: timelineColor }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_timeline_spacing', Math.min(80, timelineSpacing + 2), setTimelineSpacing)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Role Title Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">职务名称字号 (Role Title)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: timelineColor }}>{roleFontSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_role_fs', Math.max(12, roleFontSize - 1), setRoleFontSize)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="12" max="32" step="1" 
                        value={roleFontSize} 
                        onChange={(e) => setAndSave('resume_role_fs', Number(e.target.value), setRoleFontSize)}
                        className="flex-1 h-1"
                        style={{ accentColor: timelineColor }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_role_fs', Math.min(32, roleFontSize + 1), setRoleFontSize)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Description Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">描述性职责文字字号 (Description)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: timelineColor }}>{descFontSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_desc_fs', Math.max(9, descFontSize - 1), setDescFontSize)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="9" max="22" step="0.5" 
                        value={descFontSize} 
                        onChange={(e) => setAndSave('resume_desc_fs', Number(e.target.value), setDescFontSize)}
                        className="flex-1 h-1"
                        style={{ accentColor: timelineColor }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_desc_fs', Math.min(22, descFontSize + 1), setDescFontSize)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Period Font Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-400 font-sans">履历时间周期字号 (Period)</span>
                      <span className="font-mono text-[#E1FF39] font-black" style={{ color: timelineColor }}>{periodFontSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_period_fs', Math.max(8, periodFontSize - 1), setPeriodFontSize)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >-</button>
                      <input 
                        type="range" min="8" max="18" step="0.5" 
                        value={periodFontSize} 
                        onChange={(e) => setAndSave('resume_period_fs', Number(e.target.value), setPeriodFontSize)}
                        className="flex-1 h-1"
                        style={{ accentColor: timelineColor }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAndSave('resume_period_fs', Math.min(18, periodFontSize + 1), setPeriodFontSize)}
                        className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                      >+</button>
                    </div>
                  </div>

                  {/* Timeline Neon Accent Color Choice */}
                  <div className="flex flex-col gap-1 text-left font-sans">
                    <span className="text-[9.5px] text-neutral-400 font-sans">时间轴微型圆点/高亮配色 Choose Accent</span>
                    <div className="grid grid-cols-6 gap-1.5 pt-1">
                      {[
                        { hex: '#E1FF39', name: '荧光绿' },
                        { hex: '#00FFE0', name: '冰川蓝' },
                        { hex: '#FF1493', name: '霓虹粉' },
                        { hex: '#9b5de5', name: '经典紫' },
                        { hex: '#FFAA00', name: '琥珀橙' },
                        { hex: '#10B981', name: '湖水绿' }
                      ].map((item) => {
                        const isSelected = timelineColor === item.hex;
                        return (
                          <button
                            key={item.hex}
                            type="button"
                            onClick={() => setAndSave('resume_timeline_color', item.hex, setTimelineColor)}
                            className="h-5 rounded border transition-all cursor-pointer relative"
                            style={{ 
                              backgroundColor: item.hex,
                              borderColor: isSelected ? '#fff' : 'rgba(255,255,255,0.15)',
                              boxShadow: isSelected ? `0 0 6px ${item.hex}` : 'none'
                            }}
                            title={item.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
 
          {/* COLUMN 2 (lg:col-span-7): Spacious and beautifully aligned career chronicle */}
          <div className={`lg:col-span-7 relative z-10 space-y-8 pl-0 pt-4 lg:pt-8 transition-all duration-500 ease-in-out ${
            badgePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
          } ${
            badgePosition === 'left' 
              ? 'lg:pl-10 lg:border-l' 
              : 'lg:pr-10 lg:border-r'
          } border-neutral-200`}>
            
            {/* Pristine timeline list */}
            <div className="relative border-l border-neutral-200 pl-6 ml-3" style={{ display: 'flex', flexDirection: 'column', gap: `${timelineSpacing}px` }}>
              {experienceList.map((exp: any, idx: number) => (
                <div key={idx} className="relative group/timeline">
                  {/* Timeline bullet node using customized timeline accent color */}
                  <div 
                    className="absolute -left-[30.5px] top-1.5 h-3 w-3 rounded-full border border-white transition-all duration-300 group-hover/timeline:scale-125" 
                    style={{
                      backgroundColor: timelineColor,
                      boxShadow: `0 0 10px ${timelineColor}, 0 0 3px ${timelineColor}`,
                      borderColor: '#ffffff'
                    }}
                  />
                  
                  <div className="space-y-1.5">
                    <span 
                      className="font-mono text-neutral-400 block font-bold tracking-wider px-1 -mx-1 py-0.5 select-none"
                      style={{ fontSize: `${periodFontSize}px` }}
                    >
                      {exp.period}
                    </span>
                    
                    <h5 
                      className="font-sans font-black text-neutral-900 leading-snug px-1 -mx-1 py-0.5 select-none"
                      style={{ fontSize: `${roleFontSize}px` }}
                    >
                      {exp.role} {exp.company && <span className="text-neutral-400 font-mono text-xs font-normal">@ {exp.company}</span>}
                    </h5>

                    {/* Highly polished subtle description paragraphs with auto-scaling flow */}
                    <div 
                      className="pt-1.5 text-neutral-600 font-sans space-y-1 max-w-xl leading-relaxed"
                      style={{ fontSize: `${descFontSize}px` }}
                    >
                      <p className="px-1 py-0.5 -mx-1 select-none whitespace-pre-wrap">
                        {renderFormattedDescription(exp.description)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Elegant Education / Alumni list bottom section */}
            <div className="pt-8 border-t border-neutral-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#9c9a8a] uppercase block animate-pulse">
                  ALMA MATER & EDUCATION // 毕业院校
                </span>

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] text-neutral-600">
                {educationList.map((school: string, sIdx: number) => (
                  <div 
                    key={sIdx} 
                    className="flex items-center justify-between bg-neutral-50 p-2.5 rounded border border-neutral-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-neutral-950 font-bold bg-[#E1FF39] px-1 rounded text-[8px] shrink-0" style={{ backgroundColor: timelineColor }}>🎓</span>
                      <span className="px-1 flex-1 select-none font-bold text-neutral-800">
                        {school}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
          </div>
        </div>
      </div>
 
      {/* Subtle Tuner Activation Trigger (隐蔽的调色盘唤醒入口) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setShowTunerPanels(!showTunerPanels)}
          className="p-2.5 rounded-full bg-[#121214]/90 border border-neutral-800 text-neutral-400 hover:text-[#E1FF39] hover:border-[#E1FF39]/30 transition-all shadow-2xl backdrop-blur-md cursor-pointer flex items-center justify-center group"
          title={showTunerPanels ? "收起微调面板 / Hide Tuner" : "展开微调面板 / Show Tuner"}
        >
          <Sliders className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" style={showTunerPanels ? { color: backBadgeBg || '#E1FF39' } : {}} />
        </button>
      </div>

    </section>
  );
}
