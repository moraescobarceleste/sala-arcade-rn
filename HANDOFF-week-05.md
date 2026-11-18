# HANDOFF Semana 05: Axios y TanStack Query v5

> Documento autocontenido. Leer junto a `HANDOFF-week-04.md`.

## 1. Contexto

- **Proyecto:** Sala Arcade (React Native, Expo SDK 57, TypeScript). Dominio: machines, tokens, players, maintenance.
- **Repo:** https://github.com/moraescobarceleste/sala-arcade-rn
- **Ramas:** `main` (README), `week-01` a `week-05`, encadenadas (no se fusionan a `main`).
- **Reglas:** paso a paso, pnpm con versiones exactas, conventional commits, un handoff por semana. Alias `@/` apunta a `src/`.
- **Entorno:** igual que `HANDOFF-week-04.md` (Expo Go SDK 57, pnpm 10.34.8, push con `-c credential.helper=`).

## 2. Dependencias nuevas (versión exacta)

```
axios (ver package.json)
@tanstack/react-query 5.x (ver package.json)
```

## 3. Cambios de la semana

```
src/api/client.ts          Axios con adaptador propio que simula una API REST (600 ms de retraso, 404)
src/api/machines.ts        fetchMachines y fetchMachine
src/api/queryClient.ts     QueryClient (retry 1, staleTime 60 s)
src/hooks/useMachines.ts   useMachines, useMachine y machineKeys
App.tsx                    QueryClientProvider
src/screens/*              Home, Favorites y Detail leen de TanStack Query
```

## 4. Decisiones

- Estado del servidor (máquinas) en TanStack Query; estado del cliente (favoritos, saldo) en Zustand.
- La API es simulada con un adaptador de Axios, para funcionar en Expo Go sin servidor. Cambiar a una API real solo exige quitar el `adapter` y definir `baseURL`.
- Home maneja carga, error con reintento y recarga por arrastre.

## 5. Checklist

- [x] Axios y TanStack Query v5 con versiones exactas
- [x] Funciones de API tipadas
- [x] Hooks con claves de query
- [x] Estados de carga y error
- [ ] Verificado en el celular (completar tras probar)

## 6. Siguiente: Semana 06 (formularios con React Hook Form y Zod)

```
git checkout -b week-06 week-05
```
