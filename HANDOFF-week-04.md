# HANDOFF Semana 04: Zustand

> Documento autocontenido. Leer junto a `HANDOFF-week-03.md`.

## 1. Contexto

- **Proyecto:** Sala Arcade (React Native, Expo SDK 57, TypeScript). Dominio: machines, tokens, players, maintenance.
- **Repo:** https://github.com/moraescobarceleste/sala-arcade-rn
- **Ramas:** `main` (README), `week-01` a `week-04`, encadenadas (no se fusionan a `main`).
- **Reglas:** paso a paso, pnpm con versiones exactas, conventional commits (commitlint y husky), un handoff por semana.
- **Alias:** `@/` apunta a `src/`.

## 2. Entorno

- Expo Go debe ser el APK de SDK 57: https://expo.dev/go?sdkVersion=57&platform=android&device=true
- Node 22 o superior. pnpm 10.34.8 fijo (si hay otro pnpm, poner `$HOME\npm-global` al inicio del Path).
- Sin permisos de administrador: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.
- Push sin guardar credenciales: `git -c credential.helper= push -u origin week-04` con usuario `moraescobarceleste` y un token con permiso `repo`.
- En un equipo nuevo, configurar `git config user.name` y `user.email`.
- Hacer commit y push de todo

- Node 22 o superior. pnpm 10.34.8 fijo (si hay otro pnpm, poner `$HOME\npm-global` al inicio del Path).
- Sin permisos de administrador: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.
- Push sin guardar credenciales: `git -c credential.helper= push -u origin week-04` con usuario `moraescobarceleste` y un token con permiso `repo`.
- En un equipo nuevo, configurar `git config user.name` y `user.email`.
- Hacer commit y push de todo al final de cada sesión.

## 3. Dependencias nuevas (versión exacta)

```
zustand (ver package.json)
```

## 4. Cambios de la semana

```
src/store/useArcadeStore.ts     favoriteIds, tokenBalance (10 iniciales), toggleFavorite, spendTokens, addTokens
src/components/ItemCard.tsx     corazón de favorito; "Jugar" gasta fichas o avisa si no alcanzan
src/screens/FavoritesScreen.tsx muestra las favoritas del store; estado vacío
src/screens/HomeScreen.tsx      muestra el saldo de fichas
```

## 5. Checklist

- [x] Store global con Zustand y tipos sin `any`
- [x] Favoritos compartidos entre Home y Favoritas
- [x] Saldo de fichas compartido y descontado al jugar
- [x] Estado vacío en Favoritas
- [ ] Verificado en el celular (completar tras probar)
- [ ] Captura `docs/home.png` pendiente desde la semana 2

## 6. Decisiones

- El estado vive en memoria y no persiste. La persistencia llega en la semana 7.
- Se usan selectores (`useArcadeStore((state) => ...)`) para que cada componente se re-renderice solo con lo que lee.
- `spendTokens` devuelve `boolean` para que la UI decida qué mensaje mostrar.

## 7. Git

```
chore(deps): add zustand
feat(store): add zustand store for favorites and tokens
feat(favorites): connect favorites and token balance to zustand store
docs: add HANDOFF-week-04
```

## 8. Siguiente: Semana 05 (Axios y TanStack Query v5)

```
git checkout -b week-05 week-04
```

Verificar los requisitos de `3-proyecto/` de la semana 5 del repo de referencia antes de implementar.
