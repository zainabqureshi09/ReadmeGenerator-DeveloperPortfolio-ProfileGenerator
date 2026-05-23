import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Copy, Download, Eye, FileCode, Check, MessageCircle, UserCircle, CreditCard, Flame, Share2 } from 'lucide-react';
import { useClipboard } from '@/hooks/use-clipboard';
import { downloadFile, cn } from '@/lib/utils';
import { DevCard } from './DevCard';

interface PreviewProps {
  profile: PersonaProfile;
}

type Tab = 'readme' | 'twitter' | 'linkedin' | 'card';

export const Preview = ({ profile }: PreviewProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('readme');
  const [view, setView] = useState<'preview' | 'raw'>('preview');
  const { copied, copy } = useClipboard();

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'readme', label: 'README', icon: FileCode },
    { id: 'card', label: 'Identity Card', icon: CreditCard },
    { id: 'twitter', label: 'Twitter Bio', icon: MessageCircle },
    { id: 'linkedin', label: 'LinkedIn About', icon: UserCircle },
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'readme': return profile.readme;
      case 'twitter': return profile.twitterBio;
      case 'linkedin': return profile.linkedinAbout;
      case 'card': return JSON.stringify({
        persona: profile.personaName,
        archetype: profile.userData.archetype,
        strengths: profile.strengths,
        aura: profile.auraScore
      }, null, 2);
      default: return '';
    }
  };

  const getThemeStyles = () => {
    switch (profile.userData.theme) {
      case 'purple': return "from-purple-900/20 to-zinc-950 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.1)]";
      case 'cyberpunk': return "from-yellow-900/20 to-zinc-950 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]";
      case 'matrix': return "from-emerald-900/20 to-zinc-950 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]";
      case 'minimal': return "from-zinc-800/20 to-zinc-950 border-zinc-700 shadow-none";
      default: return "from-blue-900/20 to-zinc-950 border-zinc-800/60";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest border",
              profile.userData.theme === 'cyberpunk' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" : "bg-zinc-800 text-zinc-400 border-zinc-700"
            )}>
              Identity Generated
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{profile.personaName}</h2>
          <p className="text-blue-400/80 font-medium text-sm">{profile.tagline}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Sync Status</div>
            <div className="text-xs font-mono text-emerald-500">ENCRYPTED</div>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Aura</span>
            <span className="text-sm font-black text-blue-500">{profile.auraScore}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-px">
        <div className="flex bg-zinc-900/40 p-1 rounded-xl border border-zinc-800/50 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                  isActive 
                    ? "bg-zinc-800 text-white shadow-lg border border-zinc-700" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-800 bg-zinc-900/50" onClick={() => copy(getActiveContent())}>
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            <span className="ml-2 hidden sm:inline text-xs font-bold uppercase tracking-wider">{copied ? "Copied" : "Copy"}</span>
          </Button>
          {activeTab === 'readme' && (
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-800 bg-zinc-900/50" onClick={() => downloadFile(profile.readme, 'README.md')}>
              <Download size={14} />
              <span className="ml-2 hidden sm:inline text-xs font-bold uppercase tracking-wider">Export</span>
            </Button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <Card className={cn(
        "min-h-[500px] overflow-hidden p-0 border bg-gradient-to-br backdrop-blur-xl transition-all duration-500",
        getThemeStyles()
      )}>
        <div className="h-full overflow-y-auto max-h-[70vh] scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'readme' ? (
                <div className="prose prose-invert prose-blue max-w-none prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {profile.readme}
                  </ReactMarkdown>
                </div>
              ) : activeTab === 'card' ? (
                <div className="space-y-12 py-6">
                  <DevCard profile={profile} />
                  
                  <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                        Core Strengths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.strengths.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/5 border border-blue-500/10 text-blue-400 rounded-lg text-[10px] font-bold uppercase tracking-tight">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-purple-500" />
                        Philosophy
                      </h4>
                      <p className="text-zinc-400 italic text-sm leading-relaxed">
                        "{profile.philosophy}"
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto py-12">
                  <div className="relative p-10 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      {activeTab === 'twitter' ? <Share2 size={80} /> : <UserCircle size={80} />}
                    </div>
                    <p className="relative text-xl text-zinc-200 leading-relaxed whitespace-pre-wrap font-medium">
                      {getActiveContent()}
                    </p>
                    <div className="mt-8 flex items-center gap-4 relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700" />
                      <div>
                        <div className="text-sm font-bold text-white">{profile.userData.name}</div>
                        <div className="text-xs text-zinc-500">@{profile.userData.username}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>

      {/* Roast Section */}
      {profile.roast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-4"
        >
          <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
            <Flame size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">AI Roast</h4>
            <p className="text-zinc-400 text-sm italic">"{profile.roast}"</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
