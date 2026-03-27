# Fullstack Mid+ — Roadmap (milestone-based)

**Cel:** Aplikuję na Fullstack Mid+ (Next.js + NestJS/Node.js).
**Tempo:** 1-2h dziennie. Codziennie. Bez wymówek. + 15 min Anki poza sesją.
**Projekt:** IRONLOG API — backend do aplikacji treningowej.
**Progresja:** Milestones, nie tygodnie. Kończysz milestone → idziesz dalej. Nie czekasz na kalendarz.
**Timeline:** 3-4 miesiące. Aktywnie aplikuję od teraz. Priorytet: solidne przyswojenie > pęd przez materiał.

## Filozofia

**Umiej napisać kod sam. Umiej uzasadnić dlaczego taki.**

1. **Piszesz kod sam** — docs/przykłady kiedy nie pamiętasz API to normalne. Ale logikę, strukturę i flow piszesz własnymi palcami.
2. **Rozumiesz DLACZEGO** — zanim napiszesz linijkę kodu, odpowiadasz sobie dlaczego tak a nie inaczej.
3. **Myślisz data flow, nie ekranami** — zanim kodujesz feature: narysuj request → controller → service → DB → response.

AI używasz jako:

- Rubber duck — "czy moje podejście ma sens?"
- Reference — "jak wygląda syntax tego decoratora?" (potem SAM piszesz)
- Code reviewer — "co byś zmienił w tym kodzie?"
- NIE ghostwriter

## Format sesji

**70% kodowanie / 30% mówienie** — kodowanie to główna oś sesji. Explain i mock interview na końcu w `/session-end`.

- **Recall challenge na start** — z rotacją: nie tylko ostatnia sesja, też tematy z 3-5 sesji wstecz (spacing effect)
- **Planowanie architektoniczne** — przed kodowaniem, metoda sokratejska
- **Kodowanie feature** — główna oś sesji
- **Mini-recall w trakcie** — losowe pytanie z poprzednich milestones ("a czym się różnił LEFT JOIN od INNER? 15 sekund")
- **Po feature → `/code-review`** — review kodu (scan + sokratejska dyskusja). Odpalaj ile razy chcesz
- **`/session-end`** — explain + mock interview + feedback, session log, roadmap update, fiszki Anki, planowanie następnej sesji
- **System design** — co 3-4 sesje, bazowany na IRONLOG ("zaprojektuj to co za chwilę zbudujesz")

## Priorytet tematów

**Node.js + backend fundamenty > NestJS specifics.** NestJS to framework — zmienisz go w tydzień jeśli rozumiesz co pod spodem. NestJS-specific tematy (custom providers, decorators, dynamic modules) uczysz się przez budowanie, nie w izolacji.

### Reguły przechodzenia między milestones

Każdy nieodhaczony checkpoint ma tag przy sobie:

| Tag | Znaczenie | Blokuje? |
|---|---|---|
| `[x]` | Odhaczony | — |
| `[ ] checkpoint text ⏳ retencja X/5 — data` | Był na sesji, czeka na recall 3+/5 (dotyczy TYLKO checkpointów "potrafię wytłumaczyć/porównać") | NIE — koduj dalej |
| `[ ] checkpoint text 🔴 zero` | Nigdy nie był na sesji | TAK — zaplanuj sesję |

**Jak to stosować:**
1. Sprawdź nieodhaczone checkpointy w aktualnym milestone I we wszystkich wcześniejszych
2. Jest jakiś `🔴 zero`? → zaplanuj sesję na ten temat. Fundamenty mają priorytet nad nowymi feature'ami
3. Wszystkie nieodhaczone = `⏳ retencja`? → koduj dalej, retencja przez Anki + recall
4. `⏳ retencja` po 3 sesjach nadal <3/5 → dedykowana sesja na ten temat

**Milestone header wynika z checkpointów:**
- Jakiś `🔴 zero` → `🔴 BLOKUJE`
- Brak `🔴 zero`, nie wszystko `[x]` → `⏳ retencja`
- Wszystko `[x]` → `✅`

---

## Milestone 1 — Fundament NestJS + Exercises CRUD ✅

### Co robisz

