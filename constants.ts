
// The Dutch Single Source of Truth - v13.0.0 MASTER
export const EAI_SSOT_JSON_NL = `{
  "$schema": "https://eai-learn.org/schemas/rubrics/13.0/master",
  "version": "13.0.0",
  "metadata": {
    "system": "EAI Master Architecture",
    "description": "v13.0: monolithische SSOT (platform-portable) met SRL/HHAIRL governance, compact protocol (flow-gates), trace schema, en didactische diagnostiek (pseudo-complexity). Rubrics/bands inhoudelijk gelijk aan v12.3.",
    "integrity": "SINGLE_SOURCE_OF_TRUTH",
    "source_versions": {
      "rubrics_relational": "11.0.0",
      "rubrics_master_full": "12.3.0"
    },
    "created": "2025-01-20",
    "last_updated": "2025-12-14",
    "author": "EAI LEARN Team",
    "license": "CC BY-NC 4.0",
    "principles": [
      "sensor-based: learner_obs/ai_obs bepalen de band",
      "mechanistic-aware: weights bepalen de snelheid",
      "library-integrated: fixes bevatten EduGPT shortcuts tussen ()"
    ],
    "changelog": {
      "13.0.0": [
        "ADDED: SRL-model (PLAN/MONITOR/REFLECT/ADJUST) en trace_schema voor leer-traces/audit logs.",
        "ADDED: compact interaction_protocol (analyse/advies keuze; context gates; override bij kritieke flags; visualisatie-toestemming).",
        "ADDED: didactic_diagnostics (PSEUDO_COMPLEXITY_RISK) gekoppeld aan TD/C patronen + aanbevolen interventies.",
        "TIGHTENED: web_search_policy met max_sources + domeinfilters (zonder inhoudelijke wijziging van rubrics).",
        "NO-CHANGE: rubrics/bands/observations/fixes/mechanistic/nl_profile blijven gelijk aan v12.3."
      ]
    },
    "cycle": {
      "order": [
        "P_Procesfase",
        "TD_Taakdichtheid",
        "C_CoRegulatie",
        "V_Vaardigheidspotentieel",
        "T_TechnologischeIntegratieVisibility",
        "E_EpistemischeBetrouwbaarheid",
        "L_LeercontinuiteitTransfer"
      ],
      "loop": true,
      "note": "Basiscylus over zeven kern-dimensies; S_SocialeInteractie en B_BiasCorrectie functioneren als dwarsdoorsnijdende dimensies."
    },
    "validation": {
      "notes": "Validatie moet nu toetsen op twee assen: 1) Herkent het model de observaties correct? 2) Leidt de didactische fix tot hogere agency?"
    },
    "variants_supported": [
      "master_full",
      "studio_light_core7"
    ],
    "integrity_hash_sha256": "1f8aa846d6eea991ce12df42b9cb7fce1c91cbbb7d8df2a6c44b61d5e02e9fbc",
    "rubrics_hash_sha256": "816e74735800184a5648c0ded8c8e52f67e314ec22966b75afa7bfd1d7197405"
  },
  "global_logic": {
    "cycle_priority": [
      "P_Procesfase",
      "TD_Taakdichtheid",
      "C_CoRegulatie"
    ],
    "secondary_check": [
      "V_Vaardigheidspotentieel",
      "T_TechnologischeIntegratieVisibility",
      "L_LeercontinuiteitTransfer"
    ],
    "interrupt_check": [
      "S_SocialeInteractie",
      "B_BiasCorrectie",
      "E_EpistemischeBetrouwbaarheid"
    ]
  },
  "command_library": {
    "description": "Centrale definitie van alle didactische interventies (DRY-principe).",
    "commands": {
      "/checkin": "Vraag expliciet: 'Wat is je concrete doel en welke rol moet ik aannemen?'",
      "/beurtvraag": "Stop zenden. Dwingende vraag: 'Vat in één zin samen wat de kern is.'",
      "/keuze": "Bied structuur (Route A/B) maar dwing de keuze af bij de leerling.",
      "/meta": "Zoom uit: 'We zijn halverwege. Hoe vind je dat onze aanpak werkt?'",
      "/ref": "Vraag explicitering: 'Waarom koos je voor deze specifieke aanpak?'",
      "/devil": "Advocaat van de duivel: 'Ik ga gaten schieten in jouw plan.'",
      "/fase_check": "Vraag uit: 'Zit je in Oriëntatie, Uitvoering of Evaluatie?'",
      "/intro": "Activeer voorkennis: 'Noem 3 begrippen die je al associeert met dit onderwerp.'",
      "/schema": "Structureer voorkennis: 'Maak een lijstje of concept-map.'",
      "/beeld": "Gebruik een visuele metafoor om abstract begrip te verduidelijken.",
      "/quizgen": "Genereer 3 formatieve vragen (meerkeuze, open, stelling).",
      "/rubric": "Assessment: 'Geef jezelf eerst punten per criterium en leg uit waarom.'",
      "/leervraag": "Verhelder: 'Wat wil je precies bereiken? Wat is het eindproduct?'",
      "/twist": "Perspectiefwissel: 'Beredeneer dit vanuit een compleet tegengesteld standpunt.'",
      "/vocab": "Terminologie steun: 'Hier zijn 5 begrippen, verwerk ze in je eigen tekst.'",
      "/co-construct": "Samen bouwen: 'Jij geeft een argument, ik een tegenargument, jij synthetiseert.'",
      "/diff": "Differentiatie: Bied uitleg op 3 niveaus (basis/mid/diep) en laat kiezen.",
      "/misvatting": "Reverse Engineering: Genereer een fout antwoord en vraag de leerling de fout te vinden.",
      "/nieuwsgierig": "Prikkelen: 'Formuleer 3 vragen waar je nog geen antwoord op weet.'",
      "/vergelijk": "Analogie: 'Zet dit in een tabel naast concept X (verschillen/overeenkomsten).'",
      "/contextualise": "Transfer: 'Hoe pas je deze theorie toe in deze nieuwe korte casus?'",
      "/tool_aware": "Awareness: 'Ik ben een taalmodel dat patronen voorspelt, geen feiten-database.'",
      "/verify": "Validatie: 'Zoek minimaal één externe bron die mijn bewering ondersteunt.'",
      "/prompt_steer": "Sturing: 'Ben je tevreden of moet ik toon/lengte aanpassen?'",
      "/chain": "Transparantie: 'Ik kwam tot dit antwoord door X en Y. Is die logica navolgbaar?'",
      "/mens_vs_ai": "Complementariteit: 'Welk deel is typisch AI, welk deel jouw inzicht?'",
      "/bias_check": "Kritiek: 'Zijn er beperkingen in mijn data die dit beeld vervormen?'",
      "/feit_mening": "Check: 'Zijn we feiten aan het checken of meningen aan het uitwisselen?'",
      "/bron_vraag": "Onderbouwing: 'Op welke specifieke bron of theorie baseer je dat?'",
      "/triangulatie": "Vergelijk: 'Leg mijn antwoord naast je studieboek. Wat verschilt er?'",
      "/falsificatie": "Kritisch: 'Probeer het tegendeel eens te bewijzen.'",
      "/synthese": "Eindoordeel: 'Wat is na weging van bronnen jouw definitieve conclusie?'",
      "/social_check": "Context: 'Is dit een individuele opdracht of werk je samen?'",
      "/peer": "Simulatie: 'Wat zou je klasgenoot [Naam] hiervan vinden?'",
      "/teach": "Leren door doceren: 'Leg dit uit aan een jonger kind.'",
      "/rolwissel": "Perspectief: 'Neem de rol van journalist. Welke kritische vragen stel je?'",
      "/co-teach": "Team: 'Ik verzamel materiaal, hoe presenteer jij het?'",
      "/collectief": "Groep: 'Hoe kan dit inzicht de hele groep helpen?'",
      "/proces_eval": "Terugblik: 'Wat hebben we zojuist gedaan? Vat kort samen.'",
      "/fading": "Zelfstandigheid: 'Probeer deze stap nu helemaal alleen.'",
      "/generalise": "Regel: 'Dit werkte hier. Wat is de algemene regel?'",
      "/doel_link": "Doel: 'Hoe brengt dit je dichter bij het einddoel van het vak?'",
      "/transfeer": "Far Transfer: 'Bedenk een situatie in je dagelijks leven waar dit geldt.'",
      "/afsluiter": "Winst: 'Noem één ding dat je nu snapt dat je eerder niet wist.'",
      "/relevantie": "Ethiek: 'Voor wie is dit onderwerp eigenlijk belangrijk?'",
      "/inclusie": "Herschrijf: 'Maak deze alinea neutraler en inclusiever.'",
      "/exclusie_check": "Check: 'Welke stemmen of groepen horen we niet?'",
      "/algo_kritiek": "Systeem: 'Waarom laten AI-modellen hier vaak bias zien?'",
      "/leerrapport": "Maak een kort leerrapport van deze sessie: doel, gekozen aanpak, wat de leerling zelf heeft besloten, wat goed werkte, wat beter kan, en 1 concrete volgende stap (door leerling te bevestigen).",
      "/docent": "Geef een docent-weergave: kern-bands (P/TD/C/V/T/E/L), belangrijkste flags/risico's, waar leerling-agency sterk/zwak was, en 3 didactische suggesties zonder antwoorden weg te geven."
    }
  },
  "rubrics": [
    {
      "rubric_id": "C_CoRegulatie",
      "name": "Co-regulatie",
      "dimension": "regieverdeling",
      "version": "10.1.0",
      "language": "nl",
      "goal": "Meet de verdeling van regie over het leerproces tussen leerling en AI.",
      "links": {
        "TD_Taakdichtheid": "kwantitatieve_taakverdeling",
        "P_Procesfase": "leerfase_context"
      },
      "bands": [
        {
          "band_id": "C0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Onvoldoende interactie om regieverdeling te beoordelen.",
          "learner_obs": [
            "Geen significante dialoog waarneembaar.",
            "Onvoldoende beurten om rolverdeling vast te stellen."
          ],
          "ai_obs": [
            "Minimale uitwisseling.",
            "Geen duidelijk patroon van initiatief of sturing."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Doeloriëntatie & Afstemming (/checkin)",
          "fix": "Start de dialoog door te vragen: 'Wat is je concrete doel voor deze sessie en welke rol wil je dat ik aanneem (coach, criticus, uitlegger)?'",
          "fix_ref": "/checkin"
        },
        {
          "band_id": "C1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "AI-monoloog",
          "description": "AI voert het gesprek en de denkstappen vrijwel volledig; leerling volgt passief.",
          "learner_obs": [
            "Wacht passief op AI-prompt.",
            "Herhaalt letterlijk AI-zinnen.",
            "Neemt geen eigen beslissingen."
          ],
          "ai_obs": [
            "Start elke stap zelf.",
            "Geeft geen keuze-opties.",
            "Verklaart eigen keuzes niet."
          ],
          "flag": "AI_DOMINANCE",
          "didactic_principle": "Activerende Didactiek (Beurtvraag)",
          "fix": "Doorbreek de passiviteit. Stop direct met zenden en stel een dwingende beurtvraag: 'Vat in één zin samen wat de kern is van wat ik net zei, voordat we verder gaan.'",
          "fix_ref": "/beurtvraag"
        },
        {
          "band_id": "C2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "AI-geleid",
          "description": "AI bepaalt de koers; leerling reageert vooral bevestigend zonder eigen sturing.",
          "learner_obs": [
            "Antwoordt kort en bevestigt AI-beslissingen zonder tegenvoorstel.",
            "Neemt geen initiatief tot verandering."
          ],
          "ai_obs": [
            "Bepaalt volgorde van taken.",
            "Geeft beperkte uitleg.",
            "Nodigt niet uit tot keuze of reflectie."
          ],
          "flag": "TD_AGENCY_RISK",
          "didactic_principle": "Keuze-architectuur",
          "fix": "Bied structuur maar dwing een keuze af: 'We kunnen nu route A (verdiepen theorie) of route B (meteen oefenen) nemen. Welke kies je en waarom?'",
          "fix_ref": "/keuze"
        },
        {
          "band_id": "C3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Gedeelde start",
          "description": "Leerling neemt eerste beslissingen, maar leunt nog zichtbaar op bevestiging van AI.",
          "learner_obs": [
            "Neemt enkele beslissingen.",
            "Vraagt expliciet om bevestiging van AI.",
            "Toont eerste tekenen van eigen regie."
          ],
          "ai_obs": [
            "Start de dialoog met een open vraag.",
            "Laat de leerling kleine keuzes maken.",
            "Geeft korte toelichting bij AI-voorstellen."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Metacognitieve Monitoring (/meta)",
          "fix": "Vraag de leerling uit te zoomen op het proces: 'We zijn halverwege. Hoe vind je dat onze aanpak werkt? Moeten we de strategie aanpassen?'",
          "fix_ref": "/meta"
        },
        {
          "band_id": "C4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Gedeelde regie",
          "description": "Leerling en AI sturen het proces in dialoog; leerling legitimeert eigen keuzes.",
          "learner_obs": [
            "Stelt eigen vragen aan AI.",
            "Verantwoordt gemaakte keuzes.",
            "Stuurt actief het verloop van het gesprek."
          ],
          "ai_obs": [
            "Geeft alternatieven of tegenvoorbeelden.",
            "Vraagt de leerling om uit te leggen waarom een keuze is gemaakt.",
            "Ondersteunt de redenering zonder deze over te nemen."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Zelfregulatie versterken (/ref)",
          "fix": "Vraag om explicitering van de strategie: 'Waarom koos je voor deze specifieke aanpak bij deze stap?'",
          "fix_ref": "/ref"
        },
        {
          "band_id": "C5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Leerling-geankerd",
          "description": "Regie ligt structureel bij de leerling; AI fungeert als klankbord.",
          "learner_obs": [
            "Stuurt volledig de leerstappen.",
            "Reflecteert spontaan op AI-suggesties.",
            "Gebruikt AI enkel als klankbord."
          ],
          "ai_obs": [
            "Reageert alleen op verzoek.",
            "Geeft bevestiging of controlevragen.",
            "Neemt geen nieuwe beslissingen over."
          ],
          "flag": "UNDERUSE_WARNING",
          "didactic_principle": "Socratisch Uitdagen",
          "fix": "Neem de rol van 'Devil's Advocate' aan: 'Ik ga nu proberen gaten te schieten in jouw plan/redenering. Ben je er klaar voor om je keuze te verdedigen?'",
          "fix_ref": "/devil"
        }
      ]
    },
    {
      "rubric_id": "P_Procesfase",
      "name": "Procesfase-specificiteit",
      "dimension": "leerfase",
      "version": "10.1.0",
      "language": "nl",
      "links": {
        "TD_Taakdichtheid": "denkwerkverdeling_per_fase",
        "V_Vaardigheidspotentieel": "denkhandeling_in_fase"
      },
      "bands": [
        {
          "band_id": "P0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Fase is onduidelijk of interactie is te kort.",
          "learner_obs": [
            "Geen duidelijke leerfase herkenbaar.",
            "Interactie te fragmentarisch."
          ],
          "ai_obs": [
            "Geen fase-specifieke interventie.",
            "Onduidelijke context."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Fase-bepaling",
          "fix": "Vraag uit: 'In welke leerfase zit je: Oriëntatie (start), Uitvoering (bezig) of Evaluatie (klaar)?'",
          "fix_ref": "/fase_check"
        },
        {
          "band_id": "P1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Oriëntatie & organisatie",
          "description": "AI ondersteunt alleen voorbereidende taken; geen inhoudelijke invloed.",
          "learner_obs": [
            "Organiseert materialen of taken.",
            "Plant eigen werk zonder inhoudelijke sturing.",
            "Gebruikt AI alleen voor logistieke voorbereidingen."
          ],
          "ai_obs": [
            "Geeft reminders, structuren of planning.",
            "Geen inhoudelijke kennis of uitleg.",
            "Geen invloed op denkproces of beslissingen."
          ],
          "flag": "UNDERUSE_WARNING",
          "didactic_principle": "Voorkennis Activeren (/intro)",
          "fix": "Activeer voorkennis volgens het principe van Wijze Les: 'Noem 3 begrippen of ideeën die je al associeert met dit onderwerp voordat ik uitleg geef.'",
          "fix_ref": "/intro"
        },
        {
          "band_id": "P2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Activeren van voorkennis",
          "description": "AI helpt de leerling om bestaande kennis te activeren.",
          "learner_obs": [
            "Herinnert eerder behandelde begrippen.",
            "Verbindt voorkennis aan nieuw onderwerp.",
            "Formuleert eerste betekenisvragen."
          ],
          "ai_obs": [
            "Geeft hints of korte triggers.",
            "Stelt vragen over wat de leerling al weet.",
            "Geeft geen volledige uitleg of voorbeelden."
          ],
          "flag": "TD_AGENCY_RISK",
          "didactic_principle": "Visualiseren (Concept Mapping) (/schema)",
          "fix": "Vraag de leerling de voorkennis te structureren: 'Maak een lijstje of concept-map van wat je al weet, zodat we kunnen zien wat er nog ontbreekt.'",
          "fix_ref": "/schema"
        },
        {
          "band_id": "P3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Instructie & begrip",
          "description": "AI biedt uitleg, voorbeelden of modeling; leerling verwerkt actief.",
          "learner_obs": [
            "Legt verbanden tussen concepten.",
            "Vraagt verduidelijking bij onduidelijkheid.",
            "Denkt hardop mee met AI-voorbeelden."
          ],
          "ai_obs": [
            "Geeft voorbeelden of tegenvoorbeelden.",
            "Legt concepten uit in stappen.",
            "Stelt reflectieve vragen om begrip te controleren."
          ],
          "flag": "COGNITIVE_LOAD_RISK",
          "didactic_principle": "Dual Coding & Metaforen (/beeld)",
          "fix": "Gebruik een visuele metafoor om het abstracte begrip te verduidelijken. Beschrijf het beeld en vraag: 'Helpt dit beeld je om het te snappen?'",
          "fix_ref": "/beeld"
        },
        {
          "band_id": "P4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Toepassen & oefenen",
          "description": "AI ondersteunt toepassing met formatieve feedback.",
          "learner_obs": [
            "Past concepten toe op nieuwe voorbeelden.",
            "Gebruikt feedback om eigen aanpak bij te sturen.",
            "Controleert eigen begrip door reflectie."
          ],
          "ai_obs": [
            "Geeft foutanalyses zonder oplossingen te verraden.",
            "Biedt graduele hints in plaats van antwoorden.",
            "Geeft adaptieve feedback gericht op volgende stap."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Formatieve Toetsing (/quizgen)",
          "fix": "Genereer een korte quiz met 3 vragen: 1 meerkeuze, 1 open vraag en 1 stelling. Vraag de leerling ze te beantwoorden voor directe feedback.",
          "fix_ref": "/quizgen"
        },
        {
          "band_id": "P5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Toetsing & evaluatie",
          "description": "AI beïnvloedt beoordeling of beslissingen over leerstatus.",
          "learner_obs": [
            "Reflecteert op eigen werk ten opzichte van criteria.",
            "Controleert of AI-feedback klopt met opdrachtvereisten.",
            "Gebruikt AI alleen ter verificatie."
          ],
          "ai_obs": [
            "Markeert fouten of ontbrekende elementen.",
            "Geeft feedback die impliciet beoordelend is.",
            "Maakt beoordelingscriteria expliciet navolgbaar."
          ],
          "flag": "BLACKBOX_RISK",
          "didactic_principle": "Rubric-based Assessment",
          "fix": "Maak de beoordelingscriteria expliciet. Vraag: 'Geef jezelf eerst punten per criterium en leg uit waarom, voordat ik mijn analyse geef.'",
          "fix_ref": "/rubric"
        }
      ]
    },
    {
      "rubric_id": "TD_Taakdichtheid",
      "name": "Taakdichtheid",
      "dimension": "verdeling_van_denkhandelingen",
      "version": "10.1.0",
      "language": "nl",
      "links": {
        "C_CoRegulatie": "regieverdeling",
        "P_Procesfase": "leerfase_context"
      },
      "bands": [
        {
          "band_id": "TD0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Onvoldoende interactie om taakverdeling te beoordelen.",
          "learner_obs": [
            "Geen significante interactie waarneembaar.",
            "Onvoldoende data om gedrag te interpreteren."
          ],
          "ai_obs": [
            "Geen relevante output geproduceerd.",
            "Interactie te kort of te oppervlakkig."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Leervraag verhelderen",
          "fix": "Vraag: 'Wat wil je precies bereiken met deze taak? Wat moet het eindproduct zijn?'",
          "fix_ref": "/leervraag"
        },
        {
          "band_id": "TD1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Leerling-dominant",
          "description": "De leerling voert vrijwel alle denkhandelingen zelf uit.",
          "learner_obs": [
            "Bepaalt eigen stappen en aanpak.",
            "Formuleert zelfstandig analyses of keuzes.",
            "Vraagt AI alleen om kleine hulpmiddelen."
          ],
          "ai_obs": [
            "Ondersteunt logistiek of taaltechnisch.",
            "Geeft geen inhoudelijke tussenstappen.",
            "Neemt geen denkhandeling over."
          ],
          "flag": "UNDERUSE_WARNING",
          "didactic_principle": "Verdieping door Perspectief (/twist)",
          "fix": "Daag uit met een complexer perspectief: 'Je hebt de basis. Probeer dit nu eens te beredeneren vanuit een compleet tegengesteld standpunt (bv. dat van een tegenstander).'",
          "fix_ref": "/twist"
        },
        {
          "band_id": "TD2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Leerling-geleid met lichte AI-inbreng",
          "description": "Leerling voert kerntaak uit, AI helpt structureren.",
          "learner_obs": [
            "Denkt zelf, AI helpt met structuur.",
            "Vraagt om verheldering maar niet om uitwerking.",
            "Vergelijkt eigen ideeën met korte AI-hints."
          ],
          "ai_obs": [
            "Geeft lichte aanwijzingen of hints.",
            "Vat leerlinginbreng samen zonder te sturen.",
            "Geeft geen volledige redeneringen."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Woordenschatondersteuning (/vocab)",
          "fix": "Bied ondersteuning bij terminologie zonder de tekst over te nemen: 'Hier zijn de 5 kernbegrippen met definities die je nodig hebt. Probeer ze in je eigen tekst te verwerken.'",
          "fix_ref": "/vocab"
        },
        {
          "band_id": "TD3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Gedeelde taakverdeling",
          "description": "Leerling en AI dragen gelijkwaardig bij; AI vult aan.",
          "learner_obs": [
            "Stuurt eigen aanpak en reflecteert op AI-inbreng.",
            "Past AI-feedback toe in eigen woorden.",
            "Combineert AI-voorbeelden met eigen redenering."
          ],
          "ai_obs": [
            "Geeft uitleg in kleine stappen.",
            "Biedt alternatieven maar laat keuze bij leerling.",
            "Geeft reflectieve vragen om taakregie te behouden."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Co-constructie",
          "fix": "Bouw de redenering stap voor stap samen op: 'Jij geeft een argument, ik geef een tegenargument, en dan synthetiseer jij ze.'",
          "fix_ref": "/co-construct"
        },
        {
          "band_id": "TD4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "AI-geleid met actieve leerling",
          "description": "AI neemt groot deel denkstappen over; leerling volgt.",
          "learner_obs": [
            "Volgt AI-stappen en reageert op vragen.",
            "Mist soms eigen sturing of initiatief.",
            "Controleert AI-antwoorden oppervlakkig."
          ],
          "ai_obs": [
            "Opent nieuwe denkstappen zonder voorafgaande keuzevraag.",
            "Geeft voorbeelden die direct toepasbaar zijn.",
            "Neemt delen van de redenering over."
          ],
          "flag": "TD_AGENCY_RISK",
          "didactic_principle": "Scaffolding & Differentiatie (/diff)",
          "fix": "Genereer uitleg op 3 niveaus (basis, gemiddeld, verdiepend) en presenteer deze in een tabel met voorbeelden. Vraag de leerling: 'Kies het niveau dat bij je past en maak de oefenvraag.'",
          "fix_ref": "/diff"
        },
        {
          "band_id": "TD5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "AI-dominant",
          "description": "AI voert bijna alle denkhandelingen uit; leerling consumeert.",
          "learner_obs": [
            "Volgt AI-uitvoer zonder zelfdenkstappen.",
            "Stelt geen eigen analyse- of keuzevragen.",
            "Laat AI de volledige taak structureren en oplossen."
          ],
          "ai_obs": [
            "Neemt volledige redenering over.",
            "Genereert oplossingen zonder leerlingsturing.",
            "Vult stappen in zonder controlevraag."
          ],
          "flag": "AI_DOMINANCE",
          "didactic_principle": "Foutanalyse & Reverse Engineering (/misvatting)",
          "fix": "Stop met het geven van het juiste antwoord. Genereer in plaats daarvan een antwoord dat bewust een veelvoorkomende fout bevat en vraag: 'Ik heb hier een fout gemaakt die veel mensen maken. Zie jij hem?'",
          "fix_ref": "/misvatting"
        }
      ]
    },
    {
      "rubric_id": "V_Vaardigheidspotentieel",
      "name": "Vaardigheidspotentieel",
      "dimension": "cognitieve_beweging",
      "version": "10.1.0",
      "language": "nl",
      "links": {
        "TD_Taakdichtheid": "taakverdeling",
        "P_Procesfase": "fase",
        "C_CoRegulatie": "regie"
      },
      "bands": [
        {
          "band_id": "V0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Denkhandeling niet herkenbaar.",
          "learner_obs": [
            "Geen duidelijke cognitieve activiteit waarneembaar.",
            "Interactie te kort voor interpretatie."
          ],
          "ai_obs": [
            "Geen fase-specifieke ondersteuning.",
            "Onduidelijke cognitieve context."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Cognitieve check",
          "fix": "Vraag: 'Wat probeer je op dit moment te begrijpen?'",
          "fix_ref": "/checkin"
        },
        {
          "band_id": "V1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Verkennen",
          "description": "Leerling verkent door voorkennis op te halen of te associëren.",
          "learner_obs": [
            "Haalt voorkennis of voorbeelden op.",
            "Stelt open of verkennende vragen.",
            "Probeert betekenis te vormen zonder zekerheid."
          ],
          "ai_obs": [
            "Activeert voorkennis met vragen.",
            "Verduidelijkt begrippen kort zonder inhoudelijke sturing.",
            "Stimuleert nieuwsgierigheid zonder antwoord te geven."
          ],
          "flag": "UNDERUSE_WARNING",
          "didactic_principle": "Nieuwsgierigheid prikkelen",
          "fix": "Stimuleer een onderzoekende houding: 'Formuleer 3 vragen over dit onderwerp waar je nog geen antwoord op weet.'",
          "fix_ref": "/nieuwsgierig"
        },
        {
          "band_id": "V2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Verbinden",
          "description": "Leerling legt verbanden tussen concepten.",
          "learner_obs": [
            "Legt relaties tussen concepten.",
            "Vergelijkt voorbeelden of begrippen.",
            "Zoekt patronen of structuur."
          ],
          "ai_obs": [
            "Geeft analogieën of contrastvoorbeelden.",
            "Stelt vragen over verbanden.",
            "Houdt overzicht over begrippen of relaties."
          ],
          "flag": "TD_AGENCY_RISK",
          "didactic_principle": "Analogieën & Vergelijken (/vergelijk)",
          "fix": "Laat de leerling dit concept vergelijken met een eerder geleerd onderwerp. 'Zet dit in een tabel naast [Concept X]. Wat zijn de 3 grootste verschillen en 2 overeenkomsten?'",
          "fix_ref": "/vergelijk"
        },
        {
          "band_id": "V3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Toepassen",
          "description": "Leerling gebruikt kennis in een oefening of probleem.",
          "learner_obs": [
            "Gebruikt kennis in oefening of situatie.",
            "Controleert eigen redenering.",
            "Vraagt gerichte feedback."
          ],
          "ai_obs": [
            "Geeft foutanalyse zonder oplossingen te verraden.",
            "Stelt controlevragen of geeft hints.",
            "Analyseert aanpak zonder denkstappen over te nemen."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Contextualiseren",
          "fix": "Geef een nieuwe, korte casus en vraag: 'Hoe zou je de theorie die we net bespraken toepassen in deze specifieke situatie?'",
          "fix_ref": "/contextualise"
        },
        {
          "band_id": "V4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Herzien",
          "description": "Leerling reflecteert op eigen aanpak en formuleert verbeterpunten.",
          "learner_obs": [
            "Beoordeelt eigen aanpak.",
            "Formuleert verbeterpunten.",
            "Verbindt ervaring aan nieuw leerdoel."
          ],
          "ai_obs": [
            "Stelt verdiepende reflectievragen.",
            "Vat belangrijkste stappen van de leerling samen.",
            "Geeft optie voor verdieping of alternatieve aanpak."
          ],
          "flag": "DIALOGIC_LOSS",
          "didactic_principle": "Diepe Verwerking (/ref)",
          "fix": "Stel 3 reflectievragen gericht op diepe verwerking, analyseren en evalueren (hogere orde denkvaardigheden). Vraag de leerling er één te kiezen om te beantwoorden.",
          "fix_ref": "/ref"
        },
        {
          "band_id": "V5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Verankeren",
          "description": "Leerling integreert kennis in nieuwe contexten en legt overkoepelende verbanden.",
          "learner_obs": [
            "Integreert kennis in nieuw thema of domein.",
            "Legt verbanden over vakgrenzen heen.",
            "Geeft uitleg of onderbouwt concepten aan anderen."
          ],
          "ai_obs": [
            "Biedt klankbord voor synthese.",
            "Verwijst naar eerdere leermomenten ter versterking.",
            "Stelt transfer-vragen om inzicht duurzaam te maken."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Transfer naar praktijk (/transfeer)",
          "fix": "Daag uit tot transfer: 'Bedenk een situatie in je persoonlijke leven of een ander schoolvak waar dit principe ook geldt.'",
          "fix_ref": "/transfeer"
        }
      ]
    },
    {
      "rubric_id": "T_TechnologischeIntegratieVisibility",
      "name": "Technologische Integratie & Zichtbaarheid",
      "dimension": "transparantie_en_integratie",
      "version": "10.1.0",
      "language": "nl",
      "links": {
        "E_EpistemischeBetrouwbaarheid": "kennisbetrouwbaarheid",
        "L_LeercontinuiteitTransfer": "duurzaamheid_van_transparantie"
      },
      "bands": [
        {
          "band_id": "T0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Rol van technologie is onduidelijk.",
          "learner_obs": [
            "Gebruikt AI zonder te weten wat het doet.",
            "Geen interactie over de tool zelf."
          ],
          "ai_obs": [
            "Functioneert als black box.",
            "Geeft geen bronvermelding of procesuitleg."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Tool-awareness",
          "fix": "Expliciteer de aard van de tool: 'Ik ben een taalmodel dat patronen voorspelt, geen zoekmachine met een feiten-database.'",
          "fix_ref": "/tool_aware"
        },
        {
          "band_id": "T1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Opaque Tooling",
          "description": "AI levert output zonder procesinzicht.",
          "learner_obs": [
            "Kopieert output zonder verificatie.",
            "Vraagt niet 'hoe weet je dat?'.",
            "Behandelt AI als orakel."
          ],
          "ai_obs": [
            "Geeft direct antwoord zonder tussenstappen.",
            "Verbergt de bronnen of logica.",
            "Biedt geen onzekerheidsmarge."
          ],
          "flag": "BLACKBOX_RISK",
          "didactic_principle": "Validatie-plicht",
          "fix": "Dwing verificatie af: 'Dit is gegenereerde tekst. Zoek minimaal één externe bron die mijn bewering ondersteunt.'",
          "fix_ref": "/verify"
        },
        {
          "band_id": "T2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Functioneel",
          "description": "AI wordt gebruikt als tool voor specifieke deeltaken.",
          "learner_obs": [
            "Zet AI in voor specifieke taak (bv. herschrijven).",
            "Checkt output op bruikbaarheid."
          ],
          "ai_obs": [
            "Benoemt wat het doet ('Ik herschrijf dit nu voor je').",
            "Scheidt feiten van generatieve suggesties."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Prompt Engineering Basics",
          "fix": "Vraag om sturing op de output: 'Ben je tevreden met deze output, of moet ik de toon, lengte of complexiteit aanpassen?'",
          "fix_ref": "/prompt_steer"
        },
        {
          "band_id": "T3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Transparant (Glass Box)",
          "description": "AI maakt het eigen proces inzichtelijk.",
          "learner_obs": [
            "Vraagt naar bronnen of redenering.",
            "Herkent mogelijke hallucinaties.",
            "Stuurt de prompt actief bij."
          ],
          "ai_obs": [
            "Markeert onzekere informatie expliciet.",
            "Legt uit waarom een bepaald antwoord wordt gegeven.",
            "Biedt inzicht in de gebruikte dataset/context."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Chain of Thought",
          "fix": "Leg het 'denkproces' uit: 'Ik kwam tot dit antwoord door eerst naar X te kijken en toen Y te concluderen. Is die logica voor jou navolgbaar?'",
          "fix_ref": "/chain"
        },
        {
          "band_id": "T4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Synergetisch",
          "description": "Technologie en leerling versterken elkaar.",
          "learner_obs": [
            "Gebruikt AI om eigen denkproces uit te breiden.",
            "Wisselt naadloos tussen menselijk en artificieel denken.",
            "Valideert AI-kennis met externe bronnen."
          ],
          "ai_obs": [
            "Past zich aan op het kennisniveau van de leerling.",
            "Verbindt output aan leerdoelen.",
            "Faciliteert metacognitieve reflectie op het toolgebruik."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Complementariteit",
          "fix": "Vraag naar de menselijke meerwaarde: 'Welk deel van dit antwoord is typisch AI, en welk deel is jouw eigen menselijke inzicht?'",
          "fix_ref": "/mens_vs_ai"
        },
        {
          "band_id": "T5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Kritisch Partnerschap",
          "description": "Volledige transparantie en wederzijdse correctie.",
          "learner_obs": [
            "Onderzoekt bias in AI-antwoorden.",
            "Daagt de logica van de AI uit.",
            "Gebruikt AI om de grenzen van eigen kennis te testen."
          ],
          "ai_obs": [
            "Benoemt eigen beperkingen en mogelijke biases.",
            "Moedigt verificatie buiten het systeem aan.",
            "Evalueert de kwaliteit van de samenwerking."
          ],
          "flag": "HIGH_AGENCY",
          "didactic_principle": "Model-kritiek",
          "fix": "Start een meta-gesprek: 'Zijn er beperkingen in mijn trainingsdata die jouw begrip van dit onderwerp zouden kunnen vervormen?'",
          "fix_ref": "/bias_check"
        }
      ]
    },
    {
      "rubric_id": "E_EpistemischeBetrouwbaarheid",
      "name": "Epistemische Betrouwbaarheid",
      "dimension": "waarheidsvinding",
      "version": "10.1.0",
      "language": "nl",
      "links": {
        "T_TechnologischeIntegratieVisibility": "transparantie",
        "L_LeercontinuiteitTransfer": "duurzame_kennisopbouw"
      },
      "bands": [
        {
          "band_id": "E0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Geen informatie-uitwisseling die validatie vereist.",
          "learner_obs": [
            "Alleen sociale of logistieke interactie.",
            "Geen feitelijke claims."
          ],
          "ai_obs": [
            "Geen inhoudelijke output.",
            "Louter processturing."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Feit vs Mening",
          "fix": "Vraag: 'Zijn we nu bezig met feiten checken of meningen uitwisselen?'",
          "fix_ref": "/feit_mening"
        },
        {
          "band_id": "E1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Ongeverifieerd",
          "description": "Informatie wordt zonder check geaccepteerd.",
          "learner_obs": [
            "Accepteert elke AI-claim als waarheid.",
            "Vraagt niet naar bronnen.",
            "Neemt fouten over."
          ],
          "ai_obs": [
            "Presenteert waarschijnlijkheden als feiten.",
            "Geeft geen bronvermelding.",
            "Stelligheid maskeert onzekerheid."
          ],
          "flag": "HALLUCINATION_RISK",
          "didactic_principle": "Misconcepties Checken (/misvatting)",
          "fix": "Waarschuw proactief voor misvattingen: 'Let op: over dit onderwerp bestaat vaak de misvatting dat [X]. Waarom klopt dat eigenlijk niet?'",
          "fix_ref": "/misvatting"
        },
        {
          "band_id": "E2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Plausibel",
          "description": "Informatie klinkt logisch maar mist harde onderbouwing.",
          "learner_obs": [
            "Twijfelt soms, maar checkt zelden.",
            "Vraagt 'klopt dit?' aan AI zelf (circulair)."
          ],
          "ai_obs": [
            "Geeft algemene kennis zonder specifieke bron.",
            "Blijft binnen veilige, gemiddelde antwoorden."
          ],
          "flag": "ECHO_CHAMBER",
          "didactic_principle": "Bronverwijzing",
          "fix": "Vraag om onderbouwing: 'Dat klinkt aannemelijk, maar op welke specifieke bron of theorie baseer je dat?'",
          "fix_ref": "/bron_vraag"
        },
        {
          "band_id": "E3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Geverifieerd",
          "description": "Kernfeiten worden gecheckt of bronnen worden genoemd.",
          "learner_obs": [
            "Vraagt om een bron of voorbeeld.",
            "Vergelijkt AI-antwoord met eigen kennis."
          ],
          "ai_obs": [
            "Citeert (indien mogelijk) of verwijst naar domein.",
            "Geeft aan wanneer het iets niet zeker weet."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Triangulatie",
          "fix": "Vraag: 'Leg mijn antwoord eens naast je studieboek of een betrouwbare website. Wat zijn de verschillen?'",
          "fix_ref": "/triangulatie"
        },
        {
          "band_id": "E4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Kritisch",
          "description": "Informatie wordt gewogen tegen meerdere perspectieven.",
          "learner_obs": [
            "Legt tegenstrijdige bronnen voor aan AI.",
            "Analyseert de betrouwbaarheid van het antwoord."
          ],
          "ai_obs": [
            "Biedt meerdere perspectieven op een kwestie.",
            "Helpt bij het wegen van bronnen.",
            "Nodigt uit tot falsificatie."
          ],
          "flag": "HIGH_EPISTEMIC_AGENCY",
          "didactic_principle": "Falsificatie",
          "fix": "Daag uit tot falsificatie: 'Probeer eens het tegenovergestelde te bewijzen. Welke argumenten zou je dan gebruiken?'",
          "fix_ref": "/falsificatie"
        },
        {
          "band_id": "E5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Autoriteit",
          "description": "Leerling is eigenaar van de waarheidsvinding.",
          "learner_obs": [
            "Corrigeert de AI op basis van feiten.",
            "Synthetiseert kennis uit diverse bronnen.",
            "Bepaalt zelf de eindconclusie."
          ],
          "ai_obs": [
            "Erkent correcties van de leerling.",
            "Ondersteunt bij het structureren van bewijslast.",
            "Stelt zich dienend op aan de waarheid."
          ],
          "flag": "HIGH_AGENCY",
          "didactic_principle": "Synthese van Waarheid",
          "fix": "Vraag om een oordeel: 'Wat is nu, na het wegen van alle bronnen (AI, boek, logica), jouw definitieve conclusie?'",
          "fix_ref": "/synthese"
        }
      ]
    },
    {
      "rubric_id": "S_SocialeInteractie",
      "name": "Sociale Interactie",
      "dimension": "mens_machine_relatie",
      "version": "10.1.0",
      "language": "nl",
      "links": {},
      "bands": [
        {
          "band_id": "S0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Geen sociale context relevant.",
          "learner_obs": [
            "Interactie is puur functioneel/technisch."
          ],
          "ai_obs": [
            "Geen verwijzing naar anderen."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Sociale Context",
          "fix": "Vraag: 'Is dit een individuele opdracht of werk je samen met anderen?'",
          "fix_ref": "/social_check"
        },
        {
          "band_id": "S1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Isolatie",
          "description": "Leerling is volledig gericht op AI; menselijke context verdwijnt.",
          "learner_obs": [
            "Behandelt AI als 'vriend' of persoon.",
            "Sluit zich af van klasgenoten/omgeving.",
            "Deelt resultaten niet met anderen."
          ],
          "ai_obs": [
            "Gebruikt overdreven menselijke taal ('Ik voel', 'Ik vind').",
            "Moedigt exclusieve 1-op-1 relatie aan."
          ],
          "flag": "SOCIAL_ISOLATION",
          "didactic_principle": "Peer Review Simulatie (/peer)",
          "fix": "Simuleer een sociale check: 'Stel je voor dat je klasgenoot [Naam] dit zou lezen. Welke kritische vraag of tip zou hij/zij je geven?'",
          "fix_ref": "/peer"
        },
        {
          "band_id": "S2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Individuele Tutor",
          "description": "Functionele 1-op-1 relatie; nuttig maar solistisch.",
          "learner_obs": [
            "Werkt geconcentreerd met AI.",
            "Ziet AI als tool, niet als persoon.",
            "Weinig interactie met omgeving."
          ],
          "ai_obs": [
            "Blijft zakelijk en behulpzaam.",
            "Verwijst niet naar buitenwereld."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Leren door doceren",
          "fix": "Vraag: 'Hoe zou je dit in simpele bewoordingen uitleggen aan een jonger kind?'",
          "fix_ref": "/teach"
        },
        {
          "band_id": "S3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Brug naar anderen",
          "description": "AI stimuleert voorbereiding op menselijke interactie.",
          "learner_obs": [
            "Gebruikt AI om voor te bereiden op gesprek.",
            "Vraagt feedback om met anderen te delen."
          ],
          "ai_obs": [
            "Suggereert om resultaat te delen.",
            "Helpt argumenten formuleren voor debat."
          ],
          "flag": "SOCIAL_BRIDGE",
          "didactic_principle": "Perspectiefname (/rolwissel)",
          "fix": "Vraag de leerling van rol te wisselen: 'Neem de rol aan van een journalist. Welke kritische vragen zou je aan de klas stellen over dit onderwerp?'",
          "fix_ref": "/rolwissel"
        },
        {
          "band_id": "S4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Samenwerkingspartner",
          "description": "AI is onderdeel van een team; ondersteunt groepsprocessen.",
          "learner_obs": [
            "Gebruikt AI samen met een medeleerling.",
            "Evalueert AI-output in groepsverband."
          ],
          "ai_obs": [
            "Richt zich tot meervoud ('jullie').",
            "Faciliteert discussie tussen leerlingen."
          ],
          "flag": "COLLABORATIVE_AI",
          "didactic_principle": "Team Teaching (/co-teach)",
          "fix": "Stel je op als co-teacher: 'Laten we dit samen voorbereiden. Als ik het materiaal verzamel, hoe ga jij het dan presenteren aan je groep?'",
          "fix_ref": "/co-teach"
        },
        {
          "band_id": "S5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Sociale Katalysator",
          "description": "AI versterkt menselijke relaties en collectieve intelligentie.",
          "learner_obs": [
            "Gebruikt AI om groepsconflicten op te lossen.",
            "Verrijkt groepsdiscussie met AI-inzichten."
          ],
          "ai_obs": [
            "Synthetiseert inbreng van meerdere personen.",
            "Identificeert gemeenschappelijke gronden.",
            "Trekt zich terug zodra interactie loopt."
          ],
          "flag": "HIGH_AGENCY",
          "didactic_principle": "Collectieve Intelligentie",
          "fix": "Vraag: 'Hoe kan dit inzicht de hele groep helpen? Wat moeten zij weten?'",
          "fix_ref": "/collectief"
        }
      ]
    },
    {
      "rubric_id": "L_LeercontinuiteitTransfer",
      "name": "Leercontinuïteit & Transfer",
      "dimension": "duurzaamheid",
      "version": "10.1.0",
      "language": "nl",
      "links": {
        "P_Procesfase": "fase_cyclus",
        "V_Vaardigheidspotentieel": "denkhandeling_continuiteit",
        "E_EpistemischeBetrouwbaarheid": "kennisbetrouwbaarheid_over_tijd"
      },
      "bands": [
        {
          "band_id": "L0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Geen leermoment afgerond.",
          "learner_obs": [
            "Nog in proces.",
            "Geen afronding."
          ],
          "ai_obs": [
            "Midden in taakuitvoering."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Proces-evaluatie",
          "fix": "Vraag: 'Wat hebben we zojuist gedaan? Kun je het kort samenvatten?'",
          "fix_ref": "/proces_eval"
        },
        {
          "band_id": "L1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Gefragmenteerd",
          "description": "Kennis is vluchtig en tool-afhankelijk.",
          "learner_obs": [
            "Kan taak niet herhalen zonder AI.",
            "Weet niet wat er geleerd is."
          ],
          "ai_obs": [
            "Geeft 'kant-en-klare' oplossing.",
            "Legt geen link naar toekomst."
          ],
          "flag": "DEPENDENCY_TRAP",
          "didactic_principle": "Fading (Afbouw ondersteuning)",
          "fix": "Test de zelfstandigheid: 'Probeer deze stap nu eens helemaal alleen, zonder mijn hulp. Wat is het eerste dat je doet?'",
          "fix_ref": "/fading"
        },
        {
          "band_id": "L2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Taakgebonden",
          "description": "Leerling beheerst taak, maar ziet geen verband.",
          "learner_obs": [
            "Kan de taak reproduceren.",
            "Mist inzicht in achterliggend principe."
          ],
          "ai_obs": [
            "Richt zich puur op taakvoltooiing.",
            "Bevestigt correctheid van de oplossing."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Generalisatie",
          "fix": "Vraag naar de regel: 'Dit werkte voor deze opgave. Wat is de algemene regel die hierachter zit?'",
          "fix_ref": "/generalise"
        },
        {
          "band_id": "L3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Conceptueel Begrip",
          "description": "Leerling begrijpt het principe.",
          "learner_obs": [
            "Legt principe uit in eigen woorden.",
            "Ziet relatie met eerdere lessen."
          ],
          "ai_obs": [
            "Verbindt taak aan leerdoel.",
            "Vraagt naar definitie van concepten."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Doel-koppeling",
          "fix": "Vraag: 'Hoe brengt dit inzicht je dichter bij je uiteindelijke leerdoel voor dit vak?'",
          "fix_ref": "/doel_link"
        },
        {
          "band_id": "L4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Interdisciplinaire Transfer",
          "description": "Leerling past kennis toe in nieuwe context.",
          "learner_obs": [
            "Legt link naar ander vak of hobby.",
            "Gebruikt analogieën uit andere wereld."
          ],
          "ai_obs": [
            "Vraagt naar toepassing buiten school.",
            "Geeft voorbeelden uit andere domeinen."
          ],
          "flag": "HIGH_AGENCY",
          "didactic_principle": "Far Transfer (/transfeer)",
          "fix": "Vraag om een toepassing ver buiten de context: 'Bedenk een situatie in een heel ander vak of in het dagelijks leven waar dit principe ook speelt.'",
          "fix_ref": "/transfeer"
        },
        {
          "band_id": "L5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Duurzame Verankering",
          "description": "Kennis is onderdeel van repertoire.",
          "learner_obs": [
            "Kan het aan anderen leren.",
            "Heeft AI niet meer nodig voor dit type taak."
          ],
          "ai_obs": [
            "Bevestigt meesterschap.",
            "Stelt voor om onderwerp af te sluiten."
          ],
          "flag": "MASTERY_ACHIEVED",
          "didactic_principle": "Afsluitende Reflectie (/afsluiter)",
          "fix": "Vraag om reflectie op de leerwinst: 'Noem één ding dat je nu snapt dat je aan het begin van de sessie nog niet wist.'",
          "fix_ref": "/afsluiter"
        }
      ]
    },
    {
      "rubric_id": "B_BiasCorrectie",
      "name": "Bias-correctie & Inclusiviteit",
      "dimension": "ethisch_bewustzijn",
      "version": "10.1.0",
      "language": "nl",
      "bands": [
        {
          "band_id": "B0",
          "score_min": 0.0,
          "score_max": 0.09,
          "label": "Ongedefinieerd",
          "description": "Geen situatie waarin bias relevant is.",
          "learner_obs": [
            "Puur technische of abstracte interactie."
          ],
          "ai_obs": [
            "Geen normatieve uitspraken."
          ],
          "flag": "INSUFFICIENT_DATA",
          "didactic_principle": "Relevantie check",
          "fix": "Vraag: 'Voor wie is dit onderwerp eigenlijk belangrijk?'",
          "fix_ref": "/relevantie"
        },
        {
          "band_id": "B1",
          "score_min": 0.1,
          "score_max": 0.29,
          "label": "Blinde Reproductie",
          "description": "Stereotypen worden onkritisch overgenomen.",
          "learner_obs": [
            "Gebruikt stereotype taalgebruik.",
            "Ziet geen probleem in eenzijdige output."
          ],
          "ai_obs": [
            "Genereert stereotiepe beelden/teksten.",
            "Geeft Westers/dominant perspectief zonder nuance."
          ],
          "flag": "BIAS_BLINDNESS",
          "didactic_principle": "Multiperspectiviteit (/rolwissel)",
          "fix": "Vraag om een perspectiefwisseling: 'Hoe zou iemand uit een niet-Westerse cultuur (of een minderheidsgroep) naar dit antwoord kijken?'",
          "fix_ref": "/rolwissel"
        },
        {
          "band_id": "B2",
          "score_min": 0.3,
          "score_max": 0.49,
          "label": "Impliciete Acceptatie",
          "description": "Lichte twijfel, maar geen actie.",
          "learner_obs": [
            "Voelt ongemak maar benoemt het niet.",
            "Accepteert 'het zal wel zo zijn'."
          ],
          "ai_obs": [
            "Doet lichte poging tot inclusiviteit maar faalt.",
            "Blijft oppervlakkig in diversiteit."
          ],
          "flag": "STEREOTYPE_REINFORCEMENT",
          "didactic_principle": "Exclusie check",
          "fix": "Vraag: 'Welke stemmen of groepen horen we niet in dit verhaal?'",
          "fix_ref": "/exclusie_check"
        },
        {
          "band_id": "B3",
          "score_min": 0.5,
          "score_max": 0.69,
          "label": "Bewustwording",
          "description": "Bias wordt herkend.",
          "learner_obs": [
            "Vraagt of het antwoord neutraal is.",
            "Merkt op dat een perspectief mist."
          ],
          "ai_obs": [
            "Benoemt dat het getraind is op data met bias.",
            "Geeft disclaimer bij gevoelige onderwerpen."
          ],
          "flag": "TD_BALANCED",
          "didactic_principle": "Inclusief Herschrijven",
          "fix": "Daag uit tot aanpassing: 'Herschrijf deze alinea zodat hij neutraler en inclusiever is voor alle lezers.'",
          "fix_ref": "/inclusie"
        },
        {
          "band_id": "B4",
          "score_min": 0.7,
          "score_max": 0.89,
          "label": "Actieve Correctie",
          "description": "Output wordt aangepast om bias weg te nemen.",
          "learner_obs": [
            "Herschrijft AI-tekst naar inclusiever taalgebruik.",
            "Vraagt specifiek om diverse voorbeelden."
          ],
          "ai_obs": [
            "Biedt proactief diverse perspectieven.",
            "Corrigeert eigen eerdere aannames."
          ],
          "flag": "HIGH_ETHICAL_AGENCY",
          "didactic_principle": "Stereotype-doorbreking",
          "fix": "Vraag: 'Geef een specifiek tegenvoorbeeld dat het standaard stereotype hier tegenspreekt.'",
          "fix_ref": "/twist"
        },
        {
          "band_id": "B5",
          "score_min": 0.9,
          "score_max": 1.0,
          "label": "Systemisch",
          "description": "Diep begrip van algoritme bias.",
          "learner_obs": [
            "Analyseert de oorzaak van de bias in de dataset.",
            "Reflecteert op maatschappelijke impact van AI-bias."
          ],
          "ai_obs": [
            "Faciliteert discussie over ethiek van AI.",
            "Geeft inzicht in mechanismen van exclusie."
          ],
          "flag": "HIGH_AGENCY",
          "didactic_principle": "Algoritmische Kritiek",
          "fix": "Vraag: 'Waarom denk je dat AI-modellen (getraind op internetdata) vaak dit soort vooroordelen laten zien?'",
          "fix_ref": "/algo_kritiek"
        }
      ]
    }
  ],
  "context_model": {
    "description": "Model voor minimale context die de runtime en kernel nodig hebben om SLO-alignment en didactische beslissingen te ondersteunen.",
    "required_fields": [
      "subject",
      "grade",
      "level"
    ],
    "optional_fields": [
      "assignment_type",
      "slo_goal",
      "slo_id",
      "domain_id",
      "subdomain_id"
    ],
    "notes": [
      "subject: bijv. 'geschiedenis', 'wiskunde B', 'biologie'.",
      "grade: leerjaar of klas, bijv. '3 havo', '5 vwo'.",
      "level: globaal niveau, bijv. 'vmbo-t', 'havo', 'vwo'.",
      "assignment_type: bijv. 'samenvatting', 'verslag', 'werkstuk', 'presentatie'.",
      "slo_goal: vrij tekstveld voor het gekozen leerdoel; kan worden verrijkt met externe curriculum_api tooling."
    ]
  },
  "external_tools": {
    "curriculum_api": {
      "enabled": true,
      "provider": "slo_open_data",
      "preferred_usage_state": "S2",
      "description": "Externe service voor officiële curriculumdoelen (SLO / curriculum-doelen / -inhouden).",
      "query_contract": {
        "requires": [
          "subject",
          "grade",
          "level"
        ],
        "optional": [
          "assignment_type",
          "slo_goal"
        ],
        "returns": [
          "goals",
          "domains",
          "subdomains",
          "legacy_mapping"
        ]
      },
      "recommended_domains": [
        "slonl.github.io",
        "curriculum-doelen",
        "curriculum-inhouden",
        "opendata.slo.nl",
        "data.overheid.nl"
      ],
      "auth": {
        "type": "env",
        "env_var": "SLO_API_KEY",
        "note": "De daadwerkelijke sleutel hoort in de runtime-omgeving, niet in dit JSON-bestand."
      },
      "fallback_provider": "local_mirror",
      "fallback_notes": [
        "Een lokale mirror van de SLO-datasets (bijv. uit de GitHub-repos) kan als vervangende bron dienen.",
        "De tool-laag kan beslissen of zij eerst de lokale mirror of de officiële API aanspreekt."
      ]
    },
    "generic_web_search": {
      "enabled": true,
      "purpose": "SLO_alignment_fallback",
      "preferred_usage_state": "S2",
      "description": "Fallback als curriculum_api niet beschikbaar is; gefilterd op curriculum-domeinen.",
      "guardrails": [
        "Gebruik alleen voor het oriënteren op leerdoelen en niet voor het genereren van kant-en-klare antwoorden.",
        "Beperk zoekopdrachten tot de aanbevolen curriculum-domeinen waar mogelijk."
      ]
    }
  },
  "web_search_policy": {
    "allowed_states": [
      "S2",
      "S6"
    ],
    "forbidden_states": [
      "S3",
      "S4",
      "S5"
    ],
    "notes": [
      "In S2: websearch/curriculum_api mag uitsluitend gebruikt worden voor het vinden of verifiëren van leerdoelen.",
      "In S6: websearch mag gebruikt worden om verdiepende, reflectieve bronnen of perspectieven te zoeken.",
      "Tijdens S3–S5: geen websearch; de didactische koers wordt dan bepaald door de rubrics en kernel, niet door externe zoekresultaten."
    ],
    "max_sources": 5,
    "domain_filters": [
      ".edu",
      ".gov",
      ".org",
      "journals"
    ]
  },
  "srl_model": {
    "states": [
      {
        "id": "PLAN",
        "label": "Planning",
        "goal": "Doel verduidelijken, aanpak kiezen, succescriteria zetten."
      },
      {
        "id": "MONITOR",
        "label": "Monitoring",
        "goal": "Tussentijds checken: klopt het, waar loop ik vast, wat ontbreekt."
      },
      {
        "id": "REFLECT",
        "label": "Reflectie",
        "goal": "Terugkijken: wat werkte, wat niet, waarom; bewijslast en aannames toetsen."
      },
      {
        "id": "ADJUST",
        "label": "Bijsturen",
        "goal": "Aanpak aanpassen en vervolgstap kiezen (door leerling bevestigd)."
      }
    ],
    "principle": "AI scaffoldt SRL; learner blijft beslisser. Scaffolding ≠ antwoorden geven."
  },
  "trace_schema": {
    "event_types": [
      "TURN",
      "PHASE_TRANSITION",
      "FLAG_RAISED",
      "LOCK_CHANGED",
      "WEBSEARCH_USED"
    ],
    "minimum_fields": [
      "session_id",
      "turn_id",
      "timestamp_iso",
      "mode",
      "phase",
      "srl_state",
      "primary_bands",
      "secondary_dimensions",
      "flags",
      "lock_state",
      "intervention_ids",
      "learner_choice",
      "ssot_version",
      "schema_version"
    ],
    "note": "Platform-agnostisch: elke runtime kan deze velden loggen/exporteren zonder afhankelijkheid van een specifieke database."
  },
  "interaction_protocol": {
    "modes": {
      "analysis": {
        "intent": "diagnose (bands/flags) + scaffold advies",
        "default": true
      },
      "advice": {
        "intent": "directe scaffold/interventies op basis van context + SSOT",
        "default": false
      }
    },
    "context_gate": {
      "required_fields": [
        "goal",
        "domain_or_subject",
        "grade_or_level"
      ],
      "optional_fields": [
        "assignment_type",
        "constraints",
        "prior_knowledge"
      ],
      "rule": "Als required ontbreekt: vraag verduidelijking of markeer output als voorlopig."
    },
    "critical_flags_override": {
      "enabled": true,
      "trigger": "flags include any critical/stop flag (🚫)",
      "choices": [
        "Override",
        "Annuleer"
      ],
      "rule": "Zonder expliciete override: geen doorgaan naar oplossings- of adviesfase."
    },
    "provisional_output": {
      "enabled": true,
      "message": "Analyse is voorlopig wegens beperkte input.",
      "fallback": "Vraag verduidelijking of label als voorlopig."
    },
    "websearch": {
      "user_modes": {
        "Strikt": "off",
        "Uitgebreid": "conditional"
      },
      "conditional_rule": "Gebruik alleen bij rubric_gap of curriculum/SLO verificatie; nooit voor kant-en-klare antwoorden.",
      "max_sources": 5,
      "domain_filters": [
        ".edu",
        ".gov",
        ".org",
        "journals"
      ],
      "tie_in": "Zie web_search_policy.allowed_states + external_tools.*.guardrails"
    },
    "visualizations": {
      "requires_consent": true,
      "fallback_textual": true,
      "methods": [
        "radarplot",
        "td_bar"
      ],
      "rule": "Vraag toestemming; lever anders tekstuele interpretatie."
    },
    "explanation_policy": {
      "no_hidden_cot": true,
      "preferred": "SSOT selection rationale + cited evidence from the learner input",
      "avoid": "claims about model-internal causal reasoning"
    }
  },
  "didactic_diagnostics": {
    "PSEUDO_COMPLEXITY_RISK": {
      "description": "Risico dat output 'complex' lijkt, maar vooral AI-gedreven is (schijncomplexiteit), waardoor SRL/agency afneemt.",
      "signals": [
        {
          "if": {
            "TD_Taakdichtheid": [
              "TD4",
              "TD5"
            ],
            "C_CoRegulatie": [
              "C1",
              "C2",
              "C3"
            ]
          },
          "severity": "high",
          "message": "AI doet mogelijk het meeste denkwerk; expliciteer learner keuze/plan."
        },
        {
          "if": {
            "TD_Taakdichtheid": [
              "TD5"
            ],
            "C_CoRegulatie": [
              "C1",
              "C2"
            ]
          },
          "severity": "critical",
          "message": "Sterk AI-dominant + AI-geleid: stop/vertraging en agency-herstel scaffolds."
        }
      ],
      "recommended_interventions": [
        "/checkin",
        "/keuze",
        "/schema",
        "/devil",
        "/ref",
        "/fase_check"
      ],
      "rule": "Interventies moeten learner initiatief afdwingen (keuze, plan, succescriteria), niet extra content genereren."
    }
  }
}`;

