# NestJS + Backend — Roadmap (milestone-based)

**Cel:** Aplikuję na Fullstack Mid+ (Next.js + NestJS/Node.js).
**Tempo:** 2-3h dziennie. Codziennie. Bez wymówek.
**Projekt:** IRONLOG API — backend do aplikacji treningowej.
**Progresja:** Milestones, nie tygodnie. Kończysz milestone → idziesz dalej. Nie czekasz na kalendarz.

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

---

## Milestone 1 — Fundament NestJS + Exercises CRUD ✅

### Co robisz

- Architektura modułowa — diagram modułów z uzasadnieniem ✅
- ExercisesModule — CRUD, separation of concerns ✅
- Prisma + PostgreSQL — schemat bazy, relacje, migracje
- Error handling strategy — spójne kody HTTP, format errorów

### Przykładowe pytania (coach dobiera na bieżąco do kontekstu sesji)

- Dlaczego logika w Service a nie w Controller? 3 konkretne powody.
- DTO vs surowy obiekt — po co ta warstwa?
- 400 vs 404 vs 422 vs 500 — kiedy który?

### Checkpointy

- [x] ExercisesModule CRUD działa, pisany sam
- [x] Error handling jest spójny w całym module
- [x] Potrafię wytłumaczyć podział controller/service komuś na rozmowie

---

## Milestone 2 — PostgreSQL deep dive + relacje + HTTP fundamenty

### Co robisz

- WorkoutTemplates i WorkoutLogs moduły — cross-module communication
- **Raw SQL obok Prisma** — nie tylko ORM, rozumiesz co się dzieje pod spodem
- Po każdej migracji Prisma — otwierasz wygenerowany SQL i rozumiesz co tam jest
- Filtrowanie, sortowanie, paginacja
- Response transformacja — DTO pattern, trade-offy
- **HTTP/REST fundamenty** — budujesz API, musisz rozumieć protokół pod spodem

### Kolejność nauki (prereq-y → praktyka)

**Faza A: SQL fundamenty (nauka + ćwiczenie)**
Prereq: SQLBolt + PostgreSQL Tutorial ZANIM sesja coachingowa z raw SQL.

- **CRUD w SQL** — SELECT, INSERT, UPDATE, DELETE z WHERE. Umiesz napisać ręcznie bez ORM
- **JOINy** — INNER, LEFT. Umiesz napisać SELECT z JOIN na danych IRONLOG
- **Constraints** — PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CASCADE DELETE, ON DELETE SET NULL
- **Transakcje i ACID** — co to, po co, kiedy użyć `$transaction`. Isolation levels (basics)
- **Normalizacja** — 1NF, 2NF, 3NF. Kiedy denormalizować i dlaczego (trade-off: spójność vs performance)
- **Indeksy** — kiedy dodać, jak wpływają na performance, co robi `EXPLAIN ANALYZE`

**Faza B: NestJS features z zastosowaniem SQL + HTTP**
Po opanowaniu SQL basics — budujesz features i widzisz jak ORM mapuje się na SQL.

- **Repository pattern** — wydziel dostęp do bazy z service do repository. Service = logika biznesowa, repository = queries
- **Ustrukturyzowana paginacja** — wydziel logikę paginacji (offset + cursor) do common, reużywalny pattern zamiast hardkodowania w każdym service
- **Code review + bug fixy** — @Max na limit, obsługa P2025 (404 zamiast 500), @IsInt na order, TOCTOU race condition
- WorkoutLogs moduł — cross-module communication, nowe relacje
- Filtrowanie, sortowanie, paginacja
- Raw SQL obok Prisma — porównaj query ORM z ręcznym SQL
- **HTTP/REST** — kody statusów (201 vs 200, 401 vs 403), idempotentność metod, REST vs GraphQL trade-offy, API versioning
- **ORM trade-offy** — TypeORM vs Prisma vs MikroORM, eager vs lazy loading, N+1 problem