- Architektura modułowa — diagram modułów z uzasadnieniem ✅
- ExercisesModule — CRUD, separation of concerns ✅
- Prisma + PostgreSQL — schemat bazy, relacje, migracje ✅
- Error handling strategy — spójne kody HTTP, format errorów ✅

### Checkpointy

- [x] ExercisesModule CRUD działa, pisany sam
- [x] Error handling jest spójny w całym module
- [x] Potrafię wytłumaczyć podział controller/service komuś na rozmowie

### Przykładowe pytania

- Dlaczego logika w Service a nie w Controller? 3 konkretne powody.
- DTO vs surowy obiekt — po co ta warstwa?
- 400 vs 404 vs 422 vs 500 — kiedy który?

---

## Milestone 2 — SQL fundamenty ⏳ retencja

### Co robisz

Prereq: SQLBolt + PostgreSQL Tutorial ZANIM sesja coachingowa z raw SQL.

- **CRUD w SQL** — SELECT, INSERT, UPDATE, DELETE z WHERE. Umiesz napisać ręcznie bez ORM
  - [x] Potrafię napisać CREATE TABLE z FK i constraints z pamięci
  - [x] Umiem napisać raw SQL: SELECT z JOIN, INSERT, UPDATE, DELETE
- **JOINy** — INNER, LEFT. Umiesz napisać SELECT z JOIN na danych IRONLOG
  - [ ] Potrafię wytłumaczyć różnicę INNER vs LEFT JOIN i kiedy który `⏳ retencja 3.5/5 — 2026-03-27`
- **Constraints** — PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CASCADE DELETE, ON DELETE SET NULL
  - [ ] Potrafię wymienić typy constraints i wytłumaczyć kiedy ON DELETE CASCADE vs SET NULL `⏳ retencja 3/5 — 2026-03-22`
- **Transakcje i ACID** — co to, po co, kiedy użyć `$transaction`. Isolation levels (basics)
  - [ ] Potrafię wytłumaczyć ACID na rozmowie (każda litera z przykładem) `⏳ retencja 3.5/5 — 2026-03-26`
  - [ ] Potrafię wytłumaczyć kiedy użyć transakcji i co to isolation level `⏳ retencja 3/5 — 2026-03-27`
- **Locking** — optimistic vs pessimistic locking
  - [ ] Potrafię wytłumaczyć optimistic vs pessimistic locking — kiedy który `⏳ retencja 3/5 — 2026-03-27`
- **Normalizacja** — 1NF, 2NF, 3NF. Kiedy denormalizować i dlaczego (trade-off: spójność vs performance)
  - [ ] Potrafię wytłumaczyć 3 formy normalne i podać przykład kiedy denormalizować `⏳ retencja 3.5/5 — 2026-03-27`
- **Indeksy** — kiedy dodać, jak wpływają na performance, co robi `EXPLAIN ANALYZE`
  - [ ] Umiem przeczytać EXPLAIN ANALYZE i powiedzieć kiedy dodać indeks `⏳ retencja 3.5/5 — 2026-03-27`
  - [x] Rozumiem co Prisma generuje — potrafię przeczytać migrację SQL i wytłumaczyć każdą linię

### Przykładowe pytania

- Dlaczego Prisma generuje indeks na foreign key? Co by się stało bez niego?
- Tworzysz WorkoutTemplate z 5 ćwiczeniami — jedno ID nie istnieje. Jak to obsłużyć? Atomowo (transakcja) czy częściowo?
- Napisz SQL query który zwraca ten sam kształt co Response DTO — jak JOINujesz tabelę łączącą?

---

## Milestone 3 — HTTP/REST + NestJS features 🔴 BLOKUJE

### Co robisz

Budujesz WorkoutTemplates, WorkoutLogs — cross-module communication. Widzisz jak ORM mapuje się na SQL.

- **Repository pattern** — wydziel dostęp do bazy z service do repository
  - [x] Repository pattern wdrożony — service nie woła Prisma bezpośrednio
  - [ ] Potrafię wytłumaczyć po co repository layer i kiedy to overengineering `⏳ retencja 3/5 — 2026-03-26`
- **Ustrukturyzowana paginacja** — wydziel do common, reużywalny pattern
  - [x] Paginacja wydzielona do common — reużywalna dla dowolnego modułu
  - [x] Paginacja działa, potrafię uzasadnić wybór (offset vs cursor)
