# NestJS + Backend — Roadmap (8 tygodni)

**Cel:** Za 8 tygodni aplikuję na Fullstack Mid (Next.js + NestJS/Node.js).
**Tempo:** 2-3h dziennie. Codziennie. Bez wymówek.
**Projekt:** IRONLOG API — backend do aplikacji treningowej.

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

## Tydzień 1-2 — Fundament NestJS + Exercises CRUD ✅ (w trakcie)

### Co robisz
- Architektura modułowa — diagram modułów z uzasadnieniem ✅
- ExercisesModule — CRUD, separation of concerns ✅ (w trakcie)
- Prisma + PostgreSQL — schemat bazy, relacje, migracje
- Error handling strategy — spójne kody HTTP, format errorów

### Pytania do przemyślenia
- Dlaczego logika w Service a nie w Controller? 3 konkretne powody.
- DTO vs surowy obiekt — po co ta warstwa?
- 400 vs 404 vs 422 vs 500 — kiedy który?

### Checkpointy
- [ ] ExercisesModule CRUD działa, pisany sam
- [ ] Error handling jest spójny w całym module
- [ ] Potrafię wytłumaczyć podział controller/service komuś na rozmowie

---

## Tydzień 3 — PostgreSQL deep dive + relacje

### Co robisz
- WorkoutTemplates i WorkoutLogs moduły — cross-module communication
- **Raw SQL obok Prisma** — nie tylko ORM, rozumiesz co się dzieje pod spodem
- Filtrowanie, sortowanie, paginacja

### PostgreSQL — kluczowe tematy
- JOINy (INNER, LEFT, prawe zagnieżdżone), subqueries, CTEs
- Window functions (ROW_NUMBER, RANK — przydatne do paginacji i statystyk)
- Indeksy: B-tree, GIN (na JSONB/array), partial indexes
- `EXPLAIN ANALYZE` — umiesz przeczytać plan query i powiedzieć co jest wolne
- Constraints, cascade delete, nullable references

### Pytania do przemyślenia
- Offset pagination vs cursor pagination — trade-offy? Który lepszy dla IRONLOG?
- `GET /workout-logs?exerciseId=5` vs `GET /exercises/5/workout-logs` — kiedy który?
- WorkoutLogsService potrzebuje sprawdzić czy exercise istnieje. Import modułu czy osobny query? Trade-offy?
- Circular dependency — dlaczego problem? Jak rozwiązać architekturalnie (nie forwardRef)?

### Checkpointy
- [ ] Moduły komunikują się, zero circular deps
- [ ] Umiem napisać raw SQL: JOIN + CTE + WHERE z filtrami
- [ ] Umiem przeczytać EXPLAIN ANALYZE i powiedzieć co zoptymalizować
- [ ] Paginacja działa, potrafię uzasadnić wybór (offset vs cursor)

---

## Tydzień 4 — Auth + security + request lifecycle

### Co robisz
- JWT auth od zera — rejestracja, login, token refresh, logout
- Guards — ownership check (user widzi tylko swoje treningi)
- Request lifecycle: Middleware → Guard → Interceptor (before) → Pipe → Controller → Service → Interceptor (after) → Filter

### Pytania do przemyślenia
- JWT vs session-based — trade-offy? Kiedy który?
- Access token + refresh token vs sam access token — co gdy wycieknie?
- Guard vs Middleware — oba blokują request. Kiedy który?
- "User widzi tylko swoje treningi" — guard? Service? Query filter? Konsekwencje każdego podejścia?

### Checkpointy
- [ ] Auth flow działa end-to-end, pisany sam
- [ ] Potrafię narysować request lifecycle z pamięci
- [ ] Ownership check — user nie widzi cudzych danych
- [ ] Potrafię porównać JWT z Better Auth / session-based na rozmowie

---

## Tydzień 5 — Docker + deploy + Next.js front

### Co robisz
- Dockerfile (multi-stage build) + docker-compose (Nest + PostgreSQL)
- Deploy na VPS (Dokploy + Traefik)
- **Podłącz prosty Next.js frontend** — Twoja siła, pokaż fullstack na rozmowie
- Swagger/OpenAPI docs

### Pytania do przemyślenia
- Multi-stage build — dlaczego? Co zyskujesz?
- Gdzie baza? Osobny kontener? Managed?
- Jak Nest API wpasuje się w Twój istniejący VPS setup?

### Checkpointy
- [ ] `docker-compose up` i działa (Nest + Postgres)
- [ ] App jest na produkcji, dostępna przez przeglądarkę
- [ ] Next.js front konsumuje API — fullstack demo gotowe
- [ ] Swagger docs dla całego API

---

## Tydzień 6 — Testy + API review

### Co robisz
- Testing strategy: co testujesz, jak, dlaczego
- Min. unit testy dla service + e2e test dla auth flow
- Pełny review API: spójność URL patterns, error responses, edge case'y

### Pytania do przemyślenia
- Unit vs integration vs e2e — co na którym poziomie? Co daje najlepszy ROI?
- Ile testów to dość dla side projectu vs pracy komercyjnej?
- Mock dependencies vs test cały flow — kiedy który?

### Checkpointy
- [ ] Unit testy dla kluczowej logiki w services
- [ ] E2e test: rejestracja → login → CRUD → logout
- [ ] API jest spójne — potrafię je pokazać na rozmowie

---

## Tydzień 7-8 — Rozmowy + uzupełnianie braków

### Co robisz
- **Aplikujesz na pozycje** — nie czekaj na perfekcję
- Mock interviews: pytania techniczne NestJS/Node.js/PostgreSQL
- System design challenges (20 min z kartką)
- Uzupełniasz braki które wyjdą na rozmowach

### Typowe pytania rekrutacyjne do przećwiczenia
- Co to event loop? Jak Node.js obsługuje concurrency?
- Opisz request lifecycle w NestJS
- Kiedy guard a kiedy middleware?
- Jak zaprojektujesz API dla systemu X? (system design)
- Napisz endpoint który robi Y (live coding)

### Weekly rituals (zacznij od tyg. 4, kontynuuj do końca)
- **Mock interview** — Claude zadaje pytanie rekrutacyjne, Ty odpowiadasz na głos, potem feedback
- **Design challenge** — 20 min z kartką: "zaprojektuj API dla X" (moduły, tabele, endpointy, edge case'y)
- **Review session logu** — sprawdź progres samodzielności, porównaj z poprzednimi tygodniami

### Checkpointy
- [ ] Wysłane min. 5 aplikacji na pozycje Fullstack Mid
- [ ] Potrafię wytłumaczyć event loop, DI, JWT, request lifecycle bez zacinania
- [ ] Potrafię zaprojektować prosty system od zera na kartce w 20 min
- [ ] IRONLOG jest na GitHubie z README, Dockerem, testami — portfolio ready

---

## Zasady

1. **Zanim napiszesz kod — podejmij decyzję i zapisz uzasadnienie**
2. **Pisz kod sam — AI to reference i reviewer, nie ghostwriter**
3. **30 min solo → 15 min stuck → dopiero Claude**
4. **Nie pamiętasz syntax? Docs. Nie rozumiesz dlaczego? Zatrzymaj się i przemyśl.**
5. **Jeśli nie potrafisz wytłumaczyć DLACZEGO tak — nie rozumiesz tego**
6. **Rysuj diagramy — data flow, nie UI mockupy**
7. **2-3h dziennie — consistency > intensity**
