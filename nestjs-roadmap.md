# NestJS + Backend — Roadmap (milestone-based)

**Cel:** Aplikuję na Fullstack Mid+ (Next.js + NestJS/Node.js).
**Tempo:** 2-3h dziennie. Codziennie. Bez wymówek.
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
- **Kodowanie feature** — główna oś sesji
- **Mini-recall w trakcie** — losowe pytanie z poprzednich milestones ("a czym się różnił LEFT JOIN od INNER? 15 sekund")
- **Po feature → `/code-review`** — review kodu (scan + sokratejska dyskusja). Odpalaj ile razy chcesz
- **`/session-end`** — explain + mock interview + feedback, session log, roadmap update, fiszki Anki, planowanie następnej sesji
- **System design** — co 3-4 sesje, bazowany na IRONLOG ("zaprojektuj to co za chwilę zbudujesz")

## Priorytet tematów

**Node.js + backend fundamenty > NestJS specifics.** NestJS to framework — zmienisz go w tydzień jeśli rozumiesz co pod spodem. NestJS-specific tematy (custom providers, decorators, dynamic modules) uczysz się przez budowanie, nie w izolacji.

Dopóki nie odhaczysz wszystkich checkpointów w milestone — nie ruszasz następnego.

**Wyjątek:** jeśli nieodhaczone checkpointy to "potrafię wytłumaczyć X" (retencja) a nie "X działa" (kod) — można równolegle kodować następny milestone. Retencja odhacza się przez Anki + recall challenge (4-5/5), nie przez kolejne sesje na ten sam temat. Jeśli po 3 sesjach recall nadal <4/5 — wróć na dedykowaną sesję.

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

---

## Milestone 2 — SQL fundamenty ⏳ retencja

> **Status:** Tematy przerobione na sesjach. Checkpointy "potrafię wytłumaczyć" odhaczane przez recall challenge (4-5/5). Kodowanie idzie dalej w M3.

### Co robisz

Prereq: SQLBolt + PostgreSQL Tutorial ZANIM sesja coachingowa z raw SQL.

- **CRUD w SQL** — SELECT, INSERT, UPDATE, DELETE z WHERE. Umiesz napisać ręcznie bez ORM
  - [ ] Umiem napisać CREATE TABLE z FK i constraints bez pomocy ORM
  - [x] Umiem napisać raw SQL: SELECT z JOIN, INSERT, UPDATE, DELETE
- **JOINy** — INNER, LEFT. Umiesz napisać SELECT z JOIN na danych IRONLOG
  - [ ] Potrafię wytłumaczyć różnicę INNER vs LEFT JOIN i kiedy który
- **Constraints** — PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CASCADE DELETE, ON DELETE SET NULL
  - [ ] Potrafię wymienić typy constraints i wytłumaczyć kiedy ON DELETE CASCADE vs SET NULL
- **Transakcje i ACID** — co to, po co, kiedy użyć `$transaction`. Isolation levels (basics)
  - [ ] Potrafię wytłumaczyć ACID na rozmowie (każda litera z przykładem)
  - [ ] Potrafię wytłumaczyć kiedy użyć transakcji i co to isolation level
- **Locking** — optimistic vs pessimistic locking
  - [ ] Potrafię wytłumaczyć optimistic vs pessimistic locking — kiedy który
- **Normalizacja** — 1NF, 2NF, 3NF. Kiedy denormalizować i dlaczego (trade-off: spójność vs performance)
  - [ ] Potrafię wytłumaczyć 3 formy normalne i podać przykład kiedy denormalizować
- **Indeksy** — kiedy dodać, jak wpływają na performance, co robi `EXPLAIN ANALYZE`
  - [ ] Umiem przeczytać EXPLAIN ANALYZE i powiedzieć kiedy dodać indeks
  - [x] Rozumiem co Prisma generuje — potrafię przeczytać migrację SQL i wytłumaczyć każdą linię

