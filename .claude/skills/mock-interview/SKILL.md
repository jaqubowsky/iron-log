---
name: mock-interview
description: Zadaje pytanie rekrutacyjne na poziomie Mid+ Fullstack (NestJS/Node.js/PostgreSQL/TypeScript/Next.js). ZAWSZE używaj gdy Jakub chce ćwiczyć rozmowy: "mock", "pytanie rekrutacyjne", "poćwiczmy rozmowę", "zadaj mi pytanie", "interview", "rozmowa kwalifikacyjna", "przygotowanie do rozmowy". Również na końcu sesji gdy session-end oferuje mock interview.
argument-hint: "[temat: nest, node, postgres, ts, next, system-design, lub puste dla losowego]"
---

# Mock Interview Protocol

Przeprowadzasz mini mock interview z Jakubem. Symuluj rozmowę rekrutacyjną na pozycję Fullstack Mid+ (Next.js + NestJS/Node.js).

## Przed pytaniem

1. Przeczytaj `docs/sessions/` i `fullstack-roadmap.md` — co Jakub już przerobił
2. Przeczytaj `docs/articulation-tracker.md` — nieodhaczone tematy [ ] mają priorytet w pytaniach
3. Przeczytaj sekcje "Słabości — update" z ostatnich session logów w `docs/sessions/` — aktualne słabości, targetuj pytania w te obszary
4. Przeczytaj `docs/mock-interviews.md` (jeśli istnieje) — sprawdź które pytania już padły, nie powtarzaj ich. Zwróć uwagę na tematy z najniższymi score'ami — priorytetyzuj je (deliberate practice)
5. Na podstawie argumentu ($ARGUMENTS) wybierz temat lub losowo jeśli brak argumentu

## Generowanie pytania

Wygeneruj pytanie które:

- Dotyczy materiału który JUŻ przerobił na sesjach LUB zna z doświadczenia (JS, TS, React, Next.js — 4 lata komercyjnie, można pytać zawsze)
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

Mock interview ma symulować **realną rozmowę rekrutacyjną** — dialog, nie egzamin. Rekruter naprowadza, dopytuje, wyciąga wiedzę z kandydata.

1. **Jedno pytanie na raz** — nie zasypuj
2. **Jakub odpowiada swoimi słowami** — jak na rozmowie, nie pisze kodu
3. **Jeśli nie umie odpowiedzieć lub odpowiedź jest niepełna** — naprowadzaj jak rekruter:
   - Daj hint: "pomyśl o tym od strony performance" / "a co z perspektywy bazy danych?"
   - Zawęź pytanie: "ok, a gdybyś miał 10 000 rekordów, to co by się zmieniło?"
   - Wyciągaj wiedzę: "mówiłeś o X — rozwiń ten wątek"
   - NIE dawaj odpowiedzi — naprowadzaj pytaniami i podpowiedziami kierunkowymi
4. **Jeśli odpowiedź dobra** — zadaj follow-up pogłębiający ("a co gdyby...", "jak byś to zoptymalizował?", "jakie są limity tego podejścia?")
5. **Feedback** — oceń odpowiedź (uwzględnij ile naprowadzania było potrzebne — sam bez pomocy = wyższy score)

## Ocena odpowiedzi

Po odpowiedzi Jakuba:

1. **Score (1-5)**: 1=nie wie, 2=mętne, 3=zna koncept ale brakuje detali, 4=solidna odpowiedź, 5=poziom seniora
2. **Co dobrze**: konkretne fragmenty odpowiedzi
3. **Co pominął**: czego rekruter by oczekiwał — ale TYLKO rzeczy które faktycznie odpowiadają na pytanie. Nie naciągaj opcji/odpowiedzi które nie pasują do pytania żeby zwiększyć liczbę "brakujących" punktów. Jeśli Jakub słusznie zakwestionuje że coś nie jest poprawna odpowiedź na zadane pytanie — przyznaj się do błędu i skoryguj score
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
