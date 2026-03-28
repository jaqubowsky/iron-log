# Raw SQL Under the Hood
Date: 2026-03-28
Language: en

## Final version

I used Prisma for 2 years without writing a single SQL query.

So I started writing raw SQL. CREATE TABLE, INSERT, JOINs. Wanted to see what my ORM actually generates.

👉 Think of it like jumping straight to React without learning JavaScript. You can ship stuff, sure. But when something breaks you're staring at code you don't really understand.

👉 I wrote CREATE TABLE from memory, then opened a Prisma migration file. Same foreign keys, same constraints, same ON DELETE CASCADE. It was all there before, I just never read it.

👉 Once I saw how tables actually relate, I stopped duplicating data that should've been a foreign key. Turns out there's a name for that, normalization.

Feels weird to slow down when everyone's speeding up with AI. But I'd rather know what my ORM generates than hope it's right.

#SQL #Prisma #PostgreSQL #BackendDevelopment

## Draft v1

I've been using Prisma for a while and never really thought about what happens underneath.

So I started writing raw SQL from scratch. CREATE TABLE, INSERT, JOINs. Wanted to see what my ORM actually generates.

It's like jumping straight to React without learning JavaScript first. It works, until it doesn't and you have no idea why.

When I wrote DELETE on a workout log and watched CASCADE wipe the related exercises and sets automatically, it clicked. That's not Prisma magic, that's just how PostgreSQL works. My ORM was doing it all along, I just never understood what.

Normalization changed how I design tables too. Instead of guessing what goes where, there are actual rules behind it. My schema decisions got way more intentional.

Not saying everyone should drop their ORM and write raw SQL. But spending a few days on fundamentals made me way more confident in what Prisma does for me.

## Topic source

Session logs 2026-03-27 (sesja 1 i 2): CREATE TABLE z pamięci, porównanie z migracjami Prisma, normalizacja, INNER vs LEFT JOIN. Jakub's IRONLOG coaching sessions — raw SQL practice.
