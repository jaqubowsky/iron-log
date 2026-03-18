# NestJS - Roadmap nauki

## Filozofia nauki

**Umiej napisać kod sam. Umiej uzasadnić dlaczego taki.**

Dwa filary:
1. **Piszesz kod sam** - nie kopiujesz z AI, nie generujesz. Podglądasz docs/przykłady kiedy nie pamiętasz API - to normalne. Ale logikę, strukturę i flow piszesz własnymi palcami. Chodzi o to, żebyś siedząc na rozmowie rekrutacyjnej albo w pracy potrafił napisać prosty service bez odpalania Copilota.
2. **Rozumiesz DLACZEGO** - zanim napiszesz linijkę kodu, odpowiadasz sobie na pytania architektoniczne. Nie chodzi o zapamiętanie "Guard ma decorator @UseGuards" - chodzi o to, żebyś wiedział kiedy guard, kiedy middleware i dlaczego.

Workflow: Pytania decyzyjne -> Ty projektujesz rozwiązanie -> Ty piszesz kod -> Docs/Claude jako reference kiedy utkniesz -> Review własnego kodu

AI używasz jako:
- Rubber duck - "czy moje podejście ma sens?"
- Reference - "jak wygląda syntax tego decoratora?" (ale potem SAM to piszesz)
- Code reviewer - "co byś zmienił w tym kodzie?"
- NIE jako ghostwriter który pisze za Ciebie

## Kontekst

- **Cel:** Zrozumieć backend architecture przez budowanie IRONLOG API w NestJS
- **Tempo:** ~1h dziennie, hands-on od razu
- **Stack:** NestJS + Prisma + PostgreSQL + JWT
- **Workflow:** Pytania decyzyjne -> Projektujesz rozwiązanie -> Piszesz kod sam -> Review z Claude

---

## Projekt: IRONLOG API

Backend do aplikacji treningowej.

---

## Tydzień 1 - Fundament: jak myśleć o backendzie

### Dzień 1 - Architektura modułowa

Scaffold projekt (`nest new ironlog-api`), przejrzyj strukturę.

**Pytania do przemyślenia ZANIM zaczniesz kodować:**
- Dlaczego Nest wymusza podział na moduły, a Next.js nie? Co zyskujesz, co tracisz?
- Gdybyś projektował IRONLOG API od zera - jakie moduły byś wydzielił? Narysuj sobie na kartce graf zależności między nimi.
- Co się stanie jak jeden moduł urośnie do 20 plików? Kiedy wiesz że czas go rozbić?

**Decyzja do podjęcia:**
Zaprojektuj strukturę modułów dla IRONLOG. Zapisz ją zanim napiszesz linijkę kodu. Uzasadnij każdy moduł.

- [ ] Checkpoint: mam diagram modułów z uzasadnieniem, potrafię wytłumaczyć dlaczego taki podział

---

### Dzień 2 - Separation of Concerns

Zbuduj ExercisesModule (CRUD, in-memory na razie). Pisz sam - od pustego pliku.

**Pytania do przemyślenia:**
- Dlaczego logika biznesowa siedzi w Service, a nie w Controller? Co by się zepsuło gdybyś wrzucił wszystko do controllera?
- Wyobraź sobie, że za 3 miesiące IRONLOG ma mieć też CLI tool i GraphQL API. Jak Twój podział controller/service to ułatwia?
- DTO vs surowy obiekt z requesta - po co ta warstwa? Kiedy to overkill?

**Decyzja do podjęcia:**
Zaprojektuj CreateExerciseDto. Jakie pola? Jakie walidacje? Co opcjonalne? Dlaczego?

- [ ] Checkpoint: potrafię wytłumaczyć komuś czemu controller NIE powinien zawierać logiki biznesowej i podać 3 konkretne powody

---

### Dzień 3 - Data modeling

Podłącz Prisma, zaprojektuj schemat bazy.

**Pytania do przemyślenia:**
- Exercise - jakie pola naprawdę potrzebujesz? Co jest core a co nice-to-have? (Lekcja z PillPilot - pamiętasz refactor przez źle zaprojektowany data model?)
- WorkoutTemplate -> Exercise: many-to-many z join table czy embedded JSON z ćwiczeniami? Jakie trade-offy?
- WorkoutLog -> WorkoutSet: czy set powinien mieć referencję do exercise czy do template? Co się stanie gdy user usunie exercise?

**Decyzja do podjęcia:**
Narysuj ERD zanim napiszesz schema.prisma. Przemyśl cascade delete, nullable references, indeksy.

- [ ] Checkpoint: mam ERD z uzasadnieniem każdej relacji, rozumiem trade-offy wybranego podejścia

---

### Dzień 4 - Error handling philosophy

Dodaj sensowny error handling do Exercises CRUD.

