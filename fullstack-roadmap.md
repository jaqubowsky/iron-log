# Fullstack Mid+ — Roadmap (milestone-based)

## Status (aktualizuj po każdej sesji)
- **Aktywny milestone:** M4 — Auth + Security 🔴 BLOKUJE
- **Następny checkpoint:** Passport LocalStrategy + POST /auth/register
- **Articulation bank:** tematy narracyjne L2 w `docs/articulation-bank.md`

---

**Cel:** Aplikuję na Fullstack Mid+ (NestJS + Next.js).
**Tempo:** 1-2h dziennie. Codziennie. Bez wymówek. + 15 min Anki poza sesją.
**Projekt:** IRONLOG API — backend do aplikacji treningowej (API-only).
**Dlaczego API-only:** Next.js znasz komercyjnie z 4 lat doświadczenia. Czas sesji inwestujesz w to czego nie umiesz — NestJS, Postgres, Node runtime, system design. Frontend w IRONLOG byłby powtórką materiału który już masz w głowie.
**Progresja:** Milestones, nie tygodnie. Kończysz milestone → idziesz dalej. Nie czekasz na kalendarz.
**Timeline:** 3-4 miesiące. Aktywnie aplikuję od teraz.

## Filozofia

**Umiej napisać kod sam. Umiej uzasadnić dlaczego taki.**

1. **Piszesz kod sam** — docs/przykłady kiedy nie pamiętasz API to normalne. Ale logikę, strukturę i flow piszesz własnymi palcami.
2. **Rozumiesz DLACZEGO** — zanim napiszesz linijkę kodu, odpowiadasz sobie dlaczego tak a nie inaczej.
3. **Myślisz data flow, nie ekranami** — zanim kodujesz feature: narysuj request → controller → service → DB → response.

### Trzy warstwy retencji + Single Source of Truth

| Warstwa | Co | SSOT |
|---|---|---|
| **L1: Atomic facts** | Fakty, definicje, wartości, składnia (max 2 zdania) | Anki (`~/Anki/programming.tsv`) |
| **L2: Articulation topics** | Tematy narracyjne 1-3 min ("wytłumacz mi X") | `docs/articulation-bank.md` |
| **L3: Practical checkpoints** | "X działa", "potrafię napisać X" — kod w IRONLOG | Ten plik (roadmap) |

**Single source of truth — bez duplikatów:**
- Roadmap zawiera **wyłącznie** L3 checkpointy (core + bridge). Lista tematów L2 NIE jest duplikowana per milestone — żyje tylko w `articulation-bank.md`.
- Bank zawiera **wyłącznie** L2 (score, intervals, L3 anchor). Nie zawiera tasków do zakodowania.
- Anki zawiera **wyłącznie** L1 (atomic facts). Nie zawiera wzorców architektonicznych — te są L3 i lecą do roadmap jako bridge tasks.

### Transferable backend concepts — priorytet

