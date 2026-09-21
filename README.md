# DAO Diario Istamina

PWA per gestire l'intolleranza all'istamina (DAO): ricerca alimenti sulla tabella di compatibilità SIGHI, chat con riconoscimento testo/foto etichette, e diario pasti con regola automatica "serve Daosin". Bilingue IT/EN, dark mode, installabile su iOS e Android.

Tutti i dati (diario pasti, sintomi) restano **solo sul dispositivo** in IndexedDB. Nessun backend, nessun account, nessuna chiamata di rete tranne i font di Google e, se attivata, l'OCR on-device di Tesseract.js.

## Sviluppo locale

```bash
npm install
npm run dev
```

## Build di produzione

```bash
npm run build
npm run preview
```

## Dati

`src/data/sighi-foods.json` è generato da `scripts/extract_sighi.py` a partire dal PDF ufficiale SIGHI (`SIGHI-FoodList_IT_Histamin_alphabetisch_inKategorien.pdf`), con estrazione posizionale delle colonne per gestire correttamente le righe multi-linea.

## Deploy

Ogni push su `main` pubblica automaticamente su GitHub Pages tramite `.github/workflows/deploy.yml`.

## Avviso

Questa app non è un dispositivo medico e non sostituisce un parere medico. Le indicazioni si basano sulla tabella SIGHI e sono linee guida generali, non una garanzia di tolleranza individuale.
