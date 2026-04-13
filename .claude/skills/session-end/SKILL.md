---
name: session-end
description: Zamyka sesję coachingową — explain phase, articulation check (2 pytania z banku), feedback, session log, aktualizacja roadmapy L3. ZAWSZE używaj gdy Jakub kończy pracę: "kończymy", "koniec", "zamykamy", "tyle na dziś", "muszę lecieć", "ostatnie 5 min", albo gdy czas sesji się kończy. Nawet jeśli nie powie wprost "koniec sesji" — jeśli sygnalizuje że kończy, odpal ten skill.
---

# Session End Protocol

Zamykasz sesję coachingową z Jakubem. Wykonaj kroki w kolejności.

## Sesje <20 min — wszystkie wyjątki w jednym miejscu

Dla krótkich sesji (debug call, szybkie pytanie) **pomijasz wszystkie kroki 1-2 i 6-7** (explain phase, articulation check, Anki, rekomendacja). Wykonujesz tylko:

- **Krok 3:** Odhacz L3 jeśli coś ukończyłeś
- **Krok 4:** Skrócony session log (sekcje: "Co robił", "Samodzielność", "Następna sesja")
- **Krok 5:** Update roadmapy jeśli zmieniło się coś w L3

Powrót do pełnego flow gdy sesja ≥20 min.

---

## 1. Explain phase (5 min)

Symuluj code review — Jakub daje overview, Ty wyciągasz pytania o decyzje.

### Flow

1. **Poproś o overview:** "Opowiedz w 2-3 zdaniach co zrobiłeś i jakie kluczowe decyzje podjąłeś"
2. **Czekaj na odpowiedź** — nie przerywaj
3. **Zadaj 3-4 celowane pytania** o decyzje, trade-offy, alternatywy
4. **Czekaj na odpowiedź na KAŻDE pytanie** — nie zasypuj. Jedno follow-up max, potem feedback
5. **Daj feedback** — co dobrze, co pominął

### Zasady

- NIE wymuszaj monologu o 40 plikach — przy dużych taskach nierealne
- Pytania dopasuj do tego co Jakub faktycznie robił — nie generyczne
- Oceń (1-5): 1=nie umie wytłumaczyć, 3=zna koncept brakuje detali, 5=wytłumaczyłby na rozmowie. Hinty obniżają score.

## 2. Articulation check (2 pytania z banku)

Po explain phase wywołaj `articulation-check` skill przez Skill tool.

**Dokładna forma wywołania:**

```
Skill tool:
  skill: "articulation-check"
  args: ""
```

Pusty `args` = default 2 pytania, priority-based selection z całego banku.

Dla dress rehearsal (Jakub wyraźnie prosi) użyj `args: "dress-rehearsal 5"` — 5 pytań, spacing guard off, pure score ascending.

### Co robi articulation-check (za sceną)

1. Wczytuje `docs/articulation-bank.md`
2. Filtruje score-0 topics (wymagają task briefing w session-start, nie quiz)
3. Priority selection: słabe → dawno nietestowane → starsze milestone
4. Spacing guard: min. 3 dni od ostatniego testu per topic
5. Zadaje 2 pytania w protokole: pytanie → dopytanie → feedback → re-recall jeśli <3.5 → atomic update banku
6. **Mastery promotion:** streak 2/2 z ≥3.5, 3+ dni spacing, brak lapse → dodaje flagę `Status: mastered` do wpisu (wpis zostaje w banku z pełną historią)
7. Zwraca podsumowanie: topics, scores, trendy, promoted-to-mastered list, lapse list

### Edge cases — co robisz jeśli articulation-check zwraca problem

**"Bank ma <2 eligible candidates"** (bank pusty lub wszystko score-0):
- Log w session logu: `"Articulation check: N/A — bank nie ma wystarczających kandydatów"`
- Przejdź do kroku 3 bez articulation check
- W rekomendacji na następną sesję (krok 7) zaznacz: "Bank jest niski, priorytet na task briefing który doda nowe topics do rotation"

**"Spacing guard zablokował wszystkich kandydatów"** (wszyscy testowani w ostatnich 3 dniach):
- Log: `"Articulation check: skipped — spacing guard (all topics tested within 3 days)"`
- To jest zdrowe — znaczy że articulation check w session-end jest częsty. Nic nie robisz.

**Wszystko OK, 2 pytania wykonane:** wyniki trafią do session logu (krok 4) w sekcji "Articulation check".

