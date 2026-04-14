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

### Success pattern: diagnoza wprost przy systemowym anti-patternie

**Przykład z sesji 2026-04-14 (validated by Jakub jako preferowany styl):** gdy Jakub próbował dodać `@IsHash('sha256')` na bcrypt hash w `CreateUserDTO`, problem nie był w walidatorze — był w warstwowaniu (class-validator na wewnętrznym kontrakcie zamiast na boundary). Zła reakcja: sokratejskie pytania "co sprawdza @IsHash?" "dlaczego to DTO ma dekoratory?" — to by ciągnęło w 3 wymianach. Dobra reakcja: **diagnoza wprost** — *"CreateUserDTO w ogóle nie powinien mieć dekoratorów class-validator. Spędziłeś 2 minuty myśląc jakim walidatorem sprawdzić hash — to jest objaw złego warstwowania, nie problem do rozwiązania. Validators belong at boundaries."*

Trigger do diagnozy wprost (nie pytaj): Jakub **spędza czas rozwiązując niewłaściwy problem** przez złą abstrakcję/warstwowanie. Symptom — zadaje pytania typu "jaki walidator", "jak sprawdzić", "gdzie dodać" gdy prawdziwą odpowiedzią jest "nie powinno tu być tego wcale". Sokratejska metoda wtedy nie działa — problemy fundamentalne nie są odkrywalne przez "co myślisz o X?" bo Jakub myśli o X, nie o meta-pytaniu "czy X w ogóle powinno istnieć?".

Format diagnozy wprost: **trzy elementy** — (1) nazwa problemu architektonicznego, (2) jeden crisp rationale z nazwą patternu lub zasadą ("validators belong at boundaries", "principle of least privilege", "TOCTOU"), (3) konkretny fix. Bez retorycznego "a zastanawiałeś się czy…" — Jakub potrzebuje diagnozy, nie ponownego testu jego myślenia.

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

Wyniki trzymaj na razie — nie pokazuj ich Jakubowi od razu. Najpierw sokratejska dyskusja. Gdy agenci wrócą, wejdź w fazę **synthesis/triage** (krok 2.5) ZANIM pokażesz cokolwiek Jakubowi.

## 2.5. Synthesis/triage — OBOWIĄZKOWA redukcja przed prezentacją

**Krytyczna zasada:** dwóch agentów zwraca 10-15 findings. **Nigdy nie dumpuj tego na Jakuba w całości**. Infodump = przytłoczenie = Jakub nie wie co naprawiać, w jakiej kolejności, czy w ogóle. To jest anti-pattern nauki.

Po zebraniu wyników od obu agentów, **zanim** wejdziesz w krok 3 sokratejski feedback, wykonaj syntezę:

### Algorytm triage

1. **Zbierz wszystkie findings** z dwóch agentów do jednej mentalnej listy
2. **Klasyfikuj każdy finding do jednego z 4 kubełków:**
   - **CRITICAL** (runtime crash, security hole, broken build, lost data) — ile jest? Powinno być 0-2. Jeśli >2 → to znaczy że task ma fundamentalny problem, nie że trzeba pokazać wszystko
   - **ARCHITECTURAL** (zły design warstwy, abstraction leak, systemowy anti-pattern) — wybierz **max 2** najgorsze. Reszta idzie do internal memo
   - **MINOR** (literówka, return type, naming, drobny inconsistency) — **wszystkie łączysz w jedną linię** "plus 5 drobiazgów na potem" — NIE wylewasz listy
   - **NOICE** (hallucinations, false positives, rzeczy które są OK) — wyrzuć
3. **Hard limit prezentacji dla Jakuba: 2 CRITICAL + 2 ARCHITECTURAL + 1 zbiorcza linia MINOR = max 5 elementów w konwersacji**
4. **Jeśli po triage masz >5 elementów** — wymuś drugą rundę redukcji: "które 3 są najważniejsze z punktu widzenia produkcji?". Reszta idzie do internal memo, NIE znika — ale nie trafia do konwersacji
5. **Mapping do nauki** (CONCEPT GAP / BRIEFING / L3 ANCHOR / BRIDGE NEEDED) generujesz **w tym kroku**, ale **NIE pokazujesz go Jakubowi** — to jest internal memo dla session-end. Patrz krok 5 (Output).

