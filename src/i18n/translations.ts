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
  flags: { H: string; 'H!': string; A: string; L: string; B: string }
  search: { placeholder: string; allCategories: string; noResults: string; resultsCount: string }
  logForm: {
    title: string
    editTitle: string
    dateTime: string
    searchFood: string
    ingredients: string
    remove: string
    mealScore: string
    daosinLabel: string
    symptomsTitle: string
    intensity: string
    otherSymptomPlaceholder: string
    save: string
    cancel: string
    addAtLeastOne: string
    saved: string
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
      3: 'Serve Daosin',
      unsure: 'Dato incerto',
    },
    flags: {
      H: 'Ricco di istamina',
      'H!': 'Altamente deperibile, formazione rapida di istamina',
      A: 'Altre ammine biogene',
      L: 'Liberatore di mediatori dei mastociti',
      B: 'Bloccante della diammina ossidasi',
    },
    search: {
      placeholder: 'Cerca un alimento...',
      allCategories: 'Tutte le categorie',
      noResults: 'Nessun alimento trovato',
      resultsCount: 'risultati',
    },
    logForm: {
      title: 'Aggiungi pasto',
      editTitle: 'Modifica pasto',
      dateTime: 'Data e ora',
      searchFood: 'Cerca alimento da aggiungere',
      ingredients: 'Ingredienti del pasto',
      remove: 'Rimuovi',
      mealScore: 'Punteggio pasto',
      daosinLabel: 'Ho preso Daosin',
      symptomsTitle: 'Sintomi post-pasto',
      intensity: 'Intensità',
      otherSymptomPlaceholder: 'Descrivi il sintomo...',
      save: 'Salva pasto',
      cancel: 'Annulla',
      addAtLeastOne: 'Aggiungi almeno un alimento prima di salvare.',
      saved: 'Pasto salvato.',
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
      daosinTaken: 'Daosin preso',
      daosinNotTaken: 'Daosin non preso',
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
      3: 'Needs Daosin',
      unsure: 'Uncertain data',
    },
    flags: {
      H: 'Rich in histamine',
      'H!': 'Highly perishable, rapid histamine formation',
      A: 'Other biogenic amines',
      L: 'Mast cell mediator liberator',
      B: 'Diamine oxidase blocker',
    },
    search: {
      placeholder: 'Search a food...',
      allCategories: 'All categories',
      noResults: 'No food found',
      resultsCount: 'results',
    },
    logForm: {
      title: 'Add meal',
      editTitle: 'Edit meal',
      dateTime: 'Date and time',
      searchFood: 'Search a food to add',
      ingredients: 'Meal ingredients',
      remove: 'Remove',
      mealScore: 'Meal score',
      daosinLabel: 'I took Daosin',
      symptomsTitle: 'Post-meal symptoms',
      intensity: 'Intensity',
      otherSymptomPlaceholder: 'Describe the symptom...',
      save: 'Save meal',
      cancel: 'Cancel',
      addAtLeastOne: 'Add at least one food before saving.',
      saved: 'Meal saved.',
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
      daosinTaken: 'Daosin taken',
      daosinNotTaken: 'Daosin not taken',
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