- **Code review + bug fixy**
  - [x] Bug fixy z code review wdrożone (@Max, @IsInt — P2025 i TOCTOU już obsłużone przez exception filter)
- **Cross-module communication** — WorkoutLogs moduł, import/export między modułami
  - [x] Moduły komunikują się, zero circular deps
  - [ ] Potrafię wytłumaczyć jak NestJS modules importują/eksportują providery `⏳ retencja 2.5/5 — 2026-03-26`
- **HTTP/REST** — kody statusów, idempotentność, REST vs GraphQL, API versioning
  - [ ] Potrafię wytłumaczyć idempotentność HTTP metod i kiedy 201 vs 200 vs 204 `🔴 zero`
  - [ ] Potrafię porównać REST vs GraphQL z trade-offami `🔴 zero`
  - [ ] Potrafię wytłumaczyć API versioning — kiedy URL vs header `🔴 zero`
  - [ ] Potrafię wytłumaczyć "co się dzieje gdy wpiszesz URL w przeglądarkę" (DNS → TCP → TLS → HTTP → server → response) `🔴 zero`
- **HTTP caching** — Cache-Control, ETag, Last-Modified. Fundamenty protokołu HTTP
  - [ ] Potrafię wytłumaczyć Cache-Control headers (max-age, no-cache, no-store, stale-while-revalidate) `🔴 zero`
  - [ ] Potrafię wytłumaczyć ETag vs Last-Modified — kiedy który, jak działają conditional requests `🔴 zero`
- **ORM trade-offy** — TypeORM vs Prisma vs MikroORM, eager vs lazy loading, N+1 problem
  - [x] Response transformacja — umiem uzasadnić wybór podejścia i trade-offy SQL-level vs app-level
  - [ ] Potrafię wytłumaczyć N+1 problem i jak go rozwiązać `🔴 zero`

### Przykładowe pytania

- Offset pagination vs cursor pagination — trade-offy?
- WorkoutLogsService potrzebuje sprawdzić czy exercise istnieje. Import modułu czy osobny query?
- Circular dependency — dlaczego problem? Jak rozwiązać architekturalnie (nie forwardRef)?
- `GET /workout-logs?exerciseId=5` vs `GET /exercises/5/workout-logs` — kiedy który?

---

## Milestone 4 — Auth + security 🔴 BLOKUJE

### Co robisz

JWT auth od zera. Największy build milestone — po tym masz działające API z autentykacją.

- **JWT auth**
  - [ ] Auth flow działa end-to-end (register, login, refresh, logout), pisany sam `🔴 zero`
  - [ ] Potrafię porównać JWT vs session-based auth z trade-offami `🔴 zero`
  - [ ] Potrafię wytłumaczyć access token + refresh token flow i co gdy token wycieknie `🔴 zero`
- **Guards + ownership**
  - [ ] Ownership check — user nie widzi cudzych danych `🔴 zero`
  - [ ] Potrafię wytłumaczyć guard vs middleware — kiedy który `🔴 zero`
- **Password hashing** — bcrypt vs argon2, salt, cost factor
  - [ ] Potrafię wytłumaczyć dlaczego bcrypt a nie SHA do haseł, co to salt i cost factor `🔴 zero`
- **Security** — CORS, helmet, rate limiting, OWASP basics
  - [ ] Security basics skonfigurowane: CORS, helmet, rate limiting `🔴 zero`
  - [ ] Potrafię wymienić top 3 OWASP (XSS, SQL injection, CSRF) i jak się bronić `🔴 zero`
- **Config management** — `@nestjs/config`, env vars. Nie hardkoduj JWT secret
  - [ ] ConfigModule skonfigurowany — env vars zamiast hardkodowanych wartości `🔴 zero`
  - [ ] Potrafię wytłumaczyć jak zarządzasz configiem między środowiskami (dev/staging/prod) `🔴 zero`
- **Basic testing** — min. 1 unit test dla auth service. Pełna strategia testów w M7
  - [ ] Min. 1 unit test dla auth service napisany sam `🔴 zero`

### Przykładowe pytania