### Zasada fundamentalna triage

Jakub w trakcie code review potrzebuje odpowiedzi na **dwa pytania**:
1. **Co naprawiam TERAZ** (musi być jasne, uporządkowane, ≤3 rzeczy)
2. **Co mogę odłożyć na później** (jedna linia, bez detali)

**Nie potrzebuje** (w trakcie review — to dla session-end):
- Pełnej listy 13 findings
- Mappingu do banku nauki
- Concept gap taxonomy
- Bridge task kandydatów
- Score propozycji dla articulation bank

Jeśli czujesz pokusę pokazać "jeszcze jedno" — **zatrzymaj się**. Im więcej dumpujesz, tym mniej Jakub naprawi. Mniej = więcej skupienia = więcej nauki.

## 3. Sokratejski review (rozmowa z Jakubem)

Celem jest żeby Jakub **sam** zidentyfikował problemy w swoim kodzie. To buduje nawyk self-review, który przyda się w pracy.

### Flow

**Krok 1 — otwarte pytanie (direct introspection, TERAZ):**

```
Popatrz na kod który napisałeś — co Ci przeszkadza TERAZ? Co byś zmienił? Czy coś byś wydzielił?
```

Czekaj na odpowiedź. Nie podpowiadaj.

**Anti-patterny framingu** — NIE zadawaj pytań które zakładają stan którego Jakub nie ma:

- ❌ *"Co byś zmienił jutro ze świeżą głową?"* — zakłada perspektywę której nie ma teraz
- ❌ *"Co powiedziałby senior na code review?"* — abstrakcyjny obserwator, nie Jakub
- ❌ *"Co myślisz że pominąłeś?"* — naprowadzające, nie otwarte
- ❌ *"Gdybyś miał to napisać jeszcze raz…"* — hipotetyka, nie self-review
- ✅ *"Co Ci przeszkadza w tym kodzie TERAZ?"* — direct introspection
- ✅ *"Który element najmniej Ci się podoba?"* — wymusza ranking na istniejącym stanie
- ✅ *"Jeśli kolega by Ci zadał pytanie o ten plik — na czym by Cię złapał?"* — konkretny scenariusz, nie hipotetyka

Cel pytania: Jakub ma spojrzeć na **własny kod jaki jest**, nie fantazjować o alternatywnych wersjach siebie.

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

## 5. Output — dwa różne bloki, dwaj różni odbiorcy

Code review output ma **dwóch odbiorców** i **dwa różne formaty**. Nie mieszaj ich w jednej wiadomości do Jakuba.

### 5a. Blok DLA JAKUBA — conversational iteration (NIE infodump, NIE lista)

**Krytyczna zasada: review to rozmowa, nie raport.** Nawet skrócona lista 5 elementów to dalej infodump — Jakub dostaje kilka rzeczy naraz i nie wie co naprawiać, w jakiej kolejności, czy *dlaczego*. Infodump = nauka zeru, fix 5 rzeczy bez zrozumienia = cargo cult fixes.

**Prawidłowy flow: jeden bug na raz, mikro-rozmowa, fix, następny.** Każdy bug ma swoją iterację:

```
[Claude] → Krótkie podsumowanie (1 zdanie): "Review skończony. Znalazłem X critical, Y architectural, Z drobiazgów. Lecimy po kolei od najgorszego — zacznę od #1, omówimy, naprawisz, potem przejdziemy do #2."

[Claude] → Iteracja #1:
  1. **Co:** file:line — konkretny bug jednym zdaniem
  2. **Dlaczego to jest bug:** mechanizm + konsekwencja (co się stanie jak to odpalić? jaki request to łamie?)
  3. **Jak naprawić:** kierunek (NIE kod) — "zmień X na Y", "usuń linię Z", "dodaj pole W do konfigu"
  4. **Pytanie do Jakuba:** "Rozumiesz dlaczego?" ALBO "Jak byś to zrobił konkretnie?" (zależnie od poziomu subtelności)

[Jakub] → Odpowiada: potwierdza / pyta / nie rozumie / proponuje fix

[Claude] → Jeśli rozumie i ma plan → "OK, naprawiaj, daj znać gdy gotowe"
          Jeśli nie rozumie → dopytanie sokratejskie (max 1) lub diagnoza wprost (jeśli systemowe)
          Jeśli zły plan → naprowadź kierunkiem

[Jakub] → Naprawia, mówi "gotowe"

[Claude] → **Weryfikuj** (Read pliku — NIE ufaj "mówi że zrobił") → potwierdź lub popraw → "OK, next: #2..."

→ Iteracja #2 (ten sam pattern)
→ ...
→ Iteracja #N
```

**Reguły conversational flow:**

- **Jeden bug na raz** — NIGDY nie wylewaj listy. Nawet jak masz 3 CRITICAL, pokazujesz #1, czekasz na fix, dopiero potem #2.
- **Kolejność = blast radius DESC** — runtime crash > security > data loss > architectural > minor. Najgorsze najpierw, żeby Jakub nie utknął na kosmetyce i potem zabrakło czasu na critical.
- **Każdy bug MUSI mieć *dlaczego*** — nie "to jest bug" tylko "request #2 wywali się bo filter zamyka socket dwa razy". Bez mechanizmu Jakub robi fix bez zrozumienia = wraca za tydzień.
- **Weryfikacja po każdym fixie** — Read pliku, sprawdź że faktycznie naprawione. Słabość Jakuba "self-review nawyk" oznacza że "gotowe" ≠ gotowe. Ty weryfikujesz, nie on.
- **Minor drobiazgi (literówki, return types, inconsistencies)** — **NIE lecą w conversational flow**. Na końcu jedna wiadomość: "Plus X drobiazgów do zapamiętania — są w session logu, możesz zajrzeć po sesji. Nie zatrzymujemy się na nie teraz." Lista w session logu, konwersacja zostaje czysta.
- **Stop condition** — gdy wszystkie CRITICAL + ARCHITECTURAL zamknięte, podsumuj jednym zdaniem "review zamknięty, X fixów gotowych, Y drobiazgów w logu" i przejdź do `/session-end`.

### Wstępne framowanie — co mówisz PRZED pierwszą iteracją

Po synthesis (krok 2.5) zanim wejdziesz w #1, powiedz Jakubowi **co go czeka** w 2-3 zdaniach:

```
"Review skończony. Znalazłem [N] critical, [M] architectural, [K] drobiazgów.
Lecimy po kolei od najgorszego — zaczynam od #1, omówimy mechanizm, naprawisz,
potem #2, i tak dalej. Drobiazgi na końcu zostawimy w session logu, nie
zatrzymujemy się na nie. Gotów? Lecimy z #1."
```

To daje Jakubowi mapę procesu — wie że nie będzie to jednorazowy dump, wie że każdy fix ma mikro-rozmowę, wie że drobiazgi nie przytłoczą. Zmniejsza cognitive load przez przewidywalność.

### Anti-pattern: NIE rób tego

- ❌ **Lista "Review verdict / OK / FIX NOW / NEXT SESSION"** jako jedna wiadomość — to jest infodump w przebraniu struktury
- ❌ **"Oto 3 rzeczy do naprawy, wybierz od której chcesz zacząć"** — Jakub ma się uczyć, Ty wiesz który priorytet, prowadź
- ❌ **Pokazanie kolejnego buga zanim poprzedni potwierdzony jako fixed** — overwhelm
- ❌ **Skipowanie *dlaczego*** — "zmień 10 na 12" bez mechanizmu = cargo cult fix
- ❌ **Wierzenie że "gotowe"** — zawsze Read po fixie

### Na końcu — NEXT SESSION handoff (jedna wiadomość)

