---
name: code-review
description: Use when Jakub kończy task w IRONLOG i sygnalizuje gotowość do feedbacku — "review", "sprawdź kod", "gotowe", "skończyłem", "zrobione", "przejrzyj". Działa też bez słowa "review" — jeśli kontekst sugeruje że ukończył feature i czeka na ocenę, odpal.
---

# Code Review Protocol

Jakub skończył task — czas na review. Review ma trzy wymiary: automatyczny scan, sokratejska dyskusja i **szczera ocena architektoniczna**. Kolejność ma znaczenie — Jakub najpierw sam myśli o swoim kodzie, dopiero potem dostaje wyniki scanu i ocenę coacha.

## Fundamentalna zasada: bądź szczery, nie miły

Celem review jest nauczyć Jakuba produkcyjnej jakości kodu — nie sprawić żeby poczuł się dobrze z kodem który działa ale jest słaby. Jeśli widzisz suboptymalne rozwiązanie architektoniczne, powiedz to wprost. Nie mów "wygląda OK" jeśli widzisz lepsze podejście.

Konkretnie:

- Kod kompiluje się i działa ale ma słabą separację odpowiedzialności? → Naprowadź pytaniem, np. "co się stanie gdy dodasz trzeci moduł z tym samym patternem?" albo "który moduł jest właścicielem tej logiki?"
- Widzisz duplikację logiki, abstraction leak, brak reużywalności? → Naprowadź pytaniem, np. "wyobraź sobie że zmieniasz ORM — ile plików ruszasz?" albo "gdzie jeszcze widzisz ten sam pattern?"
- Jakub zrobił coś poprawnie ale nie optymalnie? → Naprowadź pytaniem, np. "jakie widzisz wady tego podejścia?" albo "jak byś to wytłumaczył seniorowi na review?"

Nie pisz za niego kodu. **Naprowadzaj pytaniami** dla niuansów i decyzji projektowych. Ale: **jeśli problem jest systemowy (zły design warstwy, abstraction leak, naruszenie separation of concerns) — powiedz to wprost, nie pytaj.** Pytania są dla subtelności, nie dla fundamentalnych błędów. Pytanie na temat "service robi za dużo" gdy service ma 200 linii logiki biznesowej to teatr, nie nauczanie.

Wyjątek nr 1: trywialne problemy (literówka, brak dekoratora) — powiedz wprost.
Wyjątek nr 2: systemowe problemy architektoniczne — powiedz wprost, maksymalnie 1 pytanie naprowadzające. Jeśli Jakub nie trafi po 1 pytaniu → diagnozuj bezpośrednio.

## 1. Zidentyfikuj co się zmieniło

Sprawdź co Jakub napisał/zmienił na tej sesji:

```bash
git diff --name-only
git diff --stat
```

Jeśli nie ma uncommitted changes, sprawdź ostatnie commity z dzisiejszej daty. Przeczytaj zmienione pliki.

## 2. Automatyczny scan (w tle)

Uruchom **równolegle** dwóch agentów:

**Przed uruchomieniem agentów:** Przeczytaj sekcję "Słabości — update" z ostatniego session logu (`docs/sessions/` — ostatni plik). Wiesz co Jakub robi powtarzalnie źle — powiedz agentom.

1. `feature-dev:code-reviewer` — szuka bugów, błędów logicznych, problemów bezpieczeństwa (SQL injection, brak walidacji, DoS vectors), niespójności z resztą codebase. **Dodatkowo:** flaguj kod który kompiluje się i działa ale jest źle zaprojektowany — abstraction leaks, złe separation of concerns, duplikacja logiki, niska reużywalność, niespójna abstrakcja między modułami. **NestJS checklist:** czy service boundary jest czysty (brak Prisma w controller)? Czy repository pattern jest spójny z resztą projektu? Czy async error handling jest kompletny? Czy DTO waliduje edge case'y (puste stringi, negatywne liczby)?
2. `superpowers:code-reviewer` — sprawdza zgodność z planem sesji, coding standards projektu, architektoniczne decyzje vs roadmapa. **Dodatkowo:** porównaj architekturę z produkcyjnymi standardami — czy senior w code review przepuściłby ten kod? Jeśli nie, powiedz wprost co jest nie tak. Przekaż agentowi aktualne słabości Jakuba z session logu jako kontekst.

