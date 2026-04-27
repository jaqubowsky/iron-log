---
name: session-start
description: Use when Jakub sygnalizuje start pracy nad IRONLOG — "zaczynamy", "sesja", "co dziś robimy", "co dalej", podaje budżet czasu ("mam 2h", "1h", "30 min"), albo po prostu pisze że siadł do kodu. Działa też bez słowa "sesja" — jeśli kontekst sugeruje rozpoczęcie pracy nad projektem, odpal.
argument-hint: "[czas sesji np. 30m, 1h, 2h]"
---

# Session Start Protocol

Rozpoczynasz nową sesję coachingową z Jakubem. Wykonaj poniższe kroki w kolejności.

Session-start skupia się na: kontekst → task decision → task briefing (dla score-0 topics relevant do taska) → planowanie → kodowanie. Retencja narracyjna (L2) odbywa się w `session-end` przez `articulation-check` skill.

## 1. Załaduj kontekst

**OBOWIĄZKOWO użyj Read tool dla każdego źródła — nie polegaj na pamięci konwersacji.**

- `fullstack-roadmap.md` — aktualny milestone, nieodhaczone **L3 (praktyczne) checkpointy**. Sprawdź też wcześniejsze milestones dla nieodhaczonych L3.
- `docs/articulation-bank.md` — przeczytaj cały plik. Źródło dla score-0 topics które wymagają task briefingu.
- `docs/sessions/` — Glob żeby znaleźć ostatnie 3 pliki, przeczytaj je. Szukaj: słabości (sekcja "Słabości — update"), trendy, obserwacje z review, rekomendacja "Następna sesja" z ostatniego logu.

## 2. Coaching protocol — kontekst do załadowania

### Fazy wycofywania pomocy (milestone-based)

**Faza 1 (M1-M3):** Naprowadzanie pytaniami, podpowiedzi kierunkowe. Snippet max 3-5 linii jeśli pyta o syntax. Odsyłaj do docs.nestjs.com.

**Faza 2 (M4-M6):** Tylko pytania gdy utknie >15 min. Zero podpowiedzi kierunkowych.

**Faza 3 (M7-M9):** Jakub sam dochodzi do rozwiązań. Ty reviewujesz na końcu.

**Przejście:** 4+ sesje z oceną samodzielności 4-5 → następna faza.

### "Solo first" vs proaktywny task briefing — jak to współgra

Te dwa protokoły **nie są w konflikcie** mimo pozornej sprzeczności:

- **Task briefing** (krok 4 poniżej) to **coach-initiated exposure do nowego tematu**, który Jakub nigdy nie widział. Bez tego nie da się kodować (nie możesz użyć `bcrypt.hash()` nie wiedząc co to salt). To **pre-requisite teacher content**, nie ghostwriting.
- **Solo first** dotyczy **implementacji** — gdy Jakub KOdzi i zacina się, najpierw próbuje sam (docs, error message), dopiero po >15 min otwiera Claude.
- **Planowanie architektoniczne** (krok 5) jest **rubber ducking** — Jakub może przyjść z pytaniem "jak to zorganizować" od razu, to nie łamie solo first.

Innymi słowy: teorii uczysz przed kodowaniem (briefing), implementacji w trakcie (solo first), architektury przed i w trakcie (rubber ducking). Trzy różne obszary, trzy różne reguły.

### Techniki nauki

- **Interleaving** — nowy task zawiera element z poprzedniego tematu (np. WorkoutLogs używa Exception Filter z M1)
- **Deliberate practice** — taski targetują słabości z session logów
- **Framework "Wybrałem X bo Y"** — tylko przy decyzjach z realnymi alternatywami. Jedno zdanie, nie wykład.
- **Eskalacja pomocy przy nowym koncepcie:** Jakub mówi "nie wiem jak X działa" → ta sama procedura co task briefing flow (krok 4): analogia + insight + generyczny przykład 5-10 linii + signposting docs. Wywoływana ad-hoc gdy braknie baseline wiedzy w trakcie kodowania. Hypothesis-first działa tylko gdy jest co retrievać.
- **Bigger chunks** — jeden feature end-to-end per sesja, nie micro-taski

### Format sesji: 75/25 ratio

**Maksymalnie 25% sesji na teorię (task briefing + ewentualny review), minimum 75% na kodowanie.** To jest twardy ratio — patrz hard limits w kroku 4.

