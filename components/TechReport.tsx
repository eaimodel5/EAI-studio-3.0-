import React from 'react';

interface TechReportProps {
  onClose: () => void;
}

const TechReport: React.FC<TechReportProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#050914] text-slate-300 font-mono flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/50 bg-[#0b1120]">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
            <div>
                <h1 className="text-lg font-bold text-white tracking-widest uppercase">EAI STUDIO 3.1 // TECHNICAL WHITEPAPER</h1>
                <p className="text-[10px] text-cyan-500/60 uppercase tracking-widest">Classification: RESTRICTED // Engineering & Didactic Core</p>
            </div>
        </div>
        <button 
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-slate-500 hover:text-cyan-400 transition-colors border border-slate-800 hover:border-cyan-500 px-3 py-1 rounded"
        >
            Close Terminal [ESC]
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:px-20 scrollbar-hide">
        <div className="max-w-5xl mx-auto space-y-16 pb-20">
            
            {/* 0. ABSTRACT */}
            <div className="border-l-2 border-cyan-500 pl-6 py-2">
                <h3 className="text-white font-bold uppercase mb-2">Abstract v3.1 (Directive-Based)</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                    EAI Studio 3.1 evolves the Single Source of Truth (SSOT) from a static script repository to a <strong>Directive-Based Architecture</strong>. The AI no longer recites pre-written fixes but interprets imperative didactic commands ("Directives") through a localized Tone Matrix. This preserves the deterministic governance of the SSOT while enabling natural, fluid, and context-aware conversational weaving ("The Invisible Steersman").
                </p>
            </div>

            {/* 1. CORE ARCHITECTURE */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">01</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">System Architecture</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-white font-bold border-b border-white/10 pb-2">Client-Side Monolith</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            The application is architected as a "Thick Client" Single Page Application (SPA). 
                            All pedagogical logic, state management, and SSOT parsing occur within the user's browser runtime. 
                        </p>
                    </div>
                    <div className="space-y-4">
                         <h3 className="text-white font-bold border-b border-white/10 pb-2">Stateless API Design</h3>
                         <p className="text-sm text-slate-400 leading-relaxed">
                            Context is reconstructed at every turn (`turn_n`) by injecting the full SSOT and conversation history into the model's context window (1M+ token capacity allowed). 
                         </p>
                    </div>
                </div>
            </section>

            {/* SEPARATOR */}
            <div className="border-t-4 border-cyan-500/20 my-12 relative">
                <div className="absolute top-[-10px] left-0 bg-[#050914] pr-4 text-xs font-bold text-cyan-500 uppercase tracking-widest">
                    Part II: Didactic Architecture
                </div>
            </div>

            {/* 7. PEDAGOGICAL PHILOSOPHY */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">07</span>
                    <h2 className="text-2xl text-purple-400 font-bold uppercase tracking-wider">Pedagogical Philosophy</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-sm uppercase">SRL (Self-Regulated Learning)</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            EAI is built upon the Zimmerman & Schunk models of Self-Regulated Learning. The system does not aim to "solve problems" for the student, but to guide them through the phases of Forethought, Performance, and Reflection.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-sm uppercase">Constructivism & Agency</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            The core metric of EAI is <strong>Task Density Balance</strong>. We aim to keep the learner's cognitive load between 60-80%.
                        </p>
                    </div>
                </div>
            </section>

            {/* SEPARATOR */}
            <div className="border-t-4 border-pink-500/20 my-12 relative">
                <div className="absolute top-[-10px] left-0 bg-[#050914] pr-4 text-xs font-bold text-pink-500 uppercase tracking-widest">
                    Part III: Conversational Alignment
                </div>
            </div>

            {/* 10. THE INVISIBLE STEERSMAN */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">10</span>
                    <h2 className="text-2xl text-pink-400 font-bold uppercase tracking-wider">The Invisible Steersman (v3.1)</h2>
                </div>

                <div className="p-6 bg-pink-900/5 border border-pink-900/20 rounded-lg space-y-6">
                    <div>
                        <h3 className="text-white font-bold mb-2 uppercase text-sm">Resolved: Script-Rigidity</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            In v3.1, the SSOT was refactored. The `fix` fields now contain <strong>Imperative Directives</strong> (e.g., "Demand a summary") instead of literal text strings. 
                            The LLM acts as an actor interpreting these stage directions via a <strong>Tone Matrix</strong>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <span className="text-pink-500 font-bold text-xs block mb-1">Tone A: INQUISITIVE</span>
                            <p className="text-[10px] text-slate-400">Used for /checkin, /leervraag. Curious, open, and inviting.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <span className="text-cyan-500 font-bold text-xs block mb-1">Tone B: CONFRONTATIONAL</span>
                            <p className="text-[10px] text-slate-400">Used for /devil, /twist. Sharp, playful, challenging (but safe).</p>
                        </div>
                         <div className="bg-black/40 p-4 rounded border border-white/5">
                            <span className="text-green-500 font-bold text-xs block mb-1">Tone C: STRUCTURAL</span>
                            <p className="text-[10px] text-slate-400">Used for /schema, /rubric. Clear, calm, providing frameworks.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <span className="text-purple-500 font-bold text-xs block mb-1">Tone D: META</span>
                            <p className="text-[10px] text-slate-400">Used for /meta, /proces_eval. Zoom out, slow down.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. LANGUAGE INTEGRITY */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">11</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">Language Integrity</h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                    To prevent "Language Drift" (mixing NL/EN), the system now employs strict localized context gating. 
                    If the `SYSTEM_INSTRUCTION_NL` is active, the entire output reasoning chain and conversational buffer are forced into a single linguistic manifold, preventing English reasoning terms from leaking into Dutch pedagogical guidance.
                </p>
            </section>

            <div className="pt-12 border-t border-cyan-900/30 flex justify-between items-end">
                <div className="text-xs text-slate-600 font-mono">
                    <p>EAI STUDIO KERNEL BUILD 3.1.0</p>
                    <p>SESSION ID: {Date.now().toString(36).toUpperCase()}</p>
                </div>
                <div className="text-right">
                    <div className="text-cyan-500 font-bold text-lg tracking-widest">EAI</div>
                    <div className="text-[10px] text-slate-500 uppercase">Educational Artificial Intelligence</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TechReport;