---
name: session-end
description: Use when Jakub sygnalizuje koniec sesji nad IRONLOG — "kończymy", "koniec", "zamykamy", "tyle na dziś", "muszę lecieć", "ostatnie 5 min", lub gdy czas sesji dobiega końca. Działa też bez słowa "koniec" — jeśli kontekst sugeruje że kończy pracę, odpal.
---

# Session End Protocol

Zamykasz sesję coachingową z Jakubem. Wykonaj kroki w kolejności.

## 1. Explain phase — Feynman (5 min)

**Feynman technique, nie code review.** Jakub ma wytłumaczyć co zrobił **tak, jakby tłumaczył juniorowi albo nie-programiście** — prostym językiem, bez żargonu. Jeśli musi używać nazw technicznych, musi je zdefiniować. Feynman pokazuje luki lepiej niż "powiedz mi o decyzjach".

Różnica vs code-review skill: code-review analizuje jakość kodu z Jakubem siedzącym przy nim. Explain phase testuje czy Jakub rozumie **co robi jego kod na poziomie konceptualnym** bez patrzenia w plik.

### Flow

1. **Poproś o plain-language overview:** *"Wytłumacz mi co dzisiaj zrobiłeś tak, jakbyś tłumaczył juniorowi bez backgroundu w NestJS. Bez żargonu — jeśli używasz nazwy technicznej, musisz ją wytłumaczyć."*
2. **Czekaj na odpowiedź** — nie przerywaj, nie podpowiadaj
3. **Zadaj 2-3 "why" pytania** targetujące decyzje które Jakub skompresował lub ominął. Format: *"Powiedziałeś X — ale DLACZEGO tak a nie Y? Wytłumacz juniorowi."*
4. **Czekaj na odpowiedź na KAŻDE pytanie** — jedno follow-up max, potem feedback
5. **Daj feedback** — gdzie użył żargonu bez definicji, gdzie ominął "dlaczego", gdzie wytłumaczenie było mętne

### Zasady

- **Test plain-language:** czy zdanie zadziałałoby na osobie bez backgroundu backendowego? Jeśli tak → 4-5/5. Jeśli zdanie ma 3 buzzwordy bez definicji → 2-3/5.
- NIE wymuszaj monologu o 40 plikach — przy dużych taskach wybierz 1-2 kluczowe decyzje architektoniczne
- Pytania dopasuj do tego co Jakub faktycznie robił — nie generyczne "co to DI"
- **Score 1-5:**
  - 1 = nie umie wytłumaczyć / używa żargonu jak tarczy
  - 3 = zna koncept, tłumaczenie techniczne ale nie plain-language (używa buzzwordów)
  - 3.5 = solidne plain-language z drobnymi lukami
  - 5 = wytłumaczyłby kierownikowi produktu lub znajomemu który programuje w innym języku
- **Hinty obniżają score.** Jeśli musiałeś zadać naprowadzające pytanie żeby Jakub dotarł do czegoś co powinno być oczywiste → -0.5/5.

## 2. Articulation check (2 pytania z banku)

Po explain phase wywołaj `articulation-check` skill przez Skill tool.

**Dokładna forma wywołania:**

```
Skill tool:
  skill: "articulation-check"
  args: ""
```

Pusty `args` = default 2 pytania, priority-based selection z całego banku.

Dla dress rehearsal (Jakub wyraźnie prosi) użyj `args: "dress-rehearsal 5"` — 5 pytań, filtr due off, pure grade ascending.

Protokół articulation-check (selekcja due topics, SRS formula, atomic Edit banku) żyje w `articulation-check/SKILL.md`. Tutaj tylko obsługa wyników.

### Edge cases — co robisz jeśli articulation-check zwraca problem

**"Bank ma <2 due candidates"**:
- Log: `"Articulation check: N/A — insufficient due candidates"`
- Przejdź do kroku 3 bez articulation check
- W rekomendacji na następną sesję zaznacz: "Bank jest niski, priorytet na task briefing który doda nowe topics do rotation"

**"Bank in good shape" (wszystko w środku cyklu spacing)**:
- Log: `"Articulation check: skipped — bank in good shape"`
- To jest zdrowe — znaczy że retencja siedzi. Nic nie robisz.

**Wszystko OK, 2 pytania wykonane:** wyniki trafią do session logu (krok 4) w sekcji "Articulation check".

## 3. Theory→task bridge + odhacz checkpointy L3

