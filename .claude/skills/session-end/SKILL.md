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

## 2. Mock interview (opcjonalnie)

Zapytaj Jakuba: "Chcesz mock interview pytanie na koniec?"

- Jeśli tak → przeprowadź mock interview zgodnie z protokołem z `.claude/skills/mock-interview/SKILL.md` (przeczytaj go). Zanotuj wyniki.
- Jeśli nie lub brak czasu → pomiń

## 3. Feedback

Daj szczery feedback z sesji:

- **Co dobrze** — konkretne momenty samodzielnego myślenia
- **Co źle** — gdzie się zaciął, błędy w myśleniu
- **Jedna rzecz do poprawy** — najważniejsza na następną sesję

## 4. Session log

Przeczytaj `docs/sessions/` żeby porównać z poprzednimi sesjami, potem stwórz wpis.

Plik: `docs/sessions/YYYY-MM-DD.md`

- Jeśli plik z dzisiejszą datą już istnieje → dopisz nową sesję na końcu pliku (z nagłówkiem np. "# Sesja 2 — YYYY-MM-DD")
- Jeśli nie istnieje → stwórz nowy

### Format session logu

```markdown
# Sesja YYYY-MM-DD

## Recall challenge

[Pytanie + jak odpowiedział (1-5). Co pamiętał, co pominął]

## Co robił

[1-2 zdania: jaki task, co zaimplementował]

## Samodzielność (1-5)

[Ocena: 1=pisałem za niego, 2=mocno naprowadzałem, 3=naprowadzałem pytaniami, 4=sam z minimalną pomocą, 5=sam od A do Z]

## Explain phase

[Jak wytłumaczył co zrobił? Czy umiał uzasadnić decyzje? Co pominął?]

## Mock interview (opcjonalnie)

[Pytanie, score (1-5), krótki feedback]

## Co poszło dobrze

[Konkretne momenty samodzielnego myślenia, dobre decyzje]

## Co poszło źle

[Gdzie się zaciął, błędy w myśleniu, ghostwriting attempts]

## Słabości — update

[Czy któraś słabość się poprawiła? Czy nowa się pojawiła?]

## Faza coachingu

[Aktualna faza (1/2/3) i czy jest gotowy na przejście do następnej. Milestone: aktualny]

## Następna sesja

[Co powinien zrobić następnym razem — MUSI być zgodne z priorytetami roadmapy, patrz zasady poniżej]
```

### Zasady logowania

- Bądź szczery — log ma pokazywać realny progres, nie pocieszać
- Samodzielność 3+ to dobry wynik na początku
- Porównuj z poprzednimi sesjami — "tydzień temu potrzebował pomocy z X, dziś zrobił sam"
- Jeśli samodzielność spada — zanotuj dlaczego i co zmienić
- Po 4+ sesjach z oceną 4-5 → zasugeruj przejście do następnej fazy

## 5. Aktualizacja słabości

Przeczytaj `docs/weaknesses.md` i zaktualizuj:

- Czy któraś słabość się poprawiła na tej sesji? → zanotuj progres
- Czy nowa się pojawiła? → dodaj
- Czy któraś jest już nieaktualna? → usuń

## 6. Aktualizacja roadmapy

Przeczytaj `nestjs-roadmap.md` i:

1. **Odhacz checkpointy** — jeśli jakieś zostały spełnione na tej sesji
2. **Wykrywaj luki** — jeśli podczas sesji wyszło że Jakub nie zna czegoś fundamentalnego co powinno być w roadmapie (np. brakujący temat SQL, brakujący koncept backendowy), dodaj to do odpowiedniego milestone'a
3. **Dodawaj nowe pytania do przemyślenia** — jeśli sesja ujawniła ciekawy trade-off lub problem architektoniczny wart zapisania
4. **Przenoś tematy** — jeśli temat okazał się trudniejszy niż zakładano, przenieś do wcześniejszego milestone'a żeby dać więcej czasu

Zasady:

- Nie usuwaj istniejących checkpointów — tylko odhaczaj lub dodawaj nowe
- Nowe tematy dodawaj z krótkim uzasadnieniem w komentarzu (np. "— wyszło na sesji 2026-03-22 że brakuje fundamentów")
- Jeśli milestone się za bardzo rozrósł → zaproponuj podział na 2 mniejsze

## 7. Aktualizacja mock-interviews.md

Jeśli było mock interview → dopisz wiersz do `docs/mock-interviews.md` (stwórz plik z headerem tabeli jeśli nie istnieje).

## 8. Fiszki Anki

Wygeneruj fiszki z tej sesji zgodnie z zasadami skilla `/create-anki` (przeczytaj `~/.claude/skills/create-anki/SKILL.md`). Zapisz je do `~/Anki/programming.tsv` (dopisz na końcu) i pokaż Jakubowi podgląd w markdown.

## 9. Planowanie następnej sesji — ZASADY PRIORYTETYZACJI

**KRYTYCZNE:** Następna sesja MUSI być zgodna z priorytetami roadmapy. NIE wrzucaj tematu jako następną sesję tylko dlatego, że Jakub powiedział że jest "ciekawy". Sprawdź:

1. **Roadmapa ma priorytet** — przeczytaj `nestjs-roadmap.md`, znajdź nieodhaczone checkpointy w aktualnym milestone. Jeśli Jakub zaproponował temat który logicznie wpasuje się w kolejność roadmapy (np. jest prereq-em do następnego checkpointu lub naturalnie łączy się z aktualnym milestone) — można go wrzucić. Ale jeśli temat jest z innego milestone'a i przeskakuje fundamenty — nie wrzucaj go.
2. **Ciekawe tematy ≠ pilne tematy** — jeśli Jakub wspomniał o czymś interesującym (np. envelope pattern, caching, nowy feature) ale aktualny milestone ma niezrobione fundamenty — zanotuj temat w roadmapie we właściwym milestone, NIE wrzucaj na następną sesję.
3. **Fundamenty przed features** — jeśli Jakub nie umie czegoś podstawowego (np. raw SQL, ACID), to ma priorytet nad nowymi feature'ami.

## 10. Praca domowa — ZASADY PREREQ-ÓW

**KRYTYCZNE:** Jeśli następna sesja wymaga wiedzy której Jakub jeszcze nie ma (np. SQL, nowy koncept NestJS), praca domowa MUSI zawierać materiały do nauki ZANIM sesja się zacznie. Nie wrzucaj taska "napisz raw SQL" jeśli Jakub nigdy nie uczył się SQL.

Praca domowa zawiera:

- **Materiały do nauki** (jeśli prereq-y) — konkretny tutorial, docs, lub kurs do przerobienia PRZED sesją. Np. "Przejdź SQLBolt (sqlbolt.com) — lekcje 1-6 (SELECT, WHERE, JOIN)" zamiast "napisz SELECT z JOIN"
- **Co przeczytać z docs** — konkretny link/sekcja NestJS/PostgreSQL docs relevant do następnego taska
- **Nad czym pomyśleć** — pytanie do przemyślenia z roadmapy aktualnego milestone'a
