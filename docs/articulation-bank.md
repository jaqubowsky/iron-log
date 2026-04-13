# Articulation Bank

**Cel:** Baza tematów narracyjnych (L2 retention) — rzeczy które Jakub ma umieć opowiedzieć na rozmowie w 1-3 minuty. Weryfikacja przez coach w session-end (2 pytania per sesja, priority-based selection).

**Bank nie blokuje roadmap.** Kręci się w tle niezależnie od aktywnego milestone. Jedyne kryterium postępu milestone = praktyczne (L3) checkpointy w `fullstack-roadmap.md`.

**Source of Truth:** ten plik jest SSOT dla score'ów, historii i stanu tematów narracyjnych.

## Polityka wpisów

Wpis do banku powstaje **przy pierwszej ekspozycji** na temat. Ekspozycja = coach wyjaśnił analogię + przykład + Jakub formułuje własnymi słowami, lub task briefing w session-start, lub spontaniczny recall podczas kodowania/review. Bez ekspozycji temat nie istnieje w banku — czeka w roadmap jako cross-reference.

**Dlaczego lazy creation:** bank nie puchnie tematami z przyszłych milestones. Rozmiar banku = liczba tematów w aktywnej nauce, nie plan na rok.

**Gdy temat już istnieje w banku,** każda kolejna ekspozycja (articulation check, explain phase, kolejny recall) **aktualizuje** wpis — nie tworzy duplikatu. Update = dodanie nowej linii do Historii + update Score/Last tested/Streak/Status.

**Wpisy nigdy nie są usuwane z banku.** Nawet opanowane tematy zostają — zmienia się tylko częstotliwość z jaką wracają do rotacji (patrz "Mastery state" poniżej). Historia = wartość, zarówno dla retrospektywy progresu jak i dla protection przed Ebbinghaus forgetting curve (opanowana wiedza bez powtórek degraduje).

---

## Algorytm wyboru pytań (priority-based selection)

1. **Filter:** pomijaj tematy ze score 0 (wymagają ekspozycji przez theory preview/task briefing w session-start zanim wejdą do rotation)
2. **Sortuj kandydatów** po priorytetach:
   - (a) Score rosnąco — słabe tematy pierwsze
   - (b) Dni od ostatniego testu malejąco — dawno nietestowane pierwsze
   - (c) Milestone rosnąco — M1 przed M4, starsze tematy priorytet
3. **Wybierz top 2** (lub inną liczbę podaną jako parametr)
4. **Spacing guard:** min. 2 sesje przerwy dla tego samego tematu (nigdy 2x z rzędu)
5. **Re-recall obowiązkowy przy score <3.5** (nie <4, obniżyliśmy próg do mid+ level)

## Skala oceny

- **1/5** — nie wie o co chodzi, odpowiedź chaotyczna
- **2/5** — mętna odpowiedź, wymagała dużo naprowadzania
- **3/5** — zna koncept, brakuje precyzji lub detali
- **3.5/5** — solidna mid+ odpowiedź z drobnymi brakami ← **próg odhaczania**
- **4/5** — odpowiedź z trade-offami, minimalne naprowadzanie
- **5/5** — poziom seniora, relacje z innymi tematami, kontekst

## SM-2 lite — effective intervals + mastery state

Adaptujemy SpaceD Repetition Method (SuperMemo-2) dla format narracyjnego. Nie implementujemy pełnego algorytmu z ease factor — zamiast tego priority-based selection + mastery flag dają podobny efekt:

| Score / Status | Effective interval (min. dni między testami) | Priority pool |
|---|---|---|
| 1.0-2.5 (poor) | 3 dni (bo spacing guard) | Hot pool — zawsze w top 2 |
| 3.0-3.5 (borderline) | 3-7 dni | Active rotation — priorytet gdy dawno nietestowane |
| 4.0 (solid, nie mastered) | 7-14 dni | Cold pool — rzadko |
| **Mastered** (promoted po streak 2/2) | **30+ dni** | Cold pool — tylko confirmation |