### Przykładowe pytania

- Dlaczego Prisma generuje indeks na foreign key? Co by się stało bez niego?
- Tworzysz WorkoutTemplate z 5 ćwiczeniami — jedno ID nie istnieje. Jak to obsłużyć? Atomowo (transakcja) czy częściowo?
- Napisz SQL query który zwraca ten sam kształt co Response DTO — jak JOINujesz tabelę łączącą?

---

## Milestone 3 — HTTP/REST + NestJS features

### Co robisz

Budujesz WorkoutTemplates, WorkoutLogs — cross-module communication. Widzisz jak ORM mapuje się na SQL.

- **Repository pattern** — wydziel dostęp do bazy z service do repository
  - [ ] Repository pattern wdrożony — service nie woła Prisma bezpośrednio
  - [ ] Potrafię wytłumaczyć po co repository layer i kiedy to overengineering
- **Ustrukturyzowana paginacja** — wydziel do common, reużywalny pattern
  - [ ] Paginacja wydzielona do common — reużywalna dla dowolnego modułu
  - [x] Paginacja działa, potrafię uzasadnić wybór (offset vs cursor)
- **Code review + bug fixy**
  - [x] Bug fixy z code review wdrożone (@Max, @IsInt — P2025 i TOCTOU już obsłużone przez exception filter)
- **Cross-module communication** — WorkoutLogs moduł, import/export między modułami
  - [ ] Moduły komunikują się, zero circular deps
  - [ ] Potrafię wytłumaczyć jak NestJS modules importują/eksportują providery
- **HTTP/REST** — kody statusów, idempotentność, REST vs GraphQL, API versioning
  - [ ] Potrafię wytłumaczyć idempotentność HTTP metod i kiedy 201 vs 200 vs 204
  - [ ] Potrafię porównać REST vs GraphQL z trade-offami
  - [ ] Potrafię wytłumaczyć API versioning — kiedy URL vs header
  - [ ] Potrafię wytłumaczyć "co się dzieje gdy wpiszesz URL w przeglądarkę" (DNS → TCP → TLS → HTTP → server → response)
- **HTTP caching** — Cache-Control, ETag, Last-Modified. Fundamenty protokołu HTTP
  - [ ] Potrafię wytłumaczyć Cache-Control headers (max-age, no-cache, no-store, stale-while-revalidate)
  - [ ] Potrafię wytłumaczyć ETag vs Last-Modified — kiedy który, jak działają conditional requests
- **ORM trade-offy** — TypeORM vs Prisma vs MikroORM, eager vs lazy loading, N+1 problem
  - [x] Response transformacja — umiem uzasadnić wybór podejścia i trade-offy SQL-level vs app-level
  - [ ] Potrafię wytłumaczyć N+1 problem i jak go rozwiązać

### Przykładowe pytania

- Offset pagination vs cursor pagination — trade-offy?
- WorkoutLogsService potrzebuje sprawdzić czy exercise istnieje. Import modułu czy osobny query?
- Circular dependency — dlaczego problem? Jak rozwiązać architekturalnie (nie forwardRef)?
- `GET /workout-logs?exerciseId=5` vs `GET /exercises/5/workout-logs` — kiedy który?

---

## Milestone 4 — Auth + security

### Co robisz

JWT auth od zera. Największy build milestone — po tym masz działające API z autentykacją.

- **JWT auth**
  - [ ] Auth flow działa end-to-end (register, login, refresh, logout), pisany sam
  - [ ] Potrafię porównać JWT vs session-based auth z trade-offami
  - [ ] Potrafię wytłumaczyć access token + refresh token flow i co gdy token wycieknie
- **Guards + ownership**
  - [ ] Ownership check — user nie widzi cudzych danych
  - [ ] Potrafię wytłumaczyć guard vs middleware — kiedy który
