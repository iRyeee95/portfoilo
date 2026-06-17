import { Project, ProjectCategory, DesignerProfile } from '../types';

// =========================================================================
// 【第三屏 - 主屏核心文字全局配置 / SCREEN 3 - MAIN SCREEN CENTRAL TEXT CONFIG】
// 您可以直接在此处修改第三屏主屏的大标题和右侧动作按钮的文本案本。
// =========================================================================
export const thirdScreenConfig = {
  // 左侧艺术宣言巨型标题第一行 / Main Headline Line 1
  mainTitleLine1: '视觉运营与内容生态构建',
  
  // 左侧艺术宣言巨型标题第二行 / Main Headline Line 2 (支持中文或英文)
  mainTitleLine2: 'Visual Operations & Content Ecosystem',
  
  // 右侧探讨合作按钮文本 / CTA Inquiry Link text
  ctaText: 'EXPLORE ALL ARCHIVES / 浏览全部作品'
};

export const projects: Project[] = [
  {
    id: 'nordmuseet',
    title: '新春活动运营',
    subtitle: '商业节点视觉企划',
    category: ProjectCategory.Branding,
    imageUrl: '/cny.png?v=20260616_v4',
    fallbackUrl: 'https://images.unsplash.com/photo-1582234479532-6804bb62b4bd?auto=format&fit=crop&w=1200&q=80',
    client: '元气桌面 贺岁企划',
    year: '2025',
    role: 'Art Director & Lead Illustrator',
    services: ['Key Visual Strategy', '3D Clay Rendering', 'New Year Campaign Design', 'Social Assets'],
    challenge: 'HOW to convey the joyful atmosphere of Chinese New Year through playful, modern, high-fidelity 3D clay figures that engage a tech-savvy user tier.',
    solution: 'Designed and rendered 5 festive Caishen character figures with vivid expressions, smooth clay textures, and bright festive colors. Established a cohesive warm color palette.',
    designSystem: {
      primaryColor: '#FF4500',
      secondaryColor: '#FFD700',
      fontPairing: {
        heading: 'Outfit',
        body: 'Inter'
      },
      colorPalette: [
        { name: 'Festive Orange-Red', hex: '#FF4500' },
        { name: 'Imperial Gold', hex: '#FFD700' },
        { name: 'Traditional Ink Black', hex: '#111111' },
         { name: 'Soft Cream', hex: '#FAF9F6' }
      ],
      specifications: {
        grid: 'Symmetric Center Layout',
        ratio: '16:10 Horizontal Balance',
        direction: 'Playful clay textures, high-fidelity lighting'
      }
    },
    processImages: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    detailImageUrl: '/cny_long.jpg?v=20260616_v5',
    detailVideoUrls: [
      '/cny_video_1.mp4?v=20260616_v5',
      '/cny_video_2.mp4?v=20260616_v5'
    ],
    detailVideoPosition: 'overlay'
  },
  {
    id: 'swisschronicle',
    title: '桌面视觉生态',
    subtitle: '千万级全链路视觉生态',
    category: ProjectCategory.Editorial,
    imageUrl: '/desktop.png?v=20260616_v4',
    fallbackUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    client: 'YUAN QI WALLPAPER EDITOR',
    year: '2024',
    role: 'Senior Poster & System Designer',
    services: ['Platform Blueprint', 'UGC Core Tool Branding', 'Interface Architecture', 'Exhibition Visuals'],
    challenge: 'Structuring a robust ecosystem for billions of user-generated desktop templates while maintaining aesthetic purity and premium tool interfaces.',
    solution: 'Designed an elegant dark mode system with golden guidelines. Kept tools highly technical, minimal, and structural, focusing layout weight on content rather than framing elements.',
    designSystem: {
      primaryColor: '#0A0A0A',
      secondaryColor: '#E2E8F0',
      fontPairing: {
        heading: 'Space Grotesk',
        body: 'JetBrains Mono'
      },
      colorPalette: [
        { name: 'Deep Space Black', hex: '#0A0A0A' },
        { name: 'Yuanqi Amber', hex: '#F59E0B' },
        { name: 'Slate Gray', hex: '#64748B' },
        { name: 'Crisp White', hex: '#FFFFFF' }
      ],
      specifications: {
        grid: 'Responsive Grid Engine',
        ratio: '16:10 Widescreen Specs',
        direction: 'Blueprint Aesthetics, Highly Technical Details'
      }
    },
    processImages: [
      'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    detailImageUrls: ['/desktop_long_1.jpg?v=20260616_v4', '/desktop_long_2.jpg?v=20260616_v4']
  },
  {
    id: 'aethercouture',
    title: '多端生态延展',
    subtitle: '移动端视觉趋势探索',
    category: ProjectCategory.Digital,
    imageUrl: '/mobile.png?v=20260616_v4',
    fallbackUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    client: '多风格美学换新与商业化赋能',
    year: '2025',
    role: 'Lead Dynamic Interactive Illustrator',
    services: ['Anime Curation', 'Responsive Layout Adaptation', 'Motion Choreography', 'Asset Production'],
    challenge: 'Translating rich, layered anime visual assets onto vertically constrained mobile screens with varying UI aspects across platforms.',
    solution: 'Created custom character safe areas. Designed soft, clean, warm-yellow-infused backdrops with high-contrast text and interactive micro-widgets.',
    designSystem: {
      primaryColor: '#FBBF24',
      secondaryColor: '#1F2937',
      fontPairing: {
        heading: 'Outfit',
        body: 'Inter'
      },
      colorPalette: [
        { name: 'Warm Yellow Citrus', hex: '#FBBF24' },
        { name: 'Charcoal Black', hex: '#1F2937' },
        { name: 'Pastel Peach Pink', hex: '#FCA5A5' },
        { name: 'Soft Creamy Ivory', hex: '#FFFBEB' }
      ],
      specifications: {
        grid: 'Mobile Flexible Layout',
        ratio: '19.5:9 Ultra Tall Mobile',
        direction: 'Bright, joyful, vibrant anime material styling'
      }
    },
    processImages: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    detailImageUrl: '/mobile_long.jpg?v=20260616_v4'
  },
  {
    id: 'fluidchrome',
    title: 'AIGC 视觉探索',
    subtitle: 'AI视觉创意落地',
    category: ProjectCategory.Artwork_3D,
    imageUrl: '/aigc.png?v=20260616_v4',
    fallbackUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    client: 'MIXUE Art Lab Study',
    year: '2024',
    role: '3D Art Director & Conceptual Creator',
    services: ['Character Design', 'AIGC Model Training', 'Environmental Rendering', 'Commercial Campaign Strategy'],
    challenge: 'Updating the traditional snowman IP to have a modern, high-contrast, stylized CGI-chilled 3D landscape look while preserving the sweet signature aesthetic.',
    solution: 'Built sweeping ice-cream terrains with warm sunlight, dynamic movement actions (e.g., snowman pulling a massive ice cream cone with physical rope guides), and highly polished textures.',
    designSystem: {
      primaryColor: '#F43F5E',
      secondaryColor: '#0EA5E9',
      fontPairing: {
        heading: 'Space Grotesk',
        body: 'JetBrains Mono'
      },
      colorPalette: [
        { name: 'Mixue Red', hex: '#F43F5E' },
        { name: 'Sky Blue Caustic', hex: '#0EA5E9' },
        { name: 'Cream Vanilla', hex: '#FFFBEB' },
        { name: 'Traffic Amber Orange', hex: '#F97316' }
      ],
      specifications: {
        grid: 'Dynamic Perspective Golden Line',
        ratio: '16:10 Panoramic Sweep',
        direction: 'High contrast gloss, sunny volumetric ambiance'
      }
    },
    processImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    detailImageUrls: ['/aigc_long_1.jpg?v=20260616_v4', '/aigc_long_2.jpg?v=20260616_v4']
  }
];

export const designerProfile: DesignerProfile = {
  name: 'XU ZIYI / 许 子熠',
  role: 'Visual Operations Director & Content Ecosystem Artisan',
  aboutText: 'I am a visual designer and platform system architect focusing on high-impact visual operations and content ecosystem design. My expertise spans large-scale wallpaper and aesthetic platform blueprinting, AIGC visual creation, high-fidelity 3D modeling/rendering, and cross-terminal dynamic layout adaptation. I craft cohesive aesthetic universes that elevate community engagement and commercial monetization across digital landscapes.',
  philosophy: 'Visuals are not merely decorative facades; they comprise the structural bones that support a thriving digital ecosystem. Rigid layout proportion, responsive adaptivity, and high-fidelity texturizing form the ultimate user experience.',
  clients: [
    'Yuanqi Wallpaper / 元气壁纸',
    'Yuanqi Desktop / 元气桌面',
    'Mixue Art Lab / 蜜雪冰城艺术实验室',
    'TapNow AI Portal',
    'Jimeng AI / 即梦 AI',
    'Aetherspace Curation'
  ],
  awards: [
    { year: '2025', title: 'Winner in Digital Content Curation', event: 'Yuanqi Creator Gala' },
    { year: '2024', title: 'Top Featured Theme Designer Selection', event: 'Mobile Interface Aesthetics' },
    { year: '2024', title: 'Gold Award in Commercial AIGC Art', event: 'Mixue Conceptual Media Festival' },
    { year: '2023', title: 'Special Recognition in System Taxonomy', event: 'Symmetric Space Design Awards' }
  ],
  experience: [
    { period: '2023 - Present', role: 'Visual Operations Director & Lead Creator', company: 'Yuanqi Desktop / Shanghai' },
    { period: '2021 - 2023', role: 'Senior Key Visual & Brand Designer', company: 'Commercial Creative Lab' },
    { period: '2019 - 2021', role: 'Interactive Illustrator & UI/UX Designer', company: 'Digital Media Bureau' }
  ],
  skills: [
    {
      category: 'Systemic Strategy',
      list: ['Visual Operations Strategy', 'Content Ecosystem Taxonomy', 'Digital Media Planning', 'Cross-Terminal Design Systems', 'UGC Platform Curation']
    },
    {
      category: 'Artistic Mediums',
      list: ['Key Visual Campaign Design', '3D Clay & Material Styling', 'Dynamic UI/UX Choreography', 'AIGC Model Training & Prompting', 'High-Fidelity Texturing & Lighting']
    },
    {
      category: 'Tools of Trade',
      list: ['Figma Expert', 'Adobe Creative Suite', 'Cinema 4D & Octane Renderer', 'Generative AI Tools (Jimeng, Midjourney)', 'Mobile Layout Adapters']
    }
  ]
};