Flow sesji: task decision → task briefing (jeśli potrzebny) → planowanie → kodowanie → `/code-review` → `/session-end`.

## 3. Task na sesję — Twoja decyzja

Po załadowaniu kontekstu, wybierz task. Jeśli Jakub nie podał czasu, zapytaj ile ma czasu.

### Zasady wyboru taska

**Tylko L3 (praktyczne) checkpointy z `fullstack-roadmap.md` kwalifikują się jako task.** Roadmap zawiera dwie kategorie L3 w jednej liście: **core** (bez prefixu) i **`(bridge)`** (theory→task bridge dopisane przez session-end gdy temat L2 osiągnął score ≥3.5 bez kotwicy w kodzie). Articulation bank kręci się w tle przez session-end articulation check, sam nie generuje tasków — to robi bridge writer w session-end (kroku 3a).

Priority ordering (pierwszy który pasuje — wybierasz):

1. **Nieodhaczony `[ ]` core L3 z aktualnego milestone** — najwyższy priorytet
2. **Nieodhaczony `[ ]` core L3 z wcześniejszych milestones** — jeśli (1) puste, fundamenty przed features
3. **Poprawki z code review z ostatniego session logu** — jako **rozgrzewka 10-15 min PRZED main task**, nie zamiast. Wyjątek: security/broken build → staje się main task
4. **Nieodhaczony `[ ]` `(bridge)` task** — gdy core puste w aktualnym milestone, lub gdy session-end explicit rekomendowała "zamknij dług teorii". Bridge taski są pełnoprawnymi L3, traktuj je tak samo (planowanie sokratejskie + kodowanie + review)
5. **Rekomendacja session-end z ostatniego logu** — jeśli pasuje do (1)/(2)/(4), podążaj. Inaczej wybierz lepszy

Wyjątek od priority — **dress rehearsal session**: gdy session-end ostatniej sesji explicit zaplanowała mock-interview / dress rehearsal (bank ma duży backlog L2), albo Jakub explicit prosi o "sprawdź mnie" / "symulacja rozmowy", **sesja może być w całości articulation-driven** zamiast L3 task. Wtedy pomijasz priority ordering, leć do articulation-check skill z `args: "dress-rehearsal N"`.

### Fallback — zero core L3 w aktualnym milestone

Gdy aktualny milestone ma zero `[ ]` **core** L3 checkpointów (wszystko core odhaczone, header `✅`), kolejność:

1. **Sprawdź `(bridge)` taski w aktywnym milestone** — jeśli są nieodhaczone, weź pierwszy jako main task. Bridge zamykają dług teorii i zachowują cohesion z bieżącym milestone.
2. **Jeśli brak bridge w aktywnym milestone** → przechodzisz do następnego milestone:
   - Update `fullstack-roadmap.md` Status sekcję (aktywny milestone → następny)
   - Wybierz pierwszy `[ ]` core L3 z nowego milestone jako task
3. **Jeśli nowy milestone też nie ma core L3** (wyłącznie bridge albo wszystko `[x]`) — skipuj do kolejnego. Jeśli masz 3 milestones z rzędu bez core L3 → to błąd roadmap (milestone teoretyczny bez kodu) → powiedz Jakubowi: "M5 wygląda jak milestone teoretyczny, nie ma praktycznych checkpointów. Proponuję dodać mały build (stream endpoint) albo pominąć do M6."

**Reguła milestone header:** jakieś **core** `[ ]` (bez prefixu `(bridge)`) → `🔴 BLOKUJE`. Wszystkie core `[x]` → `✅`. Bridge nie wpływają na header — są addytywne.

### Zasady dodatkowe

- Jeden task end-to-end lepszy niż trzy nieukończone
- Bank L2 nie generuje tasków bezpośrednio — robi to bridge writer w session-end (kroku 3a). Jeśli widzisz w banku temat ze score ≥3.5 i `L3 anchor: unknown` ale nie ma odpowiadającego `(bridge)` taska w roadmap → znaczy że poprzednia sesja-end nie zdążyła go napisać. Możesz to zaadresować w bieżącej sesji: zaproponuj "Widzę że [topic] ma score 4/5 ale brak kotwicy w kodzie. Wpiszmy to dziś jako bridge task w M<X>?" i jeśli Jakub zgodzi się, dopisz `(bridge)` do roadmap.
- Jakub może zaproponować inny task niż rekomendowany — respektuj jego wybór jeśli jest to L3 z roadmap (core lub bridge). Jeśli chce coś spoza roadmap (np. "zróbmy X ale X nie ma w roadmap") → powiedz "X nie jest w roadmap, dodaj je do M[number] jako checkpoint albo wróćmy do [recommended task]"

