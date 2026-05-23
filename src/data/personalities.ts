import { PersonalityVibe, Archetype } from '../types';

export interface PersonalityTemplate {
  vibe: PersonalityVibe;
  titles: string[];
  taglines: string[];
  philosophies: string[];
  roasts: string[];
  signatures: string[];
  readmeIntro: string;
  readmeOutro: string;
}

export const PERSONALITY_TEMPLATES: Record<PersonalityVibe, PersonalityTemplate> = {
  professional: {
    vibe: 'professional',
    titles: ['Senior Systems Architect', 'Principal Software Engineer', 'Strategic Solutions Developer'],
    taglines: ['Building scalable infrastructure for the modern web.', 'Engineering excellence through disciplined architecture.'],
    philosophies: ['Simplicity is the soul of efficiency.', 'Clean code is a professional requirement.'],
    roasts: ['Your commit messages are too long.', 'You probably use tabs instead of spaces.'],
    signatures: ['Best regards,', 'Sincerely,'],
    readmeIntro: 'Results-driven software engineer with a focus on scalable systems and high-performance applications.',
    readmeOutro: 'Feel free to reach out for architectural consultations or collaboration.'
  },
  hacker: {
    vibe: 'hacker',
    titles: ['System Intruder', 'Ghost in the Shell', 'Kernel Panic Specialist'],
    taglines: ['I dont sleep, I wait.', 'Breaking production since 1999.', 'Everything is a file.'],
    philosophies: ['Data is the new oil, and I have the drill.', 'If it works, break it to see how.'],
    roasts: ['You still use Windows?', 'Nice firewall, would be a shame if something happened to it.'],
    signatures: ['Stay paranoid,', 'Root access acquired,'],
    readmeIntro: 'Operating at the intersection of bits and reality. I optimize what others fear to touch.',
    readmeOutro: 'Message encrypted. Decode it to find me.'
  },
  funny: {
    vibe: 'funny',
    titles: ['Chief Procrastination Officer', 'StackOverflow Copy-Paster', 'Bug Creator'],
    taglines: ['I write code that works 60% of the time, every time.', 'Converting coffee into errors since day one.'],
    philosophies: ['Why fix it if you can just restart?', 'My code is like a joke; if I have to explain it, it’s bad.'],
    roasts: ['I’ve seen better code in a microwave.', 'Your LinkedIn bio is longer than your actual code.'],
    signatures: ['Don’t blame me,', 'Sent from my toaster,'],
    readmeIntro: 'I am here to write code and chew bubblegum. And I am all out of gum.',
    readmeOutro: 'If you find a bug, it is actually a feature.'
  },
  savage: {
    vibe: 'savage',
    titles: ['Production Terminator', 'The One Who Deploys on Friday', 'Legacy Code Executioner'],
    taglines: ['I dont fix bugs, I delete the features.', 'Your tech stack is my weekend project.'],
    philosophies: ['Speed is a feature. Your code is a bottleneck.', 'I rewrite in Rust just for fun.'],
    roasts: ['Your repos look like a digital graveyard.', 'You call it "agile," I call it "clueless."'],
    signatures: ['Deal with it,', 'Better than you,'],
    readmeIntro: 'I am the developer your manager warned you about. I ship fast and break feelings.',
    readmeOutro: 'Fork it. You wont.'
  },
  startup: {
    vibe: 'startup',
    titles: ['Founding Engineer', 'Product-Obsessed Dev', 'Growth Hacker (The Technical Kind)'],
    taglines: ['Shipping faster than your local VC can say "AI".', 'Scaling to zero and back again.'],
    philosophies: ['Done is better than perfect.', 'Users dont care about your tech stack, they care about the solution.'],
    roasts: ['Another SaaS? Truly revolutionary.', 'Let me guess, it’s a wrapper for ChatGPT?'],
    signatures: ['Onwards,', 'To the moon,'],
    readmeIntro: 'Building the next big thing with a focus on product-market fit and technical agility.',
    readmeOutro: 'Open for seed funding or interesting pivots.'
  },
  'ai-engineer': {
    vibe: 'ai-engineer',
    titles: ['Latent Space Explorer', 'Model Orchestrator', 'Token Economist'],
    taglines: ['Prompting the future into existence.', 'Fine-tuning reality, one epoch at a time.'],
    philosophies: ['Humanity is just a training set.', 'Temperature 0.7 is my sweet spot.'],
    roasts: ['You think RAG is a replacement for a brain?', 'Your context window is smaller than a goldfish’s memory.'],
    signatures: ['Loss decreasing,', 'Gradient descenting,'],
    readmeIntro: 'Specializing in LLM orchestration, vector databases, and the art of prompt engineering.',
    readmeOutro: 'Generating next response...'
  },
  cyberpunk: {
    vibe: 'cyberpunk',
    titles: ['Neon Drifter', 'Cyberdeck Architect', 'Grid Runner'],
    taglines: ['High tech, low life.', 'Scanning the perimeter for vulnerabilities.'],
    philosophies: ['The street finds its own uses for things.', 'Network is the weapon.'],
    roasts: ['Your UI looks like it’s from the 20th century.', 'Nice augments, shame about the lag.'],
    signatures: ['Stay chrome,', 'Logout imminent,'],
    readmeIntro: 'Navigating the digital sprawl. I build tools for the underground and the elite.',
    readmeOutro: 'Connection lost. System rebooting.'
  },
  minimalist: {
    vibe: 'minimalist',
    titles: ['Clean Coder', 'Abstractionist', 'Less is More Developer'],
    taglines: ['Complexity is the enemy.', 'One file to rule them all.'],
    philosophies: ['If you need a comment, your code is too complex.', 'Perfection is achieved when there is nothing left to take away.'],
    roasts: ['You have too many dependencies.', 'Why use 10 lines when 1 will do?'],
    signatures: ['Best,', 'End.'],
    readmeIntro: 'I write simple, elegant, and maintainable code. Nothing more, nothing less.',
    readmeOutro: 'EOF.'
  }
};
