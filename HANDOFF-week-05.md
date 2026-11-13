# HANDOFF - Semana 5

Proyecto: `sala-arcade-rn` (Expo SDK 57, React Native, TypeScript, pnpm)
Rama: `week-05` (creada desde `week-04`)

## Objetivo
Separar el estado del servidor del estado del cliente: consumir los datos de las máquinas con Axios y TanStack Query, y dejar Zustand solo para lo que es del cliente.

## Qué se hizo
- Se instalaron `axios` y `@tanstack/react-query@5` con versiones exactas (`pnpm add -E`).
- `src/api/queryClient.ts`: cliente de Query con `retry: 1` y `staleTime: 60_000`.
- `src/api/client.ts`: instancia de Axios con un adaptador propio que responde desde `mockData`. Incluye latencia (`latencyMs: 800`) y tasa de fallos (`failureRate`) configurables para probar los estados de carga y error.
- `src/api/machines.ts`: funciones tipadas `getMachines()` y `getMachineById(id)`.
- `src/hooks/useMachines.ts`: hooks `useMachines()` y `useMachine(id)` con `useQuery`, y claves centralizadas en `machineKeys`.
- `App.tsx`: envuelto con `QueryClientProvider`.
- `src/components/QueryStatus.tsx`: vistas `LoadingView` y `ErrorView` (con botón Reintentar) y el helper `getErrorMessage`.
- `HomeScreen`, `DetailScreen` y `FavoritesScreen` ahora leen las máquinas con los hooks en vez de importar `MACHINES`. Home permite refrescar con el gesto de bajar la lista.
- Zustand (`useArcadeStore`) conserva solo favoritos y saldo de fichas.

## Decisiones
- **API simulada con Axios** en lugar de `json-server` o una API pública: funciona en Expo Go sin servidor ni internet, y permite provocar errores a voluntad. Contrapartida: es menos realista que un servidor.
- **Zustand para estado del cliente, Query para estado del servidor.** Las pantallas combinan ambos (por ejemplo, Favoritas filtra la lista de Query con los ids de Zustand).
- **Versiones exactas**, sin `^` ni `~`, igual que en las semanas anteriores.

## Cómo probarlo
1. `pnpm install` y `pnpm start`.
2. Abrir en Expo Go (debe coincidir con el SDK 57).
3. Comprobar: carga inicial, refrescar, detalle (la segunda visita es instantánea por la caché), favoritos.
4. Error: poner `failureRate: 1` en `src/api/client.ts`, recargar y ver "No pudimos cargar los datos" con Reintentar. Volver a `failureRate: 0` y reintentar.

Resultado: todas las pruebas pasaron en el celular. `failureRate` quedó en `0`.

## Commits principales
- `chore(deps): add axios and tanstack query`
- `feat(api): add mock axios client, machines service and query hooks`
- `feat(app): add query provider and status views`
- `feat(screens): load machines with tanstack query`

## Pendiente y riesgos
- **No se leyó el README de requisitos de la semana 5** (GitHub bloqueó el acceso a la carpeta del bootcamp). Hay que compararlo con lo hecho. Si pide mutaciones (`useMutation`), invalidación de caché, una API real o una estructura de carpetas distinta, se agrega en un commit nuevo sobre esta rama.
- `useMachine(id)` hace una petición por máquina y no reutiliza la lista ya cargada. Se podría mejorar con `initialData`.
- Si un refetch falla pero ya hay datos, el error no se muestra en pantalla.
- Falta abrir el pull request de `week-05`.

## Problemas encontrados (para no repetirlos)
- **Expo Go:** debe ser la versión que corresponde al SDK del proyecto (57). La 58 no abre el proyecto, y Android no permite instalar una versión más vieja encima de una más nueva (hay que desinstalar primero).
- **Conexión al celular:** el QR falló y hubo que usar *Enter URL* con `exp://IP:8081`. El error "Failed to download remote update" ocurre si Expo Go conecta antes de que Metro termine de compilar.
- **Push con error 403:** Windows tenía guardada la credencial de otra cuenta de GitHub. Se resolvió borrándola (`cmdkey /delete:git:https://github.com`) e iniciando sesión con la cuenta dueña del repo.
- **Túnel (`--tunnel`):** `@expo/ngrok` instalado globalmente con npm no lo encuentra pnpm. No fue necesario al final.
- **Tildes con `??` al copiar archivos desde PowerShell:** es un problema de codificación al copiar, no de los archivos. Usar `Get-Content -Encoding UTF8` o revisar en VS Code.
