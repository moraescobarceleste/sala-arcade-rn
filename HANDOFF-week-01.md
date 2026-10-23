# HANDOFF Semana 01: Core Components y Flexbox

> Documento autocontenido. Otro Claude puede retomar el trabajo leyendo solo este archivo.

## 1. Contexto del proyecto

- **Proyecto:** Sala Arcade, app React Native para una sala de juegos y arcade.
- **Dominio:** machines, tokens, players, maintenance.
- **Referencia:** https://github.com/ergrato-dev/bc-reactnative (18 semanas). Se usa solo `3-proyecto/` de cada semana. No se entregan teoría ni ejercicios guiados.
- **Reglas del usuario:**
  - Todo desde cero, paso a paso.
  - pnpm con versiones fijas (exactas).
  - TypeScript con Expo Go SDK 57.
  - Una rama por semana: `week-01`, luego `week-02` (sale de `week-01`), etc.
  - Conventional commits.
  - Un handoff por semana, con las instrucciones de esa semana.

## 2. Versiones fijas

| Paquete | Versión |
| --- | --- |
| pnpm | 10.34.8 |
| expo | 57.0.31 |
| react-native | 0.86.3 |
| react | 19.2.3 |
| expo-status-bar | 57.0.1 |
| react-native-safe-area-context | 5.7.0 |
| typescript | 6.0.3 |
| @types/react | 19.2.17 |
| @babel/core | 7.29.7 |
| @commitlint/cli y config-conventional | 21.2.4 |
| husky | 9.1.7 |

El repo de referencia usa `expo@57.0.4` y `react-native@0.86.0`. Aquí se subió al último parche de SDK 57. `expo install --check` pidió `react-native@0.86.3` y `expo-status-bar@57.0.1`, y ya están alineados.

**Riesgo abierto:** `latest` de Expo ya es SDK 58. Si la app Expo Go de la tienda no abre proyectos SDK 57, hay que decidir entre subir a 58 o usar un development build. No está resuelto.

## 3. Reproducir la semana desde cero

```bash
corepack enable && corepack prepare pnpm@10.34.8 --activate
mkdir arcade-rn && cd arcade-rn
git init -b main
```

`package.json` inicial: `"main": "index.ts"`, `"packageManager": "pnpm@10.34.8"`, `"engines": {"node": ">=22"}`. `.npmrc`: `save-exact=true` y `engine-strict=true`.

```bash
pnpm add -E expo@57.0.31 react@19.2.3 react-native@0.86.3 expo-status-bar@57.0.1 react-native-safe-area-context@5.7.0
pnpm add -D -E typescript@6.0.3 @types/react@19.2.17 @babel/core@7.29.7
pnpm add -D -E @commitlint/cli@21.2.4 @commitlint/config-conventional@21.2.4 husky@9.1.7
pnpm exec husky init
```

Hooks:
- `.husky/commit-msg`: `pnpm exec commitlint --edit "$1"`
- `.husky/pre-commit`: `pnpm typecheck`

Correcciones respecto al starter del repo de referencia:
- Se quitó `sdkVersion: "53.0.0"` de `app.json`, que contradecía el SDK 57.
- El entry heredado `expo/AppEntry` se reemplazó por `index.ts` con `registerRootComponent(App)`.
- Se crearon los assets que el starter referenciaba pero no incluía (`icon`, `splash`, `adaptive-icon`).

## 4. Estructura entregada

```
App.tsx, index.ts, app.json, tsconfig.json (alias @/* -> src/*)
assets/ icon, splash, adaptive-icon, machines/*.png (5 gabinetes locales)
src/theme/index.ts          COLORS, SPACING, RADIUS, TYPOGRAPHY
src/types/index.ts          Machine, TokenPack, Player, MaintenanceRecord
src/data/mockData.ts        5 máquinas, 3 paquetes de fichas, 3 jugadores, 3 registros de mantenimiento
src/components/ItemCard.tsx tarjeta de máquina (imagen, textos, Pressable)
src/components/StatusBadge.tsx
src/screens/HomeScreen.tsx  header "Sala Arcade" + ScrollView de tarjetas
```

## 5. Checklist de la semana (requisitos del repo de referencia)

- [x] Pantalla principal con lista de tarjetas (`ScrollView`)
- [x] Mínimo 3 tarjetas con datos del dominio (hay 5)
- [x] Cada tarjeta: imagen local, 2 o más textos con estilos distintos, `Pressable` con feedback visual
- [x] Header con el nombre del dominio
- [x] Estilos solo con `StyleSheet.create`, sin estilos inline
- [x] Interfaces TypeScript para el dominio
- [x] Sin `position: 'absolute'` y sin librerías de UI
- [x] Nombre del dominio en `app.json`
- [ ] Captura o grabación en simulador (la hace el usuario en su equipo)

## 6. Verificación hecha

- `pnpm typecheck` sin errores.
- `expo export --platform android` generó el bundle y empaquetó los 5 assets.
- commitlint probado: `feat: ok` pasa y `arreglos varios` se rechaza.
- **No verificado:** ejecución en Expo Go real. No hay dispositivo en el entorno de trabajo.

## 7. Git

```bash
git checkout -b week-01 main
# commits convencionales, por ejemplo:
#   chore: initialize expo project with pnpm and exact versions
#   chore: add commitlint and husky
#   feat(domain): add machine, token, player and maintenance types
#   feat(machines): add machine card and home screen
git push -u origin week-01
```

## 8. Siguiente: Semana 02 (Listas, Inputs y Estilos)

```bash
git checkout -b week-02 week-01
```

Requisitos del proyecto de referencia, aplicados a machines:
1. `FlatList` con mínimo **10 máquinas** (hoy hay 5, hay que ampliar `mockData.ts`).
2. `TextInput` con búsqueda en tiempo real.
3. Estado vacío personalizado cuando no hay resultados.
4. `ItemCard` con al menos 3 campos del dominio.
5. `KeyboardAvoidingView`.
6. Todos los estilos desde `src/theme/index.ts` (ya existe).
7. `keyExtractor` por `id`, `useMemo` para filtrar, `useCallback` para `renderItem` y el empty state, separación entre tarjetas, TypeScript sin `any`.
8. Entregable: README con descripción del dominio, capturas y decisiones de diseño.

Al terminar, crear `HANDOFF-week-02.md` con el mismo formato que este.
