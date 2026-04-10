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
| 2026-04-10 | nest     | Po co repository pattern? Kiedy overengineering? (recall) | 3.5   | Testowalność + swappable + koszt typów — progres od 3/5. Nadal pominął: "ORM jest już abstrakcją" jako kontrargument |
| 2026-03-31 | rest     | POST /workout-logs, user klika Zapisz 3x — co się stanie, jak zapobiegasz? | 3.5   | Front blokada + idempotency key + Redis lookup — trafne. Pominął: nazwa "idempotency key", co serwer zwraca przy duplikacie (200+wynik vs error), TTL klucza |
| 2026-04-04 | node     | POST /workout-logs przetwarza 50MB CSV, 30 sek blokuje serwer — przyczyna i naprawa? | 3     | Streams + chunking + single-threaded event loop — trafne po promptu. Brakowało: queue (BullMQ) jako async offloading, 202 Accepted pattern |
| 2026-04-10 | postgres | INNER vs LEFT JOIN — kiedy który, co zwraca gdy brak dopasowania? (recall) | 3.5   | Mechanizm poprawny, NULL po promptie. Brakuje: "NULL w kolumnach prawej tabeli" bez scaffoldingu |
| 2026-04-10 | postgres | ACID — wytłumacz każdą literę z przykładem (recall) | 3.5   | A/I/D samodzielnie. C wymagało scenariusza — bez promptu nie podał constraints jako mechanizmu |
| 2026-04-10 | postgres | Kiedy użyć transakcji? Co to isolation level i po co? (recall) | 3.5   | 4 levele + trade-off performance/correctness + READ COMMITTED dla IRONLOG. Brakuje: anomaly names (dirty/phantom read) |
| 2026-04-10 | postgres | Optimistic vs pessimistic locking — kiedy który, implementacja? (recall) | 4     | Koncept + trade-off + 409 Conflict. Brakuje: version field w Prisma, SELECT FOR UPDATE dla pessimistic |
| 2026-04-10 | postgres | 1NF, 2NF, 3NF — wytłumacz i podaj przykład kiedy denormalizować (recall) | 4     | 2NF z IRONLOG composite key, denormalizacja snapshot+performance. 1NF mglista, kierunek zip_code odwrócony |
| 2026-04-10 | rest     | Co się dzieje gdy wpiszesz URL w przeglądarce — DNS → TCP → TLS → HTTP → response (recall) | 3.5   | Szkielet poprawny, man-in-the-middle dla TLS. Po promptach: headers, Content-Type. Brakuje: DNS cache hierarchy, HTTP/2 |
| 2026-03-31 | rest     | Cache-Control headers — max-age, no-cache, no-store, stale-while-revalidate | 0     | Nie testowane formalnie — tylko sesja teorii |
| 2026-03-31 | rest     | ETag vs Last-Modified — kiedy który, jak działają conditional requests (304)? | 0     | Nie testowane formalnie — tylko sesja teorii |
| 2026-03-31 | rest     | API versioning — URL vs header vs query param, trade-offy, CDN | 0     | Nie testowane formalnie — tylko sesja teorii |
| 2026-04-04 | auth     | JWT access + refresh token flow — co gdy token wycieknie, jak działa rotacja? | 0     | Nie testowane formalnie — tylko sesja teorii |
