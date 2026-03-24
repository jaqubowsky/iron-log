# Słabości do monitorowania

Aktualizowany po każdej sesji przez `/session-end`.

- **Metody tablicowe JS (KRYTYCZNA)** — filter, map, find, some, every, reduce. Poprawia się — na sesji 2026-03-23 napisał map z destrukturyzacją sam. Nadal wymaga codziennego ćwiczenia. Nie ćwiczone na sesji 2026-03-24.
- **SQL fundamenty** — duży progres na sesji 2026-03-24: przeczytał migracje, napisał SELECT z dwoma JOINami, INSERT, UPDATE, DELETE w raw SQL. Ale nie pisałby CREATE TABLE z pamięci. Mock interview 3.5/5 (composite PK trade-offy). Nadal potrzebuje praktyki.
- **Zapamiętywanie uzasadnień** — poprawia się. Na sesji 2026-03-24 explain phase 4/5 — poprawnie uzasadnił Promise.all, @Type, updatedAt bez DEFAULT. Ale na start explain nie powiedział DLACZEGO te ćwiczenia (brak kontekstu).
- **Prokrastynacja przez eksplorację** — nadal obecna ale zmieniona forma. Sesja 2026-03-24: ~15 min oporu przed raw SQL ("po co", "extension", "otworzę schemę") zamiast robienia. Potrzebuje jasnego "stop, koduj".
- **Generici TS** (K extends keyof T, T[K]) — rozumie po wyjaśnieniu, nie pisze sam
- **Rozkładanie problemu** — potrzebuje naprowadzania "zacznij od X". Poprawia się — na sesji 2026-03-22 sam wypracował architekturę N:N w dyskusji sokratejskiej.
- **Promise/async flow** — poprawia się. Na sesji 2026-03-24 sam napisał Promise.all na count+findMany bez podpowiedzi.
- **Tłumaczenie konceptów słownie** — stabilny progres. Explain 4/5, mock 3.5/5 na sesji 2026-03-24. Biznesowe trade-offy mocne, techniczne wymagają hintów.
- **System design od zera** — nie umie zacząć od pustej kartki. Co 3-4 sesje: mini design challenge (20 min)
- **Zgadywanie zamiast testowania** — poprawia się. Trzy sesje z rzędu sam testuje HTTP callami.
- **Error messages z perspektywy klienta** — pisze technicznie zamiast user-friendly. Pytaj: "co frontend dev zrozumie z tego errora?"
- **TS typy vs runtime (NOWA)** — nie wiedział że TypeScript typy znikają w runtime i dlatego @Type() jest potrzebny. Zrozumiał po wyjaśnieniu, ale to fundamentalny gap w rozumieniu TS.
