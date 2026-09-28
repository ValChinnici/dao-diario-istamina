export interface Translations {
  appName: string
  nav: { home: string; search: string; log: string; history: string }
  home: {
    title: string
    subtitle: string
    highRisk: string
    safe: string
    searchNow: string
    addMeal: string
    viewHistory: string
    noRecentHighRisk: string
    noRecentSafe: string
    weeklyChart: string
    weeklyChartSafe: string
    weeklyChartRisk: string
  }
  badge: { 0: string; 1: string; 2: string; 3: string; unsure: string }
  legend: {
    title: string
    scoreTitle: string
    flagsTitle: string
    scores: { 0: string; 1: string; 2: string; 3: string; '-': string; '?': string }
    flags: { H: string; 'H!': string; A: string; L: string; B: string }
    note: string
  }
  search: {
    placeholder: string
    allCategories: string
    noResults: string
    resultsCount: string
    daosinWarning: string
    emptyPrompt: string
  }
  logForm: {
    title: string
    editTitle: string
    dateTime: string
    searchFood: string
    ingredients: string
    remove: string
    mealScore: string
    daosinLabel: string
    daosinWarning: string
    symptomsTitle: string
    intensity: string
    otherSymptomPlaceholder: string
    save: string
    cancel: string
    addAtLeastOne: string
    saved: string
    alreadyAdded: string
    preservationToggle: string
    preservation: { fresh: string; reheated: string; canned: string; aged: string; defrosted: string }
  }
  symptoms: {
    mal_di_testa: string
    prurito: string
    orticaria: string
    gonfiore: string
    nausea: string
    tachicardia: string
    altro: string
  }
  history: {
    title: string
    filterDate: string
    filterScore: string
    all: string
    empty: string
    edit: string
    delete: string
    confirmDelete: string
    daosinTaken: string
    daosinNotTaken: string
  }
  info: { title: string; disclaimerTitle: string; disclaimer: string; dataSource: string; privacy: string }
  common: { close: string; back: string; yes: string; no: string; loading: string; language: string }
}