- **Password hashing** — bcrypt vs argon2, salt, cost factor
  - [ ] Potrafię wytłumaczyć dlaczego bcrypt a nie SHA do haseł, co to salt i cost factor
- **Security** — CORS, helmet, rate limiting, OWASP basics
  - [ ] Security basics skonfigurowane: CORS, helmet, rate limiting
  - [ ] Potrafię wymienić top 3 OWASP (XSS, SQL injection, CSRF) i jak się bronić
- **Config management** — `@nestjs/config`, env vars. Nie hardkoduj JWT secret
  - [ ] ConfigModule skonfigurowany — env vars zamiast hardkodowanych wartości
  - [ ] Potrafię wytłumaczyć jak zarządzasz configiem między środowiskami (dev/staging/prod)
- **Basic testing** — min. 1 unit test dla auth service. Pełna strategia testów w M8
  - [ ] Min. 1 unit test dla auth service napisany sam

### Przykładowe pytania

- JWT vs session-based — trade-offy? Kiedy który?
- Access token + refresh token vs sam access token — co gdy wycieknie?
- Guard vs Middleware — oba blokują request. Kiedy który?
- "User widzi tylko swoje treningi" — guard? Service? Query filter? Konsekwencje?
- Co to CORS i dlaczego istnieje? Kiedy browser blokuje request?
- Dlaczego bcrypt a nie SHA256 do hashowania haseł?

---

## Milestone 5 — JS/TS artykulacja

### Co robisz

Znasz te rzeczy z 4 lat Reacta — ale się zacinasz gdy trzeba wytłumaczyć. Ten milestone to **trening mówienia**, nie nauka od zera. Ćwiczysz na mock interviews i explain phase.

- **JavaScript fundamenty**
  - [ ] Potrafię wytłumaczyć closures z praktycznym przykładem
  - [ ] Potrafię wytłumaczyć `this` binding (arrow vs regular, call/apply/bind)
  - [ ] Potrafię wytłumaczyć Promise.all vs Promise.allSettled vs Promise.race — kiedy który
  - [ ] Potrafię wytłumaczyć async/await error handling i kiedy sequential vs parallel execution
- **TypeScript advanced**
  - [ ] Potrafię napisać utility type z generykami (np. DeepPartial, Pick z warunkiem)
  - [ ] Potrafię wytłumaczyć `any` vs `unknown` vs `never` na rozmowie
  - [ ] Potrafię wytłumaczyć `type` vs `interface` — deep differences (declaration merging, extends vs &)
  - [ ] Potrafię wytłumaczyć discriminated unions i type narrowing z przykładem
  - [ ] Potrafię wytłumaczyć dlaczego unikać `enum` i kiedy `as const` vs `enum` vs `const enum`

### Przykładowe pytania

- Closures — napisz przykład gdzie closure powoduje memory leak. Jak to naprawić?
- Promise.all vs Promise.allSettled — masz 5 fetch requestów, 1 failuje. Co użyjesz?
- `this` w arrow function vs regular function — co się stanie w tym kodzie? (pokaż snippet)
- Napisz utility type `DeepPartial<T>` — jak działa z nested objects?
- `any` vs `unknown` — kiedy który? Dlaczego `unknown` jest bezpieczniejszy?

---

## Milestone 6 — Node.js runtime

### Co robisz

Teoria Node.js — event loop, streams, skalowanie. Nie budujesz nowych features, ale musisz to umieć wytłumaczyć bo pytają na KAŻDEJ rozmowie Node.js.

- **Event loop** — fazy, microtasks vs macrotasks, single-threaded non-blocking model
  - [ ] Potrafię wytłumaczyć event loop i dlaczego Node jest single-threaded ale non-blocking
  - [ ] Potrafię wytłumaczyć co się dzieje gdy Node dostaje 1000 requestów jednocześnie
- **Streams** (koncept) — kiedy użyć, co to backpressure. "Jak przetworzysz duży plik bez OOM?"
  - [ ] Potrafię wytłumaczyć kiedy użyć stream i co to backpressure
