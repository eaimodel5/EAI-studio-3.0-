
import React, { useState, useRef, useEffect } from 'react';
import { Message, EAIAnalysis, MechanicalState, LearnerProfile } from '../types';
import { sendMessageToGemini, resetChatSession } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import Dashboard from './Dashboard';
import GameNeuroLinker from './GameNeuroLinker';
import ProfileSetup from './ProfileSetup';
import BootSequence from './BootSequence';
import SecretLogin from './SecretLogin';
import TechReport from './TechReport';
import {
  createInitialEAIState,
  updateStateFromAnalysis,
  validateAnalysisAgainstSSOT,
  EAIStateLike,
  quickCoreIntegrityCheck,
} from '../utils/eaiLearnAdapter';
import { getEAICore } from '../utils/ssotParser';

// --- THEME ENGINE ---
type Theme = {
    bg: string;
    sidebar: string;
    border: string;
    accent: string;
    accentText: string;
    buttonActive: string;
    bubbleUser: string;
    glow: string;
};

const THEMES: Record<string, Theme> = {
    DEFAULT: {
        bg: 'bg-[#0b1120]',
        sidebar: 'bg-[#0f172a]',
        border: 'border-slate-800',
        accent: 'bg-blue-600',
        accentText: 'text-blue-400',
        buttonActive: 'border-blue-500 bg-blue-500/10 text-blue-400',
        bubbleUser: 'bg-blue-600/10 border-blue-500/30 text-blue-100',
        glow: 'shadow-[0_0_20px_rgba(37,99,235,0.1)]'
    },
    DEVIL: {
        bg: 'bg-[#1a0505]',
        sidebar: 'bg-[#2a0a0a]',
        border: 'border-red-900',
        accent: 'bg-red-600',
        accentText: 'text-red-500',
        buttonActive: 'border-red-500 bg-red-500/10 text-red-400',
        bubbleUser: 'bg-red-600/10 border-red-500/30 text-red-100',
        glow: 'shadow-[0_0_30px_rgba(220,38,38,0.2)]'
    },
    META: {
        bg: 'bg-[#0f0a1a]',
        sidebar: 'bg-[#150f25]',
        border: 'border-violet-900',
        accent: 'bg-violet-600',
        accentText: 'text-violet-400',
        buttonActive: 'border-violet-500 bg-violet-500/10 text-violet-400',
        bubbleUser: 'bg-violet-600/10 border-violet-500/30 text-violet-100',
        glow: 'shadow-[0_0_20px_rgba(124,58,237,0.15)]'
    },
    COACH: {
        bg: 'bg-[#051a10]',
        sidebar: 'bg-[#062415]',
        border: 'border-emerald-900',
        accent: 'bg-emerald-600',
        accentText: 'text-emerald-400',
        buttonActive: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
        bubbleUser: 'bg-emerald-600/10 border-emerald-500/30 text-emerald-100',
        glow: 'shadow-[0_0_20px_rgba(5,150,105,0.15)]'
    }
};

const CYCLE_STEPS = [
    { id: 'P', label: 'Proces' },
    { id: 'TD', label: 'Taak' },
    { id: 'C', label: 'Regie' },
    { id: 'V', label: 'Skill' },
    { id: 'T', label: 'Tech' },
    { id: 'E', label: 'Epist' },
    { id: 'L', label: 'Transfer' }
];

const TAB_LABELS: Record<string, { nl: string, en: string }> = {
    START: { nl: "Start", en: "Start" },
    UITLEG: { nl: "Uitleg", en: "Instruction" },
    VERDIEPEN: { nl: "Verdiepen", en: "Deepen" },
    CONTROLE: { nl: "Controle", en: "Check" },
    REFLECTIE: { nl: "Reflectie", en: "Reflect" },
    PAUZE: { nl: "Pauze", en: "Break" }
};