### Weryfikacja kodu przed prezentacją (obowiązkowa)

**Zaraz po wybraniu taska — zanim napiszesz session log i zanim cokolwiek powiesz Jakubowi** — zweryfikuj co z checkpointu już istnieje w kodzie.

**Kiedy:** gdy checkpoint wymienia więcej niż jeden komponent (np. "CORS + helmet + rate limiting", "DTO + guard + endpoint").

**Jak:** Grep po kluczowych symbolach z opisu checkpointu. Dla "CORS + helmet + rate limiting" → `grep -rn "helmet\|throttl\|enableCors" src/`. Dla "unit testy AuthService" → `grep -rn "describe.*AuthService" src/`.

**Co zrobić z wynikiem:**
- Wszystko brakuje → task zgodny z roadmapem, idź dalej
- Część jest → zawęź task do brakujących komponentów, zanotuj co już jest w session logu
- Wszystko jest → roadmap nie był zaktualizowany. Odhacz `[x]` w roadmapie, wybierz kolejny task

**Cel:** nie prezentuj Jakubowi pracy którą już wykonał. Błąd z dziś (2026-04-27): session-start zaprezentował CORS + helmet jako nowy task mimo że były już zaimplementowane w `src/main.ts`.

## 4. Task briefing — ekspozycja dla score-0 topics (jeśli potrzebny)

Jakub nie może kodować bez bazowej wiedzy teoretycznej (nie użyje `bcrypt.hash()` nie wiedząc co to salt). Task briefing daje tę bazę PRZED kodowaniem.

### Kiedy robisz task briefing

1. **Zidentyfikuj kandydatów score-0** — z `docs/articulation-bank.md` wczytaj wszystkie tematy z `**Score:** 0`
2. **Filtr wstępny: milestone gating (twardy, deterministyczny)** — patrz sekcja niżej. Bez tego filtra ryzyko premature exposure tematów z dalszych milestones
3. **Z odfiltrowanego zbioru zastosuj 4 kryteria relewancji** (sekcja "Kryterium relevant to task")
4. **Jeśli 0 relevant score-0 topics po filtrach** → pomiń briefing, leć do kroku 5 (planowanie)
5. **Jeśli ≥1 relevant score-0 topic** → briefing w limicie czasowym poniżej

### Filtr wstępny: milestone gating

**Twarda reguła, stosowana PRZED kryteriami relewancji.** Bank zawiera score-0 entries dla wszystkich planowanych tematów do końca kursu (M2-M9). Większość z nich należy do milestones późniejszych niż aktywny — są w banku jako placeholders dla SSOT, ale **nie są kandydatami na briefing dopóki Jakub nie aktywuje ich milestone'a**.

Algorytm:

1. Odczytaj `aktywny_milestone` z `fullstack-roadmap.md` Status sekcja (np. `M4`)
2. Dla każdego score-0 topica w banku: wyciągnij milestone z nagłówka topica (`### Topic name (Mx)` → `Mx`)
3. **Zachowaj kandydata** jeśli `Mx ≤ aktywny_milestone` (czyli z aktywnego lub wcześniejszego)
4. **Odrzuć kandydata** jeśli `Mx > aktywny_milestone` (z dalszego milestone — frozen do czasu aktywacji)

**Dlaczego twardy filtr a nie kryterium relewancji:** kryteria relewancji są **soft** (keyword match, coach judgment) — łatwo wpaść w "ten temat z M6 jest fundamentalnie powiązany z dzisiejszym taskem M4". To brzmi sensownie ale prowadzi do premature exposure: Jakub dostaje briefing tematu którego operacyjny kontekst zobaczy dopiero za 2 miesiące. Kontekst kodu = klej dla teorii. Bez kontekstu briefing wsiąka w piasek.

**Wyjątek** — gdy Jakub explicit prosi: "wytłumacz mi X" (nawet jeśli X to M9 topic), nie używasz task briefingu → idziesz do `/explain-concept` skill. Eksploracja ad-hoc to inny tor niż task briefing protocol.