## 3. Odhacz checkpointy L3 z roadmapy

**ZAWSZE wykonaj** (nawet dla sesji <20 min). Po kroku 1-2 sprawdź czy jakikolwiek **L3 praktyczny** checkpoint w `fullstack-roadmap.md` kwalifikuje się do odhaczenia.

**L3 checkpointy odhaczasz od razu** gdy task wykonany poprawnie:
- "X działa" / "kod jest napisany" / "X skonfigurowany" — fakt: albo działa albo nie
- "X zaimplementowane" — jeśli kod w repo

**L3 to jedyny rodzaj checkpointów w roadmap.** Tematy narracyjne są w `articulation-bank.md` i promowane do `mastered` state przez streak 2/2 w `articulation-check` — nie są odhaczane w roadmap, zostają w banku z pełną historią.

**Algorytm:**

1. Czy dzisiejszy task ukończył L3 checkpoint? → odhacz
2. Odhacz w `fullstack-roadmap.md` (zmień `[ ]` na `[x]`)
3. Zaktualizuj milestone header (cokolwiek `[ ]` → `🔴 BLOKUJE`, wszystko `[x]` → `✅`)
4. Powiedz Jakubowi co odhaczasz i dlaczego

## 4. Feedback + session log

Daj ustny feedback (co dobrze, co źle, jedna rzecz do poprawy). Potem zapisz session log.

**Sprawdź plik** `docs/sessions/YYYY-MM-DD.md` (tworzony przez session-start). Jeśli istnieje → rozbuduj. Jeśli nie → stwórz nowy.

### Format session logu (pełny, dla sesji ≥20 min)

```markdown
# Sesja YYYY-MM-DD

## Plan sesji (z session-start — bez zmian)
...

## Task briefing (jeśli był)

[Topics które dostały pierwszą ekspozycję w task briefingu — lista z formatu session-start. Każdy temat ma teraz wpis w banku ze score 1.5/5.]

## Co robił

[1-2 zdania: jaki task, co zaimplementował]

## Planowanie architektoniczne

[Czy sam doszedł do planu? Jakie pytania sokratejskie? Co pominął?]

## Code review (jeśli był)

[Kluczowe findings: co Jakub sam zauważył, co pominął]

## Samodzielność (1-5)

[1=pisałem za niego, 2=mocno naprowadzałem, 3=naprowadzałem pytaniami, 4=sam z minimalną pomocą, 5=sam od A do Z]

## Explain phase

[Jak wytłumaczył? Score (1-5). Jakie decyzje uzasadnił, jakie pominął.]

## Articulation check

[Wyniki z articulation-check skilla — skopiuj podsumowanie:
- Topics + scores + trendy
- Promoted to mastered (lub "brak")
- Lapse list (lub "brak")
- Nowe słabości (Do domknięcia added)

Jeśli pominięty: "N/A — [powód]"]

## Nowe L2 topics (dodane mid-session)

[Jeśli w trakcie sesji wypłynął nowy temat narracyjny którego nie było w banku — dodaj go tutaj i do banku.
Zobacz "Protokół: nowy L2 topic mid-session" poniżej.]

## Co poszło dobrze

[Konkretne momenty samodzielnego myślenia, dobre decyzje]

## Co poszło źle

[Gdzie się zaciął, błędy w myśleniu, ghostwriting attempts]

## Słabości — update

[Czy słabość się poprawiła? Nowa się pojawiła?]

## Faza coachingu

[Aktualna faza (1=M1-3, 2=M4-6, 3=M7-9) i gotowość na następną. Milestone aktywny.]

## Następna sesja

### Rekomendacja głównego taska
[Który L3 checkpoint z roadmapy + DLACZEGO. Konkretny checkpoint.]

### Task briefing — relevant score-0 topics
[Lista topics z articulation bank ze score 0 które są relevant do rekomendowanego taska — session-start użyje tego]

### Obserwacje z sesji (input dla session-start)
- **Słabości do zaadresowania:** [...]
- **Poprawki z review:** [drobne fixy jako rozgrzewka, lub "brak"]
- **Co poszło dobrze:** [...]

### Materiały do nauki przed sesją
- **Docs:** [konkretna sekcja docs relevant do rekomendowanego taska]
- **Pytanie do przemyślenia:** [jedno pytanie architektoniczne]
```

### Protokół: nowy L2 topic mid-session

