# Sala Arcade

App móvil (React Native, Expo, TypeScript) para gestionar una sala de juegos y arcade: **máquinas, fichas (tokens), jugadores y mantenimiento**.

## Stack (versiones fijas)

| Herramienta | Versión |
| --- | --- |
| Node.js | 22+ |
| pnpm | 10.34.8 |
| Expo SDK | 57 (`expo@57.0.31`) |
| React Native | 0.86.3 |
| React | 19.2.3 |
| TypeScript | 6.0.3 |

Todas las dependencias se instalan con versión exacta (`save-exact=true`, sin `^` ni `~`).

## Ejecutar

```bash
corepack enable
pnpm install
pnpm start        # abre Expo y escanea el QR con Expo Go (SDK 57)
pnpm typecheck
```

## Dominio

| Entidad | Descripción |
| --- | --- |
| `Machine` | Máquina de la sala: nombre, género, zona, costo en fichas, estado |
| `TokenPack` | Paquete de fichas a la venta |
| `Player` | Jugador con saldo de fichas y mejor puntaje |
| `MaintenanceRecord` | Registro de mantenimiento preventivo o correctivo por máquina |

## Flujo de trabajo

- Una rama por semana: `week-01` sale de `main`, `week-02` sale de `week-01`, y así sucesivamente.
- Commits convencionales, validados con commitlint y husky (`feat:`, `fix:`, `chore:`, `docs:`).
- Cada semana trae un `HANDOFF-week-XX.md` con las instrucciones para retomar el trabajo.

## Créditos

Estructura de semanas basada en [ergrato-dev/bc-reactnative](https://github.com/ergrato-dev/bc-reactnative) (CC BY-NC-SA 4.0). Este repositorio contiene solo el proyecto del dominio, sin el material guiado.
