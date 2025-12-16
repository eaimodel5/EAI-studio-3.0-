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
                <h1 className="text-lg font-bold text-white tracking-widest uppercase">EAI STUDIO 3.0 // TECHNICAL WHITEPAPER</h1>
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
                <h3 className="text-white font-bold uppercase mb-2">Abstract</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                    EAI Studio 3.0 represents a paradigm shift in Educational AI. Unlike conventional chatbots that rely on probabilistic generation for pedagogical decisions, EAI utilizes a <strong>Deterministic Didactic Layer</strong>. This architecture forces the Large Language Model (LLM) to validate user input against a rigid "Single Source of Truth" (SSOT) JSON schema before generating any conversational output. This hybrid approach—combining the reasoning power of Gemini 3 Pro with strict rule-based governance—ensures pedagogical safety, consistency, and measurability.
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
                            There is no proprietary backend server for logic processing; the client connects directly to the Google Gemini API.
                        </p>
                        <ul className="list-disc list-inside text-xs text-slate-500 space-y-1 font-mono">
                            <li>Framework: React 19 (Concurrent Mode)</li>
                            <li>Styling: Tailwind CSS (Utility-first)</li>
                            <li>Build: ESModules / Vite-compatible</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                         <h3 className="text-white font-bold border-b border-white/10 pb-2">Stateless API Design</h3>
                         <p className="text-sm text-slate-400 leading-relaxed">
                            The system maintains a stateless relationship with the neural core. 
                            Context is reconstructed at every turn (`turn_n`) by injecting the full SSOT and conversation history into the model's context window (1M+ token capacity allowed). 
                            This guarantees that no "hidden state" exists on a server; the model is freshly aligned every request.
                         </p>
                    </div>
                </div>
            </section>

            {/* 2. SSOT v13 */}
            <section className="space-y-6">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">02</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">The SSOT Protocol (v13.0)</h2>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-lg space-y-6">
                    <div>
                        <h3 className="text-white font-bold mb-2">The 7-Dimensional Didactic Cycle</h3>
                        <p className="text-sm text-slate-400 mb-4">
                            The core of the system is the <code>EAI_SSOT_JSON</code>. This defines the "Physics" of the learning universe. 
                            Every user input is classified across 7 dimensions before a response is formulated.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-cyan-300">
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">P: Process Phase</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">TD: Task Density</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">C: Co-Regulation</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">V: Skill Potential</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">T: Tech Integration</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">E: Epistemic Reliability</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">L: Transfer</div>
                            <div className="border border-cyan-900/30 bg-cyan-900/10 p-2 rounded">S/B: Social/Bias (Cross)</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800 pt-6">
                        <div>
                             <h4 className="text-white font-bold text-sm mb-2">Micro-Descriptor Matching</h4>
                             <p className="text-xs text-slate-400 leading-relaxed">
                                To prevent hallucination, the model is strictly forbidden from inventing classifications. 
                                It employs a "literal string matching" technique. The system prompt instructs: 
                                <em>"You may ONLY assign Band C1 if you detect the exact behavior described in 'learner_obs' for C1."</em>
                                This grounds the probabilistic model in deterministic text matching.
                             </p>
                        </div>
                         <div>
                             <h4 className="text-white font-bold text-sm mb-2">The Command Library</h4>
                             <p className="text-xs text-slate-400 leading-relaxed">
                                Pedagogical interventions are standardized into 50+ executable commands (e.g., <code>/devil</code>, <code>/schema</code>).
                                Instead of asking the LLM to "be helpful", we execute a specific didactic subroutine defined in the SSOT.
                                This ensures consistent quality across different models and temperatures.
                             </p>
                        </div>
                    </div>
                </div>
            </section>

             {/* 3. ADAPTIVE COMPUTE */}
             <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">03</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">Adaptive Compute Engine</h2>
                </div>
                
                <p className="text-sm text-slate-400 mb-4">
                    EAI Studio 3.0 implements a dynamic model routing strategy (`geminiService.ts`) to optimize the trade-off between latency and reasoning depth.
                </p>

                <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0a0f1c]">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="p-6 relative group">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </div>
                            <h3 className="text-yellow-400 font-bold uppercase text-sm mb-1">Fast Lane (Turbo)</h3>
                            <div className="text-xs font-mono text-slate-500 mb-4">Gemini 2.5 Flash</div>
                            <ul className="text-xs text-slate-300 space-y-2">
                                <li><strong>Trigger:</strong> Input length &lt; 60 chars OR Phatic communication.</li>
                                <li><strong>Latency Target:</strong> &lt; 400ms.</li>
                                <li><strong>Thinking Budget:</strong> 0 (Disabled).</li>
                                <li><strong>Use Case:</strong> Confirmations, greetings, quick clarifications.</li>
                            </ul>
                        </div>

                        <div className="p-6 relative group">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            </div>
                            <h3 className="text-purple-400 font-bold uppercase text-sm mb-1">Deep Lane (Reasoning)</h3>
                            <div className="text-xs font-mono text-slate-500 mb-4">Gemini 3 Pro (Preview)</div>
                             <ul className="text-xs text-slate-300 space-y-2">
                                <li><strong>Trigger:</strong> Commands (e.g., `/rubric`), Complex queries, Analysis phase.</li>
                                <li><strong>Latency Target:</strong> 1.5s - 4.0s.</li>
                                <li><strong>Thinking Budget:</strong> 8192 Tokens.</li>
                                <li><strong>Mechanism:</strong> Uses internal Chain-of-Thought to map user input to the 7-dimensional matrix <em>before</em> generating output.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

             {/* 4. DIDACTIC DIAGNOSTICS */}
             <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">04</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">Diagnostics Module (v13)</h2>
                </div>

                <div className="p-6 bg-red-900/5 border border-red-900/20 rounded-lg">
                    <h3 className="text-red-400 font-bold mb-2 uppercase text-sm">Target: Pseudo-Complexity</h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                        A critical failure mode in EdTech is "Pseudo-Complexity": when the AI generates high-quality, complex text, but the learner remains passive. 
                        The v13 Diagnostics Module runs a post-inference check on the analysis bands.
                    </p>
                    
                    <div className="font-mono text-xs bg-black/50 p-4 rounded border border-white/5 text-slate-300">
                        <div className="mb-2"><span className="text-purple-400">const</span> <span className="text-blue-400">checkRisk</span> = (bands) ={'>'} {'{'}</div>
                        <div className="pl-4 mb-1">
                            <span className="text-slate-500">// RISK: High Content (TD5) + Low Agency (C1)</span>
                        </div>
                        <div className="pl-4 mb-1">
                            <span className="text-purple-400">if</span> (bands.TD.includes(<span className="text-green-400">'TD5'</span>) && bands.C.includes(<span className="text-green-400">'C1'</span>)) {'{'}
                        </div>
                        <div className="pl-8 text-red-400">return 'CRITICAL_PSEUDO_COMPLEXITY';</div>
                        <div className="pl-4">{'}'}</div>
                        <div>{'}'}</div>
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-4">
                        *This logic triggers the red warning indicators in the Dashboard, prompting the user (or teacher) to intervene manually.
                    </p>
                </div>
            </section>

             {/* 5. FRONTEND ENGINEERING */}
             <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">05</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">Frontend Engineering</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white/5 p-4 rounded border border-white/5">
                        <h4 className="text-white font-bold text-xs uppercase mb-2">The Mood Engine</h4>
                        <p className="text-xs text-slate-400">
                            The UI is reactive state-machine. It listens to the `active_fix` returned by the neural core.
                            If the model selects `/devil` (confrontational), the entire theme (colors, borders, shadows) shifts to 'DEVIL' mode (Red) automatically. 
                            This provides subconscious feedback to the user about the didactic mode.
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded border border-white/5">
                        <h4 className="text-white font-bold text-xs uppercase mb-2">Structured Output</h4>
                        <p className="text-xs text-slate-400">
                            We utilize Gemini's <code>responseSchema</code> to force strict JSON output. 
                            This decouples the "Analysis" (hidden metadata) from the "Conversational Response" (user facing).
                            It allows us to render the Dashboard visualizations purely from the metadata, without regex parsing the chat text.
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded border border-white/5">
                        <h4 className="text-white font-bold text-xs uppercase mb-2">Neuro-Linker</h4>
                        <p className="text-xs text-slate-400">
                            A focus-calibration mini-game implemented using HTML5 Canvas. 
                            It serves as a "Brain Break" (Pauze tool) but also technically demonstrates the capability of the React application to handle high-performance animation loops alongside heavy AI inference.
                        </p>
                    </div>
                </div>
            </section>
             
             {/* 6. SECURITY */}
             <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">06</span>
                    <h2 className="text-2xl text-cyan-400 font-bold uppercase tracking-wider">Security & Privacy</h2>
                </div>
                 <ul className="grid grid-cols-1 gap-3 text-sm text-slate-400">
                    <li className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <span><strong>Zero-Retention Backend:</strong> EAI Studio does not store conversation logs on any EAI server. All state is ephemeral or stored in the user's LocalStorage.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <span><strong>Direct-to-Google:</strong> API keys are processed in environment variables or injected at runtime. Requests go straight from Client to Google Cloud Vertex AI / Gemini API.</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <span><strong>SSOT Integrity:</strong> The SSOT JSON contains a SHA256 hash. The kernel verifies this on boot to ensure the didactic ruleset hasn't been tampered with.</span>
                    </li>
                 </ul>
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
                            EAI is built upon the Zimmerman & Schunk models of Self-Regulated Learning. The system does not aim to "solve problems" for the student, but to guide them through the phases of:
                        </p>
                        <div className="flex gap-2 text-[10px] font-bold font-mono">
                            <div className="bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded text-purple-200">1. FORETHOUGHT</div>
                            <div className="bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded text-purple-200">2. PERFORMANCE</div>
                            <div className="bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded text-purple-200">3. REFLECTION</div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            If the AI detects that a student is skipping the "Forethought" phase (e.g., asking for an answer without a plan), the <code>/checkin</code> or <code>/leervraag</code> interventions are triggered to force goal-setting.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-bold text-sm uppercase">Constructivism & Agency</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            The core metric of EAI is <strong>Task Density Balance</strong>. 
                            In a traditional Chatbot, the AI takes 100% of the cognitive load (Generating). 
                            In EAI, we aim to keep the learner's cognitive load between 60-80% (Constructing).
                            The system actively "fades" support (Scaffolding -> Fading) as the learner demonstrates mastery in the <code>V_SkillPotential</code> dimension.
                        </p>
                    </div>
                </div>
            </section>

            {/* 8. THE 7-DIMENSIONAL MATRIX */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">08</span>
                    <h2 className="text-2xl text-purple-400 font-bold uppercase tracking-wider">The 7-Dimensional Matrix</h2>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-slate-400">
                        Every interaction is mapped against 7 axes. These are not "labels" but active state-variables that determine the next system action.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* P - Process */}
                        <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-cyan-400 font-mono text-lg">P</span>
                                <span className="text-xs uppercase text-slate-500">Process Phase</span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Determines "Where are we?". From <strong>P1 (Orientation)</strong> to <strong>P5 (Evaluation)</strong>. 
                                <br/><em className="text-slate-500">Logic: You cannot evaluate (P5) what you haven't built (P3).</em>
                            </p>
                        </div>

                        {/* TD - Task Density */}
                        <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-green-400 font-mono text-lg">TD</span>
                                <span className="text-xs uppercase text-slate-500">Task Density</span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Who is thinking? <strong>TD1 (Learner Dominant)</strong> vs <strong>TD5 (AI Dominant)</strong>.
                                <br/><em className="text-slate-500">Logic: If TD > 4, trigger `TD_AGENCY_RISK` protocol.</em>
                            </p>
                        </div>

                        {/* C - Co-Regulation */}
                        <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-orange-400 font-mono text-lg">C</span>
                                <span className="text-xs uppercase text-slate-500">Co-Regulation</span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Who steers the conversation? <strong>C1 (AI Monologue)</strong> implies passivity. <strong>C5 (Learner Anchored)</strong> implies ownership.
                            </p>
                        </div>

                        {/* V - Skill Potential */}
                        <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-pink-400 font-mono text-lg">V</span>
                                <span className="text-xs uppercase text-slate-500">Vygotsky / Skill</span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Zone of Proximal Development status. From <strong>V1 (Dependent/Modeling)</strong> to <strong>V4 (Mastery)</strong>.
                                <br/><em className="text-slate-500">Logic: If V1, use Modeling. If V3, use Fading.</em>
                            </p>
                        </div>

                        {/* T, E, L - Secondary */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-2">
                             <div className="bg-black/20 p-2 rounded border border-white/5">
                                <span className="font-bold text-blue-400 font-mono block">T</span>
                                <span className="text-[10px] text-slate-500">Tech Transparency</span>
                             </div>
                             <div className="bg-black/20 p-2 rounded border border-white/5">
                                <span className="font-bold text-indigo-400 font-mono block">E</span>
                                <span className="text-[10px] text-slate-500">Epistemic Trust</span>
                             </div>
                             <div className="bg-black/20 p-2 rounded border border-white/5">
                                <span className="font-bold text-emerald-400 font-mono block">L</span>
                                <span className="text-[10px] text-slate-500">Learning Transfer</span>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. INTERVENTION ARCHITECTURE */}
            <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-black text-white/10">09</span>
                    <h2 className="text-2xl text-purple-400 font-bold uppercase tracking-wider">Intervention Architecture</h2>
                </div>

                <div className="space-y-6">
                    <p className="text-sm text-slate-400 leading-relaxed">
                        The "Fix" mechanism is the bridge between analysis and generation. It prevents the LLM from hallucinating a pedagogical strategy.
                    </p>

                    <div className="bg-[#0f172a] rounded-lg border border-slate-700 p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold text-white">FIX</div>
                        
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold border border-red-500/50">1</div>
                                <div>
                                    <h4 className="text-white font-bold text-xs uppercase">Diagnosis</h4>
                                    <p className="text-xs text-slate-400 font-mono mt-1">
                                        INPUT: "Ik snap het niet, geef het antwoord." <br/>
                                        BAND: <span className="text-red-400">C1 (AI-Monologue)</span> + <span className="text-orange-400">TD1 (Learner-Passive)</span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-0.5 h-4 bg-slate-700 ml-3"></div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/50">2</div>
                                <div>
                                    <h4 className="text-white font-bold text-xs uppercase">SSOT Lookup</h4>
                                    <p className="text-xs text-slate-400 font-mono mt-1">
                                        LOOKUP C1 in JSON... <br/>
                                        FOUND FIX: "Doorbreek passiviteit. Stop zenden."
                                    </p>
                                </div>
                            </div>

                            <div className="w-0.5 h-4 bg-slate-700 ml-3"></div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold border border-green-500/50">3</div>
                                <div>
                                    <h4 className="text-white font-bold text-xs uppercase">Command Execution</h4>
                                    <p className="text-xs text-slate-400 font-mono mt-1">
                                        EXECUTE: <span className="text-green-400">/beurtvraag</span> <br/>
                                        OUTPUT: "Vat in één zin samen wat de kern is, voordat we verder gaan."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 italic mt-4">
                        This deterministic chain ensures that a "Lazy Learner" never receives a high-content answer, but is always met with an activating intervention.
                    </p>
                </div>
            </section>


            <div className="pt-12 border-t border-cyan-900/30 flex justify-between items-end">
                <div className="text-xs text-slate-600 font-mono">
                    <p>EAI STUDIO KERNEL BUILD 3.0.1</p>
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