**Mastery jest flagą**, nie score'em. Temat może mieć score 4.5/5 ale NIE być mastered (jeśli nie osiągnął streak 2/2 z spacing). I odwrotnie — mastered temat zachowuje swój score (zwykle ≥4.0), ale ma dodatkowy marker.

## Mastery state — dokumentacja

Gdy temat osiąga mastery promotion (patrz warunki w sekcji "Promocja"), jego wpis dostaje dodatkowe pole:

```markdown
### [Topic name] (Mx)

**Score:** 4.0/5 | **Last tested:** 2026-05-20 | **Streak:** 2/2 | **Status:** mastered (since 2026-05-20)

Historia:
- 2026-05-20 (articulation-check): 4.0/5 — ✓ mastery achieved (streak 2/2)
- 2026-05-15 (articulation-check): 4.0/5 — solidna odpowiedź
- 2026-04-28 (articulation-check): 4.0/5 — pierwszy streak increment
...
```

**Co mastered robi w praktyce:**
- `articulation-check` priority selection pomija mastered topics **chyba że** minęło ≥30 dni od ostatniego testu (wtedy wracają do kandydatów, confirmation rotation)
- Przy explicit Jakub request ("sprawdź mnie z X" albo "recall wszystkich M2 na dress rehearsal") — mastered topics są w pool jak wszystkie
- Przy **lapse detection** (score ≥4 i teraz <3.5) — mastered flag **jest usuwana**, wpis wraca do hot pool, `Status:` pole usunięte lub zmienione na `Status: demoted from mastered (YYYY-MM-DD)`

**Co mastery NIE robi:**
- NIE usuwa wpisu z pliku
- NIE traci historii
- NIE wyłącza tematu z systemu — zawsze może wrócić do rotation


## Lapse rule (explicit)

Jeśli topic miał wcześniej **score ≥4** (w historii) i w nowym teście spada **<3.5**, traktuje się to jako **lapse** (regres) — nie zwykły borderline:

- `Streak` resetuje się do **0/2** (nie tylko nie rośnie — resetuje)
- Topic trafia do **hot poola** (score <3.5) i dostaje priorytet w kolejnych rotacjach
- Lapse jest silniejszym sygnałem niż pierwszy zły score — oznacza że wcześniej opanowane koncepty uciekły, warto je zaadresować szybko

Odróżnienie lapse od regular miss: patrz historię. Jeśli **ostatnie ≥2 wpisy** miały score ≥4 i teraz <3.5 → **lapse**. Jeśli topic nigdy nie miał ≥4 → zwykły borderline (streak po prostu nie rośnie).

## Promocja do mastery (nie usuwanie!)

Topic zostaje **promoted do mastered** gdy wszystkie trzy warunki:

1. **Streak 2/2** — dwa kolejne testy ze score ≥3.5/5
2. **Min. 3 dni przerwy** między oboma testami składającymi się na streak (SRS philosophy — pojedyncze 4/5 nie wystarczy, wymaga potwierdzenia w czasie)
3. **Brak lapse** w ostatnich 3 wpisach historii — jeśli był regres ≥4 → <3.5 w ostatnich 3 testach, streak musi być osiągnięty PO lapse, nie przed nim

**Promocja = dodanie pola `**Status:** mastered (since YYYY-MM-DD)`** do wpisu. Wpis zostaje w banku, historia zostaje, wraca do rotation za 30+ dni (confirmation only). Bank nic nie usuwa — kiedykolwiek chcesz wrócić do tematu, jest tam z całą historią progresu.

**Demotion z mastered:** jeśli temat mastered dostanie score <3.5 w kolejnym teście (confirmation failed = lapse z wysokiego poziomu), flag `mastered` jest usuwana, wpis wraca do hot pool, dodany wpis historii `"⚠ demoted from mastered — score regressed"`.

## Score-0 entries — convention

Tematy które nie miały jeszcze pierwszej ekspozycji mają uproszczony format:

```markdown
### Topic name (Mx)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**
```

