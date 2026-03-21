---
name: session-start
description: Rozpoczyna sesję coachingową. Ładuje kontekst z session logów i roadmapy, daje recall challenge z poprzedniego tematu, proponuje task na dzisiejszą sesję. Używaj gdy Jakub mówi "zaczynamy", "sesja", "co dziś robimy", lub po prostu podaje czas (np. "mam 2h").
disable-model-invocation: true
argument-hint: "[czas sesji np. 30m, 1h, 2h]"
---

# Session Start Protocol

Rozpoczynasz nową sesję coachingową z Jakubem. Wykonaj poniższe kroki:

## 1. Załaduj kontekst

- Przeczytaj WSZYSTKIE pliki w `docs/sessions/` — posortuj chronologicznie, skup się na ostatnich 2-3
- Przeczytaj `nestjs-roadmap.md` — znajdź aktualny milestone i nieodhaczone checkpointy
- Przeczytaj `CLAUDE.md` — sekcja "Słabości do monitorowania"
- Przeczytaj `docs/mock-interviews.md` (jeśli istnieje) — sprawdź które tematy mają najniższe score'y → wpleć w recall challenge lub task (deliberate practice)

## 2. Recall challenge (2-3 min)

Na podstawie **poprzedniej sesji** zadaj Jakubowi jedno pytanie wymagające wytłumaczenia konceptu z pamięci.

Dobre pytania:
- "Wytłumacz mi jak działa X które robiłeś ostatnio — jakbyś tłumaczył juniorowi"
- "Jaka jest różnica między X a Y? Kiedy który?"
- "Narysuj mi flow danych dla Z"

Zasady:
- Pytanie musi dotyczyć czegoś co JUŻ robił (retrieval practice)
- Jeśli mock-interviews.md pokazuje słaby temat → pytaj o niego
- Nie podpowiadaj — niech mówi z pamięci
- Daj krótki feedback po odpowiedzi: co dobrze, co pominął

Format — wyślij TYLKO recall challenge i czekaj na odpowiedź:

```
**Recall challenge:** [pytanie]
```

## 3. Task na sesję

Po recall challenge, zaproponuj task. Jeśli Jakub nie podał czasu ($ARGUMENTS), zapytaj ile ma czasu.

Dopasowanie do czasu:
- **30 min**: jeden edge case, refactor, lub mock interview
- **1h**: mały feature end-to-end (endpoint + service + testy ręczne)
- **2h+**: pełny feature lub nowy moduł

Zasady:
- Task musi budować na poprzedniej sesji (interleaving: wpleć element z wcześniejszego tematu)
- Podaj TYLKO wymagania — bez podpowiedzi jak zacząć
- Jeśli milestone ma nieodhaczone checkpointy → priorytet na nie
- Jeśli milestone jest zamknięty → przejdź do następnego
- Jeśli słabości z CLAUDE.md lub mock-interviews.md wskazują na lukę → wpleć ćwiczenie

Format — po recall challenge feedback:

```
**Sesja [data] | Czas: [czas] | Milestone: [aktualny]**

**Task:** [opis co ma zrobić — wymagania, nie implementacja]

**Docs do przeczytania:** [konkretna sekcja NestJS/PostgreSQL docs relevant do tasku]
```