const GET_TOOL_CATEGORIES = (lang: 'nl' | 'en') => {
    const isEn = lang === 'en';
    return {
        START: [
            { label: isEn ? "Set Goal" : "Mijn doel", command: "/checkin", icon: "🎯", desc: isEn ? "Clarify our session aim" : "Bepaal wat we gaan doen", mode: "COACH" },
            { label: isEn ? "Ask Question" : "Kernvraag", command: "/leervraag", icon: "💡", desc: isEn ? "Define the main problem" : "Stel de belangrijkste vraag", mode: "DEFAULT" },
            { label: isEn ? "Where am I?" : "Mijn fase", command: "/fase_check", icon: "📍", desc: isEn ? "Check our progress" : "Kijk hoever we al zijn", mode: "DEFAULT" },
        ],
        UITLEG: [
            { label: isEn ? "Visualize" : "Maak beeld", command: "/beeld", icon: "🖼️", desc: isEn ? "Show me a metaphor" : "Vraag om een beeld", mode: "DEFAULT" },
            { label: isEn ? "Structure" : "Overzicht", command: "/schema", icon: "📑", desc: isEn ? "Create a clear map" : "Zet de info in een schema", mode: "DEFAULT" },
            { label: isEn ? "Step by Step" : "Stappenplan", command: "/vocab", icon: "🪜", desc: isEn ? "Break it down" : "Help me met de stappen", mode: "DEFAULT" },
        ],
        VERDIEPEN: [
            { label: isEn ? "Challenge" : "Daag me uit", command: "/devil", icon: "🔥", desc: isEn ? "Devil's Advocate" : "Kritische vragen over mijn werk", mode: "DEVIL" },
            { label: isEn ? "Flip view" : "Draai het om", command: "/twist", icon: "🔄", desc: isEn ? "Change perspective" : "Bekijk het van de andere kant", mode: "DEVIL" },
            { label: isEn ? "Compare" : "Vergelijk", command: "/ref", icon: "⚖️", desc: isEn ? "Find differences" : "Zoek overeenkomsten", mode: "DEVIL" },
        ],
        CONTROLE: [
            { label: isEn ? "Quiz me" : "Korte Quiz", command: "/quizgen", icon: "✍️", desc: isEn ? "Test my knowledge" : "Test even of ik het snap", mode: "COACH" },
            { label: isEn ? "Summarize" : "Samenvatting", command: "/beurtvraag", icon: "📝", desc: isEn ? "I'll explain back" : "Ik leg het in mijn eigen woorden uit", mode: "COACH" },
            { label: isEn ? "Apply" : "Toepassen", command: "/transfeer", icon: "🚀", desc: isEn ? "Use in real life" : "Kan ik dit ook ergens anders?", mode: "COACH" },
        ],
        REFLECTIE: [
            { label: isEn ? "Helicopter" : "Helikopter", command: "/meta", icon: "🚁", desc: isEn ? "Think about learning" : "Hoe gaat het leren eigenlijk?", mode: "META" },
            { label: isEn ? "Self-check" : "Zelf-check", command: "/rubric", icon: "📊", desc: isEn ? "Rate my own work" : "Scoor jezelf op criteria", mode: "META" },
            { label: isEn ? "Final" : "Eindoordeel", command: "/afsluiter", icon: "🏁", desc: isEn ? "Wrap up" : "Mijn belangrijkste leerpunt", mode: "META" },
        ],
        PAUZE: [
            { label: isEn ? "Break" : "Brein-Pauze", command: "GAME_NEURO", icon: "🎮", desc: isEn ? "Cognitive Reset" : "Even een korte game-break", mode: "DEFAULT" },
        ]
    };
};