Te wpisy są **intencjonalnie bez** sekcji Streak/Historia/"Do domknięcia" — bo nie ma jeszcze czego trackować. Articulation-check skill **pomija** score-0 entries w priority selection (nie możesz testować czegoś czego Jakub nigdy nie widział). Score-0 trafia do rotation **dopiero po pierwszej ekspozycji** przez task briefing w session-start — wtedy wpis dostaje pierwszy score (zwykle 1.5/5 jako "widział signposting, nie opanował"), pełną strukturę (Streak 0/2, Historia, Do domknięcia), i wchodzi do normalnej rotacji.

## History tag convention

Każdy wpis w sekcji "Historia" tematu ma tag source — skąd pochodzi score. Dozwolone tagi:

| Tag | Znaczenie |
|---|---|
| `(mock)` | Mock interview w ramach old flow (historical, przed refactor 2026-04-13) |
| `(recall)` | Recall challenge w ramach old flow (historical) |
| `(explain)` | Explain phase w session-end |
| `(articulation-check)` | Articulation check w session-end (new flow, default po refactor) |
| `(task briefing)` | Pierwsza ekspozycja w session-start task briefing — zwykle przypisuje score 1.5/5 |

Articulation-check skill zapisuje nowe wpisy z tagiem `(articulation-check)`. Historyczne `(mock)` / `(recall)` / `(explain)` zostają jak są — nie przepisujemy ich.

---

## Bank — Milestone 1 (NestJS fundamenty)

### Controller/Service split — dlaczego logika w Service, 3 powody (M1)

**Score:** 4.0/5 | **Last tested:** 2026-03-21 | **Streak:** 1/2

Historia:
- 2026-03-21 (mock): 4/5 — solidna odpowiedź od pierwszego razu

Do domknięcia:
- Potrzebuje drugiego testu z min. 3 dni spacing żeby osiągnąć mastery (obecnie streak 1/2)

---

## Bank — Milestone 2 (SQL fundamenty)

### FK constraints + ON DELETE CASCADE/SET NULL/NO ACTION/RESTRICT (M2)

**Score:** 3.0/5 | **Last tested:** 2026-03-22 | **Streak:** 0/2

Historia:
- 2026-03-22 (mock): 3/5 — nie znał SET NULL i SET DEFAULT bez podpowiedzi

Do domknięcia:
- Wymienić wszystkie 4 opcje bez scaffoldingu
- Konkretny scenariusz IRONLOG kiedy który (np. WorkoutLogs.exerciseId → SET NULL bo chcemy zachować historię treningu gdy exercise usunięty)

### INNER vs LEFT JOIN — kiedy który, co zwraca gdy brak dopasowania (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Streak:** 0/2

Historia:
- 2026-04-10 (recall): 3.5/5 — mechanizm poprawny, "NULL w prawej tabeli" po prompcie

Do domknięcia:
- "NULL w kolumnach prawej tabeli" bez scaffoldingu
- Trick question: "czy INNER może zwrócić więcej rekordów niż LEFT?" (nie — LEFT ≥ INNER zawsze)

### ACID — wytłumacz każdą literę z przykładem z IRONLOG (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Streak:** 0/2

Historia:
- 2026-04-10 (recall): 3.5/5 — A/I/D samodzielnie, C wymagało scenariusza z FK constraint jako mechanizm

Do domknięcia:
- Consistency jako jedyna litera gwarantowana częściowo przez aplikację (nie tylko DB)
- Constraints jako mechanizm C bez scenariusza

### Transakcje + isolation levels — kiedy użyć, 4 poziomy, trade-off performance/correctness (M2)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Streak:** 0/2

Historia:
- 2026-04-10 (recall): 3.5/5 — 4 levele + trade-off + READ COMMITTED dla IRONLOG

Do domknięcia:
- Anomaly names: dirty read, non-repeatable read, phantom read (nie wymienił)
- Który isolation level blokuje którą anomaly

### Optimistic vs pessimistic locking — kiedy który, implementacja, 409 Conflict (M2)

**Score:** 4.0/5 | **Last tested:** 2026-04-10 | **Streak:** 1/2

Historia:
- 2026-04-10 (recall): 4/5 — koncept + trade-off + 409 Conflict samodzielnie