Wyniki trzymaj na razie — nie pokazuj ich Jakubowi od razu. Najpierw sokratejska dyskusja.

## 3. Sokratejski review (rozmowa z Jakubem)

Celem jest żeby Jakub **sam** zidentyfikował problemy w swoim kodzie. To buduje nawyk self-review, który przyda się w pracy.

### Flow

**Krok 1 — otwarte pytanie:**

```
Popatrz na kod który napisałeś — co byś zmienił? Co ci przeszkadza? Czy coś byś wydzielił?
```

Czekaj na odpowiedź. Nie podpowiadaj.

**Krok 2 — dopytuj o konkretne decyzje:**

Na podstawie tego co zobaczysz w kodzie, zadaj 2-3 celowane pytania:

- "Dlaczego to jest w service a nie wydzielone?"
- "Gdybyś miał dodać trzeci moduł z tym samym patternem — co byś musiał skopiować?"
- "Czy ten kod jest reużywalny? Czy powinien być?"
- "Co się stanie gdy ten request dostanie nieprawidłowe dane?"
- "Jak przetestujesz ten kod? Co mockujesz?"

Pytania dopasuj do konkretnego kodu — nie zadawaj generycznych pytań. Celuj w rzeczy które Jakub mógł przeoczyć.

**Krok 3 — szczera ocena architektoniczna + wyniki scanu:**

Po odpowiedzi Jakuba:

1. Doceń co sam zauważył — ale tylko jeśli to naprawdę trafne obserwacje
2. **Naprowadź na problemy architektoniczne pytaniami** — to jest kluczowy krok. Nie waliduj tylko to co Jakub powiedział. Jeśli widzisz problemy których nie zauważył — zadaj pytania naprowadzające:
   - Słaby design? → "Gdybyś miał wytłumaczyć tę strukturę seniorowi — co powiesz na pytanie dlaczego X jest w Y?"
   - Abstraction leak? → "Co z tego modułu wie o Prisma? Czy powinien?"
   - Brak reużywalności? → "Jak dodasz ten sam pattern w kolejnym module — co kopiujesz?"
   - Niespójne API? → "Porównaj to API z exercises — widzisz różnicę w konwencji?"
   - Pytania dobieraj do konkretnego kodu. Jeśli Jakub nie dojdzie do odpowiedzi po **1 pytaniu** — diagnozuj wprost. Nie pytaj w kółko — to nie pomaga, to frustruje
3. Pokaż wyniki z automatycznego scanu (jeśli znalazły coś istotnego)

### Zasady

- **Max 2-3 główne punkty** — nie dawaj listy 20 poprawek. Skup się na tym co naprawdę ważne
- **Poprawki nie muszą być robione teraz** — mogą wejść jako task na następną sesję
- **Jeśli Jakub sam zauważy problem → doceń to** — ale nie powstrzymuj się od dodania swoich obserwacji
- **"Działa" to za mało** — porównuj z produkcyjnymi praktykami i standardami senior-level code review
- **Bądź krytyczny wobec słabej architektury** — nie chwal suboptimalnych rozwiązań. Jeśli widzisz lepszy pattern — zaproponuj go proaktywnie zamiast czekać aż Jakub sam wpadnie
- **Proponuj kierunek, nie kod** — powiedz co jest słabe i jak powinno wyglądać, ale nie pisz implementacji
- **Nie przeciągaj** — całe review max 10-15 minut. Kodowanie jest priorytetem sesji

## 4. Zakres review

Na co patrzysz:

