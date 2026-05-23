import { SKILLS_DB } from '@/data/skills';
import { Skill } from '@/types';

export function normalizeSkills(input: string): Skill[] {
  const inputSkills = input.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const matchedSkills: Skill[] = [];

  inputSkills.forEach(inputSkill => {
    const found = SKILLS_DB.find(skill => 
      skill.name.toLowerCase() === inputSkill || 
      skill.aliases.some(alias => alias.toLowerCase() === inputSkill)
    );
    if (found) {
      matchedSkills.push(found);
    } else {
      // Fallback for unknown skills
      matchedSkills.push({
        name: inputSkill.charAt(0).toUpperCase() + inputSkill.slice(1),
        icon: 'code',
        category: 'other',
        color: '#808080',
        aliases: []
      });
    }
  });

  // Remove duplicates
  return Array.from(new Set(matchedSkills.map(s => s.name)))
    .map(name => matchedSkills.find(s => s.name === name)!);
}

export function categorizeSkills(skills: Skill[]) {
  return {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    tools: skills.filter(s => s.category === 'tools'),
    database: skills.filter(s => s.category === 'database'),
    ai: skills.filter(s => s.category === 'ai'),
    other: skills.filter(s => s.category === 'other'),
  };
}