- JWT vs session-based — trade-offy? Kiedy który?
- Access token + refresh token vs sam access token — co gdy wycieknie?
- Guard vs Middleware — oba blokują request. Kiedy który?
- "User widzi tylko swoje treningi" — guard? Service? Query filter? Konsekwencje?
- Co to CORS i dlaczego istnieje? Kiedy browser blokuje request?
- Dlaczego bcrypt a nie SHA256 do hashowania haseł?

---

## Milestone 5 — Node.js runtime 🔴 BLOKUJE

### Co robisz

Teoria Node.js — event loop, streams, skalowanie. Nie budujesz nowych features, ale musisz to umieć wytłumaczyć bo pytają na KAŻDEJ rozmowie Node.js.

- **Event loop** — fazy, microtasks vs macrotasks, single-threaded non-blocking model
  - [ ] Potrafię wytłumaczyć event loop i dlaczego Node jest single-threaded ale non-blocking `🔴 zero`
  - [ ] Potrafię wytłumaczyć co się dzieje gdy Node dostaje 1000 requestów jednocześnie `🔴 zero`
- **Streams** (koncept) — kiedy użyć, co to backpressure. "Jak przetworzysz duży plik bez OOM?"
  - [ ] Potrafię wytłumaczyć kiedy użyć stream i co to backpressure `🔴 zero`
- **Scaling Node.js** — cluster module vs worker_threads (koncept)
  - [ ] Potrafię wytłumaczyć kiedy cluster (multi-process) vs worker_threads (CPU-bound tasks) `🔴 zero`
- **Error handling w Node.js** — operational vs programmer errors
  - [ ] Potrafię wytłumaczyć operational errors vs programmer errors i jak je obsługujesz inaczej `🔴 zero`

### Przykładowe pytania

- Narysuj event loop — co się dzieje gdy Node dostaje 1000 requestów jednocześnie?
- Masz duży plik do przetworzenia. Jak to robisz w Node? Co to backpressure?
- cluster vs worker_threads — kiedy który?
- Operational error vs programmer error — jak je obsługujesz inaczej?

---

## Milestone 6 — NestJS deeper + SOLID + patterns 🔴 BLOKUJE

### Co robisz

Refleksja na tym co zbudowałeś w M4 (auth). Teraz rozumiesz request lifecycle, custom providers, SOLID, design patterns — bo masz kod w którym to widzisz.

- **Request lifecycle**
  - [ ] Potrafię narysować request lifecycle z pamięci (Middleware → Guard → Interceptor → Pipe → Controller → Service → Interceptor → Filter) `🔴 zero`
  - [ ] Response envelope pattern działa na całym API (interceptor) `🔴 zero`
- **NestJS deeper** — custom providers, custom decorators, dynamic modules
  - [ ] Potrafię wytłumaczyć useClass vs useValue vs useFactory z realnym przykładem `🔴 zero`
  - [ ] Potrafię wytłumaczyć createParamDecorator i SetMetadata + Reflector (bo użyłem w auth) `🔴 zero`
  - [ ] Potrafię wytłumaczyć forRoot vs forFeature pattern `🔴 zero`
- **SOLID principles** — każda litera z przykładem
  - [ ] Potrafię wytłumaczyć każdą literę SOLID z przykładem łamania i naprawy `🔴 zero`
  - [ ] Potrafię wskazać gdzie w NestJS widzę SRP, OCP, DIP `🔴 zero`
- **Design patterns** — Strategy, Observer, Factory, Singleton
  - [ ] Potrafię wskazać Strategy (guards, pipes), Singleton (DI default scope), Factory (useFactory), Observer (RxJS) w NestJS `🔴 zero`

### Przykładowe pytania

- Interceptor transformuje response — jak to wpływa na testowanie?
- DI scope REQUEST vs DEFAULT — kiedy potrzebujesz request-scoped provider?
- SOLID — podaj przykład łamania Open/Closed Principle w NestJS. Jak byś to naprawił?
- Strategy pattern — gdzie widzisz go w NestJS?
- Custom providers — useClass vs useValue vs useFactory. Kiedy który?

---

## Milestone 7 — Docker + deploy + testy + logging + Next.js front 🔴 BLOKUJE

### Co robisz

IRONLOG idzie na produkcję. Docker, deploy, testy, logging. Podłącz Next.js frontend — fullstack demo.