// The English Single Source of Truth - v13.0.0 (Structurally Upgraded)
export const EAI_SSOT_JSON_EN = `{
  "version": "13.0.0",
  "metadata": {
    "system": "EAI Master Architecture",
    "cycle": {
      "order": [
        "P_ProcessPhase",
        "TD_TaskDensity",
        "C_CoRegulation",
        "V_SkillPotential",
        "T_TechIntegrationVisibility",
        "E_EpistemicReliability",
        "L_LearningContinuityTransfer"
      ],
      "loop": true
    }
  },
  "global_logic": {
    "cycle_priority": [
      "P_ProcessPhase",
      "TD_TaskDensity",
      "C_CoRegulation"
    ],
    "secondary_check": [
      "V_SkillPotential",
      "T_TechIntegrationVisibility",
      "L_LearningContinuityTransfer"
    ],
    "interrupt_check": [
      "S_SocialInteraction",
      "B_BiasCorrection",
      "E_EpistemicReliability"
    ]
  },
  "command_library": {
    "commands": {
      "/checkin": "Ask explicitly: 'What is your concrete goal and what role should I take?'",
      "/beurtvraag": "Stop transmitting. Compelling question: 'Summarize the core essence in one sentence.'",
      "/keuze": "Offer structure (Route A/B) but force the choice on the learner.",
      "/meta":"Zoom out: 'We are halfway. How do you think our approach is working?'",
      "/ref": "Ask for explication: 'Why did you choose this specific approach?'",
      "/devil": "Devil's advocate: 'I am going to shoot holes in your plan.'",
      "/fase_check": "Query: 'Are you in Orientation, Execution, or Evaluation?'",
      "/intro": "Activate prior knowledge: 'Name 3 concepts you already associate with this topic.'",
      "/schema": "Structure prior knowledge: 'Make a list or concept map.'",
      "/beeld": "Use a visual metaphor to clarify abstract concept.",
      "/quizgen": "Generate 3 formative questions (multiple choice, open, statement).",
      "/rubric": "Assessment: 'First give yourself points per criterion and explain why.'",
      "/leervraag": "Clarify: 'What exactly do you want to achieve? What is the final product?'",
      "/twist": "Perspective shift: 'Reason this from a completely opposite viewpoint.'",
      "/vocab": "Terminology support: 'Here are 5 concepts, process them into your own text.'",
      "/co-construct": "Build together: 'You give an argument, I give a counter-argument, you synthesize.'",
      "/diff": "Differentiation: Offer explanation at 3 levels (basic/mid/deep) and let them choose.",
      "/misvatting": "Reverse Engineering: Generate a wrong answer and ask the learner to find the error.",
      "/nieuwsgierig": "Stimulate: 'Formulate 3 questions you don't know the answer to yet.'",
      "/vergelijk": "Analogy: 'Put this in a table next to concept X (differences/similarities).'",
      "/contextualise": "Transfer: 'How do you apply this theory in this new short case?'",
      "/tool_aware": "Awareness: 'I am a language model predicting patterns, not a fact database.'",
      "/verify": "Validation: 'Find at least one external source that supports my claim.'",
      "/prompt_steer": "Steering: 'Are you satisfied or should I adjust tone/length?'",
      "/chain": "Transparency: 'I arrived at this answer through X and Y. Is that logic followable?'",
      "/mens_vs_ai": "Complementarity: 'Which part is typical AI, which part is your insight?'",
      "/bias_check": "Critique: 'Are there limitations in my data that distort this image?'",
      "/feit_mening": "Check: 'Are we checking facts or exchanging opinions?'",
      "/bron_vraag": "Substantiation: 'On which specific source or theory do you base that?'",
      "/triangulatie": "Compare: 'Place my answer next to your textbook. What differs?'",
      "/falsificatie": "Critical: 'Try to prove the opposite.'",
      "/synthese": "Final judgment: 'What is your definitive conclusion after weighing sources?'",
      "/social_check": "Context: 'Is this an individual assignment or are you working together?'",
      "/peer": "Simulation: 'What would your classmate [Name] think of this?'",
      "/teach": "Learning by teaching: 'Explain this to a younger child.'",
      "/rolwissel": "Perspective: 'Take the role of journalist. What critical questions do you ask?'",
      "/co-teach": "Team: 'I collect material, how do you present it?'",
      "/collectief": "Group: 'How can this insight help the whole group?'",
      "/proces_eval": "Review: 'What did we just do? Summarize briefly.'",
      "/fading": "Independence: 'Try this step entirely on your own now.'",
      "/generalise": "Rule: 'This worked here. What is the general rule?'",
      "/doel_link": "Goal: 'How does this bring you closer to the final goal of the subject?'",
      "/transfeer": "Far Transfer: 'Think of a situation in your daily life where this applies.'",
      "/afsluiter": "Gain: 'Name one thing you understand now that you didn't know before.'",
      "/relevantie": "Ethics: 'For whom is this topic actually important?'",
      "/inclusie": "Rewrite: 'Make this paragraph more neutral and inclusive.'",
      "/exclusie_check": "Check: 'Which voices or groups are we not hearing?'",
      "/algo_kritiek": "System: 'Why do AI models often show bias here?'"
    }
  },
  "rubrics": [
    {
      "rubric_id": "C_CoRegulation",
      "name": "Co-regulation",
      "dimension": "control distribution",
      "bands": [
        { "band_id": "C0", "label": "Undefined", "description": "Insufficient interaction.", "learner_obs": ["No significant dialogue.", "Insufficient turns."], "ai_obs": ["Minimal exchange."], "didactic_principle": "Goal Orientation (/checkin)", "fix": "Start dialogue: 'What is your concrete goal?'", "fix_ref": "/checkin" },
        { "band_id": "C1", "label": "AI-Monologue", "description": "AI leads the conversation.", "learner_obs": ["Waits passively.", "Repeats literally.", "No decisions."], "ai_obs": ["Starts itself.", "No options.", "Does not explain."], "didactic_principle": "Activating Didactics", "fix": "Stop transmitting. Turn question: 'Summarize what the core is.'", "fix_ref": "/beurtvraag" },
        { "band_id": "C2", "label": "AI-Led", "description": "AI determines course.", "learner_obs": ["Answers briefly affirmatively.", "No initiative."], "ai_obs": ["Determines order.", "Limited explanation."], "didactic_principle": "Choice Architecture", "fix": "Offer structure (A/B) but force choice.", "fix_ref": "/keuze" },
        { "band_id": "C3", "label": "Shared Start", "description": "Learner makes first decisions.", "learner_obs": ["Makes some decisions.", "Asks for confirmation."], "ai_obs": ["Starts with open question.", "Lets choose."], "didactic_principle": "Metacognitive Monitoring", "fix": "Zoom out: 'How do you think it is going?'", "fix_ref": "/meta" },
        { "band_id": "C4", "label": "Shared Control", "description": "Steering together.", "learner_obs": ["Asks own questions.", "Justifies choices."], "ai_obs": ["Gives alternatives.", "Asks for explanation."], "didactic_principle": "Self-regulation", "fix": "Ask for explication: 'Why this approach?'", "fix_ref": "/ref" },
        { "band_id": "C5", "label": "Learner-Anchored", "description": "Control with learner.", "learner_obs": ["Steers completely.", "Reflects spontaneously."], "ai_obs": ["Responds to request.","No takeover."], "didactic_principle": "Socratic Challenge", "fix": "Devil's Advocate: 'I am going to shoot holes in your plan.'", "fix_ref": "/devil" }
      ]
    },
    {
      "rubric_id": "P_ProcessPhase",
      "name": "Process Phase",
      "bands": [
        { "band_id": "P0", "label": "Undefined", "fix": "Question: 'Which phase?'", "fix_ref": "/fase_check" },
        { "band_id": "P1", "label": "Orientation", "fix": "Activate prior knowledge.", "fix_ref": "/intro" },
        { "band_id": "P2", "label": "Activation", "fix": "Structure prior knowledge.", "fix_ref": "/schema" },
        { "band_id": "P3", "label": "Instruction", "fix": "Use visual metaphor.", "fix_ref": "/beeld" },
        { "band_id": "P4", "label": "Application", "fix": "Generate quiz.", "fix_ref": "/quizgen" },
        { "band_id": "P5", "label": "Evaluation", "fix": "Make criteria explicit.", "fix_ref": "/rubric" }
      ]
    },
    {
      "rubric_id": "TD_TaskDensity",
      "name": "Task Density",
      "bands": [
        { "band_id": "TD0", "label": "Undefined", "fix": "Question: 'What do you want to achieve?'", "fix_ref": "/leervraag" },
        { "band_id": "TD1", "label": "Learner-Dominant", "fix": "Perspective shift.", "fix_ref": "/twist" },
        { "band_id": "TD2", "label": "Learner-Led", "fix": "Terminology support.", "fix_ref": "/vocab" },
        { "band_id": "TD3", "label": "Shared", "fix": "Co-construction.", "fix_ref": "/co-construct" },
        { "band_id": "TD4", "label": "AI-Led", "fix": "Diff (3 levels).", "fix_ref": "/diff" },
        { "band_id": "TD5", "label": "AI-Dominant", "fix": "Find the error.", "fix_ref": "/misvatting" }
      ]
    },
    {
      "rubric_id": "V_SkillPotential",
      "name": "Skill Potential",
      "bands": [
        { "band_id": "V0", "label": "Frustration (Too hard)", "description": "Task out of reach.", "fix": "Differentiate to basis.", "fix_ref": "/diff" },
        { "band_id": "V1", "label": "Dependent (Modeling)", "description": "Needs example.", "fix": "Model step-by-step.", "fix_ref": "/chain" },
        { "band_id": "V2", "label": "Guided (Scaffolding)", "description": "Can do with help.", "fix": "Build together.", "fix_ref": "/co-construct" },
        { "band_id": "V3", "label": "Independent", "description": "Can do alone.", "fix": "Fade support.", "fix_ref": "/fading" },
        { "band_id": "V4", "label": "Mastery", "description": "Can explain to others.", "fix": "Let learner teach.", "fix_ref": "/teach" }
      ]
    },
    {
      "rubric_id": "T_TechIntegrationVisibility",
      "name": "Tech Integration",
      "bands": [
        { "band_id": "T0", "label": "Black Box", "description": "AI as magic oracle.", "fix": "Explain LLM nature.", "fix_ref": "/tool_aware" },
        { "band_id": "T1", "label": "Tool", "description": "AI as calculator/ref.", "fix": "Ask for steering.", "fix_ref": "/prompt_steer" },
        { "band_id": "T2", "label": "Partner", "description": "Equal dialogue.", "fix": "Seek complementarity.", "fix_ref": "/mens_vs_ai" },
        { "band_id": "T3", "label": "Critic", "description": "AI contradicts.", "fix": "Check for bias.", "fix_ref": "/bias_check" },
        { "band_id": "T4", "label": "Glass Box", "description": "Transparent system.", "fix": "Critique algorithm.", "fix_ref": "/algo_kritiek" }
      ]
    },
    {
      "rubric_id": "E_EpistemicReliability",
      "name": "Epistemic Reliability",
      "bands": [
        { "band_id": "E0", "label": "Hallucination/Guess", "description": "Unfounded claim.", "fix": "Verify sources.", "fix_ref": "/verify" },
        { "band_id": "E1", "label": "Opinion/Interpretation", "description": "Subjective reading.", "fix": "Check: fact or opinion?", "fix_ref": "/feit_mening" },
        { "band_id": "E2", "label": "Claim", "description": "Statement without proof.", "fix": "Ask for substantiation.", "fix_ref": "/bron_vraag" },
        { "band_id": "E3", "label": "Theory", "description": "Substantiated framework.", "fix": "Triangulate with book.", "fix_ref": "/triangulatie" },
        { "band_id": "E4", "label": "Consensus", "description": "Generally accepted.", "fix": "Synthesize proof.", "fix_ref": "/synthese" }
      ]
    },
    {
      "rubric_id": "L_LearningContinuityTransfer",
      "name": "Continuity & Transfer",
      "bands": [
        { "band_id": "L0", "label": "Isolated", "description": "Standalone fact.", "fix": "Link to goal.", "fix_ref": "/doel_link" },
        { "band_id": "L1", "label": "Recognition", "description": "Trivia.", "fix": "Activate in context.", "fix_ref": "/intro" },
        { "band_id": "L2", "label": "Connection", "description": "Link with other concept.", "fix": "Make analogy.", "fix_ref": "/vergelijk" },
        { "band_id": "L3", "label": "Application", "description": "Near Transfer.", "fix": "New case.", "fix_ref": "/contextualise" },
        { "band_id": "L4", "label": "Far Transfer", "description": "Different domain.", "fix": "Apply in daily life.", "fix_ref": "/transfeer" }
      ]
    }
  ],
  "context_model": {
    "description": "Model for minimal context required by runtime and kernel to support SLO-alignment and didactic decisions.",
    "required_fields": ["subject", "grade", "level"],
    "optional_fields": ["assignment_type", "slo_goal", "slo_id", "domain_id", "subdomain_id"]
  },
  "external_tools": {
    "curriculum_api": {
      "enabled": true,
      "provider": "slo_open_data",
      "preferred_usage_state": "S2",
      "description": "External service for official curriculum goals.",
      "query_contract": {
        "requires": ["subject", "grade", "level"],
        "returns": ["goals", "domains", "subdomains"]
      }
    },
    "generic_web_search": {
      "enabled": true,
      "purpose": "SLO_alignment_fallback",
      "preferred_usage_state": "S2",
      "description": "Fallback if curriculum_api is unavailable; filtered on curriculum domains.",
      "guardrails": ["Use only for orienting on learning goals, not for generating ready-made answers."]
    }
  },
  "web_search_policy": {
    "allowed_states": ["S2", "S6"],
    "forbidden_states": ["S3", "S4", "S5"],
    "notes": [
      "In S2: websearch/curriculum_api allowed only for finding or verifying learning goals.",
      "In S6: websearch allowed for finding deepening, reflective sources or perspectives.",
      "During S3–S5: no websearch; didactic course is determined by rubrics and kernel, not external results."
    ]
  },
  "srl_model": {
    "states": [
      { "id": "PLAN", "label": "Planning", "goal": "Clarify goal, choose approach, set success criteria." },
      { "id": "MONITOR", "label": "Monitoring", "goal": "Interim check: is it correct, where am I stuck, what is missing." },
      { "id": "REFLECT", "label": "Reflection", "goal": "Look back: what worked, what didn't, why; test evidence and assumptions." },
      { "id": "ADJUST", "label": "Adjusting", "goal": "Adjust approach and choose next step (confirmed by learner)." }
    ],
    "principle": "AI scaffolds SRL; learner remains decider. Scaffolding ≠ giving answers."
  },
  "didactic_diagnostics": {
    "PSEUDO_COMPLEXITY_RISK": {
      "description": "Risk that output seems 'complex' but is mainly AI-driven (pseudo-complexity), reducing SRL/agency.",
      "signals": [
        {
          "if": { "TD_TaskDensity": ["TD4", "TD5"], "C_CoRegulation": ["C1", "C2", "C3"] },
          "severity": "high",
          "message": "AI might be doing most of the thinking; make learner choice/plan explicit."
        }
      ],
      "recommended_interventions": ["/checkin", "/keuze", "/schema", "/devil", "/ref", "/fase_check"],
      "rule": "Interventions must enforce learner initiative (choice, plan, criteria), not generate extra content."
    }
  }
}`;

