import pdfplumber, json, re, unicodedata

SRC = "SIGHI-FoodList_IT_Histamin_alphabetisch_inKategorien.pdf"

CHAR_SUBS = {'Ł':'è','ø':'ù','¨':'è','Æ':'á','Ø':'é','\xa0':' '}
CID_RE = re.compile(r'\(cid:(\d+)\)')
def clean(s):
    s = CID_RE.sub(lambda m: chr(int(m.group(1))), s)
    for k,v in CHAR_SUBS.items():
        s = s.replace(k,v)
    return s

def bucket(x0):
    if x0 < 28: return 'cat'
    if x0 < 45: return 'subcat'
    if x0 < 62: return 'score'
    if x0 < 74: return 'flagH'
    if x0 < 86: return 'flagA'
    if x0 < 97: return 'flagL'
    if x0 < 106: return 'flagB'
    if x0 < 336: return 'name'
    return 'notes'

def slugify(s):
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip('-')

pdf = pdfplumber.open(SRC)

rows = []
current_category = None
current_subcategory = None
current_row = None

def flush_row():
    global current_row
    if current_row is not None:
        rows.append(current_row)
    current_row = None

for pageidx in range(3, 31):  # pages 4..31 (0-indexed 3..30)
    page = pdf.pages[pageidx]
    words = page.extract_words(use_text_flow=False, keep_blank_chars=False)
    min_top = 140 if pageidx == 3 else 45
    words = [w for w in words if w['top'] >= min_top]
    # cluster into visual lines by proximity of 'top'
    words_sorted = sorted(words, key=lambda w: (w['top'], w['x0']))
    lines = []
    for w in words_sorted:
        placed = False
        for line in lines:
            if abs(line['top'] - w['top']) <= 4.0:
                line['words'].append(w)
                placed = True
                break
        if not placed:
            lines.append({'top': w['top'], 'words': [w]})
    lines.sort(key=lambda l: l['top'])

    for line in lines:
        ws = sorted(line['words'], key=lambda w: w['x0'])
        full_text = clean(' '.join(w['text'] for w in ws))
        # skip footer line
        if re.match(r'^\d{2}\.\d{2}\.\d{4}', full_text):
            continue
        buckets = {'cat': [], 'subcat': [], 'score': [], 'flagH': [], 'flagA': [], 'flagL': [], 'flagB': [], 'name': [], 'notes': []}
        for w in ws:
            b = bucket(w['x0'])
            buckets[b].append(clean(w['text']))

        if buckets['cat']:
            flush_row()
            current_category = ' '.join(buckets['cat'] + buckets['subcat'] + buckets['score'] + buckets['flagH'] + buckets['flagA'] + buckets['flagL'] + buckets['flagB'] + buckets['name'] + buckets['notes']).strip()
            current_subcategory = None
            continue
        if buckets['subcat']:
            flush_row()
            current_subcategory = ' '.join(buckets['subcat'] + buckets['score'] + buckets['flagH'] + buckets['flagA'] + buckets['flagL'] + buckets['flagB'] + buckets['name'] + buckets['notes']).strip()
            continue
        if buckets['score']:
            flush_row()
            score_txt = buckets['score'][0]
            current_row = {
                'categoria': current_category,
                'sottocategoria': current_subcategory,
                'score_raw': score_txt,
                'flagH': list(buckets['flagH']),
                'flagA': list(buckets['flagA']),
                'flagL': list(buckets['flagL']),
                'flagB': list(buckets['flagB']),
                'name_parts': list(buckets['name']),
                'notes_parts': list(buckets['notes']),
            }
            continue
        # continuation line (no cat/subcat/score) -> belongs to current_row
        if current_row is not None:
            if buckets['name']:
                current_row['name_parts'].extend(buckets['name'])
            if buckets['notes']:
                current_row['notes_parts'].extend(buckets['notes'])
        else:
            print("WARNING: orphan continuation line, page", pageidx+1, full_text)

flush_row()

print("Total raw rows parsed:", len(rows))

TRADEMARK_FIX = re.compile(r'\b(KAMUT|Kamut|Sottilette|Sottiletta|Kolliphor)fi\b')
def fix_trademark(s):
    return TRADEMARK_FIX.sub(r'\1®', s)

# Build final JSON records
records = []
seen_ids = {}
for r in rows:
    nome_it = ' '.join(r['name_parts']).strip()
    nome_it = fix_trademark(nome_it)
    nome_it = re.sub(r'\s+([,:;)])', r'\1', nome_it)
    nome_it = re.sub(r'\(\s+', '(', nome_it)
    nome_it = re.sub(r'\s{2,}', ' ', nome_it).strip()
    note_it = ' '.join(r['notes_parts']).strip()
    note_it = fix_trademark(note_it)
    note_it = re.sub(r'\s{2,}', ' ', note_it)
    note_it = re.sub(r'\s+([,.;:!?)])', r'\1', note_it)

    score_raw = r['score_raw']
    if score_raw in ('0','1','2','3'):
        punteggio = int(score_raw)
        incerto = False
    else:
        punteggio = None
        incerto = True

    ricco = None
    if r['flagH']:
        h = r['flagH'][0]
        ricco = h if h in ('H','H!') else None

    base_id = slugify(nome_it) or 'voce'
    idx = seen_ids.get(base_id, 0)
    seen_ids[base_id] = idx + 1
    rec_id = base_id if idx == 0 else f"{base_id}-{idx+1}"

    rec = {
        "id": rec_id,
        "nome_it": nome_it,
        "nome_en": "",
        "categoria": r['categoria'],
        "sottocategoria": r['sottocategoria'],
        "punteggio_istamina": punteggio,
        "ricco_istamina": ricco,
        "altre_ammine": bool(r['flagA']),
        "liberatore": bool(r['flagL']),
        "bloccante": bool(r['flagB']),
        "note_it": note_it,
    }
    if incerto:
        rec["punteggio_incerto"] = True
    records.append(rec)

with open('src/data/sighi-foods.json', 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print("Total records written:", len(records))