- **Docker + deploy**
  - [ ] `docker-compose up` i działa (Nest + Postgres) `🔴 zero`
  - [ ] App jest na produkcji, dostępna przez przeglądarkę `🔴 zero`
  - [ ] Potrafię wytłumaczyć multi-stage build — dlaczego i co zyskujesz `🔴 zero`
  - [ ] Graceful shutdown działa — `docker stop` domyka połączenia czysto `🔴 zero`
- **Structured logging** — Pino zamiast console.log
  - [ ] Structured logging (Pino) działa w IRONLOG `🔴 zero`
  - [ ] Potrafię odpowiedzieć: "Jak debugujesz problem na produkcji? Co logujesz?" `🔴 zero`
- **Reverse proxy** — co to, co robi Nginx/Traefik. 1 pytanie na rozmowie
  - [ ] Potrafię wytłumaczyć co to reverse proxy i czym różni się od load balancera `🔴 zero`
- **Testy**
  - [ ] Unit testy dla kluczowej logiki w services `🔴 zero`
  - [ ] E2e test: rejestracja → login → CRUD → logout `🔴 zero`
  - [ ] Potrafię wytłumaczyć unit vs integration vs e2e — co daje najlepszy ROI `🔴 zero`
  - [ ] Potrafię wytłumaczyć jak działa `Test.createTestingModule()` i kiedy mockować vs testować z DB `🔴 zero`
- **Next.js front**
  - [ ] Next.js front konsumuje API — fullstack demo gotowe `🔴 zero`
  - [ ] Potrafię narysować data flow: user action → component → fetch → API → DB → response → UI update `🔴 zero`
- **Swagger + CI/CD + Git**
  - [ ] Swagger docs dla całego API `🔴 zero`
  - [ ] CI pipeline działa (lint + test + build) `🔴 zero`
  - [ ] Potrafię wytłumaczyć rebase vs merge — kiedy który `🔴 zero`

### Przykładowe pytania

- Multi-stage build — dlaczego? Co zyskujesz?
- Docker wysyła SIGTERM — co robi Twoja Nest app?
- Unit vs integration vs e2e — co daje najlepszy ROI?
- Jak mockujesz Prisma w unit teście NestJS service?
- Rebase vs merge — kiedy który?
- Jak debugujesz problem na produkcji? Czego szukasz w logach?

---

## Milestone 8 — Caching + Queues + Advanced SQL 🔴 BLOKUJE

### Co robisz

Produkcyjne features: Redis caching, BullMQ queues, zaawansowany SQL.

- **Redis**
  - [ ] Redis cache działa na wybranym endpoincie, potrafię zmierzyć różnicę `🔴 zero`
  - [ ] Potrafię wytłumaczyć cache-aside pattern i narysować flow (cache hit vs miss) `🔴 zero`
  - [ ] Potrafię wytłumaczyć cache invalidation strategies i trade-offy `🔴 zero`
  - [ ] Potrafię odpowiedzieć: "Co się dzieje gdy Redis padnie? Czy API dalej działa?" `🔴 zero`
- **Message queues**
  - [ ] Queue przetwarza zadanie asynchronicznie, retry działa `🔴 zero`
  - [ ] Potrafię narysować flow: request → API → queue → consumer → result `🔴 zero`
  - [ ] Potrafię wytłumaczyć producer/consumer, dead letter queue, retry strategy `🔴 zero`
  - [ ] Potrafię wytłumaczyć kiedy synchroniczny request a kiedy queue `🔴 zero`
  - [ ] Potrafię wytłumaczyć idempotency w message processing — jak zapewnić że wiadomość nie przetworzona 2x `🔴 zero`
- **Advanced SQL** — CTEs (Common Table Expressions)
  - [ ] Potrafię wytłumaczyć co to CTE (WITH clause) i kiedy użyć zamiast subquery `🔴 zero`

### Przykładowe pytania

- Cache hit vs miss — narysuj flow danych
- Co się dzieje gdy Redis padnie? Czy API dalej działa?
- Synchroniczny request vs queue — kiedy który? Co gdy consumer padnie?
- Idempotency — jak zapewnić że wiadomość nie przetworzona 2x?
- Kiedy CTE a kiedy subquery? Co zyskujesz czytelności?

---

## Milestone 9 — System design + advanced topics 🔴 BLOKUJE

### Co robisz