**Pytania do przemyślenia:**
- Kto odpowiada za walidację - controller, service czy baza? Odpowiedź: wszyscy, ale co na którym poziomie?
- 400 vs 404 vs 422 vs 500 - kiedy który? Zaprojektuj spójny error response format dla całego API.
- Jak obsłużysz sytuację: "user próbuje usunąć exercise który jest używany w template"? Rzucić błąd? Soft delete? Cascade delete?

**Decyzja do podjęcia:**
Stwórz error handling strategy document - jakie kody HTTP, jaki format odpowiedzi, co logować a co nie.

- [ ] Checkpoint: mam spójną strategię error handling, potrafię uzasadnić decyzje

---

### Dzień 5-7 - Review + refleksja

- Code review własnego kodu. Nie "czy działa" ale "czy architektura ma sens".
- Przeczytaj w docs.nestjs.com sekcje: Modules, Controllers, Providers - ale czytaj z pytaniem "dlaczego tak zaprojektowali?"
- Zapisz 3 rzeczy które byś zmienił w swoim kodzie gdybyś zaczynał od nowa.

---

## Tydzień 2 - Relacje, data flow, granice modułów

### Dzień 1-2 - Cross-module communication

Zbuduj WorkoutTemplates i WorkoutLogs moduły.

**Pytania do przemyślenia:**
- WorkoutLogsService potrzebuje sprawdzić czy exercise istnieje. Import ExercisesModule czy osobny query do bazy? Trade-offy?
- Circular dependency: A importuje B, B importuje A. Dlaczego to problem? Jak go rozwiązać architekturalnie (nie forwardRef - to plaster)?
- Kiedy dwa moduły powinny się połączyć w jeden? Kiedy jeden powinien się rozdzielić?

**Decyzja do podjęcia:**
Narysuj graph zależności między modułami. Czy są cykle? Czy flow danych jest jednokierunkowy? Jeśli nie - przemyśl redesign.

- [ ] Checkpoint: moduły komunikują się ze sobą, zero circular deps, potrafię uzasadnić granice modułów

---

### Dzień 3-4 - Query design

Dodaj filtrowanie, sortowanie, paginację do workout logs.

**Pytania do przemyślenia:**
- Offset pagination vs cursor pagination - jakie trade-offy? Który lepszy dla IRONLOG i dlaczego?
- Kto buduje query - controller (z @Query params) czy service (z obiektem filtrów)? Dlaczego to ważne?
- GET /workout-logs?exerciseId=5 vs GET /exercises/5/workout-logs - kiedy który pattern? Jakie konsekwencje dla cache, permissions, discoverability?

**Decyzja do podjęcia:**
Zaprojektuj API contract dla listowania i filtrowania logów. Zapisz URL patterns zanim zaimplementujesz.

- [ ] Checkpoint: rozumiem trade-offy w API design, mam spójne URL patterns

---

### Dzień 5-7 - Repository pattern

**Pytania do przemyślenia:**
- Service bezpośrednio używa Prisma vs Service używa Repository który używa Prisma. Po co ta dodatkowa warstwa?
- Kiedy Repository pattern to overkill? (hint: zależy od rozmiaru projektu i czy kiedykolwiek zmienisz ORM)
- Jak to wpływa na testowanie? Który wariant łatwiej mockować?

**Decyzja do podjęcia:**
Czy IRONLOG potrzebuje repository pattern? Uzasadnij. Nie ma złej odpowiedzi - jest tylko nieuzasadniona odpowiedź.

- [ ] Checkpoint: podjąłem świadomą decyzję o abstrakcji bazy, potrafię bronić tej decyzji na code review

---

## Tydzień 3 - Auth, security, request lifecycle

### Dzień 1-2 - Authentication

Zbuduj JWT auth. To będzie trudniejsze - dużo moving parts. Pisz sam, krok po kroku.

**Pytania do przemyślenia:**
- JWT vs session-based auth - trade-offy? Dlaczego Nest ecosystem preferuje JWT? Kiedy session lepszy?
- Access token + refresh token vs sam access token? Co się stanie jak token wycieknie?
- Gdzie przechowujesz JWT na froncie? (HttpOnly cookie vs localStorage - security implications)
- Porównaj z tym co zrobiłeś w PillPilot z Better Auth - jakie problemy Better Auth rozwiązuje za Ciebie, które w Neście musisz ogarnąć sam?

**Decyzja do podjęcia:**
Zaprojektuj auth flow dla IRONLOG: rejestracja, login, token refresh, logout. Narysuj sequence diagram.

- [ ] Checkpoint: rozumiem jak JWT działa pod spodem (nie tylko "daj mi token"), potrafię porównać z session-based

---

### Dzień 3-4 - Authorization + Request Lifecycle

Dodaj guards, ogranicz dostęp do danych per-user.

**Pytania do przemyślenia:**
- Request lifecycle w Neście: Middleware -> Guard -> Interceptor (before) -> Pipe -> Controller -> Service -> Interceptor (after) -> Filter. Dlaczego w takiej kolejności?
- Guard vs Middleware - oba mogą zablokować request. Kiedy który? (hint: guard ma dostęp do execution context)
- "User widzi tylko swoje treningi" - gdzie to wymuszasz? Guard? Service? Query filter? Każde podejście ma inne konsekwencje.
- Co jeśli dodasz role (admin/user) w przyszłości? Jak Twój obecny design to ułatwia lub utrudnia?

