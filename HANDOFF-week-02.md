# HANDOFF Semana 02: Listas, Inputs y Estilos

> Documento autocontenido. Otro Claude puede retomar el trabajo leyendo este archivo y `HANDOFF-week-01.md`.

## 1. Contexto

- **Proyecto:** Sala Arcade (React Native, Expo SDK 57, TypeScript). Dominio: machines, tokens, players, maintenance.
- **Referencia:** https://github.com/ergrato-dev/bc-reactnative, solo `3-proyecto/` de cada semana.
- **Reglas del usuario:** todo paso a paso; pnpm con versiones exactas; una rama por semana (`week-02` sale de `week-01`); conventional commits (commitlint y husky ya configurados); un handoff por semana.
- **Estado de la semana 01:** verificada por el usuario en su celular Android con **Expo Go para SDK 57 instalado como APK**.

## 2. Entorno

Las versiones fijas son las de `HANDOFF-week-01.md`. **No se agregó ninguna dependencia nueva en la semana 02.**

Lecciones del arranque en Windows:
- La Expo Go de la Play Store es para SDK 58 y rechaza proyectos SDK 57 ("Project is incompatible with this version of Expo Go"). El error "Failed to download remote update" era ese mismo choque.
- Solución usada: descargar el APK de SDK 57 desde `https://expo.dev/go?sdkVersion=57&platform=android&device=true` y desinstalar antes la Expo Go de la tienda.
- Ejecutar `pnpm install` antes del primer `pnpm start`. Sin eso aparece `"expo" no se reconoce como un comando`.
- En la primera ejecución Expo modifica solo `tsconfig.json` (propiedad `include`). Ese cambio se commitea con `chore:`.

## 3. Cambios de la semana

```
src/types/index.ts       MachineGenre ampliado: crane, fighting, puzzle, rhythm
src/data/mockData.ts     11 máquinas (antes 5)
src/data/labels.ts       GENRE_LABEL: etiquetas en español por género
src/utils/search.ts      filterMachines(): normaliza tildes y mayúsculas; busca en nombre, género y zona
src/components/ItemCard  muestra género, zona, última revisión, estado y costo
src/screens/HomeScreen   FlatList + TextInput + KeyboardAvoidingView
assets/machines/         6 PNG nuevos (candy-crane, air-hockey-pro, retro-brawl, block-drop, skee-rocket, rhythm-beat)
```

## 4. Checklist de la semana (referencia)

- [x] `FlatList` con 10 o más ítems (hay 11)
- [x] `TextInput` con búsqueda en tiempo real
- [x] Estado vacío personalizado
- [x] `ItemCard` con 3 o más campos del dominio
- [x] `KeyboardAvoidingView`
- [x] Estilos desde `src/theme/index.ts`
- [x] `keyExtractor` por `id`, nunca por índice
- [x] `useMemo` para filtrar; `useCallback` para `renderItem` y el estado vacío
- [x] `ItemSeparatorComponent` entre tarjetas
- [x] TypeScript sin `any`
- [x] README con dominio, pantallas y decisiones de diseño
- [ ] Captura de pantalla en `docs/home.png` (la toma el usuario)

## 5. Verificación hecha

- `pnpm typecheck` sin errores.
- `expo export --platform android` generó el bundle con los 11 assets.
- `filterMachines` probada con `""`, `"grua"`, `"ZONA a"`, `"carreras"` y `"xyz"`, con los resultados esperados.
- **No verificado:** el comportamiento del teclado en el dispositivo real ni el aspecto final de la lista. Lo comprueba el usuario.

## 6. Git

```bash
git checkout week-01 && git checkout -b week-02   # ya hecho
# commits de esta rama (conventional):
#   feat(data): add six more machines and genre labels
#   feat(search): add accent-insensitive machine filter
#   feat(home): add searchable FlatList with empty state
#   docs: document home screen and design decisions
#   docs: add week-02 handoff
git push -u origin week-02
```

## 7. Siguiente: Semana 03 (React Navigation 7)

```bash
git checkout -b week-03 week-02
```

Requisitos del proyecto de referencia, aplicados a machines:
1. **Tab Navigator** con dos pestañas: `Home` y `Favorites`.
2. **Stack anidado en Home**: lista (`HomeList`) a detalle (`HomeDetail`).
3. **Params tipados**: pasar al menos `id` y `name` al detalle.
4. **Iconos en la tab bar** con `@expo/vector-icons` (Ionicons).
5. Tipos `RootTabParamList` y `HomeStackParamList`, sin `any`.
6. `DetailScreen` lee los params con `useRoute` y los muestra.
7. `FavoritesScreen` con al menos 3 ítems (pueden ser estáticos).
8. `tabBarActiveTintColor` con `#61DAFB` (lo pide el repo de referencia; se puede decidir mantenerlo o usar el dorado del tema).
9. Títulos descriptivos en el header.

Dependencias que pide el repo de referencia (versiones exactas, a validar con `expo install --check`): `@react-navigation/native@7.3.8`, `@react-navigation/native-stack@7.17.10`, `@react-navigation/bottom-tabs@7.18.8`, `react-native-screens@4.25.2`, `react-native-safe-area-context@5.7.0` (ya instalada), `@expo/vector-icons@15.1.1`.

Estructura esperada:
```
src/navigation/RootNavigator.tsx   Tab + Stack anidado
src/navigation/types.ts            RootTabParamList, HomeStackParamList
src/screens/DetailScreen.tsx
src/screens/FavoritesScreen.tsx
```

Al terminar, crear `HANDOFF-week-03.md` con este formato.
