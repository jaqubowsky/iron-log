# Artykulacja — tracker

Tematy które Jakub zna z doświadczenia ale musi umieć **płynnie wytłumaczyć** na rozmowie. Karty Anki stworzone. Odhaczaj gdy mock interview / recall challenge score 4-5/5.

Pytania mają dwa poziomy:
- **Definicja** — "co to X?" (1 zdanie, płynnie)
- **Zastosowanie** — "pokaż bug / kiedy to zły wybór / zaprojektuj z użyciem X" (głębsze zrozumienie)

## JavaScript

- [ ] Co to closure — definicja + przykład buga (stale closure w React hooks)
- [ ] `this` binding — arrow vs regular + "co się stanie w tym kodzie?" (snippet)
- [ ] Promise.all vs Promise.allSettled vs Promise.race — kiedy który + "masz 5 fetch, 1 failuje, co użyjesz?"
- [ ] async/await — error handling (try/catch vs .catch) + kiedy sequential vs parallel
- [ ] Co to callback + dlaczego Promise jest lepszy
- [ ] Co to Promise — definicja + czym różni się od synchronicznego kodu

## TypeScript

- [ ] Generyki — definicja + napisz utility type (DeepPartial, Pick z warunkiem)
- [ ] `any` vs `unknown` vs `never` — kiedy który + dlaczego `unknown` jest bezpieczniejszy
- [ ] `type` vs `interface` — deep differences + kiedy wybierasz który w projekcie
- [ ] Discriminated unions + type narrowing — definicja + praktyczny przykład (API response: success | error)
- [ ] Dlaczego unikać `enum` — co generuje w runtime + kiedy `as const` lepszy
- [ ] Co to TypeScript — dlaczego nad JS, co łapie czego JS nie łapie
- [ ] Co to type assertion (`as`) — kiedy OK, kiedy niebezpieczne

## React

- [ ] Reconciliation + virtual DOM — po co istnieje + co się dzieje gdy setState
- [ ] React.memo / useMemo / useCallback — pokaż kiedy memo SZKODZI (props zawsze nowe)
- [ ] Error Boundaries — co łapią, czego nie + "jak złapiesz error w event handler?"
- [ ] Controlled vs uncontrolled — kiedy który + "formularz z 20 polami, który podejście?"
- [ ] Rules of hooks — dlaczego nie warunkowo + co się stanie jak złamiesz
- [ ] Co to hook, state, context — definicja każdego + jak się łączą
- [ ] useRef — kiedy zamiast state + "zmierz szerokość elementu DOM"
- [ ] Prop drilling — problem + 3 sposoby rozwiązania (context, composition, store)
- [ ] useEffect cleanup — kiedy się odpala + "memory leak z setInterval bez cleanup"
- [ ] useMemo vs useCallback — różnica + kiedy naprawdę potrzebujesz

## Next.js

- [ ] Server vs Client Components — kiedy który + "user klika button i filtruje listę, narysuj data flow"
- [ ] App Router cache — 4 warstwy: Request Memoization, Data Cache, Full Route Cache, Router Cache — wytłumacz każdą osobno
- [ ] Streaming z Suspense — dlaczego lepsze UX + co się dzieje pod spodem (chunked HTML)
- [ ] ISR vs SSR vs SSG — kiedy który + "blog z 10k postów, jak renderujesz?"
- [ ] Parallel Routes + Intercepting Routes — "jak zbudujesz modal z własnym URL?"
- [ ] Route Handlers vs Server Actions — kiedy który + dlaczego Server Actions bezpieczniejsze (CSRF)
- [ ] Next.js Middleware — Edge Runtime ograniczenia + "dlaczego nie możesz użyć Prisma?"
- [ ] Co to hydration — definicja + "co się stanie jak HTML z serwera nie zgadza się z React tree?"
- [ ] "use client" — co naprawdę robi + "czy komponent nadal renderuje się na serwerze?"
- [ ] SSR vs CSR — trade-offy + kiedy CSR jest OK
- [ ] Co to Next.js — jaki problem rozwiązuje vs plain React

## Data fetching + State management

- [ ] React Query vs Server Components vs route handler — kiedy który + "real-time dashboard, co wybierasz?"
- [ ] Waterfall problem — co to + jak unikać (parallel fetch, Suspense boundaries)
- [ ] Context vs external store (Zustand/Jotai) vs server state (React Query) — trade-offy + kiedy context to ZŁY wybór
- [ ] Security: server actions vs API routes — CSRF + "dlaczego API route jest publiczna a Server Action nie?"