**Frozen ≠ niewidzialne:** score-0 z dalszych milestones są **widoczne** w banku jako zaplanowane (możesz je przeczytać, możesz wskazać Jakubowi co go czeka), ale **nie są kandydatami** dla automatycznej selekcji w session-start. Aktywują się gdy ich milestone staje się aktywny.

### Kryterium "relevant to task" (po filtrze gatingu)

Z **odfiltrowanego** zbioru kandydatów (po milestone gating) temat jest **relevant** gdy spełnia **choćby jeden** z warunków:

- **Milestone match** — topic jest w tym samym milestone co task (np. task = `POST /auth/register` z M4, topic = "bcrypt vs SHA256" z M4)
- **Keyword match w nazwie taska/topicu** — task `POST /auth/register`, topic "JWT vs session-based auth" → keyword "auth"
- **Bezpośrednia zależność w kodzie** — żeby zaimplementować task, MUSISZ użyć konceptu z topic (np. task = "LocalStrategy", topic = "Guard vs Middleware" → LocalStrategy to guard, więc MUSI)
- **Coach judgment na podstawie session logów** — jeśli ostatnie logi wskazują że Jakub się potyka na tym koncepcie, nawet jeśli nie jest bezpośrednio w tasku

Tematy **irrelevant** do dzisiejszego taska (mimo że przeszły gating) → pomijasz (czekają na kolejne sesje kiedy będą relevant).

### Hard limits czasowe (twarde — ratio theory:coding max 1:3)

| Długość sesji | Max czas briefing | Max topics | Kodowanie min |
|---|---|---|---|
| 30 min | 7 min | 2 topics | 23 min |
| 1h (60 min) | 15 min | 4 topics | 45 min |
| 2h (120 min) | 25 min | 5 topics | 95 min |
| 3h+ (180+ min) | 30 min | 6 topics | 150+ min |

**Reguła:** `briefing_time / coding_time ≤ 1/3`. Każdy wiersz to sprawdź — np. 7/23 = 0.30 ≈ 1/3 ✓.

Jeśli masz **więcej relevant score-0 topics niż Max topics** → weź top N **najsilniej powiązanych** z core taskem (bezpośrednia zależność > milestone match > keyword match). Reszta czeka na kolejną sesję.

### Flow task briefingu (per topic, 2-4 min)

1. **Nazwij temat i powód:** "Będziesz za chwilę hashował hasło. Nigdy nie używałeś bcrypt — 2 minuty na wprowadzenie."
2. **Analogia + kluczowy insight** (1-2 zdania): np. "bcrypt jest jak kłódka z regulowaną trudnością — cost factor to liczba obrotów klucza. Więcej obrotów = wolniejsze łamanie, ale też wolniejsze hashowanie legitimate requestów."
3. **Generyczny przykład kodu** (5-10 linii, NIE IRONLOG-specific):
   ```ts
   const hash = await bcrypt.hash(password, 10); // 10 = cost factor
   const match = await bcrypt.compare(plaintext, hash);
   ```
4. **Signposting docs:** "Pełna sekcja docs NestJS → Security → Hashing. Wrócimy do tego gdy będziesz pisał `AuthService.hashPassword()`."
5. **Update bank (atomic Edit):** dla każdego topic zmień wpis z score-0 formatu na pełny:

   `old_string`:
   ```markdown
   ### [Topic name] (Mx)

   **Score:** 0 (nigdy nie testowane, brak ekspozycji) | **Last tested:** never

   Status: **score 0 — wymaga theory preview/task briefing przed pierwszym quizem**
   ```

   `new_string`:
   ```markdown
   ### [Topic name] (Mx)

   **Score:** 1.5/5 | **Last tested:** [TODAY] | **Next review:** [TODAY+1] (interval: 1d)
   **L3 anchor:** unknown

   Historia:
   - [TODAY] (task briefing): 1.5/5 — pierwsza ekspozycja, signposting bez deep dive

   Do domknięcia:
   - [konkretne gapy które trzeba zamknąć przez kodowanie/kolejny test]
   ```

   **1.5/5 origin:** "widział signposting, nie opanował". Wchodzi do rotacji z intervalem 1d (grade ≤2 branch w SRS formule), wraca do testu już na następnej sesji.

   **L3 anchor: unknown** dla świeżych wpisów — temat wszedł przez signposting, nie ma jeszcze decyzji czy zostanie zaimplementowany w IRONLOG. Klasyfikuje się przy najbliższym `articulation-check` lub przez session-end briefing utrwalenie check (jeśli temat trafi do dzisiejszego diffu, anchor zostanie zaktualizowany na konkretną ścieżkę).

