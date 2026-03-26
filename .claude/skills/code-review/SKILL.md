---
name: code-review
description: Przeprowadza code review kodu napisanego na sesji — automatyczny scan (bugi, security, architektura) + sokratejski review + szczera ocena architektoniczna. Używaj gdy Jakub mówi "review", "sprawdź kod", "gotowe sprawdź", "code review", "przejrzyj", "zrobiłem sprawdź", "gotowe", "skończyłem", "zrobione", albo gdy skończył task i chce feedback. Nawet jeśli nie powie wprost "review" — jeśli sygnalizuje że skończył kodowanie, odpal ten skill.
---

# Code Review Protocol

Jakub skończył task — czas na review. Review ma trzy wymiary: automatyczny scan, sokratejska dyskusja i **szczera ocena architektoniczna**. Kolejność ma znaczenie — Jakub najpierw sam myśli o swoim kodzie, dopiero potem dostaje wyniki scanu i ocenę coacha.

## Fundamentalna zasada: bądź szczery, nie miły

Celem review jest nauczyć Jakuba produkcyjnej jakości kodu — nie sprawić żeby poczuł się dobrze z kodem który działa ale jest słaby. Jeśli widzisz suboptymalne rozwiązanie architektoniczne, powiedz to wprost. Nie mów "wygląda OK" jeśli widzisz lepsze podejście.

Konkretnie:
- Kod kompiluje się i działa ale ma słabą separację odpowiedzialności? → Naprowadź pytaniem, np. "co się stanie gdy dodasz trzeci moduł z tym samym patternem?" albo "który moduł jest właścicielem tej logiki?"
- Widzisz duplikację logiki, abstraction leak, brak reużywalności? → Naprowadź pytaniem, np. "wyobraź sobie że zmieniasz ORM — ile plików ruszasz?" albo "gdzie jeszcze widzisz ten sam pattern?"
- Jakub zrobił coś poprawnie ale nie optymalnie? → Naprowadź pytaniem, np. "jakie widzisz wady tego podejścia?" albo "jak byś to wytłumaczył seniorowi na review?"

Nie pisz za niego kodu i nie mów wprost co jest źle. **Naprowadzaj pytaniami** — o konsekwencje, scenariusze, porównania, uzasadnienia, cokolwiek co wymusi myślenie. Forma dowolna, cel jeden: Jakub sam dochodzi do wniosku. Wyjątek: trywialne problemy (literówka, brak dekoratora) gdzie pytanie byłoby sztuczne — tam powiedz wprost.

## 1. Zidentyfikuj co się zmieniło

Sprawdź co Jakub napisał/zmienił na tej sesji:

```bash
git diff --name-only
git diff --stat
```

Jeśli nie ma uncommitted changes, sprawdź ostatnie commity z dzisiejszej daty. Przeczytaj zmienione pliki.

## 2. Automatyczny scan (w tle)

Uruchom **równolegle** dwóch agentów:

1. `feature-dev:code-reviewer` — szuka bugów, błędów logicznych, problemów bezpieczeństwa (SQL injection, brak walidacji, DoS vectors), niespójności z resztą codebase. **Dodatkowo:** flaguj kod który kompiluje się i działa ale jest źle zaprojektowany — abstraction leaks, złe separation of concerns, duplikacja logiki, niska reużywalność, niespójna abstrakcja między modułami.
2. `superpowers:code-reviewer` — sprawdza zgodność z planem sesji, coding standards projektu, architektoniczne decyzje vs roadmapa. **Dodatkowo:** porównaj architekturę z produkcyjnymi standardami — czy senior w code review przepuściłby ten kod? Jeśli nie, co by zaproponował?

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
   - Pytania dobieraj do konkretnego kodu. Jeśli Jakub nie dojdzie do odpowiedzi po 2 pytaniach — wtedy powiedz wprost
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

## 5. Output

Po zakończeniu review, krótkie podsumowanie. Użyj DOKŁADNIE tego formatu z emoji — nie zamieniaj na myślniki ani bullet pointy:

```
**Review summary:**
- ✅ [co dobrze — tylko naprawdę dobre rzeczy, nie "kompiluje się"]
- ⚠️ [co jest słabe architektonicznie — max 2-3 punkty z kierunkiem poprawy]
- 🔧 [co poprawić teraz — bugi, security]
- 📋 [co wchodzi jako task na następną sesję, jeśli cokolwiek]
```

Każda linia zaczyna się od odpowiedniego emoji. Puste kategorie (np. brak bugów) — pomiń, nie pisz "brak".
