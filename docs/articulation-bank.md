# Articulation Bank

**Cel:** Baza tematów narracyjnych (L2 retention) — rzeczy które Jakub ma umieć opowiedzieć na rozmowie w 1-3 minuty. Weryfikacja przez coach w session-end (2 pytania per sesja, priority-based selection).

**Bank nie blokuje roadmap.** Kręci się w tle niezależnie od aktywnego milestone. Jedyne kryterium postępu milestone = praktyczne (L3) checkpointy w `fullstack-roadmap.md`.

**Source of Truth:** ten plik jest SSOT **wyłącznie** dla L2 — score, historii, intervals i L3 anchor. Bank nie zawiera tasków do zakodowania. Jeśli temat L2 wymaga utrwalenia w kodzie, task lądouje w `fullstack-roadmap.md` jako `(bridge)` checkpoint w odpowiednim milestone (dopisuje go session-end). Bank linkuje do tego kodu przez pole `L3 anchor`.

## Polityka wpisów

Bank ma **dwa rodzaje wpisów** — odpowiadające dwóm fazom życia tematu:

1. **Score-0 entries (planowane, bez ekspozycji)** — dodawane **proactively** podczas planowania milestone'a w roadmap. Są placeholderami: bank wie że temat *istnieje w planie*, ale nie ma jeszcze danych do trackowania. Format uproszczony (patrz "Score-0 entries — convention"). Pomijane przez articulation-check w priority selection. Trafiają do rotacji **dopiero po pierwszej ekspozycji** przez task briefing w session-start (wtedy wpis dostaje pierwszy score, zwykle 1.5/5).
2. **Live entries (pełna struktura)** — powstają **przy pierwszej ekspozycji** na temat. Ekspozycja = coach wyjaśnił analogię + przykład + Jakub formułuje własnymi słowami, lub task briefing w session-start, lub spontaniczny recall podczas kodowania/review.

**Dlaczego ten podział:** SSOT requirement — bank ma być jedynym miejscem gdzie żyje lista tematów L2 (zarówno aktywnych jak i planowanych). Roadmap zawiera wyłącznie L3 checkpointy. Gdyby bank trzymał tylko aktywne tematy, lista planowanych musiałaby duplikować się w roadmapie — co właśnie dekonsolidowaliśmy. Score-0 placeholders rozwiązują problem: bank rośnie z rozmiarem planu na cały kurs, ale rozróżnia "to learn next" od "currently learning" przez score=0 vs score>0.

**Gdy temat już istnieje w banku** (jako score-0 lub live), każda kolejna ekspozycja **aktualizuje** istniejący wpis — nie tworzy duplikatu. Update score-0 → live = transformacja formatu (przez session-start task briefing protokół). Update live → live = dodanie linii Historii + przeliczenie Score/Last tested/Next review/Interval.

**Wpisy nigdy nie są usuwane z banku.** Historia progresu = wartość. Opanowane tematy zostają — ich `Next review` rośnie do kilku miesięcy i wypadają z widoku rotacji. Ebbinghaus forgetting curve dotyczy wszystkich, dlatego zawsze wracają choć rzadko.

---

## Format wpisu (kanoniczny)

```markdown
### Topic name (Mx)

**Score:** X/5 | **Last tested:** YYYY-MM-DD | **Next review:** YYYY-MM-DD (interval: Nd)
**L3 anchor:** src/path/file.ts:N | none | unknown

Historia:

- YYYY-MM-DD (tag): X/5 — opis (Xd → Yd)
- YYYY-MM-DD (tag): X/5 — opis (Xd → Yd)

Do domknięcia:

- specific gap 1
- specific gap 2
```

**Pola obowiązkowe:** Score, Last tested, Next review, interval, L3 anchor.
**Pole opcjonalne:** `Do domknięcia` — tylko gdy są konkretne braki. Bez braków → pomiń sekcję.
**Notacja `(Xd → Yd)` w Historii** — poprzedni interval → nowy interval. Pokazuje trajektorię SRS. Pomiń przy pierwszym wpisie (brak `Xd`).

### `L3 anchor` — co znaczy każda wartość

- **`src/path/file.ts:N`** — temat został zaimplementowany w IRONLOG i ścieżka pokazuje gdzie. Setowany przez `articulation-check` po pytaniu Jakuba lub przez session-end gdy briefing utrwalenie check znalazł match w git diff.
- **`none`** — temat został świadomie sprawdzony i NIE ma implementacji w IRONLOG (czysta narracja, np. "Co się dzieje gdy wpiszesz URL w przeglądarce" — nie pisze się tego w kodzie). Nie wymaga bridge task — score wysoki + `none` to docelowy stan dla tematów narracyjnych.
- **`unknown`** — domyślna wartość dla wpisów stworzonych przed wprowadzeniem tego pola **i** dla nowych wpisów które nie zostały jeszcze sklasyfikowane. `articulation-check` przy najbliższym teście zapyta Jakuba i zaktualizuje na konkretną ścieżkę albo `none`.