- **Scaling Node.js** — cluster module vs worker_threads (koncept)
  - [ ] Potrafię wytłumaczyć kiedy cluster (multi-process) vs worker_threads (CPU-bound tasks)
- **Error handling w Node.js** — operational vs programmer errors
  - [ ] Potrafię wytłumaczyć operational errors vs programmer errors i jak je obsługujesz inaczej

### Przykładowe pytania

- Narysuj event loop — co się dzieje gdy Node dostaje 1000 requestów jednocześnie?
- Masz duży plik do przetworzenia. Jak to robisz w Node? Co to backpressure?
- cluster vs worker_threads — kiedy który?
- Operational error vs programmer error — jak je obsługujesz inaczej?

---

## Milestone 7 — NestJS deeper + SOLID + patterns

### Co robisz

Refleksja na tym co zbudowałeś w M4 (auth). Teraz rozumiesz request lifecycle, custom providers, SOLID, design patterns — bo masz kod w którym to widzisz.

- **Request lifecycle**
  - [ ] Potrafię narysować request lifecycle z pamięci (Middleware → Guard → Interceptor → Pipe → Controller → Service → Interceptor → Filter)
  - [ ] Response envelope pattern działa na całym API (interceptor)
- **NestJS deeper** — custom providers, custom decorators, dynamic modules
  - [ ] Potrafię wytłumaczyć useClass vs useValue vs useFactory z realnym przykładem
  - [ ] Potrafię wytłumaczyć createParamDecorator i SetMetadata + Reflector (bo użyłem w auth)
  - [ ] Potrafię wytłumaczyć forRoot vs forFeature pattern
- **SOLID principles** — każda litera z przykładem
  - [ ] Potrafię wytłumaczyć każdą literę SOLID z przykładem łamania i naprawy
  - [ ] Potrafię wskazać gdzie w NestJS widzę SRP, OCP, DIP
- **Design patterns** — Strategy, Observer, Factory, Singleton
  - [ ] Potrafię wskazać Strategy (guards, pipes), Singleton (DI default scope), Factory (useFactory), Observer (RxJS) w NestJS

### Przykładowe pytania

- Interceptor transformuje response — jak to wpływa na testowanie?
- DI scope REQUEST vs DEFAULT — kiedy potrzebujesz request-scoped provider?
- SOLID — podaj przykład łamania Open/Closed Principle w NestJS. Jak byś to naprawił?
- Strategy pattern — gdzie widzisz go w NestJS?
- Custom providers — useClass vs useValue vs useFactory. Kiedy który?

---

## Milestone 8 — Docker + deploy + testy + logging

### Co robisz

Praktyczny milestone — IRONLOG idzie na produkcję. Docker, deploy, testy, logging.

- **Docker + deploy**
  - [ ] `docker-compose up` i działa (Nest + Postgres)
  - [ ] App jest na produkcji, dostępna przez przeglądarkę
  - [ ] Potrafię wytłumaczyć multi-stage build — dlaczego i co zyskujesz
  - [ ] Graceful shutdown działa — `docker stop` domyka połączenia czysto
- **Structured logging** — Pino zamiast console.log
  - [ ] Structured logging (Pino) działa w IRONLOG
  - [ ] Potrafię odpowiedzieć: "Jak debugujesz problem na produkcji? Co logujesz?"
- **Reverse proxy** — co to, co robi Nginx/Traefik. 1 pytanie na rozmowie
  - [ ] Potrafię wytłumaczyć co to reverse proxy i czym różni się od load balancera
- **Testy**
  - [ ] Unit testy dla kluczowej logiki w services
  - [ ] E2e test: rejestracja → login → CRUD → logout
  - [ ] Potrafię wytłumaczyć unit vs integration vs e2e — co daje najlepszy ROI
  - [ ] Potrafię wytłumaczyć jak działa `Test.createTestingModule()` i kiedy mockować vs testować z DB