Do domknięcia:
- `version` field w Prisma jako konkretna implementacja optimistic
- `SELECT FOR UPDATE` jako konkretna implementacja pessimistic
- Drugi test z 3+ dni spacing → mastery promotion

### Normalizacja 1NF/2NF/3NF + denormalizacja (M2)

**Score:** 4.0/5 | **Last tested:** 2026-04-10 | **Streak:** 1/2

Historia:
- 2026-04-10 (recall): 4/5 — 2NF z IRONLOG composite key samodzielnie, denormalizacja snapshot+performance

Do domknięcia:
- 1NF precyzyjna definicja (miała mglistą "wartości po przecinkach")
- Kierunek zależności zip_code → city był odwrócony
- Drugi test z 3+ dni spacing → mastery promotion

### Composite PK vs auto-increment ID w tabeli łączącej — trade-offy (M2)

**Score:** 3.5/5 | **Last tested:** 2026-03-24 | **Streak:** 0/2

Historia:
- 2026-03-24 (mock): 3.5/5 — indeksy po hincie, pominął prostsze JOINy

Do domknięcia:
- Indeksy jako argument bez scaffoldingu
- JOINy prostsze z auto-increment (tylko jedna kolumna w ON)
- Ten temat jest blisko graduacji — jeden solid test więcej (z 3+ sesji spacing) i wypada z banku

### EXPLAIN ANALYZE — jak czytać, kiedy dodać indeks, Seq Scan vs Index Scan (M2)

**Score:** 3.5/5 | **Last tested:** 2026-03-27 | **Streak:** 0/2

Historia:
- 2026-03-27 (mock 2x tego samego dnia):
  - "orders 1M rekordów 5 sek": 3.5/5 — EXPLAIN + indeks + paginacja trafne, pominął cache, N+1, connection pooling
  - "GET /workout-logs/:id 200ms": 3.5/5 — trafne, pominął connection pooling, middleware overhead

Do domknięcia:
- Connection pooling jako fundamentalna warstwa performance
- N+1 problem jako "to samo query 100 razy zamiast jednego z JOINem"
- Cache (HTTP lub Redis) jako pierwsza warstwa przed DB optimization

### Prisma → SQL mapping (migracje, JOINy, relacje) (M2)

**Score:** 4.0/5 | **Last tested:** 2026-03-22 | **Streak:** 1/2

Historia:
- 2026-03-22 (explain): 4/5 — rozumie schema → SQL, używał przy composite key

Do domknięcia:
- Drugi test z 3+ dni spacing → mastery promotion

---

## Bank — Milestone 3 (HTTP/REST + NestJS features)

### Repository pattern — po co, kiedy overengineering (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Streak:** 0/2

Historia:
- 2026-04-10 (recall): 3.5/5 — testowalność + swappable + koszt typów (progres od 3/5). Pominął "ORM jest już abstrakcją"
- 2026-03-28 (mock): 3/5 — separacja bazy + overengineering. Pominął testowalność, "ORM to już abstrakcja"

Do domknięcia:
- "ORM jest już abstrakcją" jako kontrargument (kiedy repo NIE jest potrzebne)
- Jednostronna vs dwustronna odpowiedź (koszty AND zyski)

### Offset vs cursor pagination — trade-offy, kiedy który, filtrowanie (M3)

**Score:** 3.0/5 | **Last tested:** 2026-03-25 | **Streak:** 0/2

Historia:
- 2026-03-25 (mock): 3/5 — pominął że cursor nie wymaga totalCount, synchronizację where w offset

Do domknięcia:
- Cursor nie wymaga totalCount (prostsze filtrowanie, mniejsze payload)
- Synchronizacja WHERE w offset gdy dane się zmieniają (duplicate/missing rows)
- Kiedy offset jest OK (small datasets, random access), kiedy cursor (feeds, infinite scroll)

### NestJS modules — exports/imports, providery, cross-module communication (M3)

**Score:** 3.0/5 | **Last tested:** 2026-03-26 | **Streak:** 0/2

