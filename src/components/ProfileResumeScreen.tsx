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
import savedConfigData from '../data/config.json';
const savedConfig = savedConfigData as any;

// Flag to completely bypass localStorage in production mode for perfect visual consistency.
// This prevents previous browser data from overriding the pristine, beautiful JSON default settings.
const showTunerPanels = false;
const showBadgeTuner = false;

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
    return (showTunerPanels ? (localStorage.getItem('badge_inner_layout') as 'side' | 'stack') : null) || 'side';
  });

  // Relative alignment within the photo-text flex flow (e.g. 'left' / 'right' or 'top' / 'bottom')
  const [photoPosition, setPhotoPosition] = useState<'left' | 'right' | 'top' | 'bottom'>(() => {
    return (showTunerPanels ? (localStorage.getItem('photo_pos') as any) : null) || 'left';
  });

  // Text content alignment inside the elements
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(() => {
    return (showTunerPanels ? (localStorage.getItem('badge_text_align') as 'left' | 'center' | 'right') : null) || 'left';
  });

  // Badge Photo url/base64 state
  const [badgePhoto, setBadgePhoto] = useState(() => {
    const saved = savedConfig.badge_photo || (showTunerPanels ? localStorage.getItem('badge_photo') : null);
    if (!saved || saved.includes('unsplash.com') || saved.startsWith('http://') || saved.startsWith('https://')) {
      const defaultPhoto = '/pic.jpg';
      return defaultPhoto;
    }
    return saved;
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
    return savedConfig.badge_name || (showTunerPanels && localStorage.getItem('badge_name')) || '许\n子熠';
  });
  const [englishName, setEnglishName] = useState(() => {
    return savedConfig.badge_eng_name || (showTunerPanels && localStorage.getItem('badge_english_name')) || 'RYE XU';
  });
  const [yearsExp, setYearsExp] = useState(() => {
    return savedConfig.badge_years_exp || (showTunerPanels && localStorage.getItem('badge_years_exp')) || '7+ YEARS EXP';
  });
  const [birthday, setBirthday] = useState(() => {
    return savedConfig.badge_birthday || (showTunerPanels && localStorage.getItem('badge_birthday')) || '1996.09.05';
  });
  const [tel, setTel] = useState(() => {
    return savedConfig.badge_tel || (showTunerPanels && localStorage.getItem('badge_tel')) || '153-7735-6930';
  });
  const [email, setEmail] = useState(() => {
    return savedConfig.badge_email || (showTunerPanels && localStorage.getItem('badge_email')) || 'xuziyi905@outlook.com';
  });

  const [introText, setIntroText] = useState(() => {
    return savedConfig.resume_intro_text || (showTunerPanels && localStorage.getItem('badge_intro_text')) || 'Archived timeline of professional visual strategy, creative operations, and platform content ecosystems across Yuanqi Desktop and commercial illustrations.';
  });

  // --- Dynamic Layout Customizations (Pristine Constant Design Specs) ---
  const [photoWidthRatio, setPhotoWidthRatio] = useState<number>(() => {
    return Number(savedConfig.badge_photo_width_ratio || savedConfig.badge_photoWidthRatio || (showTunerPanels && localStorage.getItem('badge_photo_width_ratio')) || '3.05');
  });
  const [photoRadius, setPhotoRadius] = useState<number>(() => {
    return Number(savedConfig.badge_photo_radius || savedConfig.badge_photoRadius || (showTunerPanels && localStorage.getItem('badge_photo_radius')) || '9');
  });
  const [photoScale, setPhotoScale] = useState<number>(() => {
    return Number(savedConfig.badge_photo_scale || savedConfig.badge_photoScale || (showTunerPanels && localStorage.getItem('badge_photo_scale')) || '128');
  });
  const [photoXOffset, setPhotoXOffset] = useState<number>(() => {
    return Number(savedConfig.badge_photo_x_offset || savedConfig.badge_photoXOffset || (showTunerPanels && localStorage.getItem('badge_photo_x_offset')) || '0');
  });
  const [photoYOffset, setPhotoYOffset] = useState<number>(() => {
    return Number(savedConfig.badge_photo_y_offset || savedConfig.badge_photoYOffset || (showTunerPanels && localStorage.getItem('badge_photo_y_offset')) || '0');
  });

  const [nameSize, setNameSize] = useState<number>(() => {
    return Number(savedConfig.badge_name_size || savedConfig.badge_nameSize || (showTunerPanels && localStorage.getItem('badge_name_size')) || '43.6');
  });
  const [nameLineHeight, setNameLineHeight] = useState<number>(() => {
    return Number(savedConfig.badge_name_lh || savedConfig.badge_nameLineHeight || (showTunerPanels && localStorage.getItem('badge_name_lh')) || '47.6');
  });
  const [engNameSize, setEngNameSize] = useState<number>(() => {
    return Number(savedConfig.badge_eng_size || savedConfig.badge_engNameSize || (showTunerPanels && localStorage.getItem('badge_eng_size')) || '23.7');
  });
  const [labelSize, setLabelSize] = useState<number>(() => {
    return Number(savedConfig.badge_label_size || savedConfig.badge_labelSize || (showTunerPanels && localStorage.getItem('badge_label_size')) || '12.4');
  });
  const [valueSize, setValueSize] = useState<number>(() => {
    return Number(savedConfig.badge_value_size || savedConfig.badge_valueSize || (showTunerPanels && localStorage.getItem('badge_value_size')) || '19.6');
  });
  const [telEmailSize, setTelEmailSize] = useState<number>(() => {
    return Number(savedConfig.badge_telemail_size || savedConfig.badge_telEmailSize || (showTunerPanels && localStorage.getItem('badge_telemail_size')) || '20');
  });

  const [cardMinHeight, setCardMinHeight] = useState<number>(() => {
    return Number(savedConfig.badge_card_height || savedConfig.badge_cardMinHeight || (showTunerPanels && localStorage.getItem('badge_card_height')) || '687.7');
  });
  const [cardWidth, setCardWidth] = useState<number>(() => {
    return Number(savedConfig.badge_card_width || savedConfig.badge_cardWidth || (showTunerPanels && localStorage.getItem('badge_card_width')) || '439.4');
  });
  const [cardPadding, setCardPadding] = useState<number>(() => {
    return Number(savedConfig.badge_card_padding || savedConfig.badge_cardPadding || (showTunerPanels && localStorage.getItem('badge_card_padding')) || '22.1');
  });
  const [badgeBg, setBadgeBg] = useState<string>(() => {
    return savedConfig.badge_badgeBg || savedConfig.badge_card_bg || (showTunerPanels && localStorage.getItem('badge_card_bg')) || '#121214';
  });
  const [backBadgeBg, setBackBadgeBg] = useState<string>(() => {
    return savedConfig.badge_backBadgeBg || savedConfig.badge_card_back_bg || (showTunerPanels && localStorage.getItem('badge_card_back_bg')) || '#E1FF39';
  });

  const [cardRotateOffset, setCardRotateOffset] = useState<number>(() => {
    return Number(savedConfig.badge_card_rotate || savedConfig.badge_cardRotateOffset || (showTunerPanels && localStorage.getItem('badge_card_rotate')) || '-19.2');
  });
  const [cardTranslateX, setCardTranslateX] = useState<number>(() => {
    return Number(savedConfig.badge_card_tx || savedConfig.badge_cardTranslateX || (showTunerPanels && localStorage.getItem('badge_card_tx')) || '-87.8');
  });
  const [cardTranslateY, setCardTranslateY] = useState<number>(() => {
    return Number(savedConfig.badge_card_ty || savedConfig.badge_cardTranslateY || (showTunerPanels && localStorage.getItem('badge_card_ty')) || '16');
  });
  const [tiltSensitivity, setTiltSensitivity] = useState<number>(() => {
    return Number(savedConfig.badge_tiltSensitivity || (showTunerPanels && localStorage.getItem('badge_tilt_sens')) || '15');
  });

  const [showFloatingIcons, setShowFloatingIcons] = useState<boolean>(() => {
    return savedConfig.badge_showFloatingIcons === 'true' || savedConfig.badge_show_float !== 'false' || (showTunerPanels && localStorage.getItem('badge_show_float') !== 'false');
  });
  const [floatScale, setFloatScale] = useState<number>(() => {
    return Number(savedConfig.badge_floatScale || (showTunerPanels && localStorage.getItem('badge_float_scale')) || '125');
  });

  // States for Resume Content/Typography Customization on the right
  const [timelineColor, setTimelineColor] = useState<string>(() => {
    return savedConfig.resume_timeline_color || (showTunerPanels && localStorage.getItem('resume_timeline_color')) || '#E1FF39';
  });
  const [roleFontSize, setRoleFontSize] = useState<number>(() => {
    return Number(savedConfig.resume_role_fs || (showTunerPanels && localStorage.getItem('resume_role_fs')) || '19');
  });
  const [descFontSize, setDescFontSize] = useState<number>(() => {
    return Number(savedConfig.resume_desc_fs || (showTunerPanels && localStorage.getItem('resume_desc_fs')) || '14.5');
  });
  const [periodFontSize, setPeriodFontSize] = useState<number>(() => {
    return Number(savedConfig.resume_period_fs || (showTunerPanels && localStorage.getItem('resume_period_fs')) || '16');
  });
  const [timelineSpacing, setTimelineSpacing] = useState<number>(() => {
    return Number(savedConfig.resume_timeline_spacing || (showTunerPanels && localStorage.getItem('resume_timeline_spacing')) || '38');
  });

  const [educationList, setEducationList] = useState<string[]>(() => {
    try {
      const saved = savedConfig.resume_education_list || (showTunerPanels && localStorage.getItem('resume_education_list'));
      if (saved) {
        return typeof saved === 'string' ? JSON.parse(saved) : saved;
      }
    } catch (e) {
      console.error(e);
    }
    return [
      '重庆邮电大学移通学院',
      '数字媒体艺术 本科'
    ];
  });

  const [experienceList, setExperienceList] = useState<any[]>(() => {
    try {
      const saved = savedConfig.resume_experience_list || (showTunerPanels && localStorage.getItem('resume_experience_list'));
      let rawList = null;
      if (saved) {
        rawList = typeof saved === 'string' ? JSON.parse(saved) : saved;
      } else {
        rawList = [
          {
            period: '2020.9 - 2025.6',
            role: '资深视觉设计师',
            company: '猎豹移动-豹趣科技',
            description: '千万级生态基建与赋能： 主导元气桌面壁纸编辑器（PC 端）模块化视觉规范，独立产出涵盖交互组件、底层特效等 500+ 高精资产矩阵。成功将复杂的动态渲染逻辑降维封装，大幅降低大众创作门槛，强势驱动千万级 UGC 社区的内容裂变与繁荣。\n 2. 业务转化与核心渠道跃升：业务转化与核心渠道跃升 深度参与全域应用商店视觉全面升级。针对不同渠道把控平台特性并重构展示层级，有效解决原版焦点涣散痛点，直接带动核心渠道转化率（CVR）实现 11.6% 的显著跃升。\n 3.动效视觉主导与全链路创意赋能：突破传统制作瓶颈，通过 AIGC 商业化落地大幅提升团队设计投产比与视觉表现上限。精通 AE 与复杂粒子特效，包揽项目内核心高阶动效产出，全面打通视觉与动效的全链路。'
          },
          {
            period: '2019 - 2020',
            role: '视觉设计师',
            company: '广州卓牛科技',
            description: '负责相机、清理等手机软件的视觉内容设计和运营活动宣发和迭代。'
          },
          {
            period: '2018 - 2019',
            role: '视觉设计师',
            company: '广州图灵科技',
            description: '负责运营推广等平面内容输出和视频动画产出。'
          }
        ];
      }

      // Normalise role / company separation dynamically
      return rawList.map((item: any) => {
        let r = (item.role || '').trim();
        let c = (item.company || '').trim();
        if (!c) {
          if (r.includes('@')) {
            const parts = r.split('@');
            r = parts[0].trim();
            c = parts[1].trim();
          } else {
            const match = r.match(/^([\s\S]+?)(?:\s{2,}|\t+| {2,}|[\u00A0]{2,}|@)([\s\S]+)$/);
            if (match) {
              r = match[1].trim();
              c = match[2].trim();
            }
          }
        }
        return { ...item, role: r, company: c };
      });
    } catch (e) {
      console.error(e);
    }
    return [
      {
        period: '2020.9 - 2025.6',
        role: '资深视觉设计师',
        company: '猎豹移动-豹趣科技',
        description: '千万级生态基建与赋能： 主导元气桌面壁纸编辑器（PC 端）模块化视觉规范，独立产出涵盖交互组件、底层特效等 500+ 高精资产矩阵。成功将复杂的动态渲染逻辑降维封装，大幅降低大众创作门槛，强势驱动千万级 UGC 社区的内容裂变与繁荣。\n 2. 业务转化与核心渠道跃升：业务转化与核心渠道跃升 深度参与全域应用商店视觉全面升级。针对不同渠道把控平台特性并重构展示层级，有效解决原版焦点涣散痛点，直接带动核心渠道转化率（CVR）实现 11.6% 的显著跃升。\n 3.动效视觉主导与全链路创意赋能：突破传统制作瓶颈，通过 AIGC 商业化落地大幅提升团队设计投产比与视觉表现上限。精通 AE 与复杂粒子特效，包揽项目内核心高阶动效产出，全面打通视觉与动效的全链路。'
      },
      {
        period: '2019 - 2020',
        role: '视觉设计师',
        company: '广州卓牛科技',
        description: '负责相机、清理等手机软件的视觉内容设计和运营活动宣发和迭代。'
      },
      {
        period: '2018 - 2019',
        role: '视觉设计师',
        company: '广州图灵科技',
        description: '负责运营推广等平面内容输出和视频动画产出。'
      }
    ];
  });

  const tunerTab = 'photo';
  const resumeTunerTab = 'content';
  const editingIndex = 0;
  const copiedCodeConfig = false;

  const setAndSave = (key: string, value: any, setter: Function) => {
    setter(value);
    localStorage.setItem(key, value.toString());
  };

  const setAndSaveList = (key: string, value: any[], setter: Function) => {
    setter(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const applyPreset = (presetName: string) => {
    let config: any = {};
    if (presetName === 'default') {
      config = {
        badge_photo_width_ratio: 2.6,
        badge_photo_radius: 12,
        badge_photo_scale: 105,
        badge_photo_x_offset: 0,
        badge_photo_y_offset: -8,
        badge_name_size: 38,
        badge_name_line_height: 42,
        badge_eng_size: 19,
        badge_label_size: 10,
        badge_value_size: 15,
        badge_telemail_size: 14,
        badge_card_height: 730,
        badge_card_width: 395,
        badge_card_padding: 28,
        badge_card_bg: '#121214',
        badge_card_back_bg: '#E1FF39',
        badge_card_rotate: -16,
        badge_card_tx: -55,
        badge_card_ty: 16,
        badge_tilt_sens: 15,
        badge_show_float: true,
        badge_float_scale: 125,
      };
    } else if (presetName === 'cinematic') {
      config = {
        badge_photo_width_ratio: 3.5,
        badge_photo_radius: 8,
        badge_photo_scale: 110,
        badge_photo_x_offset: 0,
        badge_photo_y_offset: 0,
        badge_name_size: 34,
        badge_name_line_height: 38,
        badge_eng_size: 16,
        badge_label_size: 9,
        badge_value_size: 14,
        badge_telemail_size: 13,
        badge_card_height: 640,
        badge_card_width: 440,
        badge_card_padding: 24,
        badge_card_bg: '#0a0f1d',
        badge_card_back_bg: '#22d3ee',
        badge_card_rotate: -8,
        badge_card_tx: -30,
        badge_card_ty: 10,
        badge_tilt_sens: 12,
        badge_show_float: true,
        badge_float_scale: 100,
      };
    } else if (presetName === 'minimal') {
      config = {
        badge_photo_width_ratio: 2.2,
        badge_photo_radius: 100,
        badge_photo_scale: 100,
        badge_photo_x_offset: 0,
        badge_photo_y_offset: 0,
        badge_name_size: 32,
        badge_name_line_height: 36,
        badge_eng_size: 14,
        badge_label_size: 9,
        badge_value_size: 13,
        badge_telemail_size: 13,
        badge_card_height: 700,
        badge_card_width: 360,
        badge_card_padding: 20,
        badge_card_bg: '#18181b',
        badge_card_back_bg: '#ec4899',
        badge_card_rotate: -12,
        badge_card_tx: -40,
        badge_card_ty: 20,
        badge_tilt_sens: 20,
        badge_show_float: false,
        badge_float_scale: 100,
      };
    } else if (presetName === 'bigPhoto') {
      config = {
        badge_photo_width_ratio: 1.5,
        badge_photo_radius: 16,
        badge_photo_scale: 115,
        badge_photo_x_offset: 0,
        badge_photo_y_offset: -12,
        badge_name_size: 36,
        badge_name_line_height: 40,
        badge_eng_size: 18,
        badge_label_size: 10,
        badge_value_size: 15,
        badge_telemail_size: 14,
        badge_card_height: 780,
        badge_card_width: 420,
        badge_card_padding: 30,
        badge_card_bg: '#141414',
        badge_card_back_bg: '#fb923c',
        badge_card_rotate: -20,
        badge_card_tx: -60,
        badge_card_ty: 24,
        badge_tilt_sens: 18,
        badge_show_float: true,
        badge_float_scale: 110,
      };
    }

    setPhotoWidthRatio(config.badge_photo_width_ratio);
    setPhotoRadius(config.badge_photo_radius);
    setPhotoScale(config.badge_photo_scale);
    setPhotoXOffset(config.badge_photo_x_offset);
    setPhotoYOffset(config.badge_photo_y_offset);
    setNameSize(config.badge_name_size);
    setNameLineHeight(config.badge_name_line_height);
    setEngNameSize(config.badge_eng_size);
    setLabelSize(config.badge_label_size);
    setValueSize(config.badge_value_size);
    setTelEmailSize(config.badge_telemail_size);
    setCardMinHeight(config.badge_card_height);
    setCardWidth(config.badge_card_width);
    setCardPadding(config.badge_card_padding);
    setBadgeBg(config.badge_card_bg);
    setBackBadgeBg(config.badge_card_back_bg);
    setCardRotateOffset(config.badge_card_rotate);
    setCardTranslateX(config.badge_card_tx);
    setCardTranslateY(config.badge_card_ty);
    setTiltSensitivity(config.badge_tilt_sens);
    setShowFloatingIcons(config.badge_show_float);
    setFloatScale(config.badge_float_scale);

    Object.entries(config).forEach(([key, val]) => {
      localStorage.setItem(key, val!.toString());
    });
  };

  // Clean empty effect with auto-saving to workspace disk
  React.useEffect(() => {
    const config: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('badge_') || key.startsWith('resume_') || key.startsWith('welcome_'))) {
        config[key] = localStorage.getItem(key);
      }
    }
    if (Object.keys(config).length > 0) {
      fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })
      .then(res => res.json())
      .then(data => console.log('Config autosaved successfully on server:', data))
      .catch(err => console.error('Failed to autosave config:', err));
    }
  }, []);

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
                            alt="Rye Xu Personal Portrait"
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
                            translate="no"
                            className={`notranslate font-sans font-black text-white block select-none mb-1 outline-none rounded px-1 transition-colors whitespace-pre-line ${showTunerPanels ? 'cursor-text hover:bg-white/5' : ''}`}
                            style={{ fontSize: `${nameSize}px`, lineHeight: `${nameLineHeight}px` }}
                            contentEditable={showTunerPanels}
                            suppressContentEditableWarning={showTunerPanels ? true : undefined}
                            onBlur={(e) => {
                              if (!showTunerPanels) return;
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
                            translate="no"
                            className={`notranslate font-mono text-neutral-400 font-semibold block uppercase tracking-tight select-none outline-none rounded px-1 transition-colors ${showTunerPanels ? 'cursor-text hover:bg-white/5' : ''}`}
                            style={{ fontSize: `${engNameSize}px` }}
                            contentEditable={showTunerPanels}
                            suppressContentEditableWarning={showTunerPanels ? true : undefined}
                            onBlur={(e) => {
                              if (!showTunerPanels) return;
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
                              className={`font-sans font-extrabold tracking-tight block px-1.5 py-0.5 select-none outline-none rounded-md transition-colors ${showTunerPanels ? 'cursor-text hover:bg-white/5' : ''}`}
                              style={{ fontSize: `${valueSize}px`, color: backBadgeBg }}
                              contentEditable={showTunerPanels}
                              suppressContentEditableWarning={showTunerPanels ? true : undefined}
                              onBlur={(e) => {
                                if (!showTunerPanels) return;
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
                              className={`font-mono font-bold text-neutral-300 block select-none outline-none rounded-md transition-colors ${showTunerPanels ? 'cursor-text hover:bg-white/5' : ''}`}
                              style={{ fontSize: `${valueSize}px` }}
                              contentEditable={showTunerPanels}
                              suppressContentEditableWarning={showTunerPanels ? true : undefined}
                              onBlur={(e) => {
                                if (!showTunerPanels) return;
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
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </motion.div>
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
                      {exp.role} {exp.company && <span className="font-sans font-normal" style={{ fontSize: '16px', marginLeft: '20px', color: '#333333' }}>@ {exp.company}</span>}
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
 
    </section>
  );
}
