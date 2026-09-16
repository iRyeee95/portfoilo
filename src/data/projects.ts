import { Project, ProjectCategory, DesignerProfile } from '../types';

// =========================================================================
// 【第三屏 - 主屏核心文字全局配置 / SCREEN 3 - MAIN SCREEN CENTRAL TEXT CONFIG】
// 您可以直接在此处修改第三屏主屏的大标题和右侧动作按钮的文本案本。
// =========================================================================
export const thirdScreenConfig = {
  // 左侧艺术宣言巨型标题第一行 / Main Headline Line 1
  mainTitleLine1: '项目经历',
  
  // 左侧艺术宣言巨型标题第二行 / Main Headline Line 2 (支持中文或英文)
  mainTitleLine2: 'PROJECT EXPERIENCE',
  
  // 右侧探讨合作按钮文本 / CTA Inquiry Link text
  ctaText: 'EXPLORE ALL ARCHIVES / 浏览全部作品'
};

export const projects: Project[] = [
  {
    id: 'nordmuseet',
    title: '新春运营活动',
    subtitle: '商业节点运营活动视觉企划',
    category: ProjectCategory.Branding,
    imageUrl: '/project1_cover.png',
    fallbackUrl: '/cny.png',
    client: '元气桌面 贺岁企划',
    year: '2025',
    role: 'Art Director & Lead Illustrator',
    services: ['运营活动主视觉企划', '3D黏土角色渲染', '全链路商业节点物料', '社交媒体宣发物料'],
    challenge: '如何围绕新春节点打造高辨识度、亲和力强且符合年轻用户审美的运营主视觉，并构建完整的节点活动视觉链路。',
    solution: '企划并渲染高精度3D新春角色与主视觉KV，统一节日色彩与光影材质质感，建立高转化动线的节点运营物料体系。',
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
    detailImageUrl: '/project1_detail.jpg?v=20260915_r1',
    detailVideoUrls: [
      '/cny_video_1.mp4?v=20260616_v5',
      '/cny_video_2.mp4?v=20260616_v5'
    ],
    detailVideoPosition: 'overlay',
    detailVideoConfig: {
      mode: 'pixels',
      pxTop: 16460,
      pxWidth: 462,
      pxHeight: 1000,
      pxGap: 40,
      pxLeft: 50,
      videoRadius: 28
    }
  },
  {
    id: 'swisschronicle',
    title: '壁纸编辑器2.0视觉升级',
    subtitle: '围绕内容发现、编辑创作与素材体系的视觉升级',
    category: ProjectCategory.Editorial,
    imageUrl: '/project2_cover.png',
    fallbackUrl: '/desktop.png',
    client: 'YUAN QI WALLPAPER EDITOR',
    year: '2024',
    role: 'Senior Visual & System Designer',
    services: ['编辑器架构视觉重塑', '内容发现流重构', '创作工具界面精细化', '素材系统规范化'],
    challenge: '围绕内容发现、编辑创作与素材体系进行全方位视觉升级，平衡复杂专业创作功能与轻量易用的视觉交互感知。',
    solution: '重构深色系技术感界面与黄金比例排版，建立模块化素材与工具面板规范，大幅降低创作者认知负荷。',
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
    detailImageUrl: '/project2_detail.jpg'
  },
  {
    id: 'channelgrowth',
    title: '渠道推广视觉设计',
    subtitle: '以差异化视觉连接品牌合作、内容传播与用户转化',
    category: ProjectCategory.Branding,
    imageUrl: '/project3_cover.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    client: '全域应用渠道合作',
    year: '2024',
    role: 'Senior Visual Designer',
    services: ['渠道推广视觉矩阵', '品牌跨界合作KV', '应用商店转化优化', '多平台差异化物料'],
    challenge: '以差异化视觉连接品牌合作、内容传播与用户转化，针对不同渠道把控平台特性并重构展示层级，解决传统展示焦点涣散痛点。',
    solution: '搭建渠道精细化展示矩阵与关键转化漏斗视觉动线，直接带动核心渠道转化率（CVR）实现 11.6% 的显著跃升。',
    designSystem: {
      primaryColor: '#2563EB',
      secondaryColor: '#10B981',
      fontPairing: {
        heading: 'Space Grotesk',
        body: 'Inter'
      },
      colorPalette: [
        { name: 'Channel Cobalt', hex: '#2563EB' },
        { name: 'Growth Emerald', hex: '#10B981' },
        { name: 'Deep Space', hex: '#0F172A' },
        { name: 'Clean White', hex: '#FFFFFF' }
      ],
      specifications: {
        grid: 'Modular Multi-channel Layout',
        ratio: '16:10 Horizontal Balance',
        direction: 'Precision Metrics, High-conversion Focus'
      }
    },
    processImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    detailImageUrl: '/project3_detail.jpg'
  },
  {
    id: 'aethercouture',
    title: '移动端视觉升级',
    subtitle: '从内容浏览到主题应用的移动端视觉体验升级',
    category: ProjectCategory.Digital,
    imageUrl: '/project4_cover.png',
    fallbackUrl: '/mobile.png',
    client: '移动端美学与主题生态',
    year: '2025',
    role: 'Lead Dynamic Interactive Illustrator',
    services: ['移动端视觉升级', '响应式布局适配', '主题生态规范', '交互微动效设计'],
    challenge: '从内容浏览到主题应用的移动端视觉体验升级，打破移动端垂直视口局限，在多样化屏幕与机型上保持一致的高品质质感。',
    solution: '建立移动端安全区与动态适配规范，打造沉浸式内容浏览流与细腻微交互，全面提升用户探索深度与转化。',
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
    detailImageUrl: '/project4_detail.jpg'
  },
  {
    id: 'fluidchrome',
    title: '品牌IP角色设计',
    subtitle: '从品牌基因提取到角色设定与商业场景延展',
    category: ProjectCategory.Artwork_3D,
    imageUrl: '/project5_cover.png',
    fallbackUrl: '/aigc.png',
    client: '品牌IP美学实验室',
    year: '2024',
    role: '3D Art Director & Conceptual Creator',
    services: ['品牌基因提取', '角色造型设定', '高精3D建模渲染', '商业场景多维延展'],
    challenge: '从品牌基因提取到角色设定与商业场景延展，让扁平的品牌符号蜕变为富有生机、亲和力与商业延展力的三维IP形象。',
    solution: '提取品牌标志性色彩与形态特征，塑造饱满的三维角色形态与质感表达，延展全套商业场景与节庆视觉体系。',
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
    detailImageUrl: '/project5_detail.jpg'
  },
  {
    id: 'motiondynamic',
    title: '马年新春主视觉',
    subtitle: '从角色设定、场景构建到商业主视觉的AIGC实践',
    category: ProjectCategory.Artwork_3D,
    imageUrl: '/project6_cover.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    client: '马年新春AIGC商业视觉企划',
    year: '2025 - 2026',
    role: 'AIGC Art Director & Visual Lead',
    services: ['马年商业主视觉KV', 'AIGC角色与场景构建', '高精度工作流落地', '跨端商业物料应用'],
    challenge: '从角色设定、场景构建到商业主视觉的AIGC实践，探索前沿生成式AI工作流在商业高精度大画幅视觉中的精准落地与品控把关。',
    solution: '融合前沿AIGC模型、LoRA微调与精准重绘管线，构建兼具生肖文化气韵与未来先锋视觉感的马年新春商业主视觉。',
    designSystem: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#E1FF39',
      fontPairing: {
        heading: 'Outfit',
        body: 'JetBrains Mono'
      },
      colorPalette: [
        { name: 'Vibrant Violet', hex: '#8B5CF6' },
        { name: 'Fluorescent Lime', hex: '#E1FF39' },
        { name: 'Carbon Black', hex: '#121212' },
        { name: 'Smoke Gray', hex: '#E5E7EB' }
      ],
      specifications: {
        grid: 'Dynamic Physics Grid',
        ratio: '16:10 Cinematic Motion',
        direction: 'Complex Particle Sim, High-framerate Physics'
      }
    },
    processImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    detailImageUrl: '/project6_detail.jpg'
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
