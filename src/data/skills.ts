import { Skill } from '../types';

export const SKILLS_DB: Skill[] = [
  { name: 'React', icon: 'react', category: 'frontend', color: '#61DAFB', aliases: ['reactjs', 'react.js'] },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', color: '#000000', aliases: ['next', 'nextjs'] },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', color: '#3178C6', aliases: ['ts', 'typescript'] },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', color: '#F7DF1E', aliases: ['js', 'javascript'] },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend', color: '#06B6D4', aliases: ['tailwind', 'tw'] },
  { name: 'HTML', icon: 'html5', category: 'frontend', color: '#E34F26', aliases: ['html'] },
  { name: 'CSS', icon: 'css3', category: 'frontend', color: '#1572B6', aliases: ['css'] },
  { name: 'Vue', icon: 'vuejs', category: 'frontend', color: '#4FC08D', aliases: ['vuejs', 'vue.js'] },
  
  { name: 'Node.js', icon: 'nodejs', category: 'backend', color: '#339933', aliases: ['node', 'nodejs'] },
  { name: 'Python', icon: 'python', category: 'backend', color: '#3776AB', aliases: ['py', 'python'] },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database', color: '#4169E1', aliases: ['postgres', 'postgresql'] },
  { name: 'MongoDB', icon: 'mongodb', category: 'database', color: '#47A248', aliases: ['mongo', 'mongodb'] },
  { name: 'Supabase', icon: 'supabase', category: 'backend', color: '#3ECF8E', aliases: ['supabase'] },
  { name: 'Firebase', icon: 'firebase', category: 'backend', color: '#FFCA28', aliases: ['firebase'] },
  { name: 'Prisma', icon: 'prisma', category: 'backend', color: '#2D3748', aliases: ['prisma'] },
  { name: 'Express', icon: 'express', category: 'backend', color: '#000000', aliases: ['expressjs'] },
  
  { name: 'Git', icon: 'git', category: 'tools', color: '#F05032', aliases: ['git'] },
  { name: 'Docker', icon: 'docker', category: 'tools', color: '#2496ED', aliases: ['docker'] },
  { name: 'Figma', icon: 'figma', category: 'tools', color: '#F24E1E', aliases: ['figma'] },
  { name: 'Linux', icon: 'linux', category: 'tools', color: '#FCC624', aliases: ['linux'] },
  { name: 'VS Code', icon: 'vscode', category: 'tools', color: '#007ACC', aliases: ['vscode'] },
  
  { name: 'OpenAI', icon: 'openai', category: 'ai', color: '#412991', aliases: ['gpt', 'openai'] },
  { name: 'PyTorch', icon: 'pytorch', category: 'ai', color: '#EE4C2C', aliases: ['pytorch'] },
  { name: 'TensorFlow', icon: 'tensorflow', category: 'ai', color: '#FF6F00', aliases: ['tf', 'tensorflow'] },
];
