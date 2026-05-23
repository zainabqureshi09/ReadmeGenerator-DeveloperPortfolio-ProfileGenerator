export type PersonalityVibe = 
  | 'professional' 
  | 'funny' 
  | 'savage' 
  | 'hacker' 
  | 'startup'
  | 'ai-engineer'
  | 'cyberpunk'
  | 'minimalist';

export type Archetype = 
  | 'The Architect'
  | 'The Rogue Hacker'
  | 'The Startup Founder'
  | 'The AI Specialist'
  | 'The Creative Coder'
  | 'The Performance Ninja';

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'database' | 'ai' | 'other';
  color: string;
  aliases: string[];
}

export interface UserData {
  name: string;
  username: string;
  role: string;
  bio: string;
  skills: string;
  vibe: PersonalityVibe;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  archetype: Archetype;
  isSeniorMode?: boolean;
  isInvestorMode?: boolean;
  theme?: string;
}

export interface GeneratedAssets {
  readme: string;
  twitterBio: string;
  linkedinAbout: string;
  personaName: string;
  tagline: string;
  philosophy: string;
  strengths: string[];
  roast: string;
  signature: string;
  auraScore: number;
}

export interface PersonaProfile extends GeneratedAssets {
  userData: UserData;
}