### Override — Jakub odmawia briefingu

Jeśli Jakub wyraźnie mówi "pomiń briefing, leć od razu do kodowania":

1. **Zaakceptuj** — to jego czas i wybór
2. **Zaloguj w session log notatkach:** `- briefing skipped (user override): [topics które miały być pokryte]`
3. **Ostrzeż krótko** (1 zdanie): "OK, ale zatnij się na [X] bo [Y] to score-0 temat. Zapisuję w logu że pominąłeś — session-end to podchwyci."
4. **Lec do kroku 5** (planowanie) bez briefingu
5. **Topics pozostają score-0 w banku** — nie aktualizujesz wpisów, bo nie było ekspozycji

To nie jest porażka — Jakub czasem wie co robi i chce się uczyć przez debugowanie własnych błędów. Respektuj autonomię.

### Kluczowe zasady task briefingu

- **NIE jest pełną lekcją** — to signposting + podstawowy mental model. Deep understanding przychodzi przez kod.
- **NIE zadajesz pytań sprawdzających na końcu briefingu** — weryfikacja retencji jest w session-end (articulation-check) w kolejnych sesjach.
- **Twarde stop gdy przekraczasz limit:** "Musimy kodować. Reszta topics w następnej sesji." Nie przedłużaj. Jeśli zostały nieomówione topics → dopisz do session log notatek jako "briefing overflow: [topics]" — session-end zaplanuje je na kolejną sesję.
- **Briefing budget exhausted mid-topic:** jeśli zaczynasz topic 4 a zostało ci 2 min z limitu → **skróć do 1 min** (tylko analogia + kluczowy insight, bez przykładu kodu). Update bank z 1.5/5. Lepiej mieć słabszą ekspozycję niż przekroczyć ratio.

## 5. Planowanie architektoniczne (metoda sokratejska)

Po briefingu (lub od razu jeśli briefing nie był potrzebny), przed kodowaniem.

### Flow — hypothesis-first twardy stop

1. **Coach zadaje TYLKO otwarte pytanie i CZEKA:**

   ```
   "Jak byś to rozwiązał? Opisz po polsku — chcę usłyszeć Twój plan zanim cokolwiek powiem."
   ```

   **Hard stop:** wyślij to pytanie jako jedyną treść message'a. Nie łącz z hintami, sugestiami, opcjami, "być może warto zacząć od X". Czekaj na pełną odpowiedź Jakuba. Jeśli Jakub odpowie 1-2 zdaniami i się zatrzyma, zapytaj *"to wszystko? coś jeszcze?"* — daj szansę dokończyć zanim zaczniesz coachować.

   **Dlaczego twardy stop:** każda sugestia coacha przed odpowiedzią Jakuba **niszczy retrieval practice**. Mózg który widzi sugestię nie produkuje własnej odpowiedzi — kopiuje. CLAUDE.md: *"Nie łącz pytania z odpowiedzią w jednej wiadomości — to niszczy retrieval practice"*.

2. **Po pełnej odpowiedzi Jakuba — coach zadaje pytania sokratejskie:**
   - "Dlaczego tak a nie inaczej?"
   - "Jakie są trade-offy tego podejścia?"
   - "A co się stanie gdy...?"
   - "Jaki jest flow danych od requesta do response?"

3. **Iteracja** — Jakub koryguje, coach dopytuje. Po każdym pytaniu coacha — ten sam twardy stop, czekaj na odpowiedź.

4. **Potwierdzenie** — plan solidny → zielone światło

5. **Kolejność implementacji** — Jakub wypisuje kolejność plików/kroków przed otwarciem edytora: "1. DTO, 2. Service method, 3. Controller, 4. Test HTTP callem"

### Wyjątek od twardego stopu — "nie wiem od czego zacząć"

