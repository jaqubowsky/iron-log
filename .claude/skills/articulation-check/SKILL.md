---
name: articulation-check
description: Use when session-end potrzebuje sprawdzić retencję tematów narracyjnych (L2) z articulation bank, lub gdy Jakub prosi "zadaj mi pytania z banku", "sprawdź mnie z X tematów", "poćwiczmy retencję", "symulacja rozmowy", "dress rehearsal". Nie używaj dla tematów L3 (praktyczne checkpointy z roadmap) ani do wyjaśniania nowego konceptu (score 0).
argument-hint: "[liczba pytań, domyślnie 2] [opcjonalny filter: milestone lub temat] [dress-rehearsal]"
---

# Articulation Check Protocol

Wybierasz pytania z articulation bank i prowadzisz quiz. To jest reużywalny komponent — wywoływany przez `session-end` (default 2 pytania) lub ad-hoc przez Jakuba ("2 pytania z banku", "5 pytań z M4 na dress rehearsal").

## Kiedy używać

- **Z session-end:** automatycznie, 2 pytania, po explain phase
- **Ad-hoc:** Jakub mówi "zadaj mi pytania z banku", "sprawdź mnie z X tematów", "chcę ćwiczyć retencję" — wtedy uruchamiasz bezpośrednio bez całego session-end protocol
- **Dress rehearsal:** Jakub mówi "mam rozmowę za X dni, symuluj mi interview" → uruchom z `count=5` i zignoruj filtr due (dress rehearsal to symulacja pokrycia tematów, nie retencja)

**NIE używaj dla:**
- Tematów praktycznych (L3) z `fullstack-roadmap.md` — to weryfikuje się przez kod, nie quiz
- Wyjaśnienia nowego tematu (score 0 w banku) — to robi session-start przez **task briefing**, nie articulation-check

## Flow — wysokopoziomowy

1. Wczytaj bank → 2. Filtruj (score-0 + not-due) → 3. Sortuj po days_overdue → 4. Wybierz top N → 5. Dla każdego: pytanie → dopytanie → feedback → re-recall jeśli <3.5 → update bank (nowy interval) → 6. Podsumowanie

## 1. Wczytaj bank

`Read` na `docs/articulation-bank.md`. Pamiętaj strukturę wpisu:

```markdown
### Topic name (Mx)

**Score:** X/5 | **Last tested:** YYYY-MM-DD | **Next review:** YYYY-MM-DD (interval: Nd)

Historia:
- YYYY-MM-DD (tag): X/5 — opis (Xd → Yd)

Do domknięcia:
- specific gap 1
```

**Edge case:** jeśli bank jest pusty lub ma <N due candidates → pomiń skill i zwróć: **"Bank ma X due candidates — za mało na pełny articulation check. Sesja zostaje bez retention quizu."**. Session-end loguje jako `"Articulation check: N/A — insufficient due candidates"`.

## 2. Filter — score-0 + not-due

Pomiń:
- **Score-0 entries** (`**Score:** 0`, `**Last tested:** never`) — czekają na task briefing, nie quiz
- **Not-due entries** (`next_review > today`) — są w środku cyklu spacing, nie ma sensu testować wcześniej

Zostają **due candidates** — każdy ma `next_review ≤ today` (czyli `days_overdue ≥ 0`).

## 3. Sort po priorytecie

**`days_overdue = today - next_review`** malejąco — najbardziej spóźnione pierwsze.
**Tie-break:** niższy grade pierwszy (słabsze tematy przed mocnymi przy tym samym overdue).

Nie ma już osobnego sortowania po score/milestone — formula SRS i `days_overdue` same dają zdrowe kolejkowanie.

**Dress rehearsal override:** gdy Jakub wyraźnie prosi o symulację rozmowy (`args: "dress-rehearsal 5"`), filter (not-due) jest **wyłączony** — wtedy kandydatami są wszystkie non-score-0 entries, posortowane pure grade ascending (słabe pierwsze, jak na prawdziwej rozmowie).

## 4. Wybierz top N

N default = 2 (session-end). Argument liczby nadpisuje.

- Jeśli `N > |due candidates|` → ogranicz do dostępnych. Powiedz Jakubowi: "Dostępnych X due pytań (mniej niż zapytano N) — lecę z X".

## 5. Quiz protocol (per pytanie)

Ten sam protokół dla każdego pytania:

### 5.1 Zadaj pytanie

Wyślij **TYLKO pytanie**, czekaj na odpowiedź. Pytanie musi być **specyficzne i targetować "Do domknięcia"** z banku. NIE generyczne pytania typu "wytłumacz X".

Format:

```
**Pytanie [1/N]:** [specyficzne pytanie targetujące braki]

_(z banku: [topic name] | score: X/5 | interval: Nd | overdue: Dd)_
```

### 5.2 Jakub odpowiada — czekaj

Nie przerywaj, nie podpowiadaj przed odpowiedzią.

### 5.3 Dopytaj 1-2 razy

