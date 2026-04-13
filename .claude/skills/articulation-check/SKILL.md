---
name: articulation-check
description: Zadaje pytania z articulation bank (`docs/articulation-bank.md`) i aktualizuje wpisy ze scorami i historią. Używaj gdy session-end potrzebuje sprawdzić retencję tematów narracyjnych (L2), gdy Jakub wyraźnie prosi "zadaj mi pytania z banku", "sprawdź mnie z X tematów", "poćwiczmy retencję". Jeden wspólny protokół dla session-end (default 2 pytania) i ad-hoc użycia. Nie używaj dla tematów L3 (praktyczne checkpointy z roadmap) — to inne narzędzie.
argument-hint: "[liczba pytań, domyślnie 2] [opcjonalny filter: milestone lub temat]"
---

# Articulation Check Protocol

Wybierasz pytania z articulation bank i prowadzisz quiz. To jest reużywalny komponent — wywoływany przez `session-end` (default 2 pytania) lub ad-hoc przez Jakuba ("2 pytania z banku", "5 pytań z M4 na dress rehearsal").

## Kiedy używać

- **Z session-end:** automatycznie, 2 pytania, po explain phase
- **Ad-hoc:** Jakub mówi "zadaj mi pytania z banku", "sprawdź mnie z X tematów", "chcę ćwiczyć retencję" — wtedy uruchamiasz bezpośrednio bez całego session-end protocol
- **Dress rehearsal:** Jakub mówi "mam rozmowę za X dni, symuluj mi interview" → uruchom z `count=5` i zignoruj spacing guard (dress rehearsal to dedykowana symulacja, nie retencja)

**NIE używaj dla:**
- Tematów praktycznych (L3) z `fullstack-roadmap.md` — to weryfikuje się przez kod, nie quiz
- Wyjaśnienia nowego tematu (score 0 w banku) — to robi session-start przez **task briefing**, nie articulation-check

## Flow — wysokopoziomowy

1. Wczytaj bank → 2. Filtruj score-0 → 3. Sortuj priority → 4. Spacing guard → 5. Wybierz top N → 6. Dla każdego: pytanie → dopytanie → feedback → re-recall jeśli <3.5 → update bank → 7. Podsumowanie

## 1. Wczytaj bank

`Read` na `docs/articulation-bank.md`. Pamiętaj strukturę wpisu:

```markdown
### Topic name (Mx)

**Score:** X.X/5 | **Last tested:** YYYY-MM-DD | **Streak:** N/2

Historia:
- YYYY-MM-DD (tag): X.X/5 — opis
- YYYY-MM-DD (tag): X.X/5 — opis

Do domknięcia:
- specific gap 1
- specific gap 2
```

**Edge case:** jeśli bank jest pusty lub ma <N non-score-0 candidates → pomiń skill i zwróć: **"Bank ma X eligible candidates — za mało na pełny articulation check. Sesja zostaje bez retention quizu."**. Session-end log'uje to w "Articulation check" sekcji jako "N/A — empty/insufficient bank".

## 2. Filter — usuń score-0

**Score-0 entries są pomijane.** Mają `**Score:** 0` i `**Last tested:** never` — nie możesz testować czegoś czego Jakub nigdy nie widział. Te tematy czekają na task briefing w session-start (pierwsza ekspozycja → score 1.5/5 → wchodzą do rotation).

Po filtracji masz listę "eligible candidates" — każdy ma score ≥1.0 i last tested jako konkretna data (nie "never").

## 3. Priority-based sort

Sortuj eligible candidates po kryteriach (leksykograficznie — najpierw (a), przy remisie (b), przy remisie (c)):

**(a) Score rosnąco** — słabe tematy pierwsze (1.0, 1.5, 2.0, ..., 5.0)

**(b) Days since last tested malejąco** — dawno nietestowane pierwsze

- Oblicz: `dayDiff = today - last_tested_date` (w dniach)
- Większy dayDiff = wyższy priorytet (więc sortuj malejąco dla tego key)
- Data `never` jest filtrowana w kroku 2, więc nie wchodzi tutaj

**(c) Milestone rosnąco** — M1 przed M2 przed M3... M1 tematy są najstarsze w rotacji, warto je trzymać blisko.

**Cold pool edge case:** jeśli wszystkie eligible candidates mają score ≥4 ("cold pool"), sortowanie dalej działa — najstarsze dawno nietestowane dostają priorytet. To jest OK, confirmation rotation.