Uczysz się NestJS, ale celem jest **rozumienie zasad na tyle żeby ogarnąć każdy backend framework**. Te koncepty są uniwersalne — zobaczysz je w Spring (Java), Django/FastAPI (Python), Laravel (PHP), ASP.NET (C#):

- **IoC + DI container** — Spring, Angular, NestJS, .NET Core implementują ten sam principle. Rozumiesz jak działa container → rozumiesz każdy framework z DI.
- **Request lifecycle / middleware pipeline** — Express/Koa middleware, Laravel middleware, Django middleware, ASP.NET pipeline — wszystkie to ta sama idea: chain of handlers dla request/response.
- **Metadata-driven development** — decorators (TS), annotations (Java/Python), attributes (C#) — ten sam koncept różnie nazwany. Kod opisujesz przez metadata, framework je czyta i robi magic.
- **Exception handling pipeline** — filters, error middleware, exception handlers — różne implementacje jednej idei (jedno miejsce do catch-all error).
- **Schema validation pipeline** — Zod, class-validator, Joi, Pydantic, FluentValidation — wszystko to samo: walidacja jako pipeline przed handler.
- **12-factor app principles** — env vars, stateless, logs jako stream, port binding — uniwersalne dla backendów cloudowych.
- **ORM patterns** — Active Record (Laravel Eloquent, Rails) vs Data Mapper (Prisma, Doctrine, Hibernate) vs Repository (Spring Data, NestJS repository pattern). Rozumiesz różnicę → rozumiesz każdy ORM w 30 minut.

Każde NestJS-specific ćwiczenie jest też ćwiczeniem z tych zasad. W `articulation-bank.md` masz temat narracyjny **"transferable concept X na przykładzie NestJS"** — ten kto opowie to na rozmowie pokazuje senior thinking, nie junior "znam framework".

AI używasz jako: rubber duck, reference, code reviewer — nigdy jako ghostwriter.

## Nawyk: Code Reading (M5–M7)

**Cel:** Pattern recognition przez czytanie kodu produkcyjnego — widzisz jak senior dev używa tych samych narzędzi które budujesz w IRONLOG.

**Repo:** [Immich backend](https://github.com/immich-app/immich/tree/main/server/src) — NestJS + TypeScript, produkcja, duże repo.

**Rytm:** 30 min raz w tygodniu w blokach M5–M7. Nie analiza, nie ćwiczenia — samo czytanie.

| Milestone | Fokus | Gdzie szukać |
|---|---|---|
| M5 | Jak Immich przetwarza pliki bez blokowania event loop | `src/workers/` — streams, async queue handling |
| M6 | Interceptory, dekoratory, custom providers w realnym projekcie | `src/` — szukaj `@Injectable`, `intercept()`, `createParamDecorator` |
| M7 | Production-ready setup: Docker, CI, graceful shutdown | `Dockerfile`, `.github/workflows/`, `src/main.ts` |

**Po czytaniu (5 min):** jedno zdanie w session logu — *"W Immich widziałem X, zaskoczył mnie Y."* Jeśli nic nie zaskoczyło — następnym razem idź głębiej w ten sam plik.

## Reguły przechodzenia między milestones

Każdy checkpoint w roadmap to **L3 (praktyczny)**. Dwie kategorie tasków w jednej liście:

| Stan | Znaczenie |
|---|---|
| `[x]` | Zrealizowany (kod w repo) |
| `[ ]` | Do zrobienia |
| `(bridge)` | Prefix — task wynikły z theory→task bridge (temat L2 ze score ≥3.5 bez kotwicy w kodzie). Dopisywany przez `session-end` gdy briefing utrwalenie check wykryje brak anchora. |

**Milestone header:**
- Jakieś `[ ]` **core** (bez prefixu `(bridge)`) → `🔴 BLOKUJE`
- Wszystkie core `[x]` → `✅` **niezależnie od stanu `(bridge)` tasków**

Bridge nie blokują progression — są addytywne, utrwalają teorię która już była w briefingu. Są priority kandydatami na task w session-start gdy nie ma core'owych `[ ]` w bieżącym milestone.

---

## Milestone 1 — Fundament NestJS + Exercises CRUD ✅

### Co robisz

- Architektura modułowa — diagram modułów z uzasadnieniem ✅
- ExercisesModule — CRUD, separation of concerns ✅
- Prisma + PostgreSQL — schemat bazy, relacje, migracje ✅
- Error handling strategy — spójne kody HTTP, format errorów ✅

### Checkpointy L3

- [x] ExercisesModule CRUD działa, pisany sam
- [x] Error handling jest spójny w całym module

---

## Milestone 2 — SQL fundamenty ✅

### Co robisz

- CRUD w SQL — SELECT, INSERT, UPDATE, DELETE z WHERE. Umiesz napisać ręcznie bez ORM
- JOINy — INNER, LEFT. Umiesz napisać SELECT z JOIN na danych IRONLOG
- Constraints — PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CASCADE DELETE, ON DELETE SET NULL
- Transakcje i ACID, Locking, Normalizacja, Indeksy

### Checkpointy L3

- [x] Potrafię napisać CREATE TABLE z FK i constraints z pamięci
- [x] Umiem napisać raw SQL: SELECT z JOIN, INSERT, UPDATE, DELETE
---

## Milestone 3 — HTTP/REST + NestJS features ✅

### Co robisz

Budujesz WorkoutTemplates, WorkoutLogs — cross-module communication. Widzisz jak ORM mapuje się na SQL.

- Repository pattern — wydziel dostęp do bazy z service do repository
- Ustrukturyzowana paginacja — wydziel do common, reużywalny pattern
- Cross-module communication — WorkoutLogs moduł, import/export między modułami
- HTTP/REST — kody statusów, idempotentność, API versioning, caching

### Checkpointy L3

- [x] Repository pattern wdrożony — service nie woła Prisma bezpośrednio
- [x] Paginacja wydzielona do common — reużywalna dla dowolnego modułu
- [x] Paginacja działa (offset)
- [x] Bug fixy z code review wdrożone
- [x] Moduły komunikują się, zero circular deps
- [ ] (bridge) **Cursor pagination na workout-logs** — już jest lib `common/cursor-pagination`, jest też użycie w `workouts-logs.controller.ts`. Zweryfikować że pokrywa: (a) base64-encoded cursor z ostatniego ID, (b) brak totalCount, (c) działa z filtrami (userId, date range). Jeśli któryś punkt falstart → fix. **Weryfikacja, nie nowy kod.**

---

## Milestone 4 — Auth + Security (NestJS + Passport) 🔴 BLOKUJE

### Co robisz

JWT auth od zera z Passport.js (standard w NestJS). Największy build milestone — po tym masz działające API z pełną autentykacją.

**NestJS-specific focus:** Passport strategies są standardem w NestJS — bez nich `@nestjs/passport` używasz niepoprawnie. Każda rekrutacja NestJS pyta o Passport strategies.

### Checkpointy L3 — Passport strategies

- [x] `LocalStrategy` implementowana — `AuthService.validateUser()` sprawdza email+password, strategy zwraca user object
- [x] `JwtStrategy` implementowana — wyciąga token z Authorization header, weryfikuje signature, zwraca user z payload
- [x] `RefreshTokenGuard` implementowana — custom guard (zamiast passport strategy — refresh token opaque UUID), weryfikuje refresh token z httpOnly cookie, ustawia `request.user` — anchor `src/auth/guards/refresh-token-guard.ts:1`
- [x] `AuthGuard('local')` chroni `POST /auth/login`, wywołuje LocalStrategy — anchor `src/auth/auth.controller.ts:21`
- [x] `AuthGuard('jwt')` chroni protected endpoints — APP_GUARD globalny, anchor `src/app.module.ts:40`
- [x] `RefreshTokenGuard` chroni `POST /auth/refresh/token` — anchor `src/auth/auth.controller.ts:83`

### Checkpointy L3 — Auth endpoints

- [x] `POST /auth/register` — email + password, bcrypt hash, unique email constraint, 409 na duplikat
- [x] `POST /auth/login` — LocalStrategy validates, wystawia access token + opaque refresh token w httpOnly cookie, runtime verified — anchor `src/auth/auth.controller.ts:23`
- [x] `POST /auth/refresh/token` — RefreshTokenGuard validates, rotuje refresh token, wystawia nowy access — anchor `src/auth/auth.controller.ts:83`
- [x] `POST /auth/logout` — unieważnia refresh token (usuwa z DB lub dodaje do blacklist)
- [x] `GET /auth/me` — zwraca aktualnego usera (protected przez JwtStrategy)

### Checkpointy L3 — Ownership + Security

- [x] Ownership guard — custom guard sprawdzający że user widzi tylko swoje zasoby (workout logs, templates)
- [x] `@CurrentUser()` custom decorator — `createStrategyUserDecorator<T>()` factory, type-safe — anchor `src/auth/decorators/strategy-user.decorator.ts:1`
- [x] ConfigModule skonfigurowany — Zod schema z fail-fast, `configService.getOrThrow`, `.passthrough()` — anchor `src/app.module.ts:16`
- [x] Security basics: CORS (konfig per env), helmet, rate limiting (global + per-route) — anchor `src/main.ts:10` + `src/app.module.ts:35` + `src/auth/auth.controller.ts:48`
- [ ] Min. 2 unit testy dla AuthService (validateUser, hashPassword) napisane samodzielnie
- [ ] (bridge, originally M2) **Optimistic locking + `version` field** — dodać `version Int @default(1)` do `WorkoutTemplate` (lub innego modelu który ma realne ryzyko concurrent update). `PATCH /workout-templates/:id` wymaga `If-Match: <version>` lub `version` w body, inkrementuje atomowo w jednym UPDATE, 409 Conflict przy mismatch. Test integration: dwa requesty z tym samym version → drugi dostaje 409. **Tematyczne matching z M4:** refresh token rotation (`valid` flag + reuse detection) to aplikacja tego samego patternu "detect conflict after the fact" — idealnie pasuje jako warmup przy login flow.

### Przykładowe pytania rekrutacyjne

- JWT vs session-based — trade-offy? Kiedy który?
- Access token + refresh token vs sam access token — co gdy wycieknie?
- Guard vs Middleware — oba blokują request. Kiedy który?
- Jak działa Passport Strategy w NestJS? Co zwraca validate() i gdzie idzie dalej?
- "User widzi tylko swoje treningi" — guard? Service? Query filter? Konsekwencje?
- Dlaczego bcrypt a nie SHA256? Co to cost factor?

---

## Milestone 5 — Node.js runtime 🔴 BLOKUJE

### Co robisz

Teoria Node.js — event loop, streams, skalowanie. Jeden praktyczny endpoint używający streams żeby zakotwiczyć wiedzę w kodzie.

### Checkpointy L3

- [ ] Stream processing endpoint — `POST /workout-logs/import-csv` używający `fs.createReadStream` + `csv-parser`, przetwarzający duży plik bez OOM

### Przykładowe pytania rekrutacyjne

- Narysuj event loop — co się dzieje gdy Node dostaje 1000 requestów jednocześnie?
- Masz duży plik do przetworzenia. Jak to robisz w Node? Co to backpressure?
- cluster vs worker_threads — kiedy który?
- Operational error vs programmer error — jak je obsługujesz inaczej?

---

## Milestone 6 — NestJS deep dive + SOLID + patterns 🔴 BLOKUJE

### Co robisz

Głębokie NestJS features: interceptors, exception filters, pipes, dynamic modules, custom providers, serialization, events. Refleksja na auth z M4 + rozbudowa IRONLOG o advanced patterns.

**NestJS-specific focus:** to milestone który pokazuje że **rozumiesz framework jak senior** — custom providers, dynamic modules, event-driven communication. Każda rekrutacja NestJS pyta o te koncepty.

### Checkpointy L3 — Interceptors + Filters + Pipes

- [ ] Response envelope interceptor — wszystkie responses pakowane w `{ data, meta }` format, jeden global interceptor
- [ ] Logging interceptor — loguje każdy request (method, path, duration, user ID) przez Pino
- [ ] Global exception filter — catch-all dla nieobsłużonych wyjątków, loguje + zwraca sanitized response
- [ ] Custom exception classes — `BusinessRuleViolation`, `ResourceNotFound` z dedykowanym filterem
- [ ] Custom ValidationPipe — rozszerzony `ValidationPipe` z logiką specyficzną dla projektu

### Checkpointy L3 — Dynamic Modules + Custom Providers

- [ ] `DatabaseModule.forRoot({...})` — dynamic module dla Prisma z configiem przekazywanym przy imporcie
- [ ] `useFactory` provider — przynajmniej jeden real use case (np. PrismaClient z różną konfiguracją per env)
- [ ] Custom decorator dla `@CurrentUser()` + `@Roles()` — używające `createParamDecorator` i `SetMetadata` + `Reflector`

### Checkpointy L3 — Serialization + Events

- [ ] `class-transformer` serialization — WorkoutLogResponseDto z groups: `'owner'` widzi swoje notatki/komentarze, `'public'` widzi tylko liczby (weight, reps, date) dla leaderboardu
- [ ] EventEmitter module (`@nestjs/event-emitter`) — `WorkoutLogCreatedEvent` emitowany przez WorkoutLogsService po zapisie, consumowany przez: (a) StatsService (pre-compute daily stats), (b) PersonalRecordService (sprawdza czy pobił PR dla ćwiczenia)
- [ ] (bridge, originally M3) **Sparse fields `?fields=`** — `ParseFieldsPipe` dla query param na `GET /exercises`. `@Expose({groups: [...]})` na DTO. Test: `?fields=id,name` zwraca tylko te pola, `?fields=` zwraca wszystkie. **Tematyczne matching z M6:** naturalne rozszerzenie `class-transformer @Expose groups` — ten sam mechanizm serializacji, inny driver (query param zamiast auth role).

### Przykładowe pytania rekrutacyjne

- Interceptor transformuje response — jak to wpływa na testowanie?
- DI scope REQUEST vs DEFAULT — kiedy potrzebujesz request-scoped provider?
- Custom providers — useClass vs useValue vs useFactory. Kiedy który?
- Dynamic module forRoot vs forFeature — pokaż przykład
- Jak działa ExecutionContext w guards/interceptors?
- SOLID — przykład łamania Open/Closed Principle w NestJS. Jak naprawisz?
- Kiedy używasz events zamiast bezpośredniego method call między modułami?
- class-transformer @Expose vs manual response mapping — trade-offy?

---

## Milestone 7 — Docker + deploy + testy + production readiness 🔴 BLOKUJE

### Co robisz

IRONLOG idzie na produkcję jako backend API. Docker, deploy, testy, logging, Swagger, rate limiting, healthchecks, scheduled tasks, file handling.

### Checkpointy L3 — Docker + Deploy

- [ ] `docker-compose up` i działa (Nest + Postgres), multi-stage build
- [ ] App jest na produkcji (Railway/Fly/Render), dostępna przez URL
- [ ] Graceful shutdown działa — `docker stop` domyka DB connection pool czysto (`enableShutdownHooks`)
- [ ] Health endpoints — `GET /health` (liveness), `GET /ready` (readiness) z `@nestjs/terminus`, sprawdzają DB connection

### Checkpointy L3 — Testing (NestJS-specific)

- [ ] `Test.createTestingModule()` — unit testy dla AuthService z mockowanym PrismaService przez useValue
- [ ] Unit testy dla kluczowej logiki w services (min. 10 testów pokrywających happy path + edge cases)
- [ ] E2e test (`@nestjs/testing` + supertest) — flow: rejestracja → login → CRUD workout → logout → protected endpoint odrzuca bez tokena

### Checkpointy L3 — Production features

- [ ] Structured logging (Pino) z request IDs — każdy log ma `reqId`, możesz śledzić request przez cały flow
- [ ] Rate limiting — dwie strategie: global IP-based (`@nestjs/throttler`) + per-user dla sensitive endpoints (login, register)
- [ ] Swagger docs dla całego API — każdy endpoint ma `@ApiOperation`, `@ApiResponse`, DTOs mają `@ApiProperty` z examples
- [ ] Scheduled task (`@nestjs/schedule`) — cron job o 3 rano pre-computing weekly volume stats per user (sum of weight × reps per muscle group), zapisuje do `user_stats_cache` table żeby `GET /stats` nie liczył per request
- [ ] CSV import — `POST /workout-logs/import` (Multer) bulk import historii z innej aplikacji, walidacja struktury, rollback przy błędzie
- [ ] CSV export — `GET /workout-logs/export` (StreamableFile) download własnej historii treningowej (user data export, GDPR compliance)
- [ ] CI pipeline (GitHub Actions): lint + test + build na każdy PR
- [ ] README w IRONLOG: setup, architecture diagram, API docs link, deployment notes
- [ ] (bridge, originally M3) **API versioning (URI)** — `app.enableVersioning({type: VersioningType.URI})` w `main.ts`. `ExercisesController` opakowany w `@Controller({path: 'exercises', version: '1'})`. Bonus: drugi endpoint v2 ze zmienionym shape response. Test: `/v1/exercises` i `/v2/exercises` zwracają różne formaty. **Tematyczne matching z M7:** versioning to produkcyjny concern — razem ze Swagger, CI i deploy pipeline tworzy pełny "production API" package.
- [ ] (bridge, originally M3) **N+1 detection setup** — włączyć `log: ['query']` w `PrismaService`. Specjalnie stworzyć n+1 w `GET /workout-logs` (lista bez `include`), zmierzyć count queries, pofixować `include`em. Commit message z before/after query count. **Tematyczne matching z M7:** structured logging (Pino) + query logging to te same toolkit observability — N+1 detection to drugie narzędzie w tej samej skrzynce.
- [ ] (bridge, originally M3) **External API integration z retry/circuit breaker** — przykładowo: integracja z ExerciseDB API (darmowe). `ExercisesService` ma `syncExternalExercises()` która używa `@nestjs/axios` + retry 3x z exponential backoff. Circuit breaker: jeśli 5 kolejnych fail → 30s cooldown. **Tematyczne matching z M7:** reliability patterns (retry/circuit breaker) to production readiness tak samo jak rate limiting + healthchecks.

### Przykładowe pytania rekrutacyjne

- Multi-stage build — dlaczego? Co zyskujesz?
- Docker wysyła SIGTERM — co robi Twoja Nest app?
- Unit vs integration vs e2e — co daje najlepszy ROI?
- Jak mockujesz Prisma w unit teście NestJS service?
- Jak debugujesz problem na produkcji? Czego szukasz w logach?
- Jak działa rate limiting? Jakie strategie znasz?
- Masz cron job który wysyła email — co gdy masz 3 instancje aplikacji?
- File upload 500MB — jak to robisz żeby nie zajechać memory?

---

## Milestone 8 — Caching + Queues + Advanced SQL 🔴 BLOKUJE

### Co robisz

Produkcyjne backend features: Redis caching, BullMQ queues, zaawansowany SQL. Wszystko NestJS-native przez dedykowane moduły.

### Checkpointy L3 — Redis + Cache

- [ ] Redis skonfigurowany (`@nestjs/cache-manager` + `cache-manager-ioredis-yet`)
- [ ] Cache interceptor dla wybranych endpointów (np. `GET /exercises` — rzadko się zmienia)
- [ ] Cache invalidation działa — po `POST/PUT/DELETE` exercise, cache jest czyszczony
- [ ] Fallback strategy — co robi API gdy Redis padnie (graceful degradation)

### Checkpointy L3 — Queues

- [ ] BullMQ module (`@nestjs/bullmq`) skonfigurowany z Redis jako broker
- [ ] Queue consumer (processor) — przetwarzanie asynchronicznego zadania (np. email po skończonym treningu)
- [ ] Retry + DLQ (dead letter queue) — nieudane jobs lądują w DLQ, można je zainspekować
- [ ] Idempotency w processor — ten sam job przetwarzany 2x daje ten sam wynik

### Checkpointy L3 — Advanced SQL

- [ ] CTE (WITH clause) w raw SQL query — np. top 5 ćwiczeń per user z sub-queries
- [ ] (bridge, originally M2) **Isolation level w krytycznych transakcjach** — obecne `$transaction` w `workouts-logs` repository zamówić z `{ isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted }`. W komentarzu (WHY-only): wyjaśnić który anomaly ten level chroni przed (dirty read blokowany, non-repeatable read dopuszczony) i dlaczego to jest akceptowalne dla tego use case'u. **Tematyczne matching z M8:** exactly-once semantics w queue processorach wymaga zrozumienia isolation levels — naturalnie pasuje do idempotency w processor.
- [ ] (bridge, originally M3) **Idempotency key pattern** — `POST /workout-logs` z `Idempotency-Key` headerem. Interceptor + in-memory store (Map z TTL). Stripe pattern: same key + same body → 200 + cached response; same key + different body → 409. Test e2e wysyłający 2× ten sam request. **Tematyczne matching z M8:** M8 ma już "Idempotency w processor" jako core checkpoint — HTTP idempotency key jest tym samym patternem o jeden level wyżej (request layer zamiast queue message layer).
- [ ] (bridge, originally M3) **Cache-Control + ETag + 304** — `GET /exercises/:id`. Interceptor liczy ETag z `updatedAt` (lub hash content), `If-None-Match` → 304 Not Modified bez body. Na `GET /exercises` (lista publiczna) ustaw `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`. Test curl z ETag round-trip. **Tematyczne matching z M8:** HTTP caching to pierwsza warstwa cache (przed Redis) — razem tworzą pełną strategię cache'owania produkcji.

### Przykładowe pytania rekrutacyjne

- Cache hit vs miss — narysuj flow danych
- Co się dzieje gdy Redis padnie? Czy API dalej działa?
- Synchroniczny request vs queue — kiedy który? Co gdy consumer padnie?
- Idempotency — jak zapewnić że wiadomość nie przetworzona 2x?
- Kiedy CTE a kiedy subquery?

---

## Milestone 9 — System design + real-time + interview prep 🔴 BLOKUJE

### Co robisz

Capstone. Real-time features, system design, interview polish, aplikowanie.

### Checkpointy L3

- [ ] WebSocket gateway (`@nestjs/websockets`) — Personal Record notifications. Flow: user kończy workout → WorkoutLogCreatedEvent (z M6) → PersonalRecordService sprawdza czy `maxWeight > previousBest` (cache z M8) → jeśli tak, WS gateway pusha `pr:new` event do client. User widzi live toast "🎉 Nowy rekord: Squat 150kg!". Pokrywa: EventEmitter (M6) + Redis cache (M8) + WebSocket (M9) end-to-end
- [ ] 2-3 historie behawioralne w formacie STAR — spisane
- [ ] Wysłane min. 5 aplikacji na pozycje Fullstack Mid+ / NestJS
- [ ] IRONLOG na GitHubie: README, Dockerfile, testy, Swagger, live demo URL
- [ ] Potrafię zaprojektować system od zera na kartce w 20 min (system design challenge)

### System design challenges (task briefings w session-start)

- System notyfikacji real-time (WebSockets vs SSE vs polling)
- File upload z progress barem (presigned URLs, chunked upload, S3)
- Scaling — IRONLOG ma 100k userów. Co skalujesz najpierw?
- Auth flow z social login (Google OAuth)
- Multi-tenant architecture dla SaaS version IRONLOG

### Przykładowe pytania rekrutacyjne (pełen zestaw dress rehearsal)

- Event loop bez zacinania (M5)
- DI i NestJS module system (M1/M6)
- JWT auth flow (M4)
- Request lifecycle w NestJS (M6)
- SOLID + gdzie łamiesz Open/Closed (M6)
- Zaprojektuj cache strategy dla X (M8)
- WebSocket vs SSE vs polling (M9)
