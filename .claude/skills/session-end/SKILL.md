---
name: session-end
description: Zamyka sesję coachingową — explain phase, feedback, session log, aktualizacja roadmapy i słabości. ZAWSZE używaj gdy Jakub kończy pracę: "kończymy", "koniec", "zamykamy", "tyle na dziś", "muszę lecieć", "ostatnie 5 min", albo gdy czas sesji się kończy. Nawet jeśli nie powie wprost "koniec sesji" — jeśli sygnalizuje że kończy, odpal ten skill.
---

# Session End Protocol

Zamykasz sesję coachingową z Jakubem. Wykonaj poniższe kroki w kolejności:

## 1. Explain phase (5 min)

Symuluj code review — Jakub daje krótki overview, Ty wyciągasz pytania o decyzje i alternatywy.

### Flow

1. **Poproś o overview:** "Opowiedz w 2-3 zdaniach co zrobiłeś i jakie kluczowe decyzje podjąłeś"
2. **Czekaj na odpowiedź** — nie przerywaj, nie podpowiadaj
3. **Zadaj 3-4 celowane pytania** o decyzje, trade-offy i alternatywy na podstawie tego co powiedział i tego co widziałeś na sesji. Np. "dlaczego SET NULL a nie CASCADE?", "jakie inne opcje rozważałeś?"
4. **Czekaj na odpowiedź na KAŻDE pytanie** — nie zasypuj pytaniami, nie przechodź do mock interview dopóki Jakub nie odpowie
5. **Daj feedback** po odpowiedziach: co dobrze, co pominął

### Zasady

- NIE wymuszaj monologu o 40 plikach — przy dużych taskach to nierealne i nie symuluje prawdziwej rozmowy
- Pytania dopasuj do tego co Jakub faktycznie robił — nie generyczne
- Oceń (1-5): 1=nie umie wytłumaczyć, 3=zna koncept ale brakuje detali, 5=wytłumaczyłby na rozmowie

## 2. Mock interview (5 min)

Mock interview jest **obowiązkowy co sesję**. Nie pytaj "chcesz pytanie?" — po prostu zadaj je. **Dopiero PO zakończeniu explain phase** — nie łącz obu w jedną wiadomość.

- Przeprowadź mock interview zgodnie z protokołem z `.claude/skills/mock-interview/SKILL.md` (przeczytaj go)
- Pytanie powiązane z tym co właśnie kodował LUB losowe z wcześniejszych tematów (element zaskoczenia)
- Zanotuj wyniki

## 3. Feedback + session log

Daj Jakubowi szczery ustny feedback (co dobrze, co źle, jedna rzecz do poprawy). Potem zapisz session log — feedback trafia bezpośrednio do sekcji "Co poszło dobrze" i "Co poszło źle" w logu.

**Sprawdź czy istnieje plik z notatkami na bieżąco** (`docs/sessions/YYYY-MM-DD.md` z sekcją "Notatki na bieżąco" — tworzony przez session-start). Jeśli tak — przeczytaj je jako dodatkowy kontekst. Bazą do session logu jest cała konwersacja + poprzednie session logi — notatki na bieżąco to pomoc, nie zamiennik.

Przeczytaj `docs/sessions/` żeby porównać z poprzednimi sesjami, potem rozbuduj istniejący wpis (lub stwórz nowy jeśli nie istnieje).

Plik: `docs/sessions/YYYY-MM-DD.md`

- Jeśli plik z dzisiejszą datą już istnieje → dopisz nową sesję na końcu pliku (z nagłówkiem np. "# Sesja 2 — YYYY-MM-DD")
- Jeśli nie istnieje → stwórz nowy

### Format session logu

```markdown
# Sesja YYYY-MM-DD

## Recall challenge

[Pytanie + skąd (spacing: z sesji X / mock interview Y) + jak odpowiedział (1-5). Co pamiętał, co pominął]

## Mini-recall (jeśli były)

[Jakie pytania padły w trakcie kodowania, czy odpowiedział poprawnie]

## Co robił

[1-2 zdania: jaki task, co zaimplementował]

## Planowanie architektoniczne

[Jak wypadło planowanie? Czy sam doszedł do planu? Jakie pytania sokratejskie były potrzebne? Co pominął?]

## Code review (jeśli był /code-review)

[Kluczowe findings: co Jakub sam zauważył, co pominął, wyniki automatycznego scanu]

## Samodzielność (1-5)

[Ocena: 1=pisałem za niego, 2=mocno naprowadzałem, 3=naprowadzałem pytaniami, 4=sam z minimalną pomocą, 5=sam od A do Z]

## Explain phase

[Jak wytłumaczył co zrobił? Czy umiał uzasadnić decyzje? Co pominął? Score (1-5)]

## Mock interview

[Pytanie, score (1-5), krótki feedback — co trafił, co pominął]

## Co poszło dobrze

[Konkretne momenty samodzielnego myślenia, dobre decyzje]

## Co poszło źle

[Gdzie się zaciął, błędy w myśleniu, ghostwriting attempts]

## Słabości — update

[Czy któraś słabość się poprawiła? Czy nowa się pojawiła?]

## Faza coachingu

[Aktualna faza (Faza 1=M1-3, Faza 2=M4-6, Faza 3=M7-9) i czy jest gotowy na przejście do następnej. Milestone: aktualny (M1-M9)]

## Następna sesja

[Co powinien zrobić następnym razem + prereq-y/materiały do nauki. MUSI być zgodne z priorytetami roadmapy, patrz zasady poniżej]
```