## 4. Spacing guard (date-based, nie session-count)

**Reguła:** temat musi mieć **last tested ≥3 dni temu** żeby kwalifikował się do testu w tej sesji.

Powód: session-count jest niewykonalny (bank nie rejestruje numeru sesji). Date-based jest stabilny i zgodny z SRS philosophy (spacing effect wymaga realnej przerwy czasowej).

**Implementacja:**

1. Dla każdego candidate z kroku 3, policz `dayDiff = today - last_tested_date`
2. Jeśli `dayDiff < 3` → pomiń (wybierz kolejnego z listy priority)
3. Jeśli `dayDiff ≥ 3` → kwalifikuje się

**Edge case — wszyscy kandydaci pominięci przez spacing guard:** jeśli po filtrze spacing zostało 0 topics → zwróć: **"Wszystkie eligible topics były testowane w ostatnich 3 dniach — spacing guard blokuje sensowny retencyjny test. Articulation check pominięty tej sesji."**. Session-end log'uje "Articulation check: skipped — spacing guard (all topics tested within 3 days)".

**Dress rehearsal override:** gdy Jakub wyraźnie prosi o symulację rozmowy, spacing guard jest **wyłączony** — wtedy liczy się pokrycie tematów, nie retencja.

## 5. Wybierz top N

N default = 2 (gdy wywoływane z session-end). Argument liczby nadpisuje default.

- Jeśli `N > |eligible candidates after spacing|` → ogranicz do dostępnych. Powiedz Jakubowi: "Dostępnych X pytań (mniej niż zapytano N) — lecę z X".

## 6. Quiz protocol (per pytanie)

Ten sam protokół dla każdego pytania:

### 6.1 Zadaj pytanie

Wyślij **TYLKO pytanie**, czekaj na odpowiedź. Pytanie musi być **specyficzne i targetować "Do domknięcia"** z banku — tam są konkretne braki z poprzednich testów. NIE generyczne pytania typu "wytłumacz X".

Format:

```
**Pytanie [1/N]:** [specyficzne pytanie targetujące braki]

_(z banku: [topic name] | score: X.X/5 | last tested: YYYY-MM-DD | streak: N/2)_
```

### 6.2 Jakub odpowiada — czekaj

Nie przerywaj, nie podpowiadaj przed odpowiedzią.

### 6.3 Dopytaj 1-2 razy

Patrz "Do domknięcia" w banku. Zadaj pytania pogłębiające:

- "A co z [specific gap from 'Do domknięcia']?"
- "Daj mi konkretny przykład z IRONLOG"
- "A dlaczego tak a nie inaczej?"

**Max 2 dopytania** — więcej to scaffolding który zawyża score. Jeśli Jakub wciąż nie ma odpowiedzi po 2 dopytaniach → przejdź do oceny.

### 6.4 Feedback + score (max 4 zdania)

- Co trafne
- Co nadal brakuje
- Score X.X/5 (skala 1-5 z 0.5 krokami)

### 6.5 Re-recall (obowiązkowy przy score <3.5)

Próg to **ściśle <3.5**. Score = 3.5 → BEZ re-recall (próg odhaczania). Score = 3.4 → re-recall.

```
"OK, powiedz mi to jeszcze raz uwzględniając to co pominąłeś."
```

Czekaj na pełną odpowiedź. **Score zostaje** — re-recall wbudowuje feedback w encoding, nie zmienia oceny pierwszej produkcji (Roediger & Karpicke, 2006).

### 6.6 Update bank entry (atomic Edit pattern)

**Każde pytanie = jedno wywołanie `Edit` tool** z wieloliniowym `old_string → new_string` które aktualizuje cały wpis naraz. To jest **atomic update** — bank nigdy nie trafia w niespójny stan.

**Wzorzec Edit dla istniejącego wpisu z historią:**

`old_string`:
```
### [Topic name] (Mx)

**Score:** [OLD_SCORE]/5 | **Last tested:** [OLD_DATE] | **Streak:** [OLD_STREAK]/2

Historia:
- [pierwsza linia historii]
```

`new_string`:
```
### [Topic name] (Mx)

**Score:** [NEW_SCORE]/5 | **Last tested:** [TODAY]/2 | **Streak:** [NEW_STREAK]/2

Historia:
- [TODAY] (articulation-check): [NEW_SCORE]/5 — [co trafne, co brakowało, 1 zdanie]
- [pierwsza linia historii]
```