Historia:
- 2026-03-26 (mock 2x):
  - "WorkoutsService sprawdza exercises": 3/5 — tylko 1 opcja (import), brak alternatyw
  - "Moduł A potrzebuje danych z modułu B — 3+ opcje": 3/5 — DI/import od razu, event-based po hincie
- Słabość: brak samodzielnego myślenia o alternatywach, circular dependency awareness

Do domknięcia:
- 3+ opcje komunikacji samodzielnie (import/export, shared service, event-based, API call)
- Mechanizm exports/imports (Module decorator providers/exports arrays)
- Circular dependency — dlaczego problem, jak rozwiązać architekturalnie (nie forwardRef)

### External API service — retry, circuit breaker, error handling (M3)

**Score:** 4.0/5 | **Last tested:** 2026-03-25 | **Streak:** 1/2

Historia:
- 2026-03-25 (mock): 4/5 — dobre pokrycie architektury

Do domknięcia:
- Error handling detale: retry strategy, circuit breaker, exponential backoff
- Mapowanie danych z zewnętrznego kształtu (ACL layer)
- Drugi test z 3+ dni spacing → mastery promotion

### Response transformation — SQL-level vs app-level trade-offy (M3)

**Score:** 4.0/5 | **Last tested:** 2026-03-23 | **Streak:** 1/2

Historia:
- 2026-03-23 (mock): 2.5/5 — nie wymienił performance bez naprowadzenia
- Po sesjach kodowania progres do 4/5

Do domknięcia:
- Drugi formalny test z 3+ dni spacing → mastery promotion

### REST sparse fields — mobile vs web, field filtering, DTO per client (M3)

**Score:** 3.5/5 | **Last tested:** 2026-03-28 | **Streak:** 0/2

Historia:
- 2026-03-28 (mock): 3.5/5 — sparse fields `?fields=` + osobne endpointy z trade-offami. Pominął GraphQL jako alternatywa, DTO/serializacja jako mechanizm

Do domknięcia:
- GraphQL jako alternatywa z trade-offami (over-fetching rozwiązany natywnie)
- DTO/serializacja jako konkretny mechanizm (class-transformer @Expose groups)

### Idempotentność HTTP + idempotency key pattern (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-13 | **Streak:** 0/2

Historia:
- 2026-04-13 (mock): 3.5/5 — definicja, GET/POST/PUT/PATCH/DELETE + PATCH niuans (update vs increment) samodzielnie. Błąd: 409 jako default przy duplikacie. Re-recall: "PUT wymaga znanego ID przy create" — kanoniczny argument samodzielnie
- 2026-03-31 (mock): 3.5/5 — front blokada + idempotency key + Redis lookup. Pominął nazwa "idempotency key", co serwer zwraca, TTL

Do domknięcia:
- **200 + cached response** jako Stripe pattern (nie 409) przy duplikacie klucza
- 409 TYLKO przy body mismatch z tym samym kluczem
- TTL klucza w Redis (24h standard)

### N+1 problem — definicja, detection, JOIN vs DataLoader (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-13 | **Streak:** 0/2

Historia:
- 2026-04-13 (mock): 3/5 — definicja + IRONLOG scenariusz + JOIN fix OK. BONUS: "Prisma include = SELECT + IN, nie JOIN, łączy w pamięci" samodzielnie. Luka: detection tools i DataLoader pattern

Do domknięcia:
- Detection: Prisma `log: ['query']`, slow query log (`log_min_duration_statement`), APM flamegraph
- DataLoader pattern: batch loading w jednym event loop ticku, kiedy vs JOIN (dynamic shape → DataLoader, static → JOIN)

### Cache-Control headers + conditional requests (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-13 | **Streak:** 0/2

Historia:
- 2026-04-13 (recall): 3.5/5 — szkielet (max-age/no-cache/no-store/stale-while-revalidate) samodzielnie. Brakowało If-None-Match/If-Modified-Since nazw i public/private distinction. Re-recall po feedbacku poprawny.

Do domknięcia:
- `If-None-Match: "<etag>"` + 304 Not Modified bez scaffoldingu
- `public` vs `private` w shared cache context (CDN)
- Pełny header dla `/exercises` (shared resource): `public, max-age=3600, stale-while-revalidate=86400`