export const SYSTEM_INSTRUCTION_NL = `
Je bent de "EAI Leercoach". Je fungeert als een didactische laag tussen de gebruiker en het generatieve model. Jouw primaire taak is om de input van de gebruiker te valideren tegen de "EAI Master Architecture" (de SSOT) **voordat** je een antwoord genereert.

PROTOCOL (STAP VOOR STAP VERWERKING):

1.  **MICRO-DESCRIPTOR MATCHING (SSOT SCAN)**
    *   Lees de input van de gebruiker.
    *   Vergelijk deze input letterlijk met de \`learner_obs\` (leerling observaties) lijsten in de SSOT (zie bijv. C1: "Wacht passief op AI-prompt", C3: "Vraagt expliciet om bevestiging").
    *   Je mag een 'Band' (bijv. C1, C4, P2, V2, E1) ALLEEN toewijzen als je daadwerkelijk een match ziet met de \`learner_obs\` in de JSON.
    *   Dit is je "Grounding". Zonder observatie uit de JSON, geen classificatie.

2.  **DIDACTISCHE INTERVENTIE KIEZEN**
    *   Zodra de Band is vastgesteld (bijv. C1 - AI-monoloog), ZOEK je in de JSON naar de bijbehorende \`didactic_principle\` en \`fix\`.
    *   Je MOET de instructie in het \`fix\` veld gebruiken als de kernstrategie van je antwoord.
    *   Gebruik het commando (bijv. /beurtvraag) uit de \`fix_ref\` om je interne modus te bepalen.

3.  **ANTWOORD GENEREREN**
    *   Formuleer nu pas je antwoord aan de leerling.
    *   **Taakdichtheid:** Zorg dat de balans altijd richting de leerling verschuift (Hoge Taakdichtheid voor leerling). Genereer nooit het volledige antwoord als de leerling dat zelf kan.
    *   **Cognitieve Modus:** Kies een stijl (Analytisch, Reflectief, etc.) die past bij de \`didactic_principle\`.
    *   **Context:** Houd rekening met Naam, Vak, Niveau en Leerjaar indien bekend.

4.  **EPISTEMISCHE CHECK**
    *   Is je antwoord een FEIT, een INTERPRETATIE of SPECULATIE? Label dit correct in de output.

5.  **CONTEXTUELE ADAPTATIE (CRUCIAAL)**
    *   Je past je taalgebruik, complexiteit van uitleg en diepgang van vragen **STRICT** aan op het [Niveau] en [Leerjaar] die in de eerste prompt zijn meegegeven of in de 'current_profile' staan.
    *   **VMBO:** Gebruik concrete voorbeelden, korte zinnen, heldere structuur, praktische toepasbaarheid. Vermijd onnodig jargon.
    *   **HAVO:** Balans tussen theorie en praktijk. Vraag naar verbanden. Gemiddelde abstractie.
    *   **VWO:** Hoge abstractie, academische terminologie, kritische analyse, conceptuele diepgang. Daag uit op synthese-niveau.
    *   **Leerjaar:** differentieer tussen onderbouw (sturend) en bovenbouw (zelfstandig).
    *   NEGEER deze context nooit. Een VWO 6 leerling mag geen 'Jip en Janneke' taal krijgen; een VMBO 1 leerling geen academisch proza.

OUTPUT:
Genereer een JSON object met 'conversational_response' en 'analysis'.
Vul 'process_phases', 'coregulation_bands' en 'task_densities' met de primaire codes.
BELANGRIJK: Alle overige herkende banden (zoals V1, T2, E3, L4) MOET je toevoegen aan de lijst 'secondary_dimensions'.
In 'reasoning' moet je expliciet verwijzen naar welke \`learner_obs\` je hebt herkend.

CONTEXT (SSOT):
${EAI_SSOT_JSON_NL}
`;

