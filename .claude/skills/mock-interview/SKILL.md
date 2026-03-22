---
name: mock-interview
description: Zadaje pytanie rekrutacyjne na poziomie Mid+ Fullstack (NestJS/Node.js/PostgreSQL/TypeScript/Next.js). ZAWSZE używaj gdy Jakub chce ćwiczyć rozmowy: "mock", "pytanie rekrutacyjne", "poćwiczmy rozmowę", "zadaj mi pytanie", "interview", "rozmowa kwalifikacyjna", "przygotowanie do rozmowy". Również na końcu sesji gdy session-end oferuje mock interview.
argument-hint: "[temat: nest, node, postgres, ts, next, system-design, lub puste dla losowego]"
---

# Mock Interview Protocol

Przeprowadzasz mini mock interview z Jakubem. Symuluj rozmowę rekrutacyjną na pozycję Fullstack Mid+ (Next.js + NestJS/Node.js).

## Przed pytaniem

1. Przeczytaj `docs/sessions/` i `nestjs-roadmap.md` — co Jakub już przerobił
2. Przeczytaj `docs/weaknesses.md` — aktualne słabości, targetuj pytania w te obszary
3. Przeczytaj `docs/mock-interviews.md` (jeśli istnieje) — sprawdź które pytania już padły, nie powtarzaj ich. Zwróć uwagę na tematy z najniższymi score'ami — priorytetyzuj je (deliberate practice)
4. Na podstawie argumentu ($ARGUMENTS) wybierz temat lub losowo jeśli brak argumentu

## Generowanie pytania

Wygeneruj pytanie które:

- Dotyczy materiału który JUŻ przerobił (retrieval, nie nowa wiedza)
- Jest na poziomie Mid+ Fullstack — nie trivial, nie senior
- Wymaga wytłumaczenia DLACZEGO, nie tylko CO (trade-offy, porównania, scenariusze)
- Opcjonalnie łączy dwa tematy (np. "jak ValidationPipe w NestJS różni się od Zod w Next.js?")
- NIE powtarza pytań z `docs/mock-interviews.md`

Jeśli temat = system-design: daj mini challenge (5 min, bez kodu) — "zaprojektuj API dla X"

### Kategorie tematów

- **nest** — moduły, DI, pipes, guards, filters, interceptors, request lifecycle
- **node** — event loop, concurrency, streams, clustering
- **postgres** — indeksy, JOINy, pagination, EXPLAIN ANALYZE, ACID
- **ts** — generyki, type guards, mapped types, utility types
- **next** — SSR/SSG/ISR, Server Components, Server Actions, hydration, App Router, middleware, performance
- **system-design** — projektowanie API, moduły, tabele, endpointy, edge cases

## Przebieg

1. **Jedno pytanie na raz** — nie zasypuj
2. **Jakub odpowiada swoimi słowami** — jak na rozmowie, nie pisze kodu
3. **Follow-up** — po odpowiedzi zadaj 1 pytanie pogłębiające ("a co gdyby...", "jak byś to zoptymalizował?")
4. **Feedback** — oceń odpowiedź

## Ocena odpowiedzi

Po odpowiedzi Jakuba:

1. **Score (1-5)**: 1=nie wie, 2=mętne, 3=zna koncept ale brakuje detali, 4=solidna odpowiedź, 5=poziom seniora
2. **Co dobrze**: konkretne fragmenty odpowiedzi
3. **Co pominął**: czego rekruter by oczekiwał
4. **Tip**: jedna rzecz do zapamiętania na prawdziwą rozmowę

## Zapis

Zapisz wynik w dwóch miejscach:

### 1. Session log (`docs/sessions/YYYY-MM-DD.md`)

W sekcji "Mock interview" — pytanie, score, krótki feedback. Dopisz do istniejącego pliku jeśli istnieje.

### 2. Mock interview log (`docs/mock-interviews.md`)

Dopisz wiersz do tabeli (stwórz plik z headerem jeśli nie istnieje):

```markdown
| Data       | Temat | Pytanie                       | Score | Słabe punkty                     |
| ---------- | ----- | ----------------------------- | ----- | -------------------------------- |
| YYYY-MM-DD | nest  | Exception Filter vs try/catch | 4     | Pominął performance implications |
```

Ten log pozwala śledzić:

- Które tematy mają najniższe score'y → deliberate practice
- Czy score'y rosną z czasem → progres w tłumaczeniu konceptów
- Które tematy nie były jeszcze pytane → luki
