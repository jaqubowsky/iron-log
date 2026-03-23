# Tematy rekrutacyjne — Mid+ Fullstack (Next.js + NestJS)

Zebrane z perspektywy realnych rozmów. Do zmapowania na roadmapę.

## Next.js — frontend + SSR

- **Rendering i App Router** — Server Component vs Client Component (trade-offy), streaming z Suspense, generateStaticParams vs dynamiczne renderowanie, cache layers (request memoization, data cache, full route cache), cache invalidation
- **Middleware** — Edge Runtime ograniczenia, auth w middleware vs layout vs API route
- **Performance** — LCP/CLS optymalizacja, lazy loading (dynamic() z ssr: false), bundle analysis (@next/bundle-analyzer), partial prerendering

## NestJS — backend

- **Architektura** — DI container scope (DEFAULT vs REQUEST vs TRANSIENT), request lifecycle (middleware → guards → interceptors → pipes → handler → interceptors), kiedy który
- **Auth** — JWT z Passport, refresh token rotation, RBAC guards
- **Baza danych** — TypeORM vs Prisma vs MikroORM (trade-offy), migrations, transactions, N+1 queries, eager/lazy loading
- **Microservices** — transport layers (TCP, RabbitMQ, Kafka), event-based communication, CQRS (mid+ coraz częściej)

## TypeScript — przekrojowe

- Generyki (napisz utility type), discriminated unions, type narrowing
- infer keyword, type vs interface (głębiej), satisfies operator
- Result/Either pattern do error handlingu

## System design

- System notyfikacji real-time (WebSockets vs SSE vs polling, kolejkowanie, persystencja)
- Auth flow z social login, JWT, refresh tokens — front do bazy
- Formularz wielokrokowy z walidacją server-side (server actions vs API route, zod, optimistic updates)
- File upload z progress barem (presigned URLs, chunked upload, S3)

## Node.js fundamentals

- Event loop — jak działa, fazy, microtasks vs macrotasks
- Dlaczego single-threaded ale non-blocking, kiedy worker threads
- Streams — kiedy i po co

## HTTP / REST / API design

- Kody statusów — kiedy 201 vs 200, 401 vs 403, 404 vs 410
- Idempotentność metod (GET, PUT, DELETE idempotentne, POST nie)
- REST vs GraphQL — trade-offy
- Wersjonowanie API, rate limiting

## Security

- OWASP top 10 — XSS, SQL injection, CSRF (co to, jak się bronić)
- CORS — co to, dlaczego istnieje, jak konfigurować
- Helmet, rate limiting, sanityzacja inputu

## Testing

- Unit vs integration vs e2e — trade-offy, co na którym poziomie
- Mocking strategies — kiedy mock, kiedy real dependency
- Test pyramid, co daje najlepszy ROI na mid+ projekcie

## Docker / CI-CD

- Dockerfile, multi-stage build (dlaczego)
- docker-compose — orkiestracja lokalnie
- Basic CI pipeline — lint, test, build, deploy

## Git

- Rebase vs merge — trade-offy, kiedy który
- Rozwiązywanie konfliktów
- Branching strategy (trunk-based vs gitflow)

## Behawioralne / doświadczenie

- Najtrudniejszy bug — konkretne szczegóły
- Decyzje architektoniczne w projekcie
- Code review — co sprawdzasz, jak dajesz feedback
- Onboarding w nowym projekcie — systematyczne podejście