### Przykładowe pytania (coach dobiera na bieżąco do kontekstu sesji)

- Offset pagination vs cursor pagination — trade-offy? Który lepszy dla IRONLOG?
- `GET /workout-logs?exerciseId=5` vs `GET /exercises/5/workout-logs` — kiedy który?
- WorkoutLogsService potrzebuje sprawdzić czy exercise istnieje. Import modułu czy osobny query? Trade-offy?
- Circular dependency — dlaczego problem? Jak rozwiązać architekturalnie (nie forwardRef)?
- Dlaczego Prisma generuje indeks na foreign key? Co by się stało bez niego?
- Tworzysz WorkoutTemplate z 5 ćwiczeniami — jedno ID nie istnieje. Jak to obsłużyć? Atomowo (transakcja) czy częściowo?
- Napisz SQL query który zwraca ten sam kształt co Response DTO — jak JOINujesz tabelę łączącą?

### Checkpointy

**SQL fundamenty (faza A):**
- [ ] Umiem napisać CREATE TABLE z FK i constraints bez pomocy ORM
- [x] Umiem napisać raw SQL: SELECT z JOIN, INSERT, UPDATE, DELETE
- [ ] Potrafię wytłumaczyć ACID i transakcje na rozmowie
- [ ] Umiem przeczytać EXPLAIN ANALYZE i powiedzieć kiedy dodać indeks
- [x] Rozumiem co Prisma generuje — potrafię przeczytać migrację SQL i wytłumaczyć każdą linię

**NestJS features + HTTP (faza B):**
- [ ] Repository pattern wdrożony — service nie woła Prisma bezpośrednio
- [ ] Paginacja wydzielona do common — reużywalna dla dowolnego modułu
- [x] Bug fixy z code review wdrożone (@Max, @IsInt — P2025 i TOCTOU już obsłużone przez exception filter)
- [ ] Moduły komunikują się, zero circular deps
- [x] Paginacja działa, potrafię uzasadnić wybór (offset vs cursor)
- [ ] Potrafię wytłumaczyć idempotentność HTTP metod i kiedy 201 vs 200 vs 204 na rozmowie
- [x] Response transformacja — umiem uzasadnić wybór podejścia (DTO vs class-transformer vs map w service) i trade-offy SQL-level vs app-level

---

## Milestone 3 — Auth + security + request lifecycle + Node.js fundamenty

### Co robisz

- JWT auth od zera — rejestracja, login, token refresh, logout
- Guards — ownership check (user widzi tylko swoje treningi)
- Request lifecycle: Middleware → Guard → Interceptor (before) → Pipe → Controller → Service → Interceptor (after) → Filter
- Response envelope pattern z interceptorem — ustandaryzowane response'y w całym API
- **Security** — CORS, helmet, rate limiting, sanityzacja inputu, OWASP top 10 (XSS, SQL injection, CSRF)
- **NestJS deeper** — DI scope (DEFAULT vs REQUEST vs TRANSIENT)
- **Node.js fundamenty** — event loop (fazy, microtasks vs macrotasks), single-threaded non-blocking model, kiedy worker threads, streams (basics)

### Przykładowe pytania (coach dobiera na bieżąco do kontekstu sesji)

- JWT vs session-based — trade-offy? Kiedy który?
- Access token + refresh token vs sam access token — co gdy wycieknie?
- Guard vs Middleware — oba blokują request. Kiedy który?
- "User widzi tylko swoje treningi" — guard? Service? Query filter? Konsekwencje każdego podejścia?
- Interceptor transformuje response — jak to wpływa na testowanie? Jak testujesz kształt response'u?
- Co to CORS i dlaczego istnieje? Kiedy browser blokuje request?
- Narysuj event loop — co się dzieje gdy Node dostaje 1000 requestów jednocześnie?
- DI scope REQUEST vs DEFAULT — kiedy potrzebujesz request-scoped provider?