Patrz "Do domknięcia" w banku. Zadaj pytania pogłębiające:

- "A co z [specific gap]?"
- "Daj mi konkretny przykład z IRONLOG"
- "A dlaczego tak a nie inaczej?"

**Max 2 dopytania** — więcej to scaffolding który zawyża grade.

### 5.4 Feedback + grade (max 4 zdania)

- Co trafne
- Co nadal brakuje
- Grade X/5 (skala 1-5 z 0.5 krokami)

### 5.5 Re-recall (obowiązkowy przy grade <3.5)

Próg to **ściśle <3.5**. Grade = 3.5 → BEZ re-recall. Grade = 3.4 → re-recall.

```
"OK, powiedz mi to jeszcze raz uwzględniając to co pominąłeś."
```

Czekaj na pełną odpowiedź. **Grade zostaje** — re-recall wbudowuje feedback w encoding, nie zmienia oceny pierwszej produkcji (Roediger & Karpicke, 2006).

### 5.6 Oblicz nowy interval (formuła SRS)

```
prev_interval = z pola "interval: Nd" w banku (0 jeśli pierwszy test)
days_elapsed = today - last_tested (0 jeśli pierwszy test)
base = max(prev_interval, days_elapsed)

IF grade ≤ 2:
    new_interval = 1
ELIF grade == 3:
    new_interval = max(3, round(base × 1.2))
ELIF grade >= 3.5 AND grade <= 4:
    new_interval = max(5, round(base × 2.0))
ELIF grade >= 4.5:
    new_interval = max(10, round(base × 2.5))

new_next_review = today + new_interval (w dniach)
```

**Zaokrąglanie:** zaokrąglij `base × multiplier` do najbliższego integera. `round(7 × 2.0) = 14`, `round(5 × 1.2) = 6`.

**Pierwszy test** (wpis świeżo utworzony w mid-session protokole z session-end, lub migracja entries bez poprzedniego intervalu): `prev_interval = 0`, `days_elapsed = 0` → działają tylko minimum values (1/3/5/10).

### 5.7a Klasyfikacja `L3 anchor` (jeśli pole jest `unknown`)

Sprawdź obecną wartość `L3 anchor:` we wpisie tematu. Jeśli `unknown` → klasyfikuj **przed** Edit'em banku:

1. **Najpierw sprawdź dzisiejszy session log** — jeśli sekcja "Briefing utrwalenie" zawiera ten temat ze ścieżką `src/path:N`, użyj jej. Skip kroku 2.
2. **Sprawdź historyczne session logi** — Glob `docs/sessions/*.md`, grep nazwy tematu lub keywordów. Jeśli znajdziesz konkretny anchor → użyj.
3. **Jeśli krok 1-2 nic nie dały** — zapytaj Jakuba **jednym pytaniem**: *"Czy `[topic name]` jest gdzieś zaimplementowany w IRONLOG? Podaj ścieżkę (np. `src/auth/auth.service.ts:45`), albo `none` jeśli to czysta narracja bez kodu."*
4. **Czekaj na odpowiedź.** Walidacja:
   - Jeśli ścieżka — sprawdź czy plik istnieje (Read na pierwsze 5 linii). Jeśli nie istnieje → zapytaj ponownie.
   - Jeśli `none` — zapisz `L3 anchor: none`. Temat narracyjny bez praktyki w kodzie (świadoma decyzja).
5. **Jeśli `Score ≥ 3.5` AND nowa wartość = `none`** — to OK (narracja opanowana, bez problemu).
6. **Jeśli `Score ≥ 3.5` AND nowa wartość = `unknown` (Jakub nie wie)** — to cargo cult retention risk. W summary kroku 6 dodaj rekomendację: `BRIDGE NEEDED: [topic name] → dopisz (bridge) task w M<X>`. **Sam task pisze session-end** (kroku 3a bridge writer), nie articulation-check. Anchor zostaje `unknown` do czasu gdy session-end napisze bridge task i Jakub go zaimplementuje.

**Skip tej sekcji** gdy `L3 anchor` ma już konkretną ścieżkę albo `none` — klasyfikacja zrobiona wcześniej.

### 5.7b Lapse notacja (do historii, nie do algorytmu)

Sprawdź warunki notatki lapse **przed** zapisem linii historii:

- `prev_interval ≥ 20d` AND `grade ≤ 2` → dodaj suffix ` LAPSE po [prev_interval]d spacing`
- `prev_interval ≥ 20d` AND `days_overdue > prev_interval` AND `grade < 3` → dodaj suffix ` LAPSE po [days_overdue]d overdue`

Nie ma żadnego efektu na formułę — to tylko oznaczenie w historii dla retrospektywy. Reset do intervalu 1d wynika z grade ≤ 2 w kroku 5.6.

### 5.8 Atomic Edit banku

**Każde pytanie = jedno wywołanie `Edit` tool** z wieloliniowym `old_string → new_string`. Atomic update — bank nigdy nie trafia w niespójny stan.