Dzięki temu że `old_string` zawiera unikalny `### [Topic name] (Mx)` header + następną linię "Score" + pierwszą linię historii, Edit trafia **jednoznacznie w jeden wpis** i aktualizuje 3 rzeczy (Score/Last tested/Streak + dodaje historię) w jednym call. Atomowe.

**Nie aktualizuj "Do domknięcia" w tym samym Edit** — to drugi Edit (osobny), bo nie zawsze jest zmiana:

- Jeśli Jakub domknął gap (pokrył w odpowiedzi) → usuń z listy
- Jeśli ujawnił nowy gap → dodaj

Drugi Edit może być pominięty jeśli nie było zmian w gap listy.

### 6.7 Streak logic (explicit)

Oblicz `NEW_STREAK` według reguł:

```
IF NEW_SCORE < 3.5:
    NEW_STREAK = 0              # zwykły miss resetuje streak
    IF jest "lapse" (patrz 6.8):
        MARK_LAPSE = true        # zapisz w notatce do historii
ELSE (NEW_SCORE ≥ 3.5):
    prev_test = poprzedni wpis historii (jeśli istnieje)
    IF prev_test istnieje 
       AND prev_test.score ≥ 3.5 
       AND (today - prev_test.date) ≥ 3 dni:
        NEW_STREAK = OLD_STREAK + 1   # prawdziwy streak
    ELSE:
        NEW_STREAK = 1                # reset do 1 (pierwszy test w streak)
```

**Edge case:** `OLD_STREAK` już = 2 (temat powinien być promowany do mastered w poprzedniej sesji, ale flaga nie została dodana). Traktuj `OLD_STREAK = 1` w obliczeniach (bezpieczny default) i **uruchom check promocji** w kroku 6.9 — prawdopodobnie teraz doda mastered flag.

### 6.8 Lapse detection

**Przed update'em streak**, sprawdź czy to lapse:

- Pobierz ostatnie ≥2 wpisy historii (przed dzisiejszym)
- Czy oba miały score ≥4? → TAK = opanowany wcześniej
- Czy NEW_SCORE < 3.5? → TAK = aktualny regres
- OBA warunki → **LAPSE**

Jeśli LAPSE:
- `NEW_STREAK = 0` (już ustawione w 6.7)
- Dodaj do notatki w historii: `"⚠ lapse — wcześniej ≥4, teraz <3.5"`
- Temat automatycznie wejdzie do hot pool w kolejnych rotacjach (bo score <3.5)

### 6.9 Mastery promotion (NIE usuwanie)

Bank **nic nie usuwa**. Opanowane tematy zostają z pełną historią — zmienia się tylko częstotliwość rotacji. Filozofia: Ebbinghaus forgetting curve dotyczy wszystkich tematów, historia = wartość.

Po update'cie streak sprawdź warunki promocji:

1. `NEW_STREAK == 2` → warunek 1 OK
2. `(today - prev_test.date) ≥ 3 dni` → warunek 2 OK (już sprawdzone w 6.7)
3. **Brak lapse w ostatnich 3 wpisach historii** (włącznie z dzisiejszym) → warunek 3 OK
4. Wpis **nie ma jeszcze flagi `**Status:** mastered`** (już promoted → skip, żeby nie nadpisywać daty)

Jeśli warunki 1-4 spełnione → **promote do mastered**: dodaj pole `**Status:** mastered (since [TODAY])` do nagłówka wpisu. Wpis zostaje, historia zostaje.

**Edit pattern dla promocji (drugi Edit po atomic update z 6.6):**

`old_string`:
```
**Score:** [NEW_SCORE]/5 | **Last tested:** [TODAY] | **Streak:** 2/2
```

`new_string`:
```
**Score:** [NEW_SCORE]/5 | **Last tested:** [TODAY] | **Streak:** 2/2 | **Status:** mastered (since [TODAY])
```

**Powiedz Jakubowi:** "Temat '[name]' promoted do mastered — zostaje w banku, ale rzadko wraca do rotation (30+ dni). Nie znika."

### 6.9a Demotion z mastered (lapse detection for mastered topics)