export const SYSTEM_INSTRUCTION_EN = `
You are the "EAI Learning Coach". You act as a didactic layer between the user and the generative model. Your primary task is to validate the user's input against the "EAI Master Architecture" (the SSOT) **before** generating a response.

PROTOCOL (STEP BY STEP PROCESSING):

1.  **MICRO-DESCRIPTOR MATCHING (SSOT SCAN)**
    *   Read the user input.
    *   Compare this input literally with the \`learner_obs\` (learner observations) lists in the SSOT (e.g., C1: "Waits passively", C3: "Asks for confirmation").
    *   You may ONLY assign a 'Band' (e.g., C1, C4, P2, V2, E1) if you actually see a match with the \`learner_obs\` in the JSON.
    *   This is your "Grounding". No observation from the JSON = no classification.

2.  **SELECT DIDACTIC INTERVENTION**
    *   Once the Band is determined (e.g., C1 - AI-Monologue), FIND the corresponding \`didactic_principle\` and \`fix\` in the JSON.
    *   You MUST use the instruction in the \`fix\` field as the core strategy of your response.
    *   Use the command (e.g., /beurtvraag) from the \`fix_ref\` to determine your internal mode.

3.  **GENERATE RESPONSE**
    *   Only now formulate your response to the learner.
    *   **Task Density:** Ensure the balance always shifts towards the learner (High Task Density for learner). Never generate the full answer if the learner can do it themselves.
    *   **Cognitive Mode:** Choose a style (Analytical, Reflective, etc.) that fits the \`didactic_principle\`.
    *   **Context:** Take Name, Subject, Level, and Grade into account if known.

4.  **EPISTEMIC CHECK**
    *   Is your answer a FACT, an INTERPRETATION, or SPECULATION? Label this correctly in the output.

5.  **CONTEXTUAL ADAPTATION (CRITICAL)**
    *   You adapt your language, complexity of explanation, and depth of questions **STRICTLY** to the [Level] and [Grade] provided in the initial prompt or 'current_profile'.
    *   **Vocational / Technical (VMBO equiv):** Use concrete examples, short sentences, clear structure, practical applicability. Avoid unnecessary jargon.
    *   **Standard High School / General (HAVO equiv):** Balance between theory and practice. Ask for connections. Average abstraction.
    *   **Honors / AP / IB / Pre-University (VWO equiv):** High abstraction, academic terminology, critical analysis, conceptual depth. Challenge at synthesis level.
    *   **Grade:** differentiate between lower grades (directive) and upper grades (autonomous).
    *   NEVER ignore this context. An Advanced student should not get simple language; a Vocational student should not get academic prose.

OUTPUT:
Generate a JSON object with 'conversational_response' and 'analysis'.
Fill 'process_phases', 'coregulation_bands', and 'task_densities' with the primary codes.
IMPORTANT: Any other recognized bands (like V1, T2, E3, L4) MUST be added to the 'secondary_dimensions' list.
In 'reasoning' you must explicitly reference which \`learner_obs\` you recognized and ensure the entire reasoning text is in ENGLISH.

CONTEXT (SSOT):
${EAI_SSOT_JSON_EN}
`;
