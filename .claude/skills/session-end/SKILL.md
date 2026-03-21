---
name: session-end
description: Zamyka sesję coachingową. Prowadzi explain phase, opcjonalnie mock interview, daje feedback, zapisuje session log i aktualizuje roadmapę. Używaj gdy Jakub mówi "kończymy", "koniec sesji", "zamykamy", lub gdy czas sesji się kończy.
disable-model-invocation: true
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

Przeczytaj `docs/sessions/` żeby porównać z poprzednimi sesjami, potem stwórz wpis w formacie z CLAUDE.md (sekcja "Session logi").

Plik: `docs/sessions/YYYY-MM-DD.md`
- Jeśli plik z dzisiejszą datą już istnieje → dopisz nową sesję na końcu pliku (z nagłówkiem np. "# Sesja 2 — YYYY-MM-DD")
- Jeśli nie istnieje → stwórz nowy

Wypełnij WSZYSTKIE sekcje:
- Recall challenge (z `/session-start` — jeśli było)
- Co robił
- Samodzielność (1-5)
- Explain phase (z kroku 1 powyżej)
- Mock interview (jeśli było)
- Co poszło dobrze / źle
- Słabości — update (porównaj z poprzednimi sesjami)
- Faza coachingu + aktualny milestone
- Następna sesja

## 5. Aktualizacja roadmapy

Sprawdź czy jakieś checkpointy z `nestjs-roadmap.md` zostały spełnione na tej sesji → odhacz je.

## 6. Aktualizacja mock-interviews.md

Jeśli było mock interview → dopisz wiersz do `docs/mock-interviews.md` (stwórz plik z headerem tabeli jeśli nie istnieje).

## 7. Praca domowa

Na koniec powiedz Jakubowi:
- Co przeczytać z docs przed następną sesją (konkretny link/sekcja)
- Nad czym pomyśleć (pytanie do przemyślenia z roadmapy aktualnego milestone'a)
