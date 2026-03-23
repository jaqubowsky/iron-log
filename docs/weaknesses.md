# Słabości do monitorowania

Aktualizowany po każdej sesji przez `/session-end`.

- **Metody tablicowe JS (KRYTYCZNA)** — filter, map, find, some, every, reduce. Poprawia się — na sesji 2026-03-23 napisał map z destrukturyzacją sam. Nadal wymaga codziennego ćwiczenia.
- **SQL fundamenty** — nie znał CREATE TABLE, ALTER TABLE, constraints przed sesją 2026-03-22. Nauczył się czytając migrację Prisma ale potrzebuje dużo więcej praktyki z raw SQL. Mock interview 2.5/5 na SQL vs app-level transformation.
- **Zapamiętywanie uzasadnień (NOWA)** — podejmuje decyzje architektoniczne ale nie pamięta DLACZEGO tak zdecydował. Na explain phase nie umiał powiedzieć dlaczego Response DTO a nie map w service. Na rozmowie "nie pamiętam" to red flag.
- **Prokrastynacja przez eksplorację (NOWA)** — czyta docs, pyta o cudze repo, chce nowe tematy — zamiast kodować. 25 min bez linijki kodu na sesji 2026-03-23. Potrzebuje jasnego "stop, koduj".
- **Generici TS** (K extends keyof T, T[K]) — rozumie po wyjaśnieniu, nie pisze sam
- **Rozkładanie problemu** — potrzebuje naprowadzania "zacznij od X". Poprawia się — na sesji 2026-03-22 sam wypracował architekturę N:N w dyskusji sokratejskiej.
- **Promise/async flow** — rozumie koncept, gubi się w implementacji
- **Tłumaczenie konceptów słownie** — poprawia się ale niestabilnie. Explain 3.5/5 na sesji 2026-03-23 (pomylił Class Validator z Transformer, nie pamiętał uzasadnienia). Mock interview 2.5/5.
- **System design od zera** — nie umie zacząć od pustej kartki. Co 3-4 sesje: mini design challenge (20 min)
- **Zgadywanie zamiast testowania** — poprawia się. Dwie sesje z rzędu sam testuje HTTP callami.
- **Error messages z perspektywy klienta** — pisze technicznie zamiast user-friendly. Pytaj: "co frontend dev zrozumie z tego errora?"