export const translations: Record<'it' | 'en', Translations> = {
  it: {
    appName: 'DAO Diario',
    nav: {
      home: 'Home',
      search: 'Ricerca',
      log: 'Aggiungi pasto',
      history: 'Storico',
    },
    home: {
      title: 'DAO Diario',
      subtitle: "Gestisci la tua intolleranza all'istamina",
      highRisk: 'Ultimi alimenti ad alto rischio',
      safe: 'Ultimi alimenti sicuri',
      searchNow: 'Cerca un alimento ora',
      addMeal: 'Aggiungi pasto',
      viewHistory: 'Vedi storico',
      noRecentHighRisk: 'Nessun alimento ad alto rischio registrato di recente.',
      noRecentSafe: 'Nessun alimento sicuro registrato di recente.',
      weeklyChart: 'Pasti della settimana',
      weeklyChartSafe: 'Sicuri',
      weeklyChartRisk: 'A rischio',
    },
    badge: {
      0: 'Sicuro',
      1: 'Attenzione lieve',
      2: 'Attenzione',
      3: 'Serve DAO',
      unsure: 'Dato incerto',
    },
    legend: {
      title: 'Legenda',
      scoreTitle: 'Punteggio istamina',
      flagsTitle: 'Lettere (H, A, L, B...)',
      scores: {
        0: 'Ben tollerato. Non si prevedono sintomi se consumato in quantità normali.',
        1: 'Moderatamente tollerato, sintomi lievi, il consumo occasionale di piccole quantità è spesso tollerato.',
        2: 'Intollerabile, sintomi evidenti con quantità di consumo normale.',
        3: 'Molto mal tollerato, sintomi gravi.',
        '-': "Non è possibile un'affermazione generalmente valida.",
        '?': 'Informazioni insufficienti o contraddittorie.',
      },
      flags: {
        H: 'Alto contenuto di istamina.',
        'H!': 'Altamente deperibile, formazione rapida di istamina.',
        A: "Altre ammine biogene (oltre all'istamina, es. tiramina, feniletilamina).",
        L: "Liberatore dei mediatori dei mastociti (=liberatore di istamina): non contiene istamina ma ne stimola il rilascio da parte dell'organismo.",
        B: "Bloccante della diammina ossidasi (DAO) o di altri enzimi che degradano l'istamina: può ridurre l'efficacia dell'enzima che smaltisce l'istamina.",
      },
      note: "Una voce può avere più flag insieme (es. 'H A' = alto contenuto di istamina e altre ammine biogene). '?' accanto a un flag significa che quel dato specifico è incerto, non l'intera voce.",
    },
    search: {
      placeholder: 'Cerca un alimento...',
      allCategories: 'Tutte le categorie',
      noResults: 'Nessun alimento trovato',
      resultsCount: 'risultati',
      daosinWarning: 'Si consiglia di assumere un integratore DAO prima di consumarlo.',
      emptyPrompt: 'Digita il nome di un alimento oppure scegli una categoria per iniziare.',
    },
    logForm: {
      title: 'Aggiungi pasto',
      editTitle: 'Modifica pasto',
      dateTime: 'Data e ora',
      searchFood: 'Cerca alimento da aggiungere',
      ingredients: 'Ingredienti del pasto',
      remove: 'Rimuovi',
      mealScore: 'Punteggio pasto',
      daosinLabel: 'Ho preso un integratore DAO',
      daosinWarning: 'Si consiglia un integratore DAO prima di questo pasto.',
      symptomsTitle: 'Sintomi post-pasto',
      intensity: 'Intensità',
      otherSymptomPlaceholder: 'Descrivi il sintomo...',
      save: 'Salva pasto',
      cancel: 'Annulla',
      addAtLeastOne: 'Aggiungi almeno un alimento prima di salvare.',
      saved: 'Pasto salvato.',
      alreadyAdded: 'Già aggiunto',
      preservationToggle: 'Conservazione',
      preservation: {
        fresh: 'Fresco',
        reheated: 'Riscaldato',
        canned: 'In scatola',
        aged: 'Stagionato',
        defrosted: 'Decongelato',
      },
    },
    symptoms: {
      mal_di_testa: 'Mal di testa',
      prurito: 'Prurito',
      orticaria: 'Orticaria',
      gonfiore: 'Gonfiore',
      nausea: 'Nausea',
      tachicardia: 'Tachicardia',
      altro: 'Altro',
    },
    history: {
      title: 'Storico pasti',
      filterDate: 'Filtra per data',
      filterScore: 'Filtra per punteggio',
      all: 'Tutti',
      empty: 'Nessun pasto registrato.',
      edit: 'Modifica',
      delete: 'Elimina',
      confirmDelete: 'Eliminare questa voce dallo storico?',
      daosinTaken: 'Integratore DAO preso',
      daosinNotTaken: 'Integratore DAO non preso',
    },
    info: {
      title: 'Informazioni',
      disclaimerTitle: 'Avviso importante',
      disclaimer:
        "Questa app non è un dispositivo medico e non sostituisce un parere medico. Le indicazioni si basano sulla tabella di compatibilità alimentare SIGHI e sono linee guida generali, non una garanzia di tolleranza individuale. In caso di dubbi o sintomi gravi, consulta il tuo medico.",
      dataSource: 'Fonte dati: SIGHI (Swiss Interest Group Histamine Intolerance)',
      privacy: 'Tutti i tuoi dati restano solo su questo dispositivo. Nessuna informazione viene inviata a server esterni.',
    },
    common: {
      close: 'Chiudi',
      back: 'Indietro',
      yes: 'Sì',
      no: 'No',
      loading: 'Caricamento...',
      language: 'Lingua',
    },
  },
  en: {
    appName: 'DAO Diary',
    nav: {
      home: 'Home',
      search: 'Search',
      log: 'Add meal',
      history: 'History',
    },
    home: {
      title: 'DAO Diary',
      subtitle: 'Manage your histamine intolerance',
      highRisk: 'Recent high-risk foods',
      safe: 'Recent safe foods',
      searchNow: 'Search a food now',
      addMeal: 'Add meal',
      viewHistory: 'View history',
      noRecentHighRisk: 'No high-risk foods logged recently.',
      noRecentSafe: 'No safe foods logged recently.',
      weeklyChart: "This week's meals",
      weeklyChartSafe: 'Safe',
      weeklyChartRisk: 'High risk',
    },
    badge: {
      0: 'Safe',
      1: 'Mild caution',
      2: 'Caution',
      3: 'Needs DAO',
      unsure: 'Uncertain data',
    },
    legend: {
      title: 'Legend',
      scoreTitle: 'Histamine score',
      flagsTitle: 'Letters (H, A, L, B...)',
      scores: {
        0: 'Well tolerated. No symptoms expected if consumed in normal amounts.',
        1: 'Moderately tolerated, mild symptoms, occasional consumption of small amounts is often tolerated.',
        2: 'Intolerable, noticeable symptoms with normal consumption amounts.',
        3: 'Very poorly tolerated, severe symptoms.',
        '-': 'No generally valid statement is possible.',
        '?': 'Insufficient or contradictory information.',
      },
      flags: {
        H: 'High histamine content.',
        'H!': 'Highly perishable, rapid histamine formation.',
        A: 'Other biogenic amines (besides histamine, e.g. tyramine, phenylethylamine).',
        L: 'Mast cell mediator liberator (=histamine liberator): does not itself contain histamine but triggers its release by the body.',
        B: 'Blocker of diamine oxidase (DAO) or other histamine-degrading enzymes: can reduce the effectiveness of the enzyme that clears histamine.',
      },
      note: "An entry can carry more than one flag at once (e.g. 'H A' = high histamine content and other biogenic amines). A '?' next to a flag means that specific piece of data is uncertain, not the whole entry.",
    },
    search: {
      placeholder: 'Search a food...',
      allCategories: 'All categories',
      noResults: 'No food found',
      resultsCount: 'results',
      daosinWarning: 'A DAO enzyme supplement is recommended before eating this.',
      emptyPrompt: 'Type a food name or pick a category to get started.',
    },
    logForm: {
      title: 'Add meal',
      editTitle: 'Edit meal',
      dateTime: 'Date and time',
      searchFood: 'Search a food to add',
      ingredients: 'Meal ingredients',
      remove: 'Remove',
      mealScore: 'Meal score',
      daosinLabel: 'I took a DAO supplement',
      daosinWarning: 'A DAO enzyme supplement is recommended before this meal.',
      symptomsTitle: 'Post-meal symptoms',
      intensity: 'Intensity',
      otherSymptomPlaceholder: 'Describe the symptom...',
      save: 'Save meal',
      cancel: 'Cancel',
      addAtLeastOne: 'Add at least one food before saving.',
      saved: 'Meal saved.',
      alreadyAdded: 'Already added',
      preservationToggle: 'Preservation',
      preservation: {
        fresh: 'Fresh',
        reheated: 'Reheated',
        canned: 'Canned',
        aged: 'Aged',
        defrosted: 'Defrosted',
      },
    },
    symptoms: {
      mal_di_testa: 'Headache',
      prurito: 'Itching',
      orticaria: 'Hives',
      gonfiore: 'Swelling',
      nausea: 'Nausea',
      tachicardia: 'Rapid heartbeat',
      altro: 'Other',
    },
    history: {
      title: 'Meal history',
      filterDate: 'Filter by date',
      filterScore: 'Filter by score',
      all: 'All',
      empty: 'No meals logged.',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Delete this entry from the history?',
      daosinTaken: 'DAO supplement taken',
      daosinNotTaken: 'DAO supplement not taken',
    },
    info: {
      title: 'Information',
      disclaimerTitle: 'Important notice',
      disclaimer:
        'This app is not a medical device and does not replace medical advice. Guidance is based on the SIGHI food compatibility list and is a general guideline, not a guarantee of individual tolerance. If in doubt or experiencing severe symptoms, consult your doctor.',
      dataSource: 'Data source: SIGHI (Swiss Interest Group Histamine Intolerance)',
      privacy: 'All your data stays only on this device. No information is sent to external servers.',
    },
    common: {
      close: 'Close',
      back: 'Back',
      yes: 'Yes',
      no: 'No',
      loading: 'Loading...',
      language: 'Language',
    },
  },
}