- **Swagger + CI/CD + Git**
  - [ ] Swagger docs dla całego API
  - [ ] CI pipeline działa (lint + test + build)
  - [ ] Potrafię wytłumaczyć rebase vs merge — kiedy który

### Przykładowe pytania

- Multi-stage build — dlaczego? Co zyskujesz?
- Docker wysyła SIGTERM — co robi Twoja Nest app?
- Unit vs integration vs e2e — co daje najlepszy ROI?
- Jak mockujesz Prisma w unit teście NestJS service?
- Rebase vs merge — kiedy który?
- Jak debugujesz problem na produkcji? Czego szukasz w logach?

---

## Milestone 9 — Next.js/React artykulacja + frontend

### Co robisz

Podłącz Next.js frontend do IRONLOG API. Twoja siła — ale musisz umieć WYTŁUMACZYĆ to co robisz od lat. Ten milestone łączy budowanie (frontend) z treningiem artykulacji.

- **Next.js front**
  - [ ] Next.js front konsumuje API — fullstack demo gotowe
  - [ ] Potrafię wytłumaczyć Server vs Client Components i kiedy który
  - [ ] Potrafię wytłumaczyć App Router cache layers i kiedy dostajesz stale data
  - [ ] Potrafię wytłumaczyć Streaming z Suspense — dlaczego lepsze UX, co pod spodem (chunked HTML)
  - [ ] Potrafię narysować data flow: user action → component → fetch → API → DB → response → UI update
  - [ ] Potrafię wytłumaczyć ISR — kiedy ISR vs SSR vs SSG
  - [ ] Potrafię wytłumaczyć Parallel Routes + Intercepting Routes — "modal z własnym URL"
  - [ ] Potrafię wytłumaczyć Route Handlers vs Server Actions — kiedy który
- **React fundamenty**
  - [ ] Potrafię wytłumaczyć reconciliation i po co virtual DOM
  - [ ] Potrafię wytłumaczyć kiedy React.memo/useMemo/useCallback faktycznie pomagają (a kiedy to premature optimization)
  - [ ] Potrafię wytłumaczyć Error Boundaries — co łapią, czego nie łapią, kiedy używać
  - [ ] Potrafię wytłumaczyć controlled vs uncontrolled components — kiedy który
  - [ ] Potrafię wytłumaczyć rules of hooks i dlaczego nie można wołać hooks warunkowo
- **Data fetching patterns**
  - [ ] Potrafię wytłumaczyć kiedy React Query vs Server Components vs route handler
  - [ ] Potrafię wytłumaczyć waterfall problem i jak go unikać
- **State management**
  - [ ] Potrafię wytłumaczyć kiedy context, kiedy external store, kiedy server state
- **Security w Next.js**
  - [ ] Potrafię wytłumaczyć różnicę server actions vs API routes w kontekście security (CSRF)

### Przykładowe pytania

- Server Component vs Client Component — user klika button i filtruje listę. Gdzie stan? Gdzie fetch?
- `"use client"` na górze pliku — co to naprawdę robi? Czy cały plik jest renderowany tylko na kliencie?
- App Router cache — request przechodzi przez 4 warstwy cache. Narysuj flow. Kiedy stale data?
- Streaming z Suspense — dlaczego lepsze UX niż loading spinner?
- React.memo — kiedy naprawdę pomaga? Kiedy premature optimization?
- ISR vs SSR vs SSG — masz blog z 10k postów, jak renderujesz?
- Parallel Routes — jak zbudujesz modal z własnym URL?
- Route Handler vs Server Action — kiedy który?
- Masz Next.js frontend + NestJS API. Gdzie autentykujesz? Middleware? Layout? Server action?

---

## Milestone 10 — Caching + Queues + Advanced SQL

### Co robisz

Produkcyjne features: Redis caching, BullMQ queues, zaawansowany SQL.