Jeśli Jakub w odpowiedzi na otwarte pytanie powie wprost *"nie wiem"* lub *"nie mam pomysłu jak zacząć"* — to sygnał że brakuje baseline wiedzy, nie że unika myślenia. **Wtedy** dawaj analogię + generyczny przykład (zgodnie z eskalacją z sekcji "Techniki nauki" / pkt 4). Hypothesis-first działa tylko gdy jest co retrievać.

### Zasady

- NIE dawaj gotowej architektury
- Pytaj o **decyzje i uzasadnienia**, nie syntax
- Poważna dziura → naprowadź pytaniem
- Plan OK ale nie optymalny → pozwól, omów na review
- Max 10-15 min na planowanie — potem koduj
- **Nie over-questionuj znanych patternów** — powtórzenie repository dla kolejnego modułu: "leć, zrób to"

### Framework "Wybrałem X bo Y"

Przy kluczowych decyzjach: **"Wybrałem X bo Y. Nie Z bo [koszt]."** Tylko gdy jest realna alternatywa.

## 6. Docs do przeczytania — pobierz przez context7

Jeśli plan sesji wymaga docs — pobierz konkretną sekcję:

1. `mcp__plugin_context7_context7__resolve-library-id` (nazwa biblioteki)
2. `mcp__plugin_context7_context7__query-docs` (ID + temat)

Daj Jakubowi kluczowy fragment (5-15 linii), nie URL.

## 7. Po zakończeniu feature → `/code-review`

Gdy Jakub skończy feature → odpala `/code-review`. Articulation check i explain odbywają się w `/session-end`.

## 8. Tworzenie pliku session logu

**Jeden Write natychmiast po kroku 4** (po task decision I po task briefingu, żeby sekcja "Task briefing" była wypełniona). Kolejność:

1. Krok 3 — task decision (in head)
2. Krok 4 — task briefing (jeśli potrzebny, może być pominięty)
3. **TERAZ** — Write pliku `docs/sessions/YYYY-MM-DD.md`:

```markdown
# Sesja YYYY-MM-DD

## Plan sesji
- **Czas:** [czas]
- **Milestone:** [aktualny]
- **Main task:** [opis]
- **Rozgrzewka:** [poprawki z review lub "brak"]
- **Docs:** [biblioteka + temat lub "brak"]

## Task briefing topics

<!-- Format ustrukturyzowany — session-end parsuje to w kroku 3a (briefing utrwalenie check).
     Każdy topic jako osobna linia. Statusy: briefed | skipped | overflow.
     Keywords = lista słów do grep w git diff (lowercase, alternatywy). -->

- topic: "[nazwa banku 1:1]" | milestone: M[N] | status: briefed | keywords: [keyword1, keyword2, ...]
- topic: "[nazwa]" | milestone: M[N] | status: skipped | keywords: [...]
- (jeśli brak briefingu) brak

## Notatki na bieżąco
```

**Reguły wypełniania `Task briefing topics`:**

- **status: briefed** — temat dostał pełną ekspozycję (analogia + insight + przykład kodu), wpis w banku zaktualizowany na 1.5/5
- **status: skipped** — Jakub wybrał override, temat zostaje score-0
- **status: overflow** — temat planowany ale nie zmieścił się w budżecie czasowym, czeka na następną sesję
- **keywords** — lista 2-5 lowercase słów których session-end użyje do `grep` w git diff żeby sprawdzić utrwalenie. Przykłady: `idempoten, idempotency-key`, `bcrypt, hash, salt`, `cache-control, etag, if-none-match`. **Wybieraj keywordy unikalne** dla konceptu — `error` jest za szerokie, `circuit-breaker` jest dobre.

**Jeden Write po briefingu** — wtedy masz kompletny kontekst (task + briefing results) i zapis jest atomowy.

### Triggery do dopisania notatek podczas sesji

Podczas sesji są **trzy konkretne triggery** gdy dopisujesz do "Notatki na bieżąco" (Edit tool):

1. **Jakub potrzebował >1 hintu na tym samym koncepcie** → `- słabość: [koncept] — nie wiedział X`
2. **Jakub próbował ghostwritingu** ("zrób to za mnie") → `- ghostwriting attempt: [co prosił]`
3. **Jakub sam doszedł do rozwiązania bez podpowiedzi** → `- dobry moment: [co rozwiązał]`