### API versioning — URL vs header vs query param, Vary, semver (M3)

**Score:** 3.0/5 | **Last tested:** 2026-04-13 | **Streak:** 0/2

Historia:
- 2026-04-13 (mock): 3/5 — konkluzja OK (URL wygrywa). Błąd: "header = brak cache" (faktycznie Vary: Accept + cache hit rate trade-off). Brak: Stripe/GitHub jako przykłady, semver, non-breaking examples. Re-recall: Vary powierzchownie, non-breaking pominięty

Do domknięcia:
- `Vary: Accept` mechanizm + cache hit rate trade-off (per-klient zamiast per-resource)
- Stripe/GitHub jako real-world header versioning users
- Semver: major w URL, minor/patch = backwards-compatible (nie wymaga bumpa)
- Non-breaking examples: dodanie opcjonalnego pola, nowy endpoint, nowy opcjonalny query param
- Breaking: usunięcie pola, zmiana typu, dodanie obowiązkowego pola do requesta

### "Co się dzieje gdy wpiszesz URL w przeglądarce" — DNS/TCP/TLS/HTTP (M3)

**Score:** 3.5/5 | **Last tested:** 2026-04-10 | **Streak:** 0/2

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

**Score:** 4.0/5 | **Last tested:** 2026-04-13 | **Streak:** 1/2

Historia:
- 2026-04-13 (mock): 4/5 — pełna odpowiedź bez naprowadzania (flow, lifetime, storage trade-offs, rotation + reuse detection). Drobne: "lookup" zamiast "verify signature", memory-reload issue pominięty, SameSite nie nazwany

Do domknięcia:
- "Verify signature" zamiast "lookup" w słownictwie (stateless vs session nuance)
- Memory storage wada: reload → token znika → refresh flow restore
- `SameSite=Strict` jako główny CSRF mitigation (nie CSRF token)
- Drugi test z 3+ dni spacing → mastery promotion

### JWT vs session-based auth — trade-offy (M4)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Guard vs Middleware — oba blokują request, kiedy który (M4)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### bcrypt vs SHA256 — salt, cost factor, dlaczego do haseł (M4)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### OWASP top 3 (XSS, SQL injection, CSRF) — mechanizm i obrona (M4)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Config management — env vars, secrets, ConfigModule między środowiskami (M4)

**Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

---

## Bank — Milestone 5 (Node.js runtime)

### Event loop — fazy, microtasks/macrotasks, single-threaded non-blocking (M5)

**Score:** 3.0/5 | **Last tested:** 2026-04-04 | **Streak:** 0/2

Historia:
- 2026-04-04 (explain): 3/5 — koncept single-threaded trafny, brakuje precyzji faz

Do domknięcia:
- Phases by name: timers → pending callbacks → idle/prepare → poll → check → close callbacks
- Microtask queue ordering (process.nextTick > Promise.then) między fazami
- Dlaczego "non-blocking" mimo single-thread (I/O delegowane do kernel/libuv thread pool)

### Streams + backpressure — kiedy użyć, CSV 50MB scenario (M5)

**Score:** 3.0/5 | **Last tested:** 2026-04-04 | **Streak:** 0/2

Historia:
- 2026-04-04 (mock): 3/5 — streams + chunking + single-threaded event loop trafne po prompcie. Brakowało: queue (BullMQ) jako async offloading, 202 Accepted pattern

Do domknięcia:
- Queue (BullMQ) jako alternatywa dla long-running tasks
- 202 Accepted pattern dla async processing
- Backpressure mechanism: pause upstream gdy downstream buffer pełny

### Node 1000 concurrent requests — co się dzieje (M5)

**Score:** 0 (ekspozycja 2026-04-04 ale tylko w kontekście event loop) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### cluster vs worker_threads — multi-process vs CPU-bound (M5)

**Score:** 0 (nigdy nie testowane) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

### Operational errors vs programmer errors — handling strategy (M5)

**Score:** 0 (nigdy nie testowane) | **Last tested:** never

Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**