**Reguła bridge task:** jeśli `Score ≥ 3.5` AND `L3 anchor = unknown` → temat jest podejrzewany o cargo cult retencję (znasz definicję, ale nigdy tego nie napisałeś). Articulation-check w summary drukuje rekomendację: `BRIDGE NEEDED: <topic> → dopisz (bridge) task w M<X>`. Sam task pisze session-end (Edit do roadmap), nie articulation-check. Jeśli `Score ≥ 3.5` AND `L3 anchor = none` → temat narracyjny świadomie bez kodu (np. "Co się dzieje gdy wpiszesz URL w przeglądarce") — bez problemu. Jeśli `L3 anchor = src/...` → wszystko OK, temat ma kotwicę w żywym kodzie.

**Migracja istniejących wpisów:** lazy. Stare wpisy traktowane jako `unknown` dopóki articulation-check ich nie odwiedzi. Nie robimy backfillu — bank klasyfikuje się sam przez naturalne rotacje.

## Skala oceny (grade)

- **1/5** — nie wie o co chodzi, odpowiedź chaotyczna
- **2/5** — mętna odpowiedź, wymagała dużo naprowadzania
- **3/5** — zna koncept, brakuje precyzji lub detali
- **3.5/5** — solidna mid+ odpowiedź z drobnymi brakami ← **próg "Good"**
- **4/5** — odpowiedź z trade-offami, minimalne naprowadzanie
- **5/5** — poziom seniora, relacje z innymi tematami, kontekst

---

## Algorytm SRS (spaced repetition, Anki-style)

Jeden stan na temat: **interval w dniach**. "Mastered", "lapse", "streak" — wszystkie emergentne, nie ma dedykowanych pól.

### Formuła (po każdym teście)

```
days_elapsed = today - last_tested
base = max(prev_interval, days_elapsed)

grade ≤ 2     → new_interval = 1                    (Again — reset)
grade = 3     → new_interval = max(3,  base × 1.2)  (Hard)
grade 3.5-4   → new_interval = max(5,  base × 2.0)  (Good)
grade 4.5-5   → new_interval = max(10, base × 2.5)  (Easy)

next_review = today + new_interval
```

**Pierwszy test** (wpis świeżo utworzony, brak poprzedniego testu): traktuj `base = 0`, działa tylko minimum (1d/3d/5d/10d zależnie od grade).

**Dlaczego `max(prev_interval, days_elapsed)`:**

- Spóźniony test (testowany po 30d mimo intervalu 14d) → base = 30 → nowy interval uwzględnia że retencja przetrwała dłużej. Nagroda za udaną retencję, nie kara za spóźnienie.
- Wcześniejszy test (ad-hoc "sprawdź mnie z X" przed terminem) → base = prev_interval → wcześniejsze sprawdzenie nie skraca postępu SRS.
- Reset przy grade ≤ 2 jest niezależny od base — złe jest złe niezależnie od czasu.

### Trajektoria idealna (grade 4/5 za każdym razem, testy punktualnie)

5d → 10d → 20d → 40d → 80d → 160d...

Po **3 dobrych testach** temat znika z widoku na ~1.5 miesiąca, po **5** na ~5 miesięcy. "Mastered" emerguje z formuły, bez osobnej flagi.

### Trajektoria po lapse (opanowany temat nagle 2/5)

Przed: interval 40d. Test 2/5 → new_interval = 1d (reset, niezależnie od poprzedniego intervalu). Następny test 4/5 (po 1d) → base = max(1, 1) = 1 → new_interval = max(5, 1×2) = 5d. Temat wraca do rotacji natychmiast i buduje się od nowa.

### Selekcja pytań (priority-based)

1. **Kandydaci:** topics gdzie `next_review ≤ today` (czyli "due"). Score-0 topics pomijane — czekają na pierwszą ekspozycję przez task briefing, nie quiz.
2. **Sortuj po `days_overdue = today - next_review`** malejąco — najbardziej spóźnione pierwsze. Tie-break: niższy grade pierwszy (słabe przed mocnymi).
3. **Wybierz top N** (default N=2 dla session-end).
4. **Brak spacing guard jako osobnej reguły** — minimum-intervals w formule (3d/5d/10d) gwarantują że temat przetestowany dzisiaj nie wraca jutro.

**Edge case — brak due topics:** jeśli żaden temat nie ma `next_review ≤ today`, skill zwraca _"Wszystkie tematy aktualnie w spacing — bank jest w dobrym stanie. Articulation check pominięty."_. Session-end loguje jako `"Articulation check: skipped — bank in good shape"`.