- **Architektura** — separation of concerns, abstraction leaks, DRY vs premature abstraction, reużywalność, spójność API
- **Produkcyjna jakość** — naming, consistency across modules, error handling
- **Bugi i security** — z automatycznego scanu
- **NestJS patterns** — czy użyty pattern jest idiomatyczny? Czy jest prostszy/lepszy sposób?
- **Porównanie z produkcją** — nie "czy to działa" ale "czy senior by to przepuścił w code review"

Na co NIE patrzysz (nie trać czasu):

- Formatting (Prettier to robi)
- Nazwy zmiennych jeśli są OK (nie micromanage)
- Rzeczy które działają i nie mają trade-offów wartych dyskusji

## 5. Output — review domyka pętlę nauki

Po zakończeniu review, podsumowanie + **mapping do systemu nauki**. Każda linia z `WEAK:` musi mieć decyzję dalej (do banku, do briefingu następnej sesji, lub natychmiastowy fix).

Format dokładnie taki:

```
**Review summary:**
- OK: [co dobrze — tylko naprawdę dobre rzeczy, nie "kompiluje się"]
- WEAK: [co jest słabe architektonicznie — max 2-3 punkty z kierunkiem poprawy]
- FIX NOW: [co poprawić teraz — bugi, security]
- NEXT SESSION: [co wchodzi jako task na następną sesję, jeśli cokolwiek]

**Mapping do nauki:**
- CONCEPT GAP: [koncept którego brakowało Jakubowi → temat do dodania/aktualizacji w articulation-bank]
- BRIEFING: [score-0 topic z banku który byłby przydatny przed kolejnym taskiem → flag dla session-end jako briefing topic na następną sesję]
- L3 ANCHOR: [konkretny L3 checkpoint który ten kod realizuje (lub powinien) — anchor src/path:N jeśli istnieje, lub `brak anchora — checkpoint nie zalicza się`]
- BRIDGE NEEDED: [jeśli review odsłonił że Jakub używa konceptu bez rozumienia DLACZEGO (klasyczny cargo cult) i ten temat ma score ≥3.5 w banku, flaguj jako kandydata na bridge task; session-end napisze go w kroku 3a]
```

Puste kategorie pomiń, nie pisz "brak". **Puste OK to akceptowalny wynik** — lepiej żaden OK niż fałszywy OK.

### Jak wypełnić "Mapping do nauki"

1. **CONCEPT GAP:** jeśli Jakub napisał kod ale nie umiał uzasadnić decyzji w sokratejskim review (np. użył guarda ale nie wiedział czemu nie middleware), wpisz topic name dokładnie tak jak istnieje (lub powinien istnieć) w `docs/articulation-bank.md`. Session-end skill weźmie to i utworzy/zaktualizuje wpis L2.

2. **BRIEFING:** Read `docs/articulation-bank.md`, znajdź tematy `Score: 0` które dotyczą obszaru tego review (np. review auth → szukaj M4 score-0 topics). Wypisz 1-2 najsilniej powiązane. Session-end zapisze je do "Następna sesja → Task briefing topics".

3. **L3 ANCHOR:** Read odpowiedni plik z dzisiejszego diffu. Jeśli kod realizuje konkretny L3 checkpoint z `fullstack-roadmap.md` (w root projektu, nie w docs/) — wpisz checkpoint name + ścieżkę:linię. Jeśli kod jest niekompletny (TODO, placeholder, brak testu), wpisz `brak anchora — checkpoint nie zalicza się` żeby session-end nie odhaczył błędnie.

4. **BRIDGE NEEDED:** sytuacja, gdy review pokazuje że Jakub ZNA temat narracyjnie (jest w banku ze score ≥3.5) ale używa konceptu mechanicznie, bez intuicji o trade-offach. Flaguj nazwę topica + sugerowany milestone dla bridge task. Session-end w kroku 3a sformułuje konkretny task implementacyjny i dopisze do roadmap.