### Checkpointy

- [ ] Auth flow działa end-to-end, pisany sam
- [ ] Potrafię narysować request lifecycle z pamięci
- [ ] Ownership check — user nie widzi cudzych danych
- [ ] Potrafię porównać JWT z Better Auth / session-based na rozmowie
- [ ] Response envelope pattern działa na całym API (interceptor)
- [ ] Security basics: CORS skonfigurowany, helmet, rate limiting
- [ ] Potrafię wytłumaczyć event loop i dlaczego Node jest single-threaded ale non-blocking

---

## Milestone 4 — Docker + deploy + Next.js front + CI/CD

### Co robisz

- Dockerfile (multi-stage build) + docker-compose (Nest + PostgreSQL)
- Deploy na VPS (Dokploy + Traefik)
- **Podłącz prosty Next.js frontend** — Twoja siła, pokaż fullstack na rozmowie
- Swagger/OpenAPI docs
- **CI/CD** — basic pipeline (lint, test, build, deploy)
- **Git workflow** — rebase vs merge trade-offy, branching strategy

### Next.js — tematy rekrutacyjne (twoja siła, poleruj)

Znasz Next.js — tu nie uczysz się od zera, tylko upewniasz się że potrafisz wytłumaczyć na rozmowie:

- Server Component vs Client Component — trade-offy, kiedy który
- App Router cache layers (request memoization, data cache, full route cache), cache invalidation
- Streaming z Suspense, generateStaticParams vs dynamiczne renderowanie
- Middleware — Edge Runtime ograniczenia, auth w middleware vs layout vs API route
- Performance — LCP/CLS, lazy loading, dynamic() z ssr: false, bundle analysis, partial prerendering

### Przykładowe pytania (coach dobiera na bieżąco do kontekstu sesji)

- Multi-stage build — dlaczego? Co zyskujesz?
- Gdzie baza? Osobny kontener? Managed?
- Jak Nest API wpasuje się w Twój istniejący VPS setup?
- Rebase vs merge — kiedy który? Jak rozwiązujesz konflikty?
- Server Component vs Client Component — kiedy który i dlaczego?
- Jak działa cache w Next.js App Router? Kiedy go invalidujesz?

### Checkpointy

- [ ] `docker-compose up` i działa (Nest + Postgres)
- [ ] App jest na produkcji, dostępna przez przeglądarkę
- [ ] Next.js front konsumuje API — fullstack demo gotowe
- [ ] Swagger docs dla całego API
- [ ] CI pipeline działa (lint + test + build)
- [ ] Potrafię wytłumaczyć Server vs Client Components i App Router cache na rozmowie

---

## Milestone 5 — Caching (Redis) + Message Queues

### Co robisz

- **Redis** — caching layer dla API. Kiedy cache'ować, cache invalidation, TTL
- **Message queues** (BullMQ/RabbitMQ) — asynchroniczne operacje poza request/response cycle
- Praktyka: dodaj caching do najczęściej odpytywanego endpointu + queue do operacji która nie musi być synchroniczna

### Kluczowe tematy

- **Redis** — typy danych (string, hash, list, set, sorted set), TTL, cache-aside pattern, cache invalidation strategies (write-through, write-behind, invalidate-on-write)
- **Kiedy cache'ować** — co jest warte cache'owania, co nie? Trade-off: stale data vs performance
- **Message queues** — producer/consumer pattern, dead letter queue, retry strategy, idempotency
- **Kiedy queue** — "user czeka na response" vs "operacja w tle". Przykłady: email, PDF, heavy computation

### Przykładowe pytania (coach dobiera na bieżąco do kontekstu sesji)

- Cache hit vs miss — narysuj flow danych dla obu scenariuszy
- Co się dzieje gdy Redis padnie? Czy API dalej działa?
- Synchroniczny request vs queue — kiedy który? Co gdy queue consumer padnie?
- Jak zapewnić że ta sama wiadomość nie zostanie przetworzona dwa razy (idempotency)?

