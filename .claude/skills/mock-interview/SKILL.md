---
name: mock-interview
description: Zadaje pytanie rekrutacyjne na poziomie Mid+ Fullstack (NestJS/Node.js/PostgreSQL/TypeScript/Next.js). ZAWSZE używaj gdy Jakub chce ćwiczyć rozmowy: "mock", "pytanie rekrutacyjne", "poćwiczmy rozmowę", "zadaj mi pytanie", "interview", "rozmowa kwalifikacyjna", "przygotowanie do rozmowy". Również na końcu sesji gdy session-end oferuje mock interview. Tryb "session" odpala dedykowaną 30-min sesję mock interview (5-6 pytań z backlogu retencji, odhaczanie checkpointów).
argument-hint: "[temat: nest, node, postgres, ts, next, system-design, session, lub puste dla losowego]"
---

# Mock Interview Protocol

Przeprowadzasz mock interview z Jakubem. Symuluj rozmowę rekrutacyjną na pozycję Fullstack Mid+ (Next.js + NestJS/Node.js).

**Dwa tryby:**

- **Domyślny (1 pytanie)** — mini mock na koniec sesji kodowania. Jedno pytanie, feedback, zapis.
- **Session (`/mock-interview session`)** — dedykowana 30-min sesja na czyszczenie backlogu retencji. 5-6 pytań z nieodhaczonych checkpointów. Po każdym pytaniu feedback + odhaczanie checkpointu w roadmapie jeśli score 3+/5.

Jeśli argument = `session`, przejdź do sekcji "Tryb session" poniżej. W przeciwnym razie kontynuuj normalny flow.

## Przed pytaniem

1. Przeczytaj `docs/sessions/` i `fullstack-roadmap.md` — co Jakub już przerobił
2. Przeczytaj sekcje "Słabości — update" z ostatnich session logów w `docs/sessions/` — aktualne słabości, targetuj pytania w te obszary
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

Nie hardkoduj listy — czytaj `fullstack-roadmap.md` żeby dobrać temat na podstawie tego co Jakub faktycznie przerobił i co ma w checkpointach. Argument (`$ARGUMENTS`) to wskazówka kierunkowa (np. "postgres", "nest", "ts"), nie ścisła kategoria. Jeśli brak argumentu — wybierz losowo z przerobionego materiału, priorytetyzując słabe tematy z mock-interviews.md.

## Przebieg

Mock interview ma symulować **realną rozmowę rekrutacyjną** — dialog, nie egzamin. Rekruter naprowadza, dopytuje, wyciąga wiedzę z kandydata.

1. **Jedno pytanie na raz** — nie zasypuj
2. **Jakub odpowiada swoimi słowami** — jak na rozmowie, nie pisze kodu
3. **Po pierwszej odpowiedzi — wymuś alternatywę (tylko gdy ma sens):** Dla pytań o **design, architekturę, podejście**: NIE akceptuj od razu pierwszej odpowiedzi. Powiedz: *"OK, to jedno podejście. Jakie inne rozwiązanie rozważałeś?"*. Dopiero po 2+ opcjach wchodź w trade-offy. Cel: nawyk "jest więcej niż jedna odpowiedź". **Dla pytań o mechanizm/fakt** (jak działa event loop, co to ACID): alternatywy nie ma — przejdź od razu do follow-upu pogłębiającego.
4. **Jeśli nie umie odpowiedzieć lub odpowiedź jest niepełna** — naprowadzaj jak rekruter:
   - Daj hint: "pomyśl o tym od strony performance" / "a co z perspektywy bazy danych?"
   - Zawęź pytanie: "ok, a gdybyś miał 10 000 rekordów, to co by się zmieniło?"
   - Wyciągaj wiedzę: "mówiłeś o X — rozwiń ten wątek"
   - NIE dawaj odpowiedzi — naprowadzaj pytaniami i podpowiedziami kierunkowymi
5. **Jeśli odpowiedź dobra** — zadaj follow-up pogłębiający ("a co gdyby...", "jak byś to zoptymalizował?", "jakie są limity tego podejścia?")
5. **Feedback** — oceń odpowiedź (uwzględnij ile naprowadzania było potrzebne — sam bez pomocy = wyższy score)

## Ocena odpowiedzi

Po odpowiedzi Jakuba:

1. **Score (1-5)** — spójna z recall challenge:
   - **1/5** — nie wie o co chodzi
   - **2/5** — mętna odpowiedź, wymagała dużo naprowadzania
   - **3/5** — zna koncept, brakuje precyzji lub detali (max 2-3 hinty)
   - **4/5** — solidna odpowiedź z trade-offami, max 1 hint
   - **5/5** — odpowiedź seniora, bez hintów, relacje z innymi tematami
   - **Każdy hint obniża potencjalny score o 0.5** — "sam bez pomocy" to wyższy wynik. Przy ≥3 hintach max score to 3/5.
2. **Co dobrze**: konkretne fragmenty odpowiedzi
3. **Co pominął**: czego rekruter by oczekiwał — TYLKO rzeczy które faktycznie odpowiadają na pytanie. Jeśli Jakub słusznie zakwestionuje — przyznaj się i skoryguj score
4. **Strategia**: jeden nawyk myślenia dla tego typu pytania — "następnym razem gdy pada pytanie o X, automatycznie zapytaj siebie Y". To jest feed-forward, nie lista braków.
5. **Re-recall — OBOWIĄZKOWY przy score < 4:** "OK, powiedz mi to jeszcze raz uwzględniając to co pominąłeś." Nie przeskakuj dalej bez re-recall — jednorazowa produkcja bez korekty nie wbudowuje feedbacku w encoding. Czekaj na pełną odpowiedź, dopiero potem idź do następnego pytania. (Roediger & Karpicke, 2006)

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

---

## Tryb session (`/mock-interview session`)

Dedykowana sesja na czyszczenie backlogu retencji. Zamiast kodowania — 30 min samych pytań rekrutacyjnych. Cel: odhaczenie nieodhaczonych checkpointów "potrafię wytłumaczyć X" z roadmapy.

### Przygotowanie

1. Przeczytaj `fullstack-roadmap.md` — wylistuj WSZYSTKIE nieodhaczone checkpointy typu "potrafię wytłumaczyć X" (nie "X działa")
2. Przeczytaj `docs/mock-interviews.md` — sprawdź score'y, priorytetyzuj tematy z najniższymi score'ami
3. Wybierz **3-4 pytania** pokrywające najsłabsze tematy. Mieszaj milestones — nie rób 3 pytań z jednego. (5-6 pytań / 30 min to za mało czasu na pełny dialog + feedback + re-recall. Lepiej 3 pytania głęboko niż 6 powierzchownie)

### Flow

1. **Powiedz Jakubowi plan:** "Dziś sesja mock interview — 3-4 pytania z backlogu retencji. Cel: odhaczenie checkpointów. Gotowy?"
2. **Pytanie 1** → Jakub odpowiada → feedback + score → jeśli 3+/5 → odhacz checkpoint w roadmapie
3. **Pytanie 2** → to samo
4. Powtórz do 5-6 pytań
5. **Podsumowanie:** ile checkpointów odhaczonych, jakie tematy nadal słabe, co do Anki

### Zasady

- Jedno pytanie na raz — czekaj na odpowiedź
- Każde pytanie = 3-5 min (odpowiedź + follow-up + feedback)
- Pytania z różnych milestones i kategorii — interleaving
- Score 3+/5 = odhacz checkpoint zgodnie z zasadami odhaczania w `session-end` SKILL.md (single source of truth). Kluczowe: "potrafię wytłumaczyć" wymaga spacing — nie odhaczaj jeśli temat był poznany tej samej sesji.
- Score <3 = nie odhaczaj, zanotuj jako słabość
- Nie naprowadzaj za dużo — to weryfikacja retencji, nie nauka. Jeden hint OK, ale jeśli nie wie → score 1-2 i idziemy dalej
- Po sesji: zaktualizuj roadmapę, mock-interviews.md, i session log

### Zapis

Session log w formacie:

```markdown
# Sesja YYYY-MM-DD — Mock Interview Session

## Wyniki

| #   | Temat    | Pytanie                                     | Score | Checkpoint odhaczony? |
| --- | -------- | ------------------------------------------- | ----- | --------------------- |
| 1   | postgres | ACID — każda litera z przykładem            | 4/5   | Tak                   |
| 2   | nest     | exports/imports — jak moduły się komunikują | 2/5   | Nie                   |

...

## Odhaczone checkpointy

- [x] Potrafię wytłumaczyć ACID na rozmowie (M2)

## Nadal słabe

- exports/imports (2/5) — nie zna mechanizmu, tylko efekt

## Następna sesja

[normalny format z session-end]
```

Dopisz wszystkie pytania do `docs/mock-interviews.md` (jeden wiersz per pytanie).