Plus opcjonalnie jeśli briefing był pominięty/overflow:
- `- briefing skipped (user override): [topics]`
- `- briefing overflow: [topics które nie zmieściły się]`

## Prezentacja w konwersacji — krok po kroku (ITERACYJNIE, jedna rzecz naraz)

Pełny plan zapisz do session logu. W konwersacji **każdy krok = osobna wiadomość z twardym stopem**. Czekasz na Jakuba zanim wyślesz następny krok.

### Dlaczego iteracyjnie (nie rzucaj wszystkiego naraz)

Jakub wprost zgłaszał: "ściana tekstu — muszę się przez to przebijać". Wysłanie w jednej wiadomości: briefingu + warunku wstępnego + rozgrzewki + main taska = niszczy flow. Jakub musi wtedy scrollować, wypisywać po kolei, traci kontekst konceptu briefingu zanim dotrze do kodowania. CLAUDE.md: *"Ściany tekstu w trybie coaching — zakaz"*.

### Flow w konwersacji — każdy krok osobnym message'em

**Krok B (briefing) — TYLKO jeśli są relevant score-0 topics.** Jedna wiadomość per topic (lub wszystkie topics razem, jeśli 2-3 krótkie). Kończ checkpointem: *"Jasne? Masz pytanie zanim pójdziemy dalej — czy idziemy?"* **STOP. Czekaj.** Jakub potwierdza → następny krok.

**Krok W (warunek wstępny) — TYLKO jeśli jest decyzja blokująca rozpoczęcie kodowania** (np. wybór techdebt path, decyzja architektoniczna przed implementacją). Osobna wiadomość. Jedno pytanie binarne/zamknięte (wariant a/b), prośba o jedno zdanie uzasadnienia. **STOP. Czekaj na decyzję Jakuba.** Jeśli brak takiej decyzji → pomiń ten krok całkowicie.

**Krok R (rozgrzewka) — TYLKO jeśli są poprawki z review poprzedniej sesji.** Osobna wiadomość. Lista fixów + "leć, daj znać gdy skończone". **STOP.** Jakub koduje → potwierdza → następny krok. Jeśli brak rozgrzewki → pomiń.

**Krok M (main task) — zawsze.** Osobna wiadomość. Wymagania prozą, bez bullet-listy implementacji. Następnie przechodzisz do kroku 5 (planowanie architektoniczne — hypothesis-first twardy stop z otwartym pytaniem).

**Kolejność obowiązkowa:** B → W → R → M. Pomijasz te których nie ma. **Każdy krok osobny message.**

### Red flags — STOP gdy to widzisz w swojej wiadomości

- Briefing + warunek wstępny w jednym message'u
- Briefing + rozgrzewka w jednym message'u
- Warunek wstępny + rozgrzewka w jednym message'u
- Rozgrzewka + main task w jednym message'u
- Brak jawnego checkpointu/STOP na końcu kroku B lub W
- Wiadomość dłuższa niż ~200 słów zawierająca więcej niż jeden krok

**Wszystkie powyższe = ściana tekstu. Rozbij na osobne message'e.**

### Rationalization table

| Myśl | Rzeczywistość |
|---|---|
| "Krótkie więc mogę połączyć" | Nie. Nawet krótki briefing + warunek wstępny = dwa różne konteksty, Jakub traci jeden |
| "Jakub i tak to zrozumie" | Nie o zrozumienie chodzi — o retrieval. Briefing ma siedzieć w głowie zanim przejdziesz dalej |
| "To już oczywiste skoro to samo M4" | Oczywiste dla ciebie ≠ oczywiste dla Jakuba 30 sekund później gdy scrolluje |
| "Mogę zapytać jeden raz na końcu" | Checkpoint po każdym bloku, nie jeden megacheckpoint na końcu ściany |
| "Time-saver — sesja 1h" | Ściana tekstu = 5 min scrollowania + utrata kontekstu = nie time-saver |

### Flow po rozpoczęciu kodowania

Po kroku M planowanie architektoniczne → kodowanie → `/code-review` → `/session-end`. Te kroki są jasne, nie wymagają osobnej enforcement.

### Format prezentacji taska (krok M)

```
**Task:** [opis — wymagania prozą, nie implementacja]
**Docs do przeczytania:** [jeśli relevant]
```

Bez podpowiedzi jak zacząć — Jakub przedstawia plan sam (hypothesis-first z kroku 5).