type ToolCategoryKey = 'START' | 'UITLEG' | 'VERDIEPEN' | 'CONTROLE' | 'REFLECTIE' | 'PAUZE';
type MobileTab = 'chat' | 'dashboard' | 'tools';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ToolCategoryKey>('START');
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('chat');
  const [isTabSwitching, setIsTabSwitching] = useState(false);
  const [isDesktopDashboardOpen, setDesktopDashboardOpen] = useState(false);
  const [isToolboxOpen, setToolboxOpen] = useState(false); 
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.DEFAULT);
  const [showGame, setShowGame] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [showSecretLogin, setShowSecretLogin] = useState(false);
  const [showTechReport, setShowTechReport] = useState(false);
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [currentAnalysis, setCurrentAnalysis] = useState<EAIAnalysis | null>(null);
  const [currentMechanical, setCurrentMechanical] = useState<MechanicalState | null>(null);
  const [eaiState, setEaiState] = useState<EAIStateLike>(() => createInitialEAIState());
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>({
      name: null, subject: null, level: null, grade: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toolboxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (activeMobileTab === 'chat' || window.innerWidth >= 1024) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeMobileTab]);

  useEffect(() => {
    if (currentTheme !== THEMES.DEFAULT) {
        const timer = setTimeout(() => setCurrentTheme(THEMES.DEFAULT), 5000);
        return () => clearTimeout(timer);
    }
  }, [currentTheme]);

  const updateTheme = (command: string) => {
      let newMode = 'DEFAULT';
      const tools = Object.values(GET_TOOL_CATEGORIES(language)).flat();
      tools.forEach(tool => {
          if (tool.command === command) newMode = tool.mode;
      });
      setCurrentTheme(THEMES[newMode as keyof typeof THEMES] || THEMES.DEFAULT);
  };

  const handleMobileTabSwitch = (tab: MobileTab) => {
      if (activeMobileTab === tab) return;
      setIsTabSwitching(true);
      setTimeout(() => {
          setActiveMobileTab(tab);
          setTimeout(() => setIsTabSwitching(false), 100);
      }, 500);
  };

  const handleResetSession = () => {
      setMessages([]);
      setCurrentAnalysis(null);
      setCurrentMechanical(null);
      setEaiState(createInitialEAIState());
      setCurrentTheme(THEMES.DEFAULT);
      setToolboxOpen(false);
      setShowProfileSetup(true);
      resetChatSession();
      setActiveMobileTab('chat');
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (textToSend === 'GAME_NEURO') { setShowGame(true); setToolboxOpen(false); return; }
    if (!textToSend.trim() || isLoading) return;

    if (activeMobileTab !== 'chat') handleMobileTabSwitch('chat');
    if (textOverride) { updateTheme(textOverride); setToolboxOpen(false); }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: textToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMessage.text, language);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: new Date(),
        analysis: response.analysis,
        mechanical: response.mechanical,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setCurrentAnalysis(response.analysis);
      setCurrentMechanical(response.mechanical);
      setEaiState(prev => updateStateFromAnalysis(prev, response.analysis, response.mechanical));

      if (response.analysis.current_profile) {
          const np = response.analysis.current_profile;
          setLearnerProfile(prev => ({ ...prev, ...np }));
      }
    } catch (error) {
      const errorText = language === 'en' ? "Critical Connection Failure." : "Kritieke verbindingsfout.";
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'model', text: errorText, timestamp: new Date(), isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toolCategories = GET_TOOL_CATEGORIES(language);

  return (
    <div className={`flex h-screen ${currentTheme.bg} text-slate-200 overflow-hidden font-sans transition-colors duration-[2000ms] relative`}>
      {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      <ProfileSetup 
        isOpen={!isBooting && showProfileSetup} 
        onComplete={(p, goal) => { setLearnerProfile(p); setShowProfileSetup(false); handleSendMessage(goal); }} 
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
        currentProfile={learnerProfile}
      />
      {showGame && <GameNeuroLinker onClose={() => setShowGame(false)} />}
      {showSecretLogin && <SecretLogin onSuccess={() => { setShowSecretLogin(false); setShowTechReport(true); }} onCancel={() => setShowSecretLogin(false)} />}
      {showTechReport && <TechReport onClose={() => setShowTechReport(false)} />}

      <div className={`flex-1 flex flex-col min-w-0 ${currentTheme.bg} relative ${activeMobileTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
        <div className={`h-16 border-b ${currentTheme.border} flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 bg-opacity-90 backdrop-blur-md ${currentTheme.sidebar} transition-colors duration-[2000ms]`}>
            {/* Branding & Status */}
            <div className="flex items-center gap-4 cursor-pointer select-none" onDoubleClick={() => setShowSecretLogin(true)}>
                <div className={`w-8 h-8 ${currentTheme.accent} rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-lg`}>EAI</div>
                <div className="flex flex-col">
                    <span className="font-bold text-base text-white tracking-tight">EAI Studio <span className="text-xs font-mono opacity-50 font-normal">3.2</span></span>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className={`font-mono text-[10px] uppercase tracking-wider ${currentTheme.accentText}`}>System Online</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setLanguage(l => l === 'nl' ? 'en' : 'nl')} 
                    className="text-[10px] font-bold px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/10 uppercase transition-colors"
                >
                    {language}
                </button>
                
                <div className="h-6 w-px bg-white/10 hidden sm:block mx-1"></div>

                <button onClick={() => setDesktopDashboardOpen(!isDesktopDashboardOpen)} className={`hidden lg:flex p-2 rounded-lg transition-colors ${isDesktopDashboardOpen ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
                </button>
                <button onClick={handleResetSession} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all" title="Reset Session">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide pb-24" onClick={() => setToolboxOpen(false)}>
             <div className="max-w-3xl mx-auto space-y-6">
                {messages.length === 0 && !showProfileSetup && (
                     <div className="flex flex-col items-center justify-center h-64 text-slate-600 opacity-40 select-none">
                         <span className="text-6xl mb-4 grayscale">💠</span>
                         <span className="text-xs font-mono tracking-[0.3em]">NEURAL UPLINK STANDBY</span>
                     </div>
                )}
                {messages.map((msg) => <MessageBubble key={msg.id} message={msg} themeClasses={currentTheme.bubbleUser} />)}
                {isLoading && (
                    <div className="flex items-center gap-3 text-slate-500 animate-pulse pl-4">
                         <div className={`w-1.5 h-1.5 ${currentTheme.accent} rounded-full`}></div>
                         <div className={`w-1.5 h-1.5 ${currentTheme.accent} rounded-full animation-delay-200`}></div>
                         <div className={`w-1.5 h-1.5 ${currentTheme.accent} rounded-full animation-delay-400`}></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
             </div>
        </div>

        <div className="p-4 lg:p-6 z-30 mb-16 lg:mb-0">
            <div className="max-w-3xl mx-auto relative">
                <div ref={toolboxRef} className={`hidden lg:flex absolute bottom-full left-0 right-0 mb-3 bg-[#1e293b]/95 backdrop-blur-xl border ${currentTheme.border} rounded-xl shadow-2xl transition-all duration-300 overflow-hidden flex-col ${isToolboxOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8 pointer-events-none'}`}>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{language === 'en' ? 'Didactic Toolbox' : 'Didactische Toolbox'}</span>
                        <button onClick={() => setToolboxOpen(false)} className="text-slate-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                    <div className="flex gap-1 overflow-x-auto scrollbar-hide p-2 bg-black/10">
                        {Object.keys(toolCategories).map((cat) => (
                            <button key={cat} onClick={() => setActiveTab(cat as ToolCategoryKey)} className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${activeTab === cat ? `${currentTheme.accent} text-white shadow-lg` : 'text-slate-500 hover:bg-white/5'}`}>{TAB_LABELS[cat][language]}</button>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 p-3 max-h-64 overflow-y-auto scrollbar-hide">
                        {toolCategories[activeTab].map((tool) => (
                            <button key={tool.command} onClick={() => handleSendMessage(tool.command)} className={`flex flex-col items-start p-3 rounded-lg border transition-all text-left bg-white/5 ${currentTheme.border} hover:bg-white/10 active:scale-95 group`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">{tool.icon}</span>
                                    <span className="text-[10px] font-bold text-slate-200 group-hover:text-white uppercase tracking-tighter">{tool.label}</span>
                                </div>
                                <span className="text-[9px] text-slate-500 leading-tight">{tool.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`flex items-center gap-2 bg-black/40 border ${currentTheme.border} rounded-xl p-2 shadow-lg backdrop-blur-md transition-all duration-500`}>
                    <button onClick={() => setToolboxOpen(!isToolboxOpen)} className={`hidden lg:block p-3 rounded-lg transition-all ${isToolboxOpen ? currentTheme.accent + ' text-white rotate-45' : 'bg-slate-800 text-slate-500'}`}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                    </button>
                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={language === 'en' ? "Direct instruction..." : "Directe instructie..."} className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 placeholder-slate-600" disabled={isLoading} />
                    <button onClick={() => handleSendMessage()} disabled={!inputText.trim() || isLoading} className={`p-2 rounded-lg ${!inputText.trim() ? 'text-slate-700' : currentTheme.accentText}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 004.82 9.25h8.138a1.5 1.5 0 010 3H4.82a1.5 1.5 0 00-1.127 1.086l-1.414 4.926a.75.75 0 00.972.965l15-6a.75.75 0 000-1.386l-15-6z" /></svg>
                    </button>
                </div>
            </div>
        </div>
      </div>

      {activeMobileTab === 'tools' && (
          <div className={`flex-1 flex flex-col lg:hidden ${currentTheme.bg} pb-24 overflow-hidden`}>
                <div className={`sticky top-0 z-10 p-4 border-b ${currentTheme.border} bg-black/40 backdrop-blur-md`}>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{language === 'en' ? 'Didactic Toolbox' : 'Didactische Toolbox'}</span>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-3">
                        {Object.keys(toolCategories).map((cat) => (
                            <button key={cat} onClick={() => setActiveTab(cat as ToolCategoryKey)} className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-full border ${activeTab === cat ? `${currentTheme.accent} border-transparent text-white` : 'border-slate-800 text-slate-500'}`}>{TAB_LABELS[cat][language]}</button>
                        ))}
                     </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3">
                    {toolCategories[activeTab].map((tool) => (
                        <button key={tool.command} onClick={() => handleSendMessage(tool.command)} className={`p-4 rounded-xl border ${currentTheme.border} bg-white/5 text-left active:scale-95 transition-all`}>
                            <div className="text-2xl mb-2">{tool.icon}</div>
                            <div className="text-[10px] font-bold text-white uppercase mb-1">{tool.label}</div>
                            <div className="text-[9px] text-slate-500 leading-tight">{tool.desc}</div>
                        </button>
                    ))}
                </div>
          </div>
      )}

      <Dashboard analysis={currentAnalysis} mechanical={currentMechanical} isOpen={activeMobileTab === 'dashboard' || isDesktopDashboardOpen} onClose={() => { if (activeMobileTab === 'dashboard') setActiveMobileTab('chat'); setDesktopDashboardOpen(false); }} theme={currentTheme} isLoading={isLoading} profile={learnerProfile} eaiState={eaiState} language={language} />

      <div className={`lg:hidden fixed bottom-0 left-0 right-0 h-16 ${currentTheme.sidebar} border-t ${currentTheme.border} flex items-center justify-around z-[60] pb-safe`}>
          {(['chat', 'tools', 'dashboard'] as const).map(tab => (
              <button key={tab} onClick={() => handleMobileTabSwitch(tab)} className={`flex flex-col items-center gap-1 p-2 ${activeMobileTab === tab ? 'text-white' : 'text-slate-600'}`}>
                 <div className="w-5 h-5 flex items-center justify-center">
                    {tab === 'chat' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>}
                    {tab === 'tools' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>}
                    {tab === 'dashboard' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>}
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-widest">{tab}</span>
              </button>
          ))}
      </div>
    </div>
  );
};

export default ChatInterface;