Capstone. Dotrzesz tu TYLKO jak M1-M8 odhaczone. System design, advanced topics, interview polish.

- **Behavioral prep**
  - [ ] Mam przygotowane 2-3 historie behawioralne (najtrudniejszy bug, decyzja architektoniczna, code review) `🔴 zero`
  - [ ] Potrafię opowiedzieć każdą w formacie STAR w 2-3 minuty `🔴 zero`
- **DDD basics**
  - [ ] Potrafię wytłumaczyć bounded context, aggregate i ubiquitous language `🔴 zero`
  - [ ] Potrafię podać przykład kiedy DDD ma sens a kiedy overkill `🔴 zero`
- **CQRS**
  - [ ] Potrafię wytłumaczyć co to CQRS i kiedy warto rozdzielić read/write model `🔴 zero`
  - [ ] Potrafię podać jakie problemy rozwiązuje a jakie tworzy `🔴 zero`
- **WebSocket vs SSE vs polling**
  - [ ] Potrafię porównać WebSocket vs SSE vs polling z trade-offami i podać kiedy który `🔴 zero`
- **Scaling fundamentals**
  - [ ] Potrafię wytłumaczyć horizontal vs vertical scaling `🔴 zero`
  - [ ] Potrafię wytłumaczyć read replicas, circuit breaker, graceful degradation `🔴 zero`
- **Monolith vs Microservices** — trade-offy, kiedy migrować, dlaczego monolith-first
  - [ ] Potrafię wytłumaczyć kiedy monolith a kiedy microservices — z konkretnymi argumentami, nie buzzwordami `🔴 zero`

### System design challenges

- System notyfikacji real-time (WebSockets vs SSE vs polling)
- Auth flow z social login, JWT, refresh tokens — front do bazy
- Formularz wielokrokowy z walidacją server-side
- File upload z progress barem (presigned URLs, chunked upload, S3)
- Scaling — IRONLOG ma 100k userów. Co skalujesz najpierw?

### Checkpointy (recall verification — weryfikacja płynności z wcześniejszych milestones)

- [ ] Wysłane min. 5 aplikacji na pozycje Fullstack Mid+ `🔴 zero`
- [ ] Potrafię wytłumaczyć event loop bez zacinania (M5) `🔴 zero`
- [ ] Potrafię wytłumaczyć DI i NestJS module system bez zacinania (M1/M6) `🔴 zero`
- [ ] Potrafię wytłumaczyć JWT auth flow bez zacinania (M4) `🔴 zero`
- [ ] Potrafię narysować request lifecycle bez zacinania (M6) `🔴 zero`
- [ ] Potrafię zaprojektować prosty system od zera na kartce w 20 min `🔴 zero`
- [ ] IRONLOG jest na GitHubie z README, Dockerem, testami — portfolio ready `🔴 zero`

---

## Rytuały sesyjne (od milestone 2)

- **Recall challenge** — co sesję na start, z rotacją tematów (spacing effect)
- **Mini-recall** — losowe pytanie z poprzednich milestones w trakcie kodowania
- **`/code-review`** — po feature, scan + sokratejska dyskusja. Odpalaj ile razy chcesz
- **Explain phase** — w `/session-end`, "wytłumacz co zrobiłeś i dlaczego"
- **Mock interview** — w `/session-end`, co sesję, pytanie z bieżącego tematu LUB losowe z wcześniejszych
- **Design challenge** — co 3-4 sesje: 20 min z kartką: "zaprojektuj API dla X"
- **Review session logu** — co 5 sesji: sprawdź progres samodzielności, porównaj z poprzednimi

---

## Zasady

1. **Zanim napiszesz kod — podejmij decyzję i zapisz uzasadnienie**
2. **Pisz kod sam — AI to reference i reviewer, nie ghostwriter**
3. **Próbuj sam → utknie >15 min → dopiero Claude** (ale rubber duck / architektura od razu OK)
4. **Nie pamiętasz syntax? Docs. Nie rozumiesz dlaczego? Zatrzymaj się i przemyśl.**
5. **Jeśli nie potrafisz wytłumaczyć DLACZEGO tak — nie rozumiesz tego**
6. **Rysuj diagramy — data flow, nie UI mockupy**
7. **1-2h dziennie + 15 min Anki — consistency > intensity**