Jeśli topic ma już flagę `**Status:** mastered` i dostaje score <3.5 w tym teście, to jest **confirmation failure = demotion**:

1. Usuń pole `**Status:** mastered (since YYYY-MM-DD)` z nagłówka
2. `NEW_STREAK = 0` (już ustawione w 6.7)
3. Dodaj linię do Historii: `- [TODAY] (articulation-check): [SCORE]/5 — ⚠ demoted from mastered — score regressed`
4. Topic automatycznie wraca do hot pool w kolejnych rotacjach

**Powiedz Jakubowi:** "Temat '[name]' demoted z mastered — wraca do aktywnej rotacji, słabość się pojawiła."

### 6.10 Mastered topics w priority selection

Topic z flagą `**Status:** mastered` ma inne zasady wejścia do rotation:

- **Default (session-end):** mastered topic wchodzi do kandydatów **tylko jeśli** `(today - Last tested) ≥ 30 dni`. Jeśli mniej — skipujesz niezależnie od score/milestone.
- **Dress rehearsal (explicit Jakub request):** mastered topics są w pool jak wszystkie (spacing guard off)
- **Explicit Jakub request po nazwie** ("sprawdź mnie z JWT flow"): mastered topics są zawsze kandydatami

Implementacja: krok 3 (priority sort) i krok 4 (spacing guard) mają dodatkowy filter — mastered + last_tested <30 dni temu → skip.

### 6.11 Score = 3.5 — boundary behavior

Score = 3.5 to **dokładnie próg** mastery promotion. Reguły:

- Re-recall: **NIE** (próg to <3.5, nie ≤3.5)
- Streak wzrost: **TAK** (≥3.5 kwalifikuje)
- Mastery promotion possible: **TAK** (z streak 2/2 + spacing + no lapse)
- Lapse check: NIE (3.5 nie jest <3.5, więc nie liczy jako regres)

To jest intencjonalne: 3.5 = "solid mid+ answer" = gotowy do rozmowy.

## 7. Podsumowanie na końcu

Po ostatnim pytaniu — krótkie podsumowanie (max 5 linii):

```
**Articulation check — wyniki:**
- [Topic 1]: X.X/5 (poprzednio Y.Y) — [trend: progres/stagnacja/spadek/lapse]
- [Topic 2]: X.X/5 (poprzednio Y.Y) — [trend]

Promoted to mastered dzisiaj: [lista lub "brak"]
Demoted from mastered dzisiaj: [lista lub "brak"]
Lapse dzisiaj: [lista lub "brak"]
Nowe słabości (Do domknięcia added): [konkrety lub "brak"]
```

Session-end kopiuje to do session logu.

## Zasady

- **Jedno pytanie na raz** — nigdy nie zasypuj
- **Hypothesis first** — pytanie → odpowiedź → dopytanie → odpowiedź → feedback
- **Specyficzne pytania z "Do domknięcia"** — nie generyczne
- **Re-recall tylko przy <3.5** — 3.5 i wyżej nie
- **Atomic Edit per question** — jeden Edit na update wpisu (Score + Last tested + Streak + nowa linia historii)
- **Bank nic nie usuwa** — mastery promotion to dodanie flagi, nie delete. Historia zostaje zawsze.
- **Mastered topics** wracają do rotation rzadko (30+ dni) lub na explicit request
- **Dress rehearsal wyłącza spacing guard** — tylko przy explicit Jakub request

## Argumenty

- **Brak argumentu / session-end default:** 2 pytania, priority-based z całego banku
- **Liczba (np. `5`):** 5 pytań zamiast 2
- **Milestone filter (np. `M4`):** tylko tematy z danego milestone
- **Topic filter (np. `JWT`):** tylko tematy zawierające frazę w nazwie
- **Kombinacja (np. `5 M4`):** 5 pytań z M4
- **`dress-rehearsal`:** spacing guard off, priority pure score ascending (symulacja rozmowy)

## Co NIE robisz

- Nie aktualizujesz `fullstack-roadmap.md` — to robi session-end dla L3 checkpointów
- Nie generujesz fiszek Anki — to robi session-end
- Nie piszesz session logu — to robi session-end (ale zwracasz dane w formacie z kroku 7)
- Nie wywołujesz innych skilli — jesteś samodzielnym komponentem
- Nie dodajesz nowych tematów do banku — to robi session-end gdy nowy temat pojawił się w sesji bez ekspozycji
