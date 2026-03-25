---
name: session-end
description: Zamyka sesję coachingową — explain phase, feedback, session log, aktualizacja roadmapy i słabości. ZAWSZE używaj gdy Jakub kończy pracę: "kończymy", "koniec", "zamykamy", "tyle na dziś", "muszę lecieć", "ostatnie 5 min", albo gdy czas sesji się kończy. Nawet jeśli nie powie wprost "koniec sesji" — jeśli sygnalizuje że kończy, odpal ten skill.
---

# Session End Protocol

Zamykasz sesję coachingową z Jakubem. Wykonaj poniższe kroki w kolejności:

## 1. Explain phase (5 min)

Poproś Jakuba żeby wytłumaczył co zrobił na dzisiejszej sesji — jakby tłumaczył rekruterowi lub innemu devowi.

Zasady:

- "Wytłumacz mi co zrobiłeś dziś i dlaczego tak a nie inaczej"
- Nie podpowiadaj — niech mówi z pamięci
- Pytaj follow-upy: "a dlaczego nie X?", "co by się stało gdyby...?"
- Oceń (1-5): 1=nie umie wytłumaczyć, 3=zna koncept ale brakuje detali, 5=wytłumaczyłby na rozmowie

## 2. Mock interview (5 min)

Mock interview jest **obowiązkowy co sesję**. Nie pytaj "chcesz pytanie?" — po prostu zadaj je.

- Przeprowadź mock interview zgodnie z protokołem z `.claude/skills/mock-interview/SKILL.md` (przeczytaj go)
- Pytanie powiązane z tym co właśnie kodował LUB losowe z wcześniejszych tematów (element zaskoczenia)
- Zanotuj wyniki

## 3. Feedback + session log

Daj Jakubowi szczery ustny feedback (co dobrze, co źle, jedna rzecz do poprawy). Potem zapisz session log — feedback trafia bezpośrednio do sekcji "Co poszło dobrze" i "Co poszło źle" w logu.

Przeczytaj `docs/sessions/` żeby porównać z poprzednimi sesjami, potem stwórz wpis.

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

[Aktualna faza (1/2/3) i czy jest gotowy na przejście do następnej. Milestone: aktualny (M1-M9)]

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
2. **Wykrywaj luki** — jeśli podczas sesji wyszło że Jakub nie zna czegoś fundamentalnego co powinno być w roadmapie (np. brakujący temat SQL, brakujący koncept backendowy), dodaj to do odpowiedniego milestone'a
3. **Dodawaj nowe pytania do przemyślenia** — jeśli sesja ujawniła ciekawy trade-off lub problem architektoniczny wart zapisania
4. **Przenoś tematy** — jeśli temat okazał się trudniejszy niż zakładano, przenieś do wcześniejszego milestone'a żeby dać więcej czasu

Zasady:

- Nie usuwaj istniejących checkpointów — tylko odhaczaj lub dodawaj nowe
- Nowe tematy dodawaj z krótkim uzasadnieniem w komentarzu (np. "— wyszło na sesji 2026-03-22 że brakuje fundamentów")
- Jeśli milestone się za bardzo rozrósł → zaproponuj podział na 2 mniejsze
- **Milestones M1-M9:** M1=CRUD ✅, M2=SQL, M3=HTTP+NestJS features, M4=Auth+Security, M5=Node.js runtime, M6=NestJS deeper+SOLID, M7=Docker+Deploy+Testy+Logging+Next.js front, M8=Caching+Queues+Advanced SQL, M9=System Design+Advanced

### Kryterium odhaczania checkpointów

**NIE odhaczaj checkpointu po pierwszym kontakcie z tematem.** Checkpoint typu "potrafię wytłumaczyć X na rozmowie" oznacza: potrafię z pamięci, bez zacinania, po kilku dniach — nie "zrozumiałem 2 godziny temu".

Flow odhaczania:
1. Jakub poznaje temat na sesji → **NIE odhaczaj**
2. Generujesz fiszki Anki z tego tematu (krok 6)
3. Na KOLEJNEJ sesji recall challenge weryfikuje retencję
4. Jeśli recall challenge zdany (4-5/5) → **TERAZ odhacz**

