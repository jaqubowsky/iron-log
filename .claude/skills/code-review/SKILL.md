---
name: code-review
description: Przeprowadza code review kodu napisanego na sesji — automatyczny scan (bugi, security) + sokratejski review architektoniczny. Używaj gdy Jakub mówi "review", "sprawdź kod", "gotowe sprawdź", "code review", "przejrzyj", "zrobiłem sprawdź", "gotowe", "skończyłem", "zrobione", albo gdy skończył task i chce feedback. Nawet jeśli nie powie wprost "review" — jeśli sygnalizuje że skończył kodowanie, odpal ten skill.
---

# Code Review Protocol

Jakub skończył task — czas na review. Review ma dwa wymiary: automatyczny scan i sokratejska dyskusja. Oba są ważne, ale kolejność ma znaczenie — Jakub najpierw sam myśli o swoim kodzie, dopiero potem dostaje wyniki scanu.

## 1. Zidentyfikuj co się zmieniło

Sprawdź co Jakub napisał/zmienił na tej sesji:

```bash
git diff --name-only
git diff --stat
```

Jeśli nie ma uncommitted changes, sprawdź ostatnie commity z dzisiejszej daty. Przeczytaj zmienione pliki.

## 2. Automatyczny scan (w tle)

Uruchom agenta `feature-dev:code-reviewer` do przeskanowania zmienionego kodu. Agent szuka:

- Bugów i błędów logicznych
- Problemów bezpieczeństwa (SQL injection, brak walidacji, DoS vectors)
- Niespójności z resztą codebase

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

**Krok 3 — uzupełnij + pokaż wyniki scanu:**

Po odpowiedzi Jakuba:

1. Doceń co sam zauważył
2. Uzupełnij co pominął — max 2-3 najważniejsze rzeczy
3. Pokaż wyniki z automatycznego scanu (jeśli znalazł coś istotnego)

### Zasady

- **Max 2-3 główne punkty** — nie dawaj listy 20 poprawek. Skup się na tym co naprawdę ważne
- **Poprawki nie muszą być robione teraz** — mogą wejść jako task na następną sesję
- **Jeśli Jakub sam zauważy problem → to lepsze niż gdybyś mu powiedział** — doceń to explicite
- **Porównuj z produkcyjnymi praktykami** — nie "jak jest poprawnie" ale "jakie są trade-offy"
- **Nie przeciągaj** — całe review max 10-15 minut. Kodowanie jest priorytetem sesji

## 4. Zakres review

Na co patrzysz:

- **Architektura** — separation of concerns, co gdzie wydzielić, DRY vs premature abstraction
- **Produkcyjna jakość** — naming, consistency across modules, error handling
- **Bugi i security** — z automatycznego scanu
- **NestJS patterns** — czy użyty pattern jest idiomatyczny? Czy jest prostszy sposób?
- **Trade-offy** — nie "to jest źle" ale "to działa, ale rozważ X bo Y"

Na co NIE patrzysz (nie trać czasu):

- Formatting (Prettier to robi)
- Nazwy zmiennych jeśli są OK (nie micromanage)
- Rzeczy które działają i nie mają trade-offów wartych dyskusji

## 5. Output

Po zakończeniu review, krótkie podsumowanie:

```
**Review summary:**
- ✅ [co dobrze]
- 🔧 [co poprawić — max 2-3 punkty]
- 📋 [co wchodzi jako task na następną sesję, jeśli cokolwiek]
```

