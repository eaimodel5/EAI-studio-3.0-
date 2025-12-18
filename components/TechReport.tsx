
import React, { useState } from 'react';
import { EAIAnalysis, MechanicalState, Message } from '../types';
import { getEAICore, SSOTRubric } from '../utils/ssotParser';
import type { EAIStateLike } from '../utils/eaiLearnAdapter';

interface TechReportProps {
  onClose: () => void;
  lastAnalysis: EAIAnalysis | null;
  lastMechanical: MechanicalState | null;
  messages: Message[];
  eaiState: EAIStateLike;
  language: 'nl' | 'en';
}

type TabMode = 'PAPER' | 'SSOT' | 'TRACE' | 'TELEMETRY';

const TechReport: React.FC<TechReportProps> = ({ onClose, lastAnalysis, lastMechanical, messages, eaiState, language }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('PAPER');
  const [expandedTrace, setExpandedTrace] = useState<string | null>(null);
  const core = getEAICore(language);

  const toggleTrace = (id: string) => {
      setExpandedTrace(expandedTrace === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050914] text-slate-300 font-mono flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/50 bg-[#0b1120] shrink-0">
        <div className="flex items-center gap-6 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
                <div>
                    <h1 className="text-lg font-bold text-white tracking-widest uppercase truncate">EAI CONSOLE v3.1</h1>
                    <span className="text-[10px] text-cyan-500 uppercase tracking-widest hidden sm:inline">Engineering & Diagnostics</span>
                </div>
            </div>
            
            <div className="flex bg-black/40 rounded-lg p-1 border border-white/5 overflow-x-auto scrollbar-hide">
                <button onClick={() => setActiveTab('PAPER')} className={`px-4 py-1 text-xs font-bold uppercase rounded transition-all whitespace-nowrap ${activeTab === 'PAPER' ? 'bg-cyan-900/50 text-white' : 'text-slate-500 hover:text-cyan-400'}`}>Whitepaper</button>
                <button onClick={() => setActiveTab('SSOT')} className={`px-4 py-1 text-xs font-bold uppercase rounded transition-all whitespace-nowrap ${activeTab === 'SSOT' ? 'bg-cyan-900/50 text-white' : 'text-slate-500 hover:text-cyan-400'}`}>SSOT Kernel</button>
                <button onClick={() => setActiveTab('TRACE')} className={`px-4 py-1 text-xs font-bold uppercase rounded transition-all whitespace-nowrap ${activeTab === 'TRACE' ? 'bg-cyan-900/50 text-white' : 'text-slate-500 hover:text-cyan-400'}`}>Live Trace</button>
                <button onClick={() => setActiveTab('TELEMETRY')} className={`px-4 py-1 text-xs font-bold uppercase rounded transition-all whitespace-nowrap ${activeTab === 'TELEMETRY' ? 'bg-red-900/50 text-white' : 'text-slate-500 hover:text-red-400'}`}>Telemetry</button>
            </div>
        </div>
        <button 
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-slate-500 hover:text-cyan-400 transition-colors border border-slate-800 hover:border-cyan-500 px-3 py-1 rounded ml-4 shrink-0"
        >
            CLOSE
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-0 scrollbar-hide relative bg-gradient-to-br from-[#050914] to-[#0b1120]">
        
        {/* === TAB: TELEMETRY === */}
        {activeTab === 'TELEMETRY' && (
            <div className="p-8 max-w-6xl mx-auto h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mechanical Stats */}
                    <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                        </div>
                        <h3 className="text-red-400 font-bold uppercase mb-6 text-sm tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            Mechanical Telemetry
                        </h3>
                        {lastMechanical ? (
                            <div className="space-y-4 text-xs font-mono relative z-10">
                                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                                    <span className="text-slate-500 uppercase tracking-wide">Inference Engine</span>
                                    <span className="text-white font-bold text-right">{lastMechanical.model}</span>
                                </div>
                                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                                    <span className="text-slate-500 uppercase tracking-wide">End-to-End Latency</span>
                                    <span className={`font-bold text-right ${lastMechanical.latencyMs > 2000 ? 'text-orange-400' : 'text-green-400'}`}>{lastMechanical.latencyMs}ms</span>
                                </div>
                                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                                    <span className="text-slate-500 uppercase tracking-wide">Context Window (In)</span>
                                    <span className="text-white text-right">{lastMechanical.inputTokens} tokens</span>
                                </div>
                                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                                    <span className="text-slate-500 uppercase tracking-wide">Generation (Out)</span>
                                    <span className="text-white text-right">{lastMechanical.outputTokens} tokens</span>
                                </div>
                                <div className="grid grid-cols-2 border-b border-white/5 pb-2">
                                    <span className="text-slate-500 uppercase tracking-wide">Sampling Temp</span>
                                    <span className="text-white text-right">{lastMechanical.temperature}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-600 italic border border-dashed border-slate-800 rounded bg-black/20">
                                <span>No active telemetry stream.</span>
                                <span className="text-[10px] mt-2">Initiate chat session to capture data.</span>
                            </div>
                        )}
                    </div>

                    {/* Logic Inspector */}
                    <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl flex flex-col h-full relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-24 h-24 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
                        </div>
                         <h3 className="text-cyan-400 font-bold uppercase mb-4 text-sm tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            Last Packet Payload
                         </h3>
                         {lastAnalysis ? (
                             <div className="flex-1 relative group bg-black/40 rounded border border-white/5">
                                 <pre className="absolute inset-0 text-[10px] text-green-400 p-4 rounded overflow-auto font-mono scrollbar-hide">
                                     {JSON.stringify(lastAnalysis, null, 2)}
                                 </pre>
                             </div>
                         ) : (
                             <div className="flex flex-col items-center justify-center h-40 text-slate-600 italic border border-dashed border-slate-800 rounded bg-black/20">
                                 <span>Waiting for SSOT validation...</span>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        )}

        {/* === TAB: LIVE TRACE === */}
        {activeTab === 'TRACE' && (
            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Session Trace</h2>
                        <p className="text-xs text-slate-400 font-mono mt-1">
                            SEQ_ID: {Date.now().toString().slice(-6)} // TURN_COUNT: {eaiState.turn_counter}
                        </p>
                    </div>
                    <div className="text-right">
                         <div className="text-[10px] uppercase text-slate-500 font-bold">Trace Status</div>
                         <div className="text-green-400 font-bold animate-pulse text-sm">RECORDING</div>
                    </div>
                </div>

                <div className="space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center py-20 text-slate-600 italic border-2 border-dashed border-slate-800 rounded-xl">
                            Waiting for signal... Start chatting to populate trace.
                        </div>
                    )}

                    {messages.map((msg, idx) => {
                        const isUser = msg.role === 'user';
                        const isExpanded = expandedTrace === msg.id;
                        
                        return (
                            <div key={msg.id} className="relative pl-6 border-l-2 border-slate-800 hover:border-slate-600 transition-colors pb-6 last:pb-0">
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${isUser ? 'bg-blue-900 border-blue-500' : 'bg-purple-900 border-purple-500'}`}></div>
                                
                                <div className={`bg-[#0f172a] border ${isExpanded ? 'border-cyan-500/50' : 'border-slate-800'} rounded-lg overflow-hidden transition-all duration-300`}>
                                    <div 
                                        onClick={() => toggleTrace(msg.id)}
                                        className="p-3 flex items-start justify-between cursor-pointer hover:bg-white/5"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold uppercase px-1.5 rounded ${isUser ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
                                                    {isUser ? 'USER INPUT' : 'AI RESPONSE'}
                                                </span>
                                                <span className="text-[10px] text-slate-600 font-mono">{msg.timestamp.toLocaleTimeString()}</span>
                                            </div>
                                            <p className="text-xs text-slate-300 line-clamp-1 font-sans opacity-80">{msg.text.substring(0, 120)}...</p>
                                        </div>
                                        {msg.analysis && (
                                            <div className="flex items-center gap-2 ml-4">
                                                {msg.analysis.active_fix && <span className="text-[9px] font-bold text-orange-400 bg-orange-900/20 px-1 rounded border border-orange-900/50">FIX: {msg.analysis.active_fix}</span>}
                                                <svg className={`w-4 h-4 text-slate-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        )}
                                    </div>

                                    {isExpanded && msg.analysis && (
                                        <div className="border-t border-slate-800 bg-black/40 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                                            <div>
                                                <h4 className="text-[10px] uppercase text-cyan-500 font-bold mb-2">Didactic Reasoning</h4>
                                                <p className="text-xs text-slate-300 italic border-l-2 border-cyan-900 pl-2 mb-3">"{msg.analysis.reasoning}"</p>
                                                
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[10px] text-slate-500 border-b border-white/5 pb-1">
                                                        <span>Cognitive Mode</span>
                                                        <span className="text-white">{msg.analysis.cognitive_mode}</span>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-slate-500 border-b border-white/5 pb-1">
                                                        <span>Epistemic Status</span>
                                                        <span className="text-white">{msg.analysis.epistemic_status}</span>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-slate-500 border-b border-white/5 pb-1">
                                                        <span>Task Balance</span>
                                                        <span className="text-white">AI {100 - msg.analysis.task_density_balance}% / User {msg.analysis.task_density_balance}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase text-green-500 font-bold mb-2">SSOT Activation</h4>
                                                <div className="bg-[#050914] p-2 rounded border border-white/5 font-mono text-[10px] space-y-1">
                                                    {[
                                                        ...(msg.analysis.process_phases || []),
                                                        ...(msg.analysis.coregulation_bands || []),
                                                        ...(msg.analysis.task_densities || []),
                                                        ...(msg.analysis.secondary_dimensions || [])
                                                    ].map(band => (
                                                        <div key={band} className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                            <span className="text-green-300">{band}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* === TAB: SSOT KERNEL === */}
        {activeTab === 'SSOT' && (
             <div className="max-w-6xl mx-auto py-8 px-4">
                 <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">SSOT Kernel Visualization</h2>
                        <p className="text-xs text-slate-400 font-mono mt-1">
                            VERSION: {core.metadata.version} // HASH: {Math.random().toString(36).substring(7).toUpperCase()}
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Rubrics Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 border-b border-cyan-900 pb-2">Active Pedagogical Rubrics</h3>
                        {core.rubrics.map((rubric) => (
                            <div key={rubric.rubric_id} className="bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden">
                                <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
                                    <h4 className="text-sm font-bold text-white">{rubric.name}</h4>
                                    <code className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-slate-400">{rubric.rubric_id}</code>
                                </div>
                                <div className="divide-y divide-slate-800">
                                    {rubric.bands.map(band => (
                                        <div key={band.band_id} className="p-4 hover:bg-white/5 transition-colors">
                                            <div className="flex items-center gap-2 mb-2">
                                                <code className="text-xs font-bold text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded border border-green-900/30">{band.band_id}</code>
                                                <span className="text-xs font-bold text-white">{band.label}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mb-2">{band.description}</p>
                                            
                                            <div className="grid grid-cols-2 gap-4 mt-3 bg-black/20 p-2 rounded">
                                                <div>
                                                    <span className="text-[9px] uppercase text-slate-600 font-bold block mb-1">Learner Obs.</span>
                                                    <ul className="list-disc list-inside text-[10px] text-slate-400">
                                                        {band.learner_obs?.map((o, i) => <li key={i}>{o}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] uppercase text-slate-600 font-bold block mb-1">Didactic Fix</span>
                                                    <p className="text-[10px] text-orange-300">{band.fix}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Commands Column */}
                    <div>
                         <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 border-b border-cyan-900 pb-2">Command Injection Matrix</h3>
                         <div className="bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden">
                             {core.commands.map((cmd) => (
                                 <div key={cmd.command} className="p-3 border-b border-slate-800 last:border-0 hover:bg-white/5 transition-colors">
                                     <div className="flex items-center justify-between mb-1">
                                         <code className="text-xs font-bold text-pink-400 bg-pink-900/20 px-1.5 py-0.5 rounded border border-pink-900/30">{cmd.command}</code>
                                     </div>
                                     <p className="text-[10px] text-slate-400 leading-relaxed">{cmd.description}</p>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
             </div>
        )}

        {/* === TAB: PAPER (Existing) === */}
        {activeTab === 'PAPER' && (
        <div className="max-w-4xl mx-auto space-y-16 py-12 px-8">
            
            {/* 1. EXECUTIVE SUMMARY */}
            <section className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent"></div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Executive Summary</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    EAI Studio 3.1 is not just a chatbot; it is a <strong>Didactic Enforcement Engine</strong>. 
                    Unlike standard GenAI which optimizes for linguistic probability, EAI optimizes for pedagogical consistency based on the <strong>Direct Instruction Model</strong>.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                    By codifying didactic theory into a rigid JSON "Single Source of Truth" (SSOT), we solve the greatest challenge in EdTech: 
                    <strong>Consistency at Scale</strong>. This document explains the complete architecture, from the "Flag & Fix" mechanism to the privacy-first stateless design.
                </p>
            </section>

             {/* 2. THE DUAL NATURE OF JSON */}
             <section className="space-y-6">
                 <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">01</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Code is Pedagogy</h2>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        The `EAI_SSOT_JSON` serves a dual purpose. Technically, it is a schema definition. Didactically, it is the codified Direct Instruction model.
                        Every key in the JSON maps directly to a phase in learning theory.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-[#0f172a] p-4 rounded border border-slate-800">
                            <h4 className="text-xs font-bold text-white mb-2">Technical Layer</h4>
                            <p className="text-[10px] text-slate-500 mb-2">Strict Types & Schema Validation</p>
                            <pre className="text-[9px] font-mono text-cyan-300 bg-black/30 p-2 rounded">
{`"process_phases": [
  "P1_Intro",
  "P2_Instruction", 
  "P3_GuidedPractice"
]`}
                            </pre>
                        </div>
                        <div className="bg-[#1e293b] p-4 rounded border border-slate-700">
                            <h4 className="text-xs font-bold text-white mb-2">Didactic Layer</h4>
                            <p className="text-[10px] text-slate-400 mb-2">Direct Instruction Mapping</p>
                            <ul className="text-[10px] space-y-1 text-slate-300 list-disc pl-3">
                                <li><strong>P1:</strong> Activating Prior Knowledge.</li>
                                <li><strong>P2:</strong> Explaining the concept (Modeling).</li>
                                <li><strong>P3:</strong> Scaffolding & Feedback.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CONSISTENCY & THE "FLAG & FIX" SYSTEM */}
            <section className="space-y-6">
                 <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">02</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">The "Flag & Fix" Mechanism</h2>
                </div>

                <div className="prose prose-invert prose-sm">
                    <p className="text-xs text-slate-400 mb-4">
                        How do we ensure the AI acts as a teacher and not just a chatty peer? We use a deterministic loop called <strong>Flag & Fix</strong>.
                        The model cannot simply "reply"; it must first diagnose (Flag) and then intervene (Fix).
                    </p>

                    <div className="relative border-l-2 border-slate-700 ml-4 pl-6 py-2 space-y-8">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600"></div>
                            <h4 className="text-sm font-bold text-white">1. Input Analysis</h4>
                            <p className="text-xs text-slate-500">The student input is analyzed against the SSOT Matrix.</p>
                        </div>

                        {/* Step 2: The Flag */}
                        <div className="relative">
                            <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-orange-500 border-2 border-orange-400 shadow-[0_0_10px_orange]"></div>
                            <h4 className="text-sm font-bold text-orange-400">2. The Flag (Diagnosis)</h4>
                            <p className="text-xs text-slate-400">
                                The system identifies a specific state, e.g., <code className="bg-slate-800 px-1 rounded text-orange-300">C1_Passive</code> (Learner is leaning back).
                                This is not a guess; it is a classification task based on rubric definitions in the SSOT.
                            </p>
                        </div>

                        {/* Step 3: The Fix */}
                        <div className="relative">
                            <div className="absolute -left-[33px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-green-400 shadow-[0_0_10px_green]"></div>
                            <h4 className="text-sm font-bold text-green-400">3. The Fix (Intervention)</h4>
                            <p className="text-xs text-slate-400">
                                The SSOT dictates the fix for <code className="bg-slate-800 px-1 rounded text-orange-300">C1</code> is: <em>"Stop explaining. Ask a check-question."</em>
                                The model MUST execute this strategy in the response.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

             {/* 4. ENFORCING CONSISTENCY */}
             <section className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">03</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Stateless Consistency</h2>
                </div>
                
                <p className="text-sm text-slate-400">
                    In traditional chatbots, the "personality" drifts over long conversations as the context window fills with chat noise.
                    EAI solves this by <strong>Re-injecting the Constitution (SSOT)</strong> at every single turn (Stateless Architecture).
                </p>

                <div className="bg-black/20 p-4 rounded border border-dashed border-slate-700 text-center">
                    <p className="text-xs text-slate-300 italic">
                        "Because the didactic rules are re-asserted every 500ms, the model has 0% chance to 'forget' it is a teacher."
                    </p>
                </div>
            </section>

            {/* 5. PRIVACY & SECURITY MODEL */}
            <section className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">04</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Privacy & Security</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                        <h4 className="text-sm font-bold text-white mb-2">No Training</h4>
                        <p className="text-xs text-slate-400">
                            Data used in this session is ephemeral. Google does not use API data to train their foundation models (Zero-Retention Policy).
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                        <h4 className="text-sm font-bold text-white mb-2">Local Execution</h4>
                        <p className="text-xs text-slate-400">
                            Profile data and SSOT parsing happen client-side in the browser. Only the anonymized prompt and context are encrypted and sent.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                        <h4 className="text-sm font-bold text-white mb-2">GDPR Compliance</h4>
                        <p className="text-xs text-slate-400">
                            By avoiding persistent databases for student identifiers, we minimize PII exposure risks by design.
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. COGNITIVE LOAD & UI DESIGN */}
            <section className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">05</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Cognitive Load Theory</h2>
                </div>
                
                <p className="text-sm text-slate-400">
                    The UI is deliberately dark and minimal to reduce "Extraneous Cognitive Load". 
                    Every pixel of color signifies a semantic change in the learning state (Red = Critical/Conflict, Blue = Structure, Green = Validation).
                    This allows the student to subconsciously recognize the pedagogical mode without reading metadata.
                </p>
            </section>

             {/* 7. HYBRID ARCHITECTURE (Flash/Pro) */}
             <section className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">06</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Adaptive Routing</h2>
                </div>
                
                <p className="text-sm text-slate-400">
                   EAI 3.1 utilizes a dual-model approach. Simple queries (Phase 1/2) are routed to <strong>Gemini Flash</strong> for sub-200ms latency.
                   Complex reasoning tasks (Phase 3/4 or '/devil' mode) are automatically upgraded to <strong>Gemini Pro</strong> for deeper logical coherence.
                </p>
            </section>

             {/* 8. INTERVENTION LIBRARY (TOOLS) */}
             <section className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">07</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Command Injection (Tools)</h2>
                </div>
                
                <p className="text-sm text-slate-400">
                   The "Tools" in the UI are not simple macros. When a user activates a tool (e.g., <code className="text-cyan-300">/devil</code>), the system injects a high-priority <strong>Directive Command</strong> into the model's context window.
                </p>

                <div className="bg-black/20 p-4 rounded border border-slate-700">
                    <h4 className="text-xs font-bold text-white mb-2">Override Mechanism</h4>
                    <p className="text-[10px] text-slate-400">
                        Normally, the model balances between support and challenge. A Command Injection overrides this balance. 
                        It forces the model to adopt a specific persona (e.g., Critic, Coach, Explainer) regardless of the previous conversation flow.
                    </p>
                </div>
            </section>

             {/* 9. ADAPTIVE LEVELING */}
             <section className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/10 pb-2">
                    <span className="text-5xl font-black text-white/5 -mb-1">08</span>
                    <h2 className="text-xl text-cyan-400 font-bold uppercase tracking-wider">Adaptive Differentiation</h2>
                </div>
                
                <p className="text-sm text-slate-400">
                   EAI 3.1 does not use a "one-size-fits-all" language model. The <strong>Learner Profile</strong> (Level/Grade) functions as a semantic constraint filter.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                     <div className="bg-[#1e293b] p-4 rounded border border-slate-700">
                        <h4 className="text-xs font-bold text-white mb-2">Input: "Vocational (VMBO)"</h4>
                        <p className="text-[10px] text-slate-400">
                            <strong>System constraint:</strong> "Use concrete examples. Limit sentence complexity. Focus on practical application."
                        </p>
                    </div>
                     <div className="bg-[#1e293b] p-4 rounded border border-slate-700">
                        <h4 className="text-xs font-bold text-white mb-2">Input: "Honors (VWO)"</h4>
                        <p className="text-[10px] text-slate-400">
                            <strong>System constraint:</strong> "Encourage abstract reasoning. Use academic terminology where appropriate. Demand higher-order thinking."
                        </p>
                    </div>
                </div>
                <p className="text-xs text-slate-500 italic mt-2">
                    * This adaptation occurs dynamically at inference time based on the active profile session.
                </p>
            </section>

        </div>
        )}
      </div>
    </div>
  );
};

export default TechReport;
