import { UserData, PersonaProfile, Skill, GeneratedAssets } from '@/types';
import { PERSONALITY_TEMPLATES } from '@/data/personalities';
import { normalizeSkills, categorizeSkills } from './skills';

const HACKER_ALIASES = [
  "The Bug Whisperer", "Midnight Deployer", "AI Chaos Engineer", 
  "The Latent Space Walker", "Syntax Sorcerer", "Kernel Panic", 
  "Null Pointer", "The Stack Overflower", "Git Guru", "Packet Sniffer"
];

const DEV_QUOTES = [
  "It works on my machine.",
  "Move fast and break things, then fix them in production.",
  "Commit often, regret never.",
  "Coffee: because code doesn't write itself.",
  "There's no place like 127.0.0.1",
  "Ship it 🚀",
  "Refactoring is just procrastination for engineers.",
  "I don't need a debugger, I am the debugger."
];

export function generatePersona(userData: UserData): PersonaProfile {
  const template = PERSONALITY_TEMPLATES[userData.vibe] || PERSONALITY_TEMPLATES.professional;
  const skills = normalizeSkills(userData.skills);
  const categorized = categorizeSkills(skills);
  
  const personaName = selectRandom(template.titles);
  const tagline = selectRandom(template.taglines);
  const philosophy = selectRandom(template.philosophies);
  const roast = selectRandom(template.roasts);
  const signature = selectRandom(template.signatures);
  const alias = selectRandom(HACKER_ALIASES);
  const devQuote = selectRandom(DEV_QUOTES);
  
  const strengths = [
    userData.experienceLevel === 'senior' || userData.isSeniorMode ? 'System Architecture' : 'Rapid Prototyping',
    skills.length > 3 ? 'Full-Stack Integration' : 'Focused Problem Solving',
    template.vibe === 'startup' ? 'Product-Led Growth' : 'Technical Excellence'
  ];

  if (userData.isInvestorMode) {
    strengths.push('Scalable ROI', 'Disruptive Innovation');
  }

  const readme = generateMarkdown(userData, personaName, tagline, philosophy, categorized, signature, alias);
  const twitterBio = `${personaName} | ${tagline} | ${alias} | Tech: ${skills.slice(0, 3).map(s => s.name).join(', ')}`;
  const linkedinAbout = `${template.readmeIntro}\n\n${userData.bio}\n\nCore Expertise: ${skills.map(s => s.name).join(', ')}\n\n${philosophy}\n\n${signature}\n${userData.name}`;

  const auraScore = calculateAuraScore(userData, skills);

  return {
    userData,
    personaName,
    tagline,
    philosophy,
    strengths,
    readme,
    twitterBio,
    linkedinAbout,
    roast,
    signature,
    auraScore,
    alias,
    devQuote
  };
}

function selectRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMarkdown(
  userData: UserData,
  personaName: string,
  tagline: string,
  philosophy: string,
  categorized: any,
  signature: string,
  alias: string
): string {
  const { name, username, role, vibe, isSeniorMode } = userData;
  
  let md = `<div align="center">\n\n# 👋 Hey there, I'm ${name}\n\n`;
  md += `### ${isSeniorMode ? 'Senior ' : ''}${role} | ${personaName}\n\n`;
  md += `*"${tagline}"*\n\n`;
  md += `[![${alias}](https://img.shields.io/badge/Alias-${encodeURIComponent(alias)}-blue?style=flat-square&logo=github)]()\n\n`;
  md += `</div>\n\n---\n\n`;
  
  md += `### 🛠️ What I do\n${userData.bio}\n\n`;
  
  md += `### 🚀 Tech Stack\n\n`;
  
  Object.entries(categorized).forEach(([category, items]: [string, any]) => {
    if (items.length > 0) {
      md += `**${category.charAt(0).toUpperCase() + category.slice(1)}**\n`;
      md += items.map((s: Skill) => `![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${s.color.replace('#', '')}?style=for-the-badge&logo=${s.icon}&logoColor=white)`).join(' ');
      md += '\n\n';
    }
  });

  md += `### 💡 Philosophy\n> ${philosophy}\n\n`;
  
  md += `### 📊 GitHub Stats\n<div align="center">\n\n`;
  md += `![${username}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=3b82f6&text_color=94a3b8&icon_color=3b82f6)\n`;
  md += `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=3b82f6&text_color=94a3b8)\n\n`;
  md += `</div>\n\n---\n\n`;
  md += `<div align="center">\n\n${signature}\n**${name}**\n\n</div>`;

  return md;
}

function calculateAuraScore(userData: UserData, skills: Skill[]): number {
  let score = 70;
  score += skills.length * 2;
  if (userData.isSeniorMode) score += 15;
  if (userData.vibe === 'hacker' || userData.vibe === 'savage') score += 5;
  if (userData.experienceLevel === 'senior' || userData.experienceLevel === 'lead') score += 10;
  return Math.min(score, 100);
}
