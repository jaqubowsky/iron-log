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
| 2026-03-27 | postgres | Tabela orders z 1M rekordów, lista ładuje się 5 sek — jak diagnozujesz i naprawiasz? | 3.5   | EXPLAIN ANALYZE + indeks + paginacja + mniejszy payload — trafne. Pominął: cache (Redis/HTTP), N+1 problem, connection pooling |
| 2026-03-27 | postgres | GET /workout-logs/:id trwa 200ms — jak diagnozujesz? | 3.5   | EXPLAIN ANALYZE, N+1, payload, indeksy — sam wyeliminował PK=automatyczny indeks. Pominął: connection pooling, middleware overhead |
| 2026-03-28 | rest     | GET /exercises 500 items — mobile vs web potrzebują różnych pól, jak rozwiązujesz w REST? | 3.5   | Sparse fields (?fields=) i osobne endpointy — trafne z trade-offami. Pominął: GraphQL jako alternatywa, DTO/serializacja jako mechanizm |
| 2026-03-28 | nest     | Po co repository pattern? Kiedy overengineering? | 3     | Separacja bazy, overengineering w prostych appkach — trafne. Pominął: testowalność (mockowanie repo), "ORM to już abstrakcja", jednostronna odpowiedź (koszty bez zysków) |