**Edge case — długa przerwa (2+ tygodnie bez sesji):** po powrocie wszystkie kiedyś-due topics są silnie spóźnione. Selekcja pokazuje top 2 najbardziej overdue — reszta czeka w kolejce, rotuje się sama przez kolejne sesje. Nie nadrabiasz wszystkiego w jednym teście.

### Lapse notacja (do historii, nie do algorytmu)

Formalnie "lapse" nie ma osobnej reguły — grade ≤ 2 zawsze resetuje interval do 1d. Ale do **notatki w historii** warto oznaczyć regres z wysokiego poziomu:

- Jeśli `prev_interval ≥ 20d` AND `new_grade ≤ 2` → dopisz do linii historii notatkę `LAPSE po Xd spacing`.
- Jeśli `prev_interval ≥ 20d` AND `days_overdue > prev_interval` AND `new_grade < 3` → dopisz `LAPSE po X dniach overdue`.

Nie ma "mastery promotion" ani "demotion" — mastered nie jest stanem, to po prostu duży interval. Zły test naturalnie resetuje.

### Re-recall (obowiązkowy przy grade <3.5)

Niezależnie od nowego intervalu, grade <3.5 triggeruje re-recall — Jakub odpowiada drugi raz po feedbacku. Re-recall służy encoding, nie zmienia grade'u (Roediger & Karpicke, 2006). Próg to ściśle <3.5. Score = 3.5 → bez re-recall.

## Score-0 entries — convention

Tematy które nie miały jeszcze pierwszej ekspozycji mają uproszczony format:

```markdown
### Topic name (Mx)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**
```

Te wpisy są **intencjonalnie bez** sekcji Historia/"Do domknięcia" — bo nie ma jeszcze czego trackować. Articulation-check skill **pomija** score-0 entries w priority selection (nie możesz testować czegoś czego Jakub nigdy nie widział). Score-0 trafia do rotation **dopiero po pierwszej ekspozycji** przez task briefing w session-start — wtedy wpis dostaje pierwszy score (zwykle 1.5/5 jako "widział signposting, nie opanował"), pełną strukturę (Next review, Historia, Do domknięcia), i wchodzi do normalnej rotacji z intervalem 1d.

## History tag convention

Każdy wpis w sekcji "Historia" tematu ma tag source — skąd pochodzi score. Dozwolone tagi:

| Tag                    | Znaczenie                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `(articulation-check)` | Articulation check w session-end — default source                                                   |
| `(explain)`            | Explain phase w session-end (rzadki — zwykle explain nie nadaje score'ów, tylko articulation-check) |
| `(task briefing)`      | Pierwsza ekspozycja w session-start task briefing — zwykle przypisuje score 1.5/5                   |
| `(mock)` / `(recall)`  | Historyczne tagi z wpisów sprzed obecnego protokołu — zostają jak są, nie przepisujemy              |

Articulation-check skill zapisuje nowe wpisy z tagiem `(articulation-check)`.

---

## Bank — Milestone 1 (NestJS fundamenty)

### Controller/Service split — dlaczego logika w Service, 3 powody (M1)

**Score:** 4.0/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-06-13 (interval: 56d)
**L3 anchor:** src/exercises/exercises.controller.ts:19

Historia:

- 2026-04-18 (articulation-check): 4/5 — 3 powody + IRONLOG przykłady (hashowanie, repo calls) po dopytaniu. (10d → 56d)
- 2026-03-21 (mock): 4/5 — solidna odpowiedź od pierwszego razu

Do domknięcia:

- Brak — temat solidny, czeka na kolejny test w rotacji

---

## Bank — Milestone 2 (SQL fundamenty)

### FK constraints + ON DELETE CASCADE/SET NULL/NO ACTION/RESTRICT (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-14 | **Next review:** 2026-05-30 (interval: 46d)
**L3 anchor:** prisma/schema.prisma:87

Historia:

- 2026-04-14 (articulation-check): 3.5/5 — 4 scenariusze konkretne z IRONLOG samodzielnie (CASCADE/RESTRICT/SET NULL/SET DEFAULT). Pominął NO ACTION, zamiast tego wymienił SET DEFAULT. Dopytanie: różnica NO ACTION vs RESTRICT (deferred vs immediate check) trafiona precyzyjnie (3d → 46d)
- 2026-03-22 (mock): 3/5 — nie znał SET NULL i SET DEFAULT bez podpowiedzi

Do domknięcia:

- NO ACTION jako Postgres domyślny gdy nic nie piszesz (Jakub myślał że default to RESTRICT)
- `DEFERRABLE INITIALLY DEFERRED` use case (circular FK, insert ordering)

### INNER vs LEFT JOIN — kiedy który, co zwraca gdy brak dopasowania (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-15 (interval: 5d)

Historia:

- 2026-04-10 (recall): 3.5/5 — mechanizm poprawny, "NULL w prawej tabeli" po prompcie

Do domknięcia:

- "NULL w kolumnach prawej tabeli" bez scaffoldingu
- Trick question: "czy INNER może zwrócić więcej rekordów niż LEFT?" (nie — LEFT ≥ INNER zawsze)

### ACID — wytłumacz każdą literę z przykładem z IRONLOG (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-15 (interval: 5d)

Historia:

- 2026-04-10 (recall): 3.5/5 — A/I/D samodzielnie, C wymagało scenariusza z FK constraint jako mechanizm

Do domknięcia:

- Consistency jako jedyna litera gwarantowana częściowo przez aplikację (nie tylko DB)
- Constraints jako mechanizm C bez scenariusza

### Transakcje + isolation levels — kiedy użyć, 4 poziomy, trade-off performance/correctness (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-15 (interval: 5d)

Historia:

- 2026-04-10 (recall): 3.5/5 — 4 levele + trade-off + READ COMMITTED dla IRONLOG

Do domknięcia:

- Anomaly names: dirty read, non-repeatable read, phantom read (nie wymienił)
- Który isolation level blokuje którą anomaly

### Optimistic vs pessimistic locking — kiedy który, implementacja, 409 Conflict (M2)

**Score:** 4.0/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-20 (interval: 10d)

Historia:

- 2026-04-10 (recall): 4/5 — koncept + trade-off + 409 Conflict samodzielnie

Do domknięcia:

- `version` field w Prisma jako konkretna implementacja optimistic
- `SELECT FOR UPDATE` jako konkretna implementacja pessimistic

### Normalizacja 1NF/2NF/3NF + denormalizacja (M2)

**Score:** 4.0/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-20 (interval: 10d)

Historia:

- 2026-04-10 (recall): 4/5 — 2NF z IRONLOG composite key samodzielnie, denormalizacja snapshot+performance

Do domknięcia:

- 1NF precyzyjna definicja (miała mglistą "wartości po przecinkach")
- Kierunek zależności zip_code → city był odwrócony

### Composite PK vs auto-increment ID w tabeli łączącej — trade-offy (M2)

**Score:** 3.0/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-05-18 (interval: 30d)

Historia:

- 2026-04-18 (articulation-check): 3/5 — uniqueness w junction table trafne. Koszt (indeks złożony cięższy + JOIN 2 kolumny) padł dopiero w re-recall po dopytaniu. (5d → 30d)
- 2026-03-24 (mock): 3.5/5 — indeksy po hincie, pominął prostsze JOINy

Do domknięcia:

- JOINy prostsze z auto-increment (tylko jedna kolumna w ON) — samodzielnie bez re-recall
- Indeks złożony: oba pola muszą być w FK każdej tabeli referencującej → storage overhead

### EXPLAIN ANALYZE — jak czytać, kiedy dodać indeks, Seq Scan vs Index Scan (M2)

**Score:** 3.0/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-05-14 (interval: 26d)
**L3 anchor:** none

Historia:

- 2026-04-18 (articulation-check): 3/5 — N+1, memory, indeks samodzielnie. Cache + connection pooling po podpowiedzi. (5d → 26d)
- 2026-03-27 (mock 2x tego samego dnia):
  - "orders 1M rekordów 5 sek": 3.5/5 — EXPLAIN + indeks + paginacja trafne, pominął cache, N+1, connection pooling
  - "GET /workout-logs/:id 200ms": 3.5/5 — trafne, pominął connection pooling, middleware overhead

Do domknięcia:

- Cache (HTTP lub Redis) jako pierwsza warstwa przed DB optimization — nadal nie pojawia się samodzielnie
- Connection pooling — pojawia się po podpowiedzi, nie bez

### Prisma → SQL mapping (migracje, JOINy, relacje) (M2)

**Score:** 4.5/5 | **Last tested:** 2026-04-19 | **Next review:** 2026-06-28 (interval: 70d)
**L3 anchor:** src/auth/repositories/prisma-auth-repository.ts:24

Historia:

- 2026-04-19 (articulation-check): 4.5/5 — 2 osobne queries (SELECT + SELECT IN), merge w pamięci, wyjaśnił DLACZEGO nie JOIN (duplikacja danych). (10d → 70d)
- 2026-03-22 (explain): 4/5 — rozumie schema → SQL, używał przy composite key

Do domknięcia:

---

## Bank — Milestone 3 (HTTP/REST + NestJS features)

### Repository pattern — po co, kiedy overengineering (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-15 (interval: 5d)

Historia:

- 2026-04-10 (recall): 3.5/5 — testowalność + swappable + koszt typów (progres od 3/5). Pominął "ORM jest już abstrakcją"
- 2026-03-28 (mock): 3/5 — separacja bazy + overengineering. Pominął testowalność, "ORM to już abstrakcja"

Do domknięcia:

- "ORM jest już abstrakcją" jako kontrargument (kiedy repo NIE jest potrzebne)
- Jednostronna vs dwustronna odpowiedź (koszty AND zyski)

### Offset vs cursor pagination — trade-offy, kiedy który, filtrowanie (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-14 | **Next review:** 2026-05-24 (interval: 40d)
**L3 anchor:** src/workouts-logs/workouts-logs.controller.ts:1

Historia:

- 2026-04-14 (articulation-check): 3.5/5 — duplikat scenariusz samodzielnie (new insert → records push to next page → duplicate on page 2). Mechanizm LIMIT/OFFSET vs WHERE+index trafny, OFFSET = read everything + nie ma mechanizmu skip. Near miss: "UUID cursor zbugowane" (faktycznie przechodzi, tylko semantycznie bez sensu). Brak precyzji: B-tree seek, composite cursor (createdAt+id) (3d → 40d)
- 2026-03-25 (mock): 3/5 — pominął że cursor nie wymaga totalCount, synchronizację where w offset

Do domknięcia:

- Cursor nie wymaga totalCount (prostsze filtrowanie, mniejsze payload) — nadal nie pojawiło się samodzielnie
- Composite cursor `(createdAt, id)` dla duplicate timestamps — UUID cursor jest useless, timestamp+id to production pattern (Stripe, GitHub)
- B-tree index seek jako nazwany mechanism cursor speedu
- MVCC visibility check w OFFSET nawet z indexem (senior-level nuance)

### NestJS modules — exports/imports, providery, cross-module communication (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-06-03 (interval: 46d)
**L3 anchor:** unknown

Historia:

- 2026-04-18 (articulation-check): 3.5/5 — 4 opcje samodzielnie (import/export, bezpośrednia klasa, new, events) z trade-offami SOLID D. Circular dependency mechanizm po dopytaniu, pominął rozwiązanie architekturalne i API call jako opcję. (3d → 46d)
- 2026-03-26 (mock 2x):
  - "WorkoutsService sprawdza exercises": 3/5 — tylko 1 opcja (import), brak alternatyw
  - "Moduł A potrzebuje danych z modułu B — 3+ opcje": 3/5 — DI/import od razu, event-based po hincie
- Słabość: brak samodzielnego myślenia o alternatywach, circular dependency awareness

Do domknięcia:

- Circular dependency — jak rozwiązać architekturalnie (wydzielenie shared module, nie forwardRef)
- API call jako opcja komunikacji (mikroserwisy / zewnętrzny serwis)

### External API service — retry, circuit breaker, error handling (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-25 | **Next review:** 2026-06-01 (interval: 37d)
**L3 anchor:** none

Historia:

- 2026-04-25 (articulation-check): 3.0/5 — timeout+retry+fallback cache samodzielnie, circuit breaker po bezpośrednim hincie, exponential backoff nigdy (10d → 37d)
- 2026-03-25 (mock): 4/5 — dobre pokrycie architektury

Do domknięcia:

- Exponential backoff w retry: 1s → 2s → 4s → 8s — nigdy nie pojawiło się samodzielnie
- Circuit breaker: znany po hincie, nie samodzielnie — potrzeba więcej powtórzeń
- Mapowanie danych z zewnętrznego kształtu (ACL layer)

### Response transformation — SQL-level vs app-level trade-offy (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-24 | **Next review:** 2026-06-01 (interval: 38d)
**L3 anchor:** src/workouts-logs/repositories/prisma-workout-log.mapper.ts:1

Historia:

- 2026-04-24 (articulation-check): 3.0/5 — initial "zdecydowanie SQL" bez świadomości że Prisma include = 2 queries + in-memory merge; JOIN vs include konfuzja w re-recall (10d → 38d)
- 2026-03-23 (mock): 2.5/5 — nie wymienił performance bez naprowadzenia
- Po sesjach kodowania progres do 4/5

Do domknięcia:

- Prisma `include` = 2 osobne SELECT + in-memory merge (NIE JOIN) — samodzielnie bez re-recall

### REST sparse fields — mobile vs web, field filtering, DTO per client (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-19 | **Next review:** 2026-05-15 (interval: 26d)
**L3 anchor:** unknown

Historia:

- 2026-04-19 (articulation-check): 3.0/5 — 3 warstwy + trade-offy trafne, nie wiedział o `?fields=` query param + @Expose groups. Explain-concept przeprowadzony, quiz zaliczony. (5d → 26d)
- 2026-03-28 (mock): 3.5/5 — sparse fields `?fields=` + osobne endpointy z trade-offami. Pominął GraphQL jako alternatywa, DTO/serializacja jako mechanizm

Do domknięcia:

- GraphQL jako alternatywa z trade-offami (over-fetching rozwiązany natywnie)

### Idempotentność HTTP + idempotency key pattern (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-13 | **Next review:** 2026-04-18 (interval: 5d)

Historia:

- 2026-04-13 (mock): 3.5/5 — definicja, GET/POST/PUT/PATCH/DELETE + PATCH niuans (update vs increment) samodzielnie. Błąd: 409 jako default przy duplikacie. Re-recall: "PUT wymaga znanego ID przy create" — kanoniczny argument samodzielnie
- 2026-03-31 (mock): 3.5/5 — front blokada + idempotency key + Redis lookup. Pominął nazwa "idempotency key", co serwer zwraca, TTL

Do domknięcia:

- **200 + cached response** jako Stripe pattern (nie 409) przy duplikacie klucza
- 409 TYLKO przy body mismatch z tym samym kluczem
- TTL klucza w Redis (24h standard)

### N+1 problem — definicja, detection, JOIN vs DataLoader (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-13 | **Next review:** 2026-04-16 (interval: 3d)

Historia:

- 2026-04-13 (mock): 3/5 — definicja + IRONLOG scenariusz + JOIN fix OK. BONUS: "Prisma include = SELECT + IN, nie JOIN, łączy w pamięci" samodzielnie. Luka: detection tools i DataLoader pattern

Do domknięcia:

- Detection: Prisma `log: ['query']`, slow query log (`log_min_duration_statement`), APM flamegraph
- DataLoader pattern: batch loading w jednym event loop ticku, kiedy vs JOIN (dynamic shape → DataLoader, static → JOIN)

### Cache-Control headers + conditional requests (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-13 | **Next review:** 2026-04-18 (interval: 5d)

Historia:

- 2026-04-13 (recall): 3.5/5 — szkielet (max-age/no-cache/no-store/stale-while-revalidate) samodzielnie. Brakowało If-None-Match/If-Modified-Since nazw i public/private distinction. Re-recall po feedbacku poprawny.

Do domknięcia:

- `If-None-Match: "<etag>"` + 304 Not Modified bez scaffoldingu
- `public` vs `private` w shared cache context (CDN)
- Pełny header dla `/exercises` (shared resource): `public, max-age=3600, stale-while-revalidate=86400`

### API versioning — URL vs header vs query param, Vary, semver (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-13 | **Next review:** 2026-04-16 (interval: 3d)

Historia:

- 2026-04-13 (mock): 3/5 — konkluzja OK (URL wygrywa). Błąd: "header = brak cache" (faktycznie Vary: Accept + cache hit rate trade-off). Brak: Stripe/GitHub jako przykłady, semver, non-breaking examples. Re-recall: Vary powierzchownie, non-breaking pominięty

Do domknięcia:

- `Vary: Accept` mechanizm + cache hit rate trade-off (per-klient zamiast per-resource)
- Stripe/GitHub jako real-world header versioning users
- Semver: major w URL, minor/patch = backwards-compatible (nie wymaga bumpa)
- Non-breaking examples: dodanie opcjonalnego pola, nowy endpoint, nowy opcjonalny query param
- Breaking: usunięcie pola, zmiana typu, dodanie obowiązkowego pola do requesta

### "Co się dzieje gdy wpiszesz URL w przeglądarce" — DNS/TCP/TLS/HTTP (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Next review:** 2026-04-15 (interval: 5d)

Historia:

- 2026-04-10 (recall): 3.5/5 — szkielet + man-in-the-middle dla TLS. Po promptach: headers, Content-Type. Brakuje: DNS cache hierarchy, HTTP/2

Do domknięcia:

- DNS cache hierarchy (browser → OS → router → ISP → authoritative)
- HTTP/2 multiplexing vs HTTP/1.1 head-of-line blocking
- Headers i Content-Type bez scaffoldingu

### REST vs GraphQL — trade-offy, kiedy który (M3)

**Score:** 0 (nigdy nie testowane formalnie, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

### ETag vs Last-Modified — conditional requests (M3)

**Score:** 0 (ekspozycja w sesji teorii 2026-03-31, brak formalnego testu) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

## Bank — Milestone 4 (Auth + Security)

### JWT access+refresh token flow — storage, lifetime, rotation, reuse detection (M4)

**Score:** 4.0/5 | **Last tested:** 2026-04-13 | **Next review:** 2026-04-23 (interval: 10d)

Historia:

- 2026-04-13 (mock): 4/5 — pełna odpowiedź bez naprowadzania (flow, lifetime, storage trade-offs, rotation + reuse detection). Drobne: "lookup" zamiast "verify signature", memory-reload issue pominięty, SameSite nie nazwany

Do domknięcia:

- "Verify signature" zamiast "lookup" w słownictwie (stateless vs session nuance)
- Memory storage wada: reload → token znika → refresh flow restore
- `SameSite=Strict` jako główny CSRF mitigation (nie CSRF token)

### JWT vs session-based auth — trade-offy (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-17 | **Next review:** 2026-04-18 (interval: 1d)
**L3 anchor:** src/auth/auth.module.ts:17

Historia:

- 2026-04-17 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:

- Stateless vs stateful — konkretne konsekwencje (unieważnienie, skalowanie)
- Shared storage (Redis) dla session przy multi-instance deployment
- Unieważnienie JWT — blacklist vs short TTL + refresh token rotation
- Kiedy session wygrywa nad JWT (admin panel z pilną potrzebą unieważnienia)

### Guard vs Middleware — oba blokują request, kiedy który (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-04-19 (interval: 1d)
**L3 anchor:** unknown

Historia:

- 2026-04-18 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:

- Bez scaffoldingu: dlaczego middleware NIE może czytać `@Roles()` metadata (order vs routing)
- `ExecutionContext` jako kluczowa różnica — `context.getHandler()` + `Reflector`
- Kiedy middleware wygrywa nad guardem (request ID, body parsing, CORS — cross-cutting)
- Kiedy guard wygrywa (rola, ownership, metadata-driven auth decisions)

### bcrypt vs SHA256 — salt, cost factor, dlaczego do haseł (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-14 | **Next review:** 2026-04-15 (interval: 1d)
**L3 anchor:** src/auth/auth.service.ts:11

Historia:

- 2026-04-14 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:

- Bez scaffoldingu: "dlaczego SHA256 NIE do haseł" (odpowiedź: za szybkie, GPU-friendly)
- Cost factor = 2^n iteracji — umieć wymienić liczbowo dla cost=10, 12
- Salt wbudowany w output bcrypt — dlaczego `compare()` zamiast `===`
- Argon2 jako następca — znać istnienie i dlaczego bcrypt dalej standard

### OWASP top 3 (XSS, SQL injection, CSRF) — mechanizm i obrona (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-04-19 (interval: 1d)
**L3 anchor:** unknown

Historia:
- 2026-04-18 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:
- XSS: jak htmlEntities/CSP blokują; różnica stored vs reflected
- SQL injection: parameterized queries vs ORM jako mechanizm ochrony
- CSRF: dlaczego httpOnly cookie + SameSite=Strict blokuje (vs CSRF token jako alternatywa)
- OWASP A01-A10 lista z głowy — przynajmniej top 5

### Passport strategy lifecycle — jak `validate()` jest wywoływana, co zwraca, skąd AuthGuard bierze user (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-17 | **Next review:** 2026-04-18 (interval: 1d)
**L3 anchor:** src/auth/strategies/local.strategy.ts:8

Historia:

- 2026-04-17 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:

- Bez scaffoldingu: co zwraca `validate()` i gdzie to ląduje (`request.user`)
- `AuthGuard('local')` vs `AuthGuard('jwt')` — jak framework wybiera strategy przez nazwę
- `usernameField: 'email'` default jako gotcha (domyślnie `'username'`)
- Null/throw vs user return → 401 vs przejście do controllera

### CORS — dlaczego istnieje, kiedy browser blokuje request, konfig w NestJS (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-18 | **Next review:** 2026-04-19 (interval: 1d)
**L3 anchor:** src/main.ts:11

Historia:
- 2026-04-18 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:
- Same-Origin Policy — definicja (protokół + domena + port)
- Preflight OPTIONS — kiedy browser go wysyła, co serwer odpowiada
- `Access-Control-Allow-Origin: *` vs konkretna domena — security trade-off
- NestJS `app.enableCors({origin, credentials: true})` + dlaczego `credentials: true` wyklucza `*`

### Config management — env vars, secrets, ConfigModule między środowiskami (M4)

**Score:** 1.5/5 | **Last tested:** 2026-04-17 | **Next review:** 2026-04-18 (interval: 1d)
**L3 anchor:** src/app.module.ts:26

Historia:

- 2026-04-17 (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

Do domknięcia:

- 12-factor config principle (environment > code) samodzielnie
- Joi `validationSchema` jako fail-fast mechanism przy starcie aplikacji
- `configService.get<T>()` vs `process.env.X` — type safety argument
- Secrets rotation — dlaczego hardcoded `JWT_SECRET` to nie tylko DX issue

---

## Bank — Milestone 5 (Node.js runtime)

### Event loop — fazy, microtasks/macrotasks, single-threaded non-blocking (M5)

**Score:** 3.0/5 | **Last tested:** 2026-04-27 | **Next review:** 2026-05-25 (interval: 28d)
**L3 anchor:** unknown

Historia:

- 2026-04-27 (articulation-check): 3.0/5 — szkielet sync→micro→macro poprawny, nextTick>Promise.then po pytaniu, libuv bez nazwy (3d → 28d)
- 2026-04-04 (explain): 3/5 — koncept single-threaded trafny, brakuje precyzji faz

Do domknięcia:

- process.nextTick > Promise.then — pojawia się po pytaniu, nie samodzielnie
- Dlaczego "non-blocking" mimo single-thread (I/O delegowane do kernel/libuv thread pool)

### Streams + backpressure — kiedy użyć, CSV 50MB scenario (M5)

**Score:** 3.5/5 | **Last tested:** 2026-04-27 | **Next review:** 2026-06-12 (interval: 46d)
**L3 anchor:** unknown

Historia:

- 2026-04-27 (articulation-check): 3.5/5 — memory pressure (po korekcie) + backpressure mechanizm samodzielnie. Brakuje BullMQ + 202 Accepted. (3d → 46d)
- 2026-04-04 (mock): 3/5 — streams + chunking + single-threaded event loop trafne po prompcie. Brakowało: queue (BullMQ) jako async offloading, 202 Accepted pattern

Do domknięcia:

- Queue (BullMQ) jako alternatywa dla long-running tasks — nigdy nie pojawia się samodzielnie
- 202 Accepted pattern dla async processing

### Node 1000 concurrent requests — co się dzieje (M5)

**Score:** 0 (ekspozycja 2026-04-04 ale tylko w kontekście event loop) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### cluster vs worker_threads — multi-process vs CPU-bound (M5)

**Score:** 0 (nigdy nie testowane) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Operational errors vs programmer errors — handling strategy (M5)

**Score:** 0 (nigdy nie testowane) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

## Bank — Milestone 6 (NestJS deep dive + SOLID + patterns)

### Request lifecycle w NestJS — Middleware → Guard → Interceptor → Pipe → Controller → Service → Interceptor → Filter (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### useClass vs useValue vs useFactory — kiedy który z realnym przykładem (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### createParamDecorator + Reflector — jak wyciągnąć metadata (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### forRoot vs forFeature pattern — kiedy który (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### SOLID principles — każda litera z przykładem łamania i naprawy (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Strategy, Singleton, Factory, Observer — gdzie widać w NestJS (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### IoC + DI container — transferable concept (Spring, Angular, .NET) (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### class-transformer serialization — @Expose/@Exclude, groups, response shaping (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Event-driven communication — kiedy events zamiast direct call, decoupling trade-offy (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Metadata-driven development — decorators vs annotations vs attributes (transferable) (M6)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

## Bank — Milestone 7 (Docker + deploy + testy + production readiness)

### Multi-stage Docker build — dlaczego, co zyskujesz (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Graceful shutdown w Node — SIGTERM, enableShutdownHooks, DB connection cleanup (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Reverse proxy vs load balancer — różnica, kiedy który (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Unit vs integration vs e2e — ROI, co gdy (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### `Test.createTestingModule()` — jak działa, kiedy mockować, kiedy testować z DB (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Rate limiting strategies — token bucket, sliding window, fixed window (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Scheduled tasks — cron, intervals, kiedy używać, gotchas (distributed systems) (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### File upload best practices — multipart, streaming, Multer, S3 presigned URLs (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### 12-factor app principles — transferable dla każdego backendu w cloudzie (M7)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

## Bank — Milestone 8 (Caching + Queues + Advanced SQL)

### Cache-aside pattern — flow cache hit vs miss (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Cache invalidation strategies — TTL, write-through, write-behind, explicit (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Co gdy Redis padnie — graceful degradation (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Producer/consumer pattern + DLQ (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Idempotency w message processing (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Synchroniczny request vs queue — kiedy który (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### CTE vs subquery — czytelność vs performance (M8)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

## Bank — Milestone 9 (System design + real-time + interview prep)

### DDD basics — bounded context, aggregate, ubiquitous language (M9)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### CQRS — kiedy rozdzielić read/write, jakie problemy rozwiązuje (M9)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### WebSocket vs SSE vs polling — trade-offy, kiedy który (M9)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Horizontal vs vertical scaling — read replicas, circuit breaker (M9)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Monolith vs Microservices — kiedy który, bez buzzwordów (M9)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never
**L3 anchor:** unknown

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**