**Decyzja do podjęcia:**
Zaprojektuj authorization strategy: co sprawdzasz na jakim poziomie. Gdzie ownership check? Gdzie role check?

- [ ] Checkpoint: rozumiem CAŁY request lifecycle, potrafię narysować go z pamięci i wytłumaczyć dlaczego tak

---

### Dzień 5-7 - Interceptors, real-world patterns

**Pytania do przemyślenia:**
- Logging interceptor: co warto logować? Co NIE warto (PII, tokens)? Jakie info potrzebujesz do debugowania na produkcji?
- Response transformation: unified response format ({data, meta, errors}) vs raw data. Kiedy warto standaryzować?
- Jak obsłużysz rate limiting? Na jakim poziomie (middleware, guard, external)?

- [ ] Checkpoint: rozumiem kiedy middleware vs guard vs interceptor vs pipe, i potrafię uzasadnić wybór

---

## Tydzień 4 - Production thinking

### Dzień 1-2 - Config, environment, deploy

**Pytania do przemyślenia:**
- Co NIE powinno być w kodzie? (secrets, URLs, feature flags) Jak to zarządzasz w dev vs staging vs prod?
- Docker: multi-stage build. Dlaczego? Co zyskujesz vs zwykły Dockerfile?
- Twój VPS ma Dokploy + Traefik. Jak nowa Nest app wpasuje się w istniejący setup? Subdomena? Port mapping?

**Decyzja do podjęcia:**
Zaplanuj deployment pipeline: local dev -> build -> deploy na VPS. Gdzie baza? Osobny kontener? Managed?

- [ ] Checkpoint: app działa na produkcji, rozumiem każdy element deployment pipeline

---

### Dzień 3-4 - Testing philosophy

**Pytania do przemyślenia:**
- Unit test vs integration test vs e2e test - co testujesz na którym poziomie? Co daje najlepszy ROI?
- "Mockuj dependencies, testuj logikę" vs "testuj cały flow end-to-end". Kiedy który approach?
- Ile testów to dość? 100% coverage vs testowanie critical paths - co wybierasz dla side projectu vs pracy komercyjnej?

**Decyzja do podjęcia:**
Napisz testing strategy: co testujesz, jak, dlaczego. Zaimplementuj min. 1 unit test i 1 e2e test.

- [ ] Checkpoint: mam świadomą testing strategy, rozumiem co i dlaczego testuję

---

### Dzień 5-7 - Swagger + API design review

- Dodaj Swagger docs do API
- Zrób pełny review swojego API: czy jest spójne? Czy URL patterns mają sens? Czy error responses są przewidywalne?
- Pokaż API komuś (lub Claude) i poproś o code review z perspektywy "co byś zmienił"

- [ ] Checkpoint: mam udokumentowane, spójne API gotowe do podłączenia frontu

---

## Ściąga: Nest vs Next.js - mental model

| Koncept | Co robi | Analogia z Next.js |
|---|---|---|
| Module | Grupuje powiązane rzeczy | Folder w app/ |
| Controller | Obsługuje HTTP requesty | Route handler / API route |
| Service/Provider | Logika biznesowa | Server actions / utility functions |
| DTO | Shape + walidacja inputu | Zod schema |
| Guard | Sprawdza uprawnienia | Middleware (ale z execution context) |
| Interceptor | Cross-cutting concerns | Middleware (ale granularny, before + after) |
| Pipe | Transformuje/waliduje dane | Zod parse |
| Filter | Obsługuje exceptions | Error boundary / error.tsx |

## Komendy CLI (wpisuj sam, naucz się ich na pamięć - jest ich 3)

```bash
nest new project-name          # scaffold z opiniated structure
nest g resource name           # pełny CRUD - module + controller + service + dto
nest g module name             # izolowany moduł
```

## Zasoby

- **Docs:** https://docs.nestjs.com - czytaj sekcje "Overview" + "Fundamentals"
- **Architecture:** "Clean Architecture" - Robert C. Martin (koncepcje, nie cała książka)
- **API Design:** Microsoft REST API Guidelines (darmowe, na GitHubie)

## Zasady

1. **Zanim napiszesz kod - podejmij decyzję i zapisz uzasadnienie**
2. **Pisz kod sam - AI to reference i reviewer, nie ghostwriter**
3. **Nie pamiętasz syntax? Docs. Nie rozumiesz dlaczego? Zatrzymaj się i przemyśl.**
4. **Jeśli nie potrafisz wytłumaczyć DLACZEGO tak - nie rozumiesz tego**
5. **Max 1h dziennie - thesis jest ważniejszy**
6. **Rysuj diagramy - architektura to wizualne myślenie**
