import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { name, role, vibe, bio, skills, isSeniorMode, isInvestorMode } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a structured fallback
      return NextResponse.json(getFallback(name, role, vibe, skills));
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt = `You are a high-end personal branding expert for developers. 
    Your goal is to transform raw developer data into a "GitHub Persona OS" package.
    
    Output MUST be a valid JSON object with these keys:
    - personaName: (A creative title like "The Silent Architect" or "The Rapid Disrupter")
    - tagline: (A punchy one-liner)
    - archetype: (One of: Builder, Hacker, Startup Mindset, AI Engineer, Creative Coder)
    - strengths: (3 powerful bullets)
    - philosophy: (A deep coding philosophy line)
    - readme: (A full GitHub README.md in high-quality markdown)
    - twitterBio: (Max 160 chars, punchy)
    - linkedinAbout: (Professional storytelling format)
    - developerCard: (A JSON object with persona, vibe, strengths, archetype)
    - roast: (A light-hearted but sharp roast of their profile)

    Rules:
    - No generic AI filler.
    - If isSeniorMode is true, make the tone more authoritative and architectural.
    - If isInvestorMode is true, emphasize scale, ROI, and disruption.
    - Adapt tone strictly to the vibe: ${vibe}.
    - Ensure README has sections: Hero, About, Categorized Skills, Philosophy, and a Signature.`;

    const userPrompt = `
    Name: ${name}
    Role: ${role}
    Bio: ${bio}
    Skills: ${skills}
    Senior Mode: ${isSeniorMode}
    Investor Mode: ${isInvestorMode}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Use a better model for structured output
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(content);
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: "Failed to generate persona" }, { status: 500 });
  }
}

function getFallback(name: string, role: string, vibe: string, skills: string) {
  return {
    personaName: `The ${vibe.charAt(0).toUpperCase() + vibe.slice(1)} ${role.split(' ').pop()}`,
    tagline: `Building the future with ${skills.split(',')[0]} and determination.`,
    archetype: "Builder",
    strengths: ["Clean Code", "Scalability", "Innovation"],
    philosophy: "Code is poetry, but performance is reality.",
    readme: `# 👋 Hello, I'm ${name}\n### ${role}\n\nI turn complex problems into elegant solutions.`,
    twitterBio: `${role} | Building cool stuff with ${skills.split(',').slice(0, 2).join(', ')}.`,
    linkedinAbout: `I am a ${role} dedicated to crafting high-quality software...`,
    developerCard: { persona: "Fallback Persona", vibe, strengths: ["Logic", "Speed"], archetype: "Builder" },
    roast: "You haven't provided an OpenAI API key, so you get this generic compliment instead."
  };
}