- **Redis**
  - [ ] Redis cache działa na wybranym endpoincie, potrafię zmierzyć różnicę
  - [ ] Potrafię wytłumaczyć cache-aside pattern i narysować flow (cache hit vs miss)
  - [ ] Potrafię wytłumaczyć cache invalidation strategies i trade-offy
  - [ ] Potrafię odpowiedzieć: "Co się dzieje gdy Redis padnie? Czy API dalej działa?"
- **Message queues**
  - [ ] Queue przetwarza zadanie asynchronicznie, retry działa
  - [ ] Potrafię narysować flow: request → API → queue → consumer → result
  - [ ] Potrafię wytłumaczyć producer/consumer, dead letter queue, retry strategy
  - [ ] Potrafię wytłumaczyć kiedy synchroniczny request a kiedy queue
  - [ ] Potrafię wytłumaczyć idempotency — jak zapewnić że wiadomość nie przetworzona 2x
- **Advanced SQL** — CTEs (Common Table Expressions)
  - [ ] Potrafię wytłumaczyć co to CTE (WITH clause) i kiedy użyć zamiast subquery

### Przykładowe pytania

- Cache hit vs miss — narysuj flow danych
- Co się dzieje gdy Redis padnie? Czy API dalej działa?
- Synchroniczny request vs queue — kiedy który? Co gdy consumer padnie?
- Idempotency — jak zapewnić że wiadomość nie przetworzona 2x?
- Kiedy CTE a kiedy subquery? Co zyskujesz czytelności?

---

## Milestone 11 — System design + advanced topics

### Co robisz

Capstone. Dotrzesz tu TYLKO jak M1-M10 odhaczone. System design, advanced topics, interview polish.

- **Behavioral prep**
  - [ ] Mam przygotowane 2-3 historie behawioralne (najtrudniejszy bug, decyzja architektoniczna, code review)
  - [ ] Potrafię opowiedzieć każdą w formacie STAR w 2-3 minuty
- **DDD basics**
  - [ ] Potrafię wytłumaczyć bounded context, aggregate i ubiquitous language
  - [ ] Potrafię podać przykład kiedy DDD ma sens a kiedy overkill
- **CQRS**
  - [ ] Potrafię wytłumaczyć co to CQRS i kiedy warto rozdzielić read/write model
  - [ ] Potrafię podać jakie problemy rozwiązuje a jakie tworzy
- **WebSocket vs SSE vs polling**
  - [ ] Potrafię porównać z trade-offami dla konkretnego use case'u
  - [ ] Potrafię wytłumaczyć kiedy SSE wystarczy, kiedy polling OK, kiedy WebSocket
- **Scaling fundamentals**
  - [ ] Potrafię wytłumaczyć horizontal vs vertical scaling
  - [ ] Potrafię wytłumaczyć read replicas, circuit breaker, graceful degradation
- **Monolith vs Microservices** — trade-offy, kiedy migrować, dlaczego monolith-first
  - [ ] Potrafię wytłumaczyć kiedy monolith a kiedy microservices — z konkretnymi argumentami, nie buzzwordami

### System design challenges

- System notyfikacji real-time (WebSockets vs SSE vs polling)
- Auth flow z social login, JWT, refresh tokens — front do bazy
- Formularz wielokrokowy z walidacją server-side
- File upload z progress barem (presigned URLs, chunked upload, S3)
- Scaling — IRONLOG ma 100k userów. Co skalujesz najpierw?

### Checkpointy (meta)

- [ ] Wysłane min. 5 aplikacji na pozycje Fullstack Mid+
- [ ] Potrafię wytłumaczyć event loop, DI, JWT, request lifecycle bez zacinania
- [ ] Potrafię zaprojektować prosty system od zera na kartce w 20 min
- [ ] IRONLOG jest na GitHubie z README, Dockerem, testami — portfolio ready

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
7. **2-3h dziennie — consistency > intensity**