### Checkpointy

- [ ] Redis cache działa na wybranym endpoincie, potrafię zmierzyć różnicę
- [ ] Potrafię wytłumaczyć cache invalidation strategies na rozmowie
- [ ] Queue przetwarza zadanie asynchronicznie, retry działa
- [ ] Potrafię narysować flow: request → API → queue → consumer → result

---

## Milestone 6 — Testy + API review

### Co robisz

- Testing strategy: co testujesz, jak, dlaczego
- Min. unit testy dla service + e2e test dla auth flow
- Pełny review API: spójność URL patterns, error responses, edge case'y

### Przykładowe pytania (coach dobiera na bieżąco do kontekstu sesji)

- Unit vs integration vs e2e — co na którym poziomie? Co daje najlepszy ROI?
- Ile testów to dość dla side projectu vs pracy komercyjnej?
- Mock dependencies vs test cały flow — kiedy który?

### Checkpointy

- [ ] Unit testy dla kluczowej logiki w services
- [ ] E2e test: rejestracja → login → CRUD → logout
- [ ] API jest spójne — potrafię je pokazać na rozmowie

---

## Milestone 7 — Rozmowy + uzupełnianie braków

### Co robisz

- **Aplikujesz na pozycje** — nie czekaj na perfekcję
- Mock interviews: pytania techniczne NestJS/Node.js/PostgreSQL
- System design challenges (20 min z kartką)
- Uzupełniasz braki które wyjdą na rozmowach
- **TypeScript advanced** — generyki (napisz utility type), discriminated unions, type narrowing, infer, satisfies, Result/Either pattern
- **Behavioral prep** — najtrudniejszy bug, decyzje architektoniczne, code review, onboarding

### System design challenges

- System notyfikacji real-time (WebSockets vs SSE vs polling, kolejkowanie, persystencja)
- Auth flow z social login, JWT, refresh tokens — front do bazy
- Formularz wielokrokowy z walidacją server-side (server actions vs API route, zod, optimistic updates)
- File upload z progress barem (presigned URLs, chunked upload, S3)

### Rytuały sesyjne (od milestone 3)

- **`/mock-interview`** — co sesję pytanie rekrutacyjne, odpowiadasz swoimi słowami, feedback
- **Design challenge** — co 3-4 sesje: 20 min z kartką: "zaprojektuj API dla X"
- **Review session logu** — co 5 sesji: sprawdź progres samodzielności, porównaj z poprzednimi

### Checkpointy

- [ ] Wysłane min. 5 aplikacji na pozycje Fullstack Mid+
- [ ] Potrafię wytłumaczyć event loop, DI, JWT, request lifecycle bez zacinania
- [ ] Potrafię zaprojektować prosty system od zera na kartce w 20 min
- [ ] IRONLOG jest na GitHubie z README, Dockerem, testami — portfolio ready
- [ ] Potrafię napisać utility type z generykami (np. DeepPartial, Pick z warunkiem)
- [ ] Mam przygotowane 2-3 historie behawioralne (bug, decyzja architektoniczna, code review)

---

## Zasady

1. **Zanim napiszesz kod — podejmij decyzję i zapisz uzasadnienie**
2. **Pisz kod sam — AI to reference i reviewer, nie ghostwriter**
3. **Próbuj sam → utknie >15 min → dopiero Claude** (ale rubber duck / architektura od razu OK)
4. **Nie pamiętasz syntax? Docs. Nie rozumiesz dlaczego? Zatrzymaj się i przemyśl.**
5. **Jeśli nie potrafisz wytłumaczyć DLACZEGO tak — nie rozumiesz tego**
6. **Rysuj diagramy — data flow, nie UI mockupy**
7. **2-3h dziennie — consistency > intensity**