### Zasady logowania

- Bądź szczery — log ma pokazywać realny progres, nie pocieszać
- Samodzielność 3+ to dobry wynik na początku
- Porównuj z poprzednimi sesjami — "tydzień temu potrzebował pomocy z X, dziś zrobił sam"
- Jeśli samodzielność spada — zanotuj dlaczego i co zmienić
- Po 4+ sesjach z oceną 4-5 → zasugeruj przejście do następnej fazy

## 4. Aktualizacja roadmapy + articulation tracker

Przeczytaj `fullstack-roadmap.md` i `docs/articulation-tracker.md`. Dla roadmapy:

1. **Odhacz checkpointy** — ale TYLKO jeśli spełniają kryterium retencji (patrz zasady poniżej)
2. **Aktualizuj status każdego milestone'a** — patrz sekcja "Status milestone'a" poniżej
3. **Wykrywaj luki** — jeśli podczas sesji wyszło że Jakub nie zna czegoś fundamentalnego co powinno być w roadmapie (np. brakujący temat SQL, brakujący koncept backendowy), dodaj to do odpowiedniego milestone'a
4. **Dodawaj nowe pytania do przemyślenia** — jeśli sesja ujawniła ciekawy trade-off lub problem architektoniczny wart zapisania
5. **Przenoś tematy** — jeśli temat okazał się trudniejszy niż zakładano, przenieś do wcześniejszego milestone'a żeby dać więcej czasu

### Aktualizacja tagów przy checkpointach

Każdy nieodhaczony checkpoint ma tag inline — aktualizuj go po każdej sesji:

| Tag | Znaczenie | Kiedy zmienić |
|---|---|---|
| `🔴 zero` | Nigdy nie był na sesji | Zmień na `⏳ retencja X/5 — data` gdy temat był przerabiany na tej sesji |
| `⏳ retencja X/5 — data` | Był na sesji, czeka na recall | Zaktualizuj score i datę gdy testowany na recall/mock. Zmień na `[x]` gdy recall 3+/5 NA KOLEJNEJ sesji (nie tej samej co nauka) |
| `[x]` | Odhaczony | — |

**Po aktualizacji tagów — zaktualizuj milestone header:**
- Jakiś `🔴 zero`? → `🔴 BLOKUJE`
- Brak `🔴 zero`, nie wszystko `[x]`? → `⏳ retencja`
- Wszystko `[x]`? → `✅`

Zasady:

- Nie usuwaj istniejących checkpointów — tylko odhaczaj lub dodawaj nowe
- Nowe tematy dodawaj z tagiem `🔴 zero` i uzasadnieniem (np. "— wyszło na sesji 2026-03-22 że brakuje fundamentów")
- Jeśli milestone się za bardzo rozrósł → zaproponuj podział na 2 mniejsze
- **Milestones M1-M9:** M1=CRUD ✅, M2=SQL, M3=HTTP+NestJS features, M4=Auth+Security, M5=Node.js runtime, M6=NestJS deeper+SOLID, M7=Docker+Deploy+Testy+Logging+Next.js front, M8=Caching+Queues+Advanced SQL, M9=System Design+Advanced

### Kryterium odhaczania checkpointów

**NIE odhaczaj checkpointu po pierwszym kontakcie z tematem.** Checkpoint typu "potrafię wytłumaczyć X na rozmowie" oznacza: potrafię z pamięci, bez zacinania, po kilku dniach — nie "zrozumiałem 2 godziny temu".

Flow odhaczania:

1. Jakub poznaje temat na sesji → **NIE odhaczaj**
2. Generujesz fiszki Anki z tego tematu (krok 6)
3. Na KOLEJNEJ sesji recall challenge weryfikuje retencję
4. Jeśli recall challenge zdany (3+/5) → **TERAZ odhacz**

Jedyny wyjątek: checkpointy czysto praktyczne ("X działa", "kod jest napisany") — te można odhaczać od razu, bo to fakty a nie wiedza do zweryfikowania.