Jedyny wyjątek: checkpointy czysto praktyczne ("X działa", "kod jest napisany") — te można odhaczać od razu, bo to fakty a nie wiedza do zweryfikowania.

**Articulation tracker** (`docs/articulation-tracker.md`): jeśli na mock interview lub recall challenge Jakub zdał pytanie z JS/TS/React/Next.js na 4-5/5 — odhacz odpowiedni checkbox w articulation tracker.

## 5. Aktualizacja mock-interviews.md

Dopisz wiersz do `docs/mock-interviews.md` (stwórz plik z headerem tabeli jeśli nie istnieje). Mock interview jest obowiązkowy co sesję — zawsze będzie co zalogować.

## 6. Fiszki Anki

Wygeneruj fiszki z tej sesji zgodnie z zasadami skilla `/create-anki` (przeczytaj `~/.claude/skills/create-anki/SKILL.md`). Zapisz je do `~/Anki/programming.tsv` (dopisz na końcu) i pokaż Jakubowi podgląd w markdown.

Oprócz standardowych fiszek, dodaj min. 1-2 **connection cards** — fiszki łączące koncepty z różnych tematów:
- "Jak NestJS DI łączy się z Dependency Inversion Principle z SOLID?"
- "Czym Guard w NestJS jest przykładem Strategy Pattern?"
- "Jak HTTP Cache-Control headers współgrają z Redis cache-aside?"

Connection cards budują sieć wiedzy zamiast izolowanych faktów — to sprawia że wiedza jest trwalsza i łatwiejsza do przywołania na rozmowie.

## 7. Planowanie następnej sesji

**KRYTYCZNE:** Następna sesja MUSI być zgodna z priorytetami roadmapy. NIE wrzucaj tematu jako następną sesję tylko dlatego, że Jakub powiedział że jest "ciekawy". Sprawdź:

1. **Roadmapa ma priorytet** — przeczytaj `fullstack-roadmap.md`, znajdź nieodhaczone checkpointy w aktualnym milestone (i wcześniejszych jeśli mają status ⏳ retencja).
2. **Ciekawe tematy ≠ pilne tematy** — jeśli Jakub wspomniał o czymś interesującym ale aktualny milestone ma niezrobione fundamenty — zanotuj temat w roadmapie, NIE wrzucaj na następną sesję.
3. **Fundamenty przed features** — jeśli Jakub nie umie czegoś podstawowego, to ma priorytet.

### Format sekcji "Następna sesja" w session logu

Sekcja musi być **kompletna i jednoznaczna** — session-start na kolejnej sesji czyta TYLKO tę sekcję + roadmapę. Nie ma kontekstu z tej konwersacji.

```markdown
## Następna sesja

**Kodowanie (główny task):** [konkretny task z aktualnego milestone — co zbudować, jakie wymagania]

**Retencja do wplenienia:** [nieodhaczone checkpointy z wcześniejszych milestones do weryfikacji przez recall challenge / mock interview — wylistuj konkretne tematy]

**Nieprzerobione tematy do wplenienia:** [tematy z wcześniejszych milestones które NIE były na żadnej sesji — jeśli pasują do kontekstu taska, wpleć jako explain-concept lub sidebar]

**Docs do przeczytania:** [konkretna sekcja NestJS/PostgreSQL docs relevant do taska]

**Nad czym pomyśleć:** [pytanie do przemyślenia przed sesją]
```

### Zasady

- **"Kodowanie"** = jeden konkretny task z milestone checkpointów. Nie "rób co chcesz z M3"
- **"Retencja"** = tematy przerobione ale nieodhaczone. Coach testuje przez recall/mock. Jeśli 4-5/5 → odhaczamy
- **"Nieprzerobione"** = tematy z [ ] checkpointów które nigdy nie były omawiane. Coach szuka okazji do wplecenia (np. temat normalizacji wchodzi naturalnie przy projektowaniu nowej tabeli)
- Jeśli jest prereq do następnego taska → dodaj materiały do nauki PRZED sesją