Jeśli w trakcie sesji Jakub natrafił na koncept narracyjny którego **nie było w articulation bank** (np. omówiliście coś spontanicznie przy code review), session-end **dodaje go do banku**:

1. **Czy była ekspozycja** (coach wytłumaczył, Jakub formułował odpowiedź)?
   - **TAK** → pierwszy score w zależności od poziomu odpowiedzi:
     - Dobra odpowiedź z drobnymi brakami → 3.0/5
     - Mętna, wymagała dużo naprowadzania → 2.0/5
     - Tylko signposting (coach wyjaśnił, Jakub nie formułował) → 1.5/5 (tak samo jak task briefing)
   - **NIE** (pojawiło się w dyskusji ale bez realnego wyjaśnienia) → 0/5 (czeka na task briefing w przyszłości)
2. **Atomic Edit** dodający nowy wpis do `articulation-bank.md` w odpowiedniej sekcji milestone:

   ```markdown
   ### [Topic name] (Mx)

   **Score:** [SCORE]/5 | **Last tested:** [TODAY] | **Streak:** 0/2

   Historia:
   - [TODAY] ([tag: "explain" jeśli z explain phase, "code review" jeśli z review]): [SCORE]/5 — [krótki opis]

   Do domknięcia:
   - [konkretne gapy]
   ```

3. **Log w session logu** w sekcji "Nowe L2 topics (dodane mid-session)": wymień tematy które dodałeś z powodem.

## 5. Aktualizacja roadmapy — tylko L3

Checkpointy L3 już odhaczone w kroku 3. Tutaj aktualizujesz **status milestone'ów** i dodajesz nowe L3 checkpointy jeśli pojawiły się w trakcie sesji.

**Co możesz robić:**

1. Odhaczać nowe L3 checkpointy (`[ ]` → `[x]`)
2. Dodawać nowe L3 checkpointy jeśli wyszła fundamentalna luka (np. "brakuje rate limiting w M4" → dodaj L3 `[ ]`)
3. Update milestone header (cokolwiek `[ ]` → `🔴 BLOKUJE`, wszystko `[x]` → `✅`)
4. Dodawać tematy narracyjne do cross-reference listy "Tematy narracyjne" w danym milestone — ale samo tworzenie wpisu w `articulation-bank.md` robisz w kroku 4 (protokół nowy L2 topic)

Roadmap zawiera tylko L3 checkpointy. Tematy narracyjne to cross-reference do banku (lista nazw bez state/score). Pełna retencja L2 żyje w banku.

## 6. Fiszki Anki

Wygeneruj fiszki z tej sesji zgodnie z `create-anki` SKILL. Zapisz do `~/Anki/programming.tsv`. Pokaż Jakubowi podgląd w markdown.

**Anki = L1 (atomic facts).** Krótkie fiszki Q/A w 2 zdaniach — fakty, definicje, wartości, syntax. Długie narracyjne tematy NIE idą do Anki — idą do articulation bank.

Oprócz standardowych fiszek dodaj 1-2 **connection cards** łączące koncepty z różnych tematów, żeby budować sieć wiedzy zamiast izolowanych faktów.

## 7. Rekomendacja na następną sesję

Rekomendacja z uzasadnieniem — nie sztywny plan. Session-start podejmie finalną decyzję.

### Zasady pisania rekomendacji

- **Uzasadniaj, nie nakazuj:** "Rekomendacja: ownership guard dla workouts, bo register działa ale guards jeszcze są score 0" lepsze niż "Następny task: ownership guard"
- **L3 jako główny task — zawsze.** Bank kręci się w tle przez articulation check, nie generuje tasków. Nie ma takiej rzeczy jak "sesja articulation-only" — articulation check to 5-10 min na końcu sesji kodowej.
- **Task briefing topics** — przeglądaj bank, wylistuj score-0 topics relevant do rekomendowanego taska. Session-start użyje tego do planowania briefingu w krok 4.
- **Poprawki z review** — drobne (naming, orderBy, format) wrzuć do obserwacji jako rozgrzewka. Poważne (zmiana modelu, security) → bloker.
- **Nie wrzucaj tematu bo Jakub powiedział "ciekawy"** — jeśli nie pasuje do aktualnego milestone, zanotuj w roadmap jako future L3 checkpoint, nie w rekomendacji na jutro.

### Format sekcji "Następna sesja" — patrz wzór w kroku 4.
