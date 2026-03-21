# Ściąga: Nest vs Next.js

| Koncept | Co robi | Analogia z Next.js |
|---|---|---|
| Module | Grupuje powiązane rzeczy | Folder w app/ |
| Controller | Obsługuje HTTP requesty | Route handler / API route |
| Service/Provider | Logika biznesowa | Server actions / utility functions |
| DTO | Shape + walidacja inputu | Zod schema |
| Guard | Sprawdza uprawnienia | Middleware (ale z execution context) |
| Interceptor | Cross-cutting concerns | Middleware (ale granularny, before + after) |
| Pipe | Transformuje/waliduje dane | Zod parse |
| Filter | Obsługuje exceptions | Error boundary / error.tsx |
