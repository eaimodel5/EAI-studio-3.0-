
import React from 'react';
import { EAIAnalysis, MechanicalState, LearnerProfile } from '../types';
import { getEAICore, SSOTBand } from '../utils/ssotParser';
import type { EAIStateLike } from '../utils/eaiLearnAdapter';

interface DashboardProps {
  analysis: EAIAnalysis | null;
  mechanical: MechanicalState | null;
  isOpen: boolean;
  onClose: () => void;
  theme: any; 
  isLoading?: boolean;
  profile?: LearnerProfile | null;
  eaiState?: EAIStateLike | null;
  language?: 'nl' | 'en';
}

const MODE_TRANSLATIONS: Record<string, { nl: string, en: string }> = {
    'ANALYTISCH': { nl: "Analytisch", en: "Analytical" },
    'REFLECTIEF': { nl: "Reflectief", en: "Reflective" },
    'SYSTEMISCH': { nl: "Systemisch", en: "Systemic" },
    'PRAGMATISCH': { nl: "Pragmatisch", en: "Pragmatic" },
    'CREATIEF': { nl: "Creatief", en: "Creative" },
    'NORMATIEF': { nl: "Normatief", en: "Normative" },
    'ONBEKEND': { nl: "Onbekend", en: "Unknown" }
};