**Articulation tracker** (`docs/articulation-tracker.md`): jeśli na mock interview lub recall challenge Jakub zdał pytanie z JS/TS/React/Next.js na 3+/5 — odhacz odpowiedni checkbox w articulation tracker.

## 5. Aktualizacja mock-interviews.md

Dopisz wiersz do `docs/mock-interviews.md` (stwórz plik z headerem tabeli jeśli nie istnieje). Mock interview jest obowiązkowy co sesję — zawsze będzie co zalogować.

## 6. Fiszki Anki

Wygeneruj fiszki z tej sesji zgodnie z zasadami skilla `/create-anki` (przeczytaj `~/.claude/skills/create-anki/SKILL.md`). Zapisz je do `~/Anki/programming.tsv` (dopisz na końcu) i pokaż Jakubowi podgląd w markdown.

Oprócz standardowych fiszek, dodaj min. 1-2 **connection cards** — fiszki łączące koncepty z różnych tematów:

- "Jak NestJS DI łączy się z Dependency Inversion Principle z SOLID?"
- "Czym Guard w NestJS jest przykładem Strategy Pattern?"
- "Jak HTTP Cache-Control headers współgrają z Redis cache-aside?"

Connection cards budują sieć wiedzy zamiast izolowanych faktów — to sprawia że wiedza jest trwalsza i łatwiejsza do przywołania na rozmowie.

## 7. Rekomendacja na następną sesję

Ta sekcja to **rekomendacja z uzasadnieniem** — NIE sztywny plan. Session-start na następnej sesji podejmie finalną decyzję na bazie pełnego kontekstu (roadmapa, trendy z wielu sesji, mock scores, stan retencji). Twoim zadaniem jest przekazać mu najważniejsze obserwacje z tej sesji.

### Co session-end wie czego session-start nie wie

Session-end ma gorący kontekst z sesji: co Jakub robił, gdzie się zacinał, jakie słabości się ujawniły, co wyszło na review. Te obserwacje są cenniejsze niż sztywna lista tasków — przekaż je jako input do decyzji.

### Format sekcji "Następna sesja" w session logu

```markdown
## Następna sesja

### Rekomendacja głównego taska
[Który checkpoint z roadmapy powinien być następny i DLACZEGO — uzasadnij na bazie: co Jakub właśnie skończył, jaki jest naturalny następny krok w milestone, jakie fundamenty ma już opanowane. Podaj konkretny checkpoint z roadmapy]

### Obserwacje z sesji (input dla session-start)
- **Słabości do zaadresowania:** [co się ujawniło — np. "myli many-to-many z one-to-many", "nie umie wyjaśnić ACID bez notatek"]
- **Poprawki z review:** [konkretna lista drobnych fixów — jeśli brak, pomiń. Zaznacz które blokują dalszą pracę a które są kosmetyczne]
- **Co poszło dobrze:** [co Jakub opanował — session-start może to pominąć w recall i skupić się na słabościach]

### Retencja (tematy do weryfikacji)
[max 2-3 nieodhaczone checkpointy typu "potrafię wytłumaczyć X" — z aktualnym score'em jeśli był testowany]

### Materiały do nauki przed sesją
- **Docs:** [konkretna sekcja docs relevant do rekomendowanego taska]
- **Pytanie do przemyślenia:** [jedno pytanie architektoniczne]
```

### Zasady pisania rekomendacji

- **Uzasadniaj, nie nakazuj** — "Rekomendacja: testy HTTP, bo Jakub skończył CRUD + cross-module i nie testował jeszcze żadnego endpointu" jest lepsze niż "Następny task: testy HTTP"
- **Poprawki z review** — drobne (naming, orderBy, response format) wrzuć do obserwacji. Poważne (zmiana modelu transakcji) zaznacz jako bloker jeśli blokują dalszą pracę
- **Retencja = max 2-3 tematy** — testowane TYLKO przez recall challenge i mock interview (30 sek pytania). Reszta retencji idzie do Anki
- **Tematy wiszące 3+ sesji bez postępu** — sprawdź session logi. Jeśli temat jest w "Retencja" od 3+ sesji i nie był zaadresowany → zanotuj to w obserwacjach (session-start zdecyduje: dedykowana sesja, usunięcie, lub Anki)
- **Backlog retencji > 5 nieodhaczonych tematów?** — zanotuj to wyraźnie w obserwacjach. Session-start rozważy sesję mock interview zamiast kodowania
- **NIE wrzucaj tematu tylko dlatego że Jakub powiedział że jest "ciekawy"** — jeśli temat nie pasuje do aktualnego milestone, zanotuj go w roadmapie, nie w rekomendacji