Po ostatniej iteracji, jedna wiadomość zamykająca:

```
"Review zamknięty. Naprawiłeś [N] rzeczy, rozumiesz dlaczego każda była bugiem.

Do session logu idzie:
- [K] minor drobiazgi (literówki, return types itp) — zajrzyj jak chcesz, nie zatrzymujemy się
- [M] follow-ups na następną sesję: [lista 1-2 najważniejszych, nie więcej]

Odpal /session-end gdy gotowy."
```

To jest jedyne miejsce gdzie wolno wypisać zbiorczo — bo to jest *handoff*, nie *learning moment*.

### 5b. Blok INTERNAL MEMO (dla session-end, NIE pokazywany Jakubowi)

Mapping do nauki generujesz **w głowie/notatkach** w kroku 2.5 synthesis. Zapisujesz go **bezpośrednio do session logu** pod sekcją "Code review — internal memo (for session-end)". Jakub może go przeczytać po sesji, ale NIE w trakcie code review.

Format:

```markdown
## Code review — internal memo (session-end input)

**Mapping do nauki:**
- CONCEPT GAP: [koncept którego brakowało Jakubowi → temat do dodania/aktualizacji w articulation-bank]
- BRIEFING: [score-0 topic z banku który byłby przydatny przed kolejnym taskiem → flag dla session-end jako briefing topic na następną sesję]
- L3 ANCHOR: [konkretny L3 checkpoint który ten kod realizuje (lub powinien) — anchor src/path:N jeśli istnieje, lub `brak anchora — checkpoint nie zalicza się`]
- BRIDGE NEEDED: [jeśli review odsłonił że Jakub używa konceptu bez rozumienia DLACZEGO (klasyczny cargo cult) i ten temat ma score ≥3.5 w banku, flaguj jako kandydata na bridge task; session-end napisze go w kroku 3a]

**Pełna lista findings (redukowana w synthesis):**
- CRITICAL: [wszystkie, które nie weszły do bloku Jakuba — z plik:linia]
- ARCHITECTURAL: [wszystkie z synthesis, nie tylko te które pokazałeś]
- MINOR: [wszystkie drobiazgi które złączyłeś w "plus X drobiazgów"]
```

Puste kategorie pomiń. Ten blok **MUSI** być zapisany (Edit/Write do session logu) nawet jeśli jest pusty — session-end go szuka w stałym miejscu.

### Jak wypełnić "Mapping do nauki"

1. **CONCEPT GAP:** jeśli Jakub napisał kod ale nie umiał uzasadnić decyzji w sokratejskim review (np. użył guarda ale nie wiedział czemu nie middleware), wpisz topic name dokładnie tak jak istnieje (lub powinien istnieć) w `docs/articulation-bank.md`. Session-end skill weźmie to i utworzy/zaktualizuje wpis L2.

2. **BRIEFING:** Read `docs/articulation-bank.md`, znajdź tematy `Score: 0` które dotyczą obszaru tego review (np. review auth → szukaj M4 score-0 topics). Wypisz 1-2 najsilniej powiązane. Session-end zapisze je do "Następna sesja → Task briefing topics".

3. **L3 ANCHOR:** Read odpowiedni plik z dzisiejszego diffu. Jeśli kod realizuje konkretny L3 checkpoint z `fullstack-roadmap.md` (w root projektu, nie w docs/) — wpisz checkpoint name + ścieżkę:linię. Jeśli kod jest niekompletny (TODO, placeholder, brak testu), wpisz `brak anchora — checkpoint nie zalicza się` żeby session-end nie odhaczył błędnie.

4. **BRIDGE NEEDED:** sytuacja, gdy review pokazuje że Jakub ZNA temat narracyjnie (jest w banku ze score ≥3.5) ale używa konceptu mechanicznie, bez intuicji o trade-offach. Flaguj nazwę topica + sugerowany milestone dla bridge task. Session-end w kroku 3a sformułuje konkretny task implementacyjny i dopisze do roadmap.
