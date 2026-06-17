export enum ProjectCategory {
  All = 'All',
  Branding = 'Branding & Identity',
  Editorial = 'Editorial Poster',
  Digital = 'Digital Craft',
  Artwork_3D = '3D & Motion Art'
}

export interface DesignSystem {
  primaryColor: string;
  secondaryColor: string;
  fontPairing: {
    heading: string;
    body: string;
  };
  colorPalette: {
    name: string;
    hex: string;
  }[];
  specifications: {
    grid: string;
    ratio: string;
    direction: string;
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  imageUrl: string;
  fallbackUrl?: string;
  client: string;
  year: string;
  role: string;
  services: string[];
  challenge: string;
  solution: string;
  designSystem: DesignSystem;
  processImages: string[];
  featured: boolean;
  detailImageUrl?: string; // Optional custom long detail image for the click preview modal
  detailImageUrls?: string[]; // Optional array of custom long detail images for the click preview modal
  detailVideoUrl?: string; // Optional custom video for the preview modal
  detailVideoUrls?: string[]; // Optional multiple overlay videos (e.g. side-by-side vertical videos)
  detailVideoPosition?: 'before' | 'after' | 'overlay'; // Position of video relative to the long image
}

export interface DesignerProfile {
  name: string;
  role: string;
  aboutText: string;
  philosophy: string;
  clients: string[];
  awards: { year: string; title: string; event: string }[];
  experience: { period: string; role: string; company: string }[];
  skills: { category: string; list: string[] }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  budget: number;
  message: string;
  timestamp: string;
}