**ZAWSZE wykonaj** (nawet dla sesji <20 min). Dwie rzeczy do sprawdzenia: czy dzisiejsze teoretyczne tematy trafiły do kodu, i czy L3 checkpointy się odhaczają.

### 3a. Briefing utrwalenie check

Dla każdego tematu z briefingu sprawdź czy trafił do napisanego kodu. **Format wejściowy** to ustrukturyzowana sekcja `## Task briefing topics` w session logu z session-start (każda linia: `topic | milestone | status | keywords`).

**Algorytm:**

1. **Read** `docs/sessions/YYYY-MM-DD.md` → wyciągnij wszystkie linie z sekcji `## Task briefing topics`
2. Pomiń wpisy ze statusem `skipped` lub `overflow` (nie były ekspozycją do utrwalenia) — zapisz je tylko jako "do następnej sesji"
3. Uruchom `git diff` (uncommitted) + `git log --since="midnight" --name-only` (today's commits) → zbuduj jeden tekst z całym dzisiejszym diffem
4. Dla każdego briefed topic: grep keywordów (lowercase, OR) w diff
5. Wyciągnij **konkretną ścieżkę:linię** pierwszego matchu — to jest `L3 anchor` dla tego tematu
6. Zapisz wynik w session logu (krok 4) w sekcji "Briefing utrwalenie":
   - `✅ [topic] — anchor: src/path/file.ts:N`
   - `⚠ [topic] — brak anchora w dzisiejszym diffie → zostaje jako theory only, rekomendacja na następną sesję`

**Aktualizacja banku z anchorem:** nie tutaj. Pole `L3 anchor:` we wpisie tematu jest aktualizowane przez `articulation-check` przy najbliższym teście (lazy update). Wynik sekcji "Briefing utrwalenie" w session logu jest źródłem prawdy do tego czasu — articulation-check go odczyta przy najbliższej rotacji tematu.

**Dlaczego to robimy:** każda teoria powinna zostać utrwalona taskiem w IRONLOG, inaczej wiedza trafia do martwej pamięci. Bez tego kroku bank może rosnąć ze score'ami 3.5+, a kod nigdy nie dotyka konceptu — dokładnie to co chcemy wyłapać.

**Edge case — brak briefingu dzisiaj:** jeśli sesja nie zaczynała się od task briefingu (np. kontynuacja wcześniejszego taska), pomiń 3a. W logu zanotuj "Briefing utrwalenie check: N/A — brak briefingu dzisiaj".

**Edge case — briefing topic wymaga więcej niż 1 sesji:** OK, to normalne. Zapisz `⚠ briefing X — częściowo utrwalony, potrzebuje kontynuacji` i zaproponuj konkretny follow-up task.

### 3b. Odhacz L3 checkpointy — hard gate (anchor required)

**Zasada:** L3 checkpoint odhaczasz **wyłącznie** gdy w kodzie istnieje konkretny anchor go realizujący. Bez anchora — checkpoint zostaje `[ ]`, niezależnie od tego co Jakub mówi że zrobił.

**Definicja "anchor":** konkretna ścieżka `src/path/file.ts:N` zawierająca implementację. Anchory pochodzą z dwóch źródeł:

1. **Briefing utrwalenie check (krok 3a)** — jeśli checkpoint odpowiada bezpośrednio briefing topicowi, anchor pochodzi z grep keywordów w git diff
2. **Direct path verification** — dla checkpointów bez briefingu (np. "Repository pattern wdrożony"), Read odpowiednich plików i potwierdź że logika faktycznie tam jest

**Algorytm hard gate:**

1. Dla każdego `[ ]` L3 w aktywnym milestone:
   - **Step A (verify):** czy istnieje konkretna ścieżka:linia w dzisiejszym diffie/repo która realizuje ten checkpoint? (nie "task był robiony" — `Read` plik i potwierdź)
   - **Step B (gate):** jeśli `tak` → `[ ]` → `[x]`. Jeśli `nie` → checkpoint **zostaje** `[ ]`, dodaj do session logu: `⚠ L3 "[checkpoint name]" — task wykonany ale brak persystowanego anchora w kodzie. Następna sesja: zweryfikuj/dokończ.`
2. Update milestone header (cokolwiek `[ ]` → `🔴 BLOKUJE`, wszystko `[x]` → `✅`)
3. Powiedz Jakubowi co odhaczasz **i dlaczego konkretnie** (cytuj anchor: `[x] LocalStrategy implementowana — anchor src/auth/strategies/local.strategy.ts:12`)
4. Dla każdego checkpointu który ZOSTAŁ `[ ]` mimo że Jakub coś dziś robił — powiedz wprost dlaczego nie odhaczasz: brak anchora, brak testu, brak X.

**Nie odhaczaj na podstawie:**
- "Jakub mówi że to działa" bez Read'a pliku
- Plik istnieje ale jest pusty / TODO / placeholder
- Test był ale failuje
- "Wpisałem przykład z docs" bez żywego endpointu

**L3 to jedyny rodzaj checkpointów w roadmap.** Tematy narracyjne żyją w `articulation-bank.md` — tam interval SRS rośnie sam po udanych testach, nie ma tu ręcznej promocji.

## 4. Feedback + session log

Daj ustny feedback. Struktura: **co dobrze, co źle, progres samodzielny, jedna rzecz do poprawy**. Potem zapisz session log.

### Progress comparison — obowiązkowy element feedbacku

Dla każdego topica z dzisiejszego articulation check porównaj z poprzednim wpisem (`Historia` w banku):

- **Score wzrósł samodzielnie** (np. 3/5 → 4/5 bez scaffoldingu, lub gap z "Do domknięcia" zniknął) → **powiedz to wprost**: *"Tydzień temu na `[topic]` było 3/5 i nie wiedziałeś o `[gap]`. Dzisiaj sam to wymieniłeś. To jest mierzalny progres."*
- **Score spadł (lapse)** → **też powiedz**, ale jako diagnoza nie wyrzut: *"Na `[topic]` był 4/5 po 20d spacing, dzisiaj 2/5. To Ebbinghaus, nie regression — interval był za długi. Wraca do 1d i odbudujemy."*
- **Score bez zmian, ale recall był punktualny** → krótkie: *"`[topic]` trzyma się solidnie."*

**Dlaczego to jest obowiązkowe:** bez tej pętli zamknięcia Jakub nie widzi swojego progresu — jedyny sygnał to "kolejny task gotowy", który nie skaluje się na motywację długoterminową. CLAUDE.md to wymaga: *"powiedz to wprost: 'Tydzień temu to było 3 pytania, teraz sam.'"*

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
- Topics + grades + interval delta (Xd → Yd)
- Lapse notatki (lub "brak")
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

### Protokół: nowe L2 topics — jedna procedura dla wszystkich źródeł

Nowy temat L2 może wpaść do banku z trzech źródeł: (a) explain phase ujawnił że Jakub zna koncept którego nie ma w banku, (b) code-review wyciągnął temat ze zmienionego kodu, (c) spontaniczna dyskusja podczas planowania/debug. **Procedura jest jedna**, niezależnie od źródła:

1. **Klasyfikuj poziom ekspozycji:**
   - **Pełna ekspozycja** (coach wytłumaczył **i** Jakub formułował własnymi słowami) → score zależny od jakości:
     - Dobra odpowiedź z drobnymi brakami → 3.0/5
     - Mętna, wymagała dużo naprowadzania → 2.0/5
   - **Tylko signposting** (coach wyjaśnił, Jakub nie formułował) → 1.5/5 (jak task briefing)
   - **Tylko wzmianka** (temat pojawił się w dyskusji ale bez wyjaśnienia) → 0/5 (wpis score-0, czeka na task briefing w przyszłości)

2. **Atomic Edit** dodający wpis do `articulation-bank.md` w sekcji milestone:

   ```markdown
   ### [Topic name] (Mx)

   **Score:** [SCORE]/5 | **Last tested:** [TODAY] | **Next review:** [NEXT_REVIEW] (interval: [INTERVAL]d)
   **L3 anchor:** [anchor jeśli temat był demonstrowany na konkretnym pliku, inaczej `unknown`]

   Historia:
   - [TODAY] ([tag]): [SCORE]/5 — [krótki opis]

   Do domknięcia:
   - [konkretne gapy]
   ```

   **Tag w historii:** `(explain)` jeśli z explain phase, `(code-review)` jeśli z code-review, `(planning)` jeśli z dyskusji.
   **Interval (SRS pierwszy test):** grade 1.5-2 → 1d, grade 3 → 3d, grade 3.5-4 → 5d.
   **Score-0 wpisy** mają uproszczony format (bez Historia/Do domknięcia) — patrz `articulation-bank.md` sekcja "Score-0 entries — convention".

3. **Log w session logu** w sekcji "Nowe L2 topics (dodane mid-session)": wymień tematy z tagiem źródła i powodem.

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
