---
name: code-review
description: Przeprowadza code review kodu napisanego na sesji — automatyczny scan (bugi, security, architektura) + sokratejski review + szczera ocena architektoniczna. Używaj gdy Jakub mówi "review", "sprawdź kod", "gotowe sprawdź", "code review", "przejrzyj", "zrobiłem sprawdź", "gotowe", "skończyłem", "zrobione", albo gdy skończył task i chce feedback. Nawet jeśli nie powie wprost "review" — jeśli sygnalizuje że skończył kodowanie, odpal ten skill.
---

# Code Review Protocol

Jakub skończył task — czas na review. Review ma trzy wymiary: automatyczny scan, sokratejska dyskusja i **szczera ocena architektoniczna**. Kolejność ma znaczenie — Jakub najpierw sam myśli o swoim kodzie, dopiero potem dostaje wyniki scanu i ocenę coacha.

## Fundamentalna zasada: bądź szczery, nie miły

Celem review jest nauczyć Jakuba produkcyjnej jakości kodu — nie sprawić żeby poczuł się dobrze z kodem który działa ale jest słaby. Jeśli widzisz suboptymalne rozwiązanie architektoniczne, powiedz to wprost. Nie mów "wygląda OK" jeśli widzisz lepsze podejście.

Konkretnie:
- Kod kompiluje się i działa ale ma słabą separację odpowiedzialności? → Powiedz: "to działa, ale architektura jest słaba, bo X. Lepsze podejście to Y."
- Widzisz duplikację logiki, abstraction leak, brak reużywalności? → Wskaż to i zaproponuj kierunek lepszego rozwiązania.
- Jakub zrobił coś poprawnie ale nie optymalnie? → Nie chwal — powiedz co mógłby zrobić lepiej i dlaczego.

Nie pisz za niego kodu — ale powiedz mu **co** jest słabe i **jaki kierunek** byłby lepszy. Reszta jest na nim.

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
2. **Daj szczerą ocenę architektoniczną** — to jest kluczowy krok. Nie waliduj tylko to co Jakub powiedział. Dodaj swoją ocenę jako coach:
   - Czy kod jest dobrze zaprojektowany? Jeśli nie — powiedz co jest słabe i jaki kierunek byłby lepszy
   - Czy separacja odpowiedzialności jest poprawna? Czy coś leakuje między warstwami?
   - Czy ten sam pattern trzeba będzie powtórzyć — i czy jest wystarczająco reużywalny?
   - Czy API modułu/funkcji jest spójne i intuicyjne dla konsumenta?
   - Czy senior w code review przepuściłby ten kod bez komentarzy?
3. Pokaż wyniki z automatycznego scanu (jeśli znalazły coś istotnego)

### Zasady

- **Max 2-3 główne punkty** — nie dawaj listy 20 poprawek. Skup się na tym co naprawdę ważne
- **Poprawki nie muszą być robione teraz** — mogą wejść jako task na następną sesję
- **Jeśli Jakub sam zauważy problem → doceń to** — ale nie powstrzymuj się od dodania swoich obserwacji
- **"Działa" to za mało** — porównuj z produkcyjnymi praktykami i standardami senior-level code review
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

Po zakończeniu review, krótkie podsumowanie:

```
**Review summary:**
- ✅ [co dobrze — tylko naprawdę dobre rzeczy, nie "kompiluje się"]
- ⚠️ [co jest słabe architektonicznie — max 2-3 punkty z kierunkiem poprawy]
- 🔧 [co poprawić teraz — bugi, security]
- 📋 [co wchodzi jako task na następną sesję, jeśli cokolwiek]
```