**Wzorzec Edit:**

`old_string`:
```
### [Topic name] (Mx)

**Score:** [OLD_SCORE]/5 | **Last tested:** [OLD_DATE] | **Next review:** [OLD_NEXT_REVIEW] (interval: [OLD_INTERVAL]d)
**L3 anchor:** [OLD_ANCHOR]

Historia:
- [pierwsza linia historii]
```

`new_string`:
```
### [Topic name] (Mx)

**Score:** [NEW_SCORE]/5 | **Last tested:** [TODAY] | **Next review:** [NEW_NEXT_REVIEW] (interval: [NEW_INTERVAL]d)
**L3 anchor:** [NEW_ANCHOR]

Historia:
- [TODAY] (articulation-check): [NEW_SCORE]/5 — [co trafne, co brakowało, 1 zdanie] ([OLD_INTERVAL]d → [NEW_INTERVAL]d)[optional lapse suffix]
- [pierwsza linia historii]
```

Unikalny `### [Topic name] (Mx)` header + linia "Score" + linia "L3 anchor" + pierwsza linia historii dają jednoznaczny match. Edit aktualizuje Score/Last tested/Next review/interval/L3 anchor + dodaje linię historii w jednym call. Atomowe.

**Migracja wpisu bez `L3 anchor:`** — gdy old_string nie zawiera tej linii (stary wpis sprzed wprowadzenia pola), użyj wzorca **bez** linii `L3 anchor` w `old_string` i **z** linią `L3 anchor` w `new_string`. Pierwszy kontakt = lazy migration. `[NEW_ANCHOR]` wtedy pochodzi z kroku 5.7a.

**Drugi Edit (opcjonalny) — update "Do domknięcia":**

- Jakub domknął gap w odpowiedzi → usuń z listy
- Ujawnił nowy gap → dodaj do listy
- Brak zmian → pomiń drugi Edit

### 5.9 Grade = 3.5 — boundary

- Re-recall: **NIE** (próg to <3.5)
- Interval: **5d** minimum (3.5 wpada w "Good" branch)
- Lapse notacja: NIE (3.5 nie jest <3)

To jest intencjonalne: 3.5 = "solid mid+ answer" = gotowy do rozmowy.

## 6. Podsumowanie na końcu

Po ostatnim pytaniu — krótkie podsumowanie (max 5 linii):

```
**Articulation check — wyniki:**
- [Topic 1]: [NEW_GRADE]/5 (poprzednio [OLD_GRADE]) — interval [OLD_INT]d → [NEW_INT]d | anchor: [NEW_ANCHOR]
- [Topic 2]: [NEW_GRADE]/5 (poprzednio [OLD_GRADE]) — interval [OLD_INT]d → [NEW_INT]d | anchor: [NEW_ANCHOR]

Lapse notatki dzisiaj: [lista lub "brak"]
Nowe słabości (Do domknięcia added): [konkrety lub "brak"]
Bridge needed: [lista tematów ze score ≥3.5 i anchor unknown — session-end ma napisać bridge task w odpowiednim milestone, lub "brak"]
```

Session-end kopiuje to do session logu.

## Zasady

- **Jedno pytanie na raz** — nigdy nie zasypuj
- **Hypothesis first** — pytanie → odpowiedź → dopytanie → odpowiedź → feedback
- **Specyficzne pytania z "Do domknięcia"** — nie generyczne
- **Re-recall tylko przy <3.5** — 3.5 i wyżej nie
- **Atomic Edit per question** — jeden Edit aktualizuje Score + Last tested + Next review + interval + nowa linia historii
- **Formula = jedyny stan** — brak streak, mastery, lapse detection. Interval robi wszystko.
- **Selekcja = due only** — `next_review ≤ today`. Wszystko inne odpada naturalnie.
- **Dress rehearsal wyłącza filtr due** — tylko przy explicit Jakub request

## Argumenty

- **Brak argumentu / session-end default:** 2 pytania, due only, sorted by overdue
- **Liczba (np. `5`):** 5 pytań zamiast 2
- **Milestone filter (np. `M4`):** tylko tematy z danego milestone (dalej due only)
- **Topic filter (np. `JWT`):** tylko tematy zawierające frazę w nazwie
- **Kombinacja (np. `5 M4`):** 5 pytań z M4
- **`dress-rehearsal`:** filtr due off, priority pure grade ascending (symulacja rozmowy)

## Co NIE robisz

- Nie aktualizujesz `fullstack-roadmap.md` — to robi session-end dla L3 checkpointów
- Nie generujesz fiszek Anki — to robi session-end
- Nie piszesz session logu — to robi session-end (ale zwracasz dane w formacie z kroku 6)
- Nie wywołujesz innych skilli — jesteś samodzielnym komponentem
- Nie dodajesz nowych tematów do banku — to robi session-end gdy nowy temat pojawił się w sesji bez ekspozycji
