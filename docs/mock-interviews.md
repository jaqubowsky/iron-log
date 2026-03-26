# Mock Interview Log

| Data       | Temat    | Pytanie                                          | Score | Słabe punkty                          |
| ---------- | -------- | ------------------------------------------------ | ----- | ------------------------------------- |
| 2026-03-21 | nest     | Dlaczego logika w Service a nie Controller?       | 4     | —                                     |
| 2026-03-22 | postgres | Foreign key constraint — co to, po co, ON DELETE? | 3     | Nie znał SET NULL i SET DEFAULT       |
| 2026-03-23 | postgres | SQL-level vs app-level data transformation — trade-offy? | 2.5   | Nie wymienił performance bez naprowadzenia |
| 2026-03-24 | postgres | Composite PK vs osobne auto-increment ID w tabeli łączącej — trade-offy? | 3.5   | Techniczną stronę (indeksy) wymienił dopiero po hincie, nie wspomniał o prostszych JOINach |
| 2026-03-25 | postgres | Filtrowanie + cursor vs offset pagination — różnice w implementacji? | 3     | Pominął że cursor nie wymaga totalCount (prostsze filtrowanie), nie wspomniał o synchronizacji where w offset |
| 2026-03-25 | nest     | Service zależny od zewnętrznego API — jak zarchitekturyzować? | 4     | Pominął error handling (retry, circuit breaker) i mapowanie danych z zewnętrznego kształtu |
| 2026-03-26 | nest     | Cross-module communication — WorkoutsService sprawdza exercises, jakie opcje architektoniczne? | 3     | Tylko 1 opcja (import modułu), brak alternatyw (FK constraint, event-based, shared service), nie opisał mechanizmu exports/imports, brak circular dependency awareness |
| 2026-03-26 | nest     | Moduł A potrzebuje danych z modułu B — jakie 3+ opcje architektoniczne z trade-offami? | 3     | DI/import od razu, event-based po hincie. Coach błędnie naliczył FK constraint jako trzecią opcję (FK to walidacja, nie dostęp do danych). Nadal brakuje samodzielnego myślenia o alternatywach |