const Dashboard: React.FC<DashboardProps> = ({ analysis, mechanical, isOpen, onClose, theme, isLoading = false, profile, eaiState, language = 'nl' }) => {
  
  const currentCore = getEAICore(language as 'nl' | 'en');

  const getActiveBandDetails = (): { rubricName: string, band: SSOTBand }[] => {
    if (!analysis) return [];
    const activeCodes = [
        ...(analysis.coregulation_bands || []),
        ...(analysis.process_phases || []),
        ...(analysis.task_densities || []),
        ...(analysis.secondary_dimensions || []) 
    ];

    const details: { rubricName: string, band: SSOTBand }[] = [];
    activeCodes.forEach(code => {
        currentCore.rubrics.forEach(rubric => {
            const foundBand = rubric.bands.find(b => b.band_id === code);
            if (foundBand) {
                details.push({ rubricName: rubric.name, band: foundBand });
            }
        });
    });
    return details;
  };

  const activeBands = getActiveBandDetails();
  const activeFixDetails = analysis?.active_fix 
    ? currentCore.commands.find(c => c.command === analysis.active_fix) 
    : null;

  const labels = {
      header: 'SSOT MONITOR',
      uplink: 'SSOT UPLINK ACTIVE',
      profile: language === 'en' ? 'Current Profile' : 'Huidig Profiel',
      subject: language === 'en' ? 'Subject:' : 'Vak:',
      level: language === 'en' ? 'Level:' : 'Niveau:',
      grade: language === 'en' ? 'Grade:' : 'Leerjaar:',
      name: language === 'en' ? 'Name:' : 'Naam:',
      intervention: language === 'en' ? 'Active Directive' : 'Actief Directief',
      didactic_steer: language === 'en' ? 'Didactic Steering' : 'Didactische bijsturing',
      no_intervention: language === 'en' ? 'No active directive' : 'Geen actief directief',
      task_density: language === 'en' ? 'Task Density' : 'Taakdichtheid',
      diagnostics: language === 'en' ? 'DIAGNOSTICS' : 'DIAGNOSTIEK',
      observation_details: language === 'en' ? 'Observation Details' : 'Observatie Details',
      internal_logic: language === 'en' ? 'SSOT Mapping Rationale' : 'SSOT Selectie Rationale',
      waiting: '> Waiting for stream...',
      neural_state: language === 'en' ? 'Neural State' : 'Neurale Status',
      epistemic_integrity: language === 'en' ? 'Epistemic Integrity' : 'Epistemische Integriteit',
      nominal: language === 'en' ? 'NOMINAL' : 'NOMINAAL',
  };

  const containerClasses = `
    fixed inset-y-0 right-0 w-full sm:w-96 ${theme.sidebar} border-l ${theme.border} 
    z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `;

  const getEpistemicVisuals = () => {
      const status = analysis?.epistemic_status || 'ONBEKEND';
      switch(status) {
          case 'FEIT': return { color: 'bg-cyan-500', width: '95%', label: language === 'en' ? 'FACT' : 'FEIT' };
          case 'INTERPRETATIE': return { color: 'bg-purple-500', width: '65%', label: language === 'en' ? 'INTERPRETATION' : 'INTERPRETATIE' };
          case 'SPECULATIE': return { color: 'bg-orange-500', width: '35%', label: language === 'en' ? 'SPECULATION' : 'SPECULATIE' };
          default: return { color: 'bg-slate-600', width: '10%', label: '-' };
      }
  };
  const epiVis = getEpistemicVisuals();

  const getModeLabel = () => {
      const rawMode = analysis?.cognitive_mode || 'ONBEKEND';
      return MODE_TRANSLATIONS[rawMode] ? MODE_TRANSLATIONS[rawMode][language] : rawMode;
  };

  const calculateDiagnosticStatus = () => {
      const nominalMsg = language === 'en' ? 'System nominal. No risks detected.' : 'Systeem nominaal. Geen risico\'s.';
      if (!analysis) return { status: labels.nominal, color: 'text-green-500', details: nominalMsg };

      const tds = analysis.task_densities || [];
      const cs = analysis.coregulation_bands || [];

      if (tds.includes('TD5') && (cs.includes('C1') || cs.includes('C2'))) {
          return { 
              status: 'CRITICAL', 
              color: 'text-red-500 animate-pulse', 
              details: language === 'en' ? 'High AI dominance masks passive learner.' : 'AI domineert, leerling is te passief.' 
          };
      }
      return { status: labels.nominal, color: 'text-green-500', details: nominalMsg };
  };
  const diagnostic = calculateDiagnosticStatus();

  return (
    <>
    {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65]" onClick={onClose} />}
    <div className={containerClasses}>
      <div className={`h-16 flex items-center justify-between px-4 ${theme.bg} border-b ${theme.border} bg-opacity-95`}>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-orange-400 animate-ping' : (analysis ? 'bg-green-500' : 'bg-red-500')}`}></div>
            <span className="font-mono text-xs font-bold tracking-widest text-slate-400 uppercase">
                {isLoading ? labels.uplink : labels.header}
            </span>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide pb-20 lg:pb-4">
        {profile && (
            <div className={`border ${theme.border} bg-white/5 rounded-lg p-3 text-xs space-y-1`}>
                <div className="flex justify-between border-b border-white/10 pb-1 mb-1 font-bold text-slate-400 uppercase tracking-tighter"><span>{labels.profile}</span></div>
                <div className="flex justify-between"><span className="opacity-50">{labels.name}</span> <span className="text-slate-200">{profile.name || '-'}</span></div>
                <div className="flex justify-between"><span className="opacity-50">{labels.subject}</span> <span className="text-slate-200">{profile.subject || '-'}</span></div>
                <div className="flex justify-between"><span className="opacity-50">{labels.level}</span> <span className="text-slate-200">{profile.level || '-'}</span></div>
                <div className="flex justify-between"><span className="opacity-50">{labels.grade}</span> <span className="text-slate-200">{profile.grade || '-'}</span></div>
            </div>
        )}

        <div className={`bg-white/5 border ${theme.border} rounded-lg p-3 space-y-3`}>
             <div className="flex items-center justify-between"><span className="text-[10px] font-bold text-slate-500 uppercase">{labels.neural_state}</span><span className={`text-[10px] font-mono font-bold ${theme.accentText} uppercase`}>{getModeLabel()}</span></div>
             <div>
                 <div className="flex justify-between text-[8px] text-slate-500 mb-1 uppercase"><span>{labels.epistemic_integrity}</span><span>{epiVis.label}</span></div>
                 <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${epiVis.color} transition-all duration-500`} style={{ width: epiVis.width }}></div></div>
             </div>
        </div>

        {analysis?.active_fix && (
            <div className={`border ${theme.border} bg-black/20 rounded-lg p-3 ${theme.glow}`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.accentText} block mb-2`}>{labels.intervention}</span>
                <div className="bg-black/30 rounded border border-white/5 p-2 text-[11px] text-white italic font-medium">"{activeFixDetails?.description || analysis.active_fix}"</div>
            </div>
        )}

        <div className="space-y-2">
            <div className="flex items-center justify-between"><h3 className="text-[10px] font-bold text-slate-500 uppercase">{labels.task_density}</h3><span className={`text-[10px] font-mono font-bold ${theme.accentText}`}>{analysis?.task_density_balance ?? 50}%</span></div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden relative"><div className="absolute top-0 bottom-0 w-1 bg-white z-10" style={{ left: `${analysis?.task_density_balance ?? 50}%` }}></div></div>
        </div>

        <details className={`bg-black/20 rounded border ${theme.border} group overflow-hidden`} open>
            <summary className="p-3 cursor-pointer list-none flex items-center justify-between"><h3 className="text-[10px] font-bold text-slate-500 uppercase">{labels.diagnostics}</h3><span className={`text-[10px] font-bold font-mono ${diagnostic.color}`}>{diagnostic.status}</span></summary>
            <div className="px-3 pb-3 pt-0 text-[10px] text-slate-400 leading-tight">{diagnostic.details}</div>
        </details>

        {activeBands.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-white/10">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase">{labels.observation_details}</h3>
                {activeBands.map((item, idx) => (
                    <div key={`${item.band.band_id}-${idx}`} className="bg-black/20 rounded border border-white/5 p-2">
                        <div className="flex justify-between text-[9px] mb-1"><span className={theme.accentText}>{item.rubricName}</span><span className="text-white bg-slate-800 px-1 rounded">{item.band.band_id}</span></div>
                        <p className="text-[11px] text-slate-200">{item.band.label}</p>
                    </div>
                ))}
            </div>
        )}

        <div className="pt-3 border-t border-white/10">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-2">{labels.internal_logic}</h3>
            <p className="text-[10px] text-slate-500 font-mono bg-black/30 p-2 rounded italic">
                {analysis ? `> ${analysis.reasoning}` : labels.waiting}
            </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
