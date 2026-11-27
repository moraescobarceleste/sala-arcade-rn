# HANDOFF Semana 06: Formularios con React Hook Form y Zod

> Documento autocontenido. Leer junto a `HANDOFF-week-05.md`.

## 1. Contexto

- **Proyecto:** Sala Arcade (React Native, Expo SDK 57, TypeScript). Dominio: machines, tokens, players, maintenance.
- **Repo:** https://github.com/moraescobarceleste/sala-arcade-rn
- **Ramas:** `main` (README), `week-01` a `week-06`, encadenadas (no se fusionan a `main`).
- **Reglas:** paso a paso, pnpm con versiones exactas, conventional commits, un handoff por semana. Alias `@/` apunta a `src/`.
- **Entorno:** igual que `HANDOFF-week-05.md`.

## 2. Dependencias nuevas (versión exacta)

```
react-hook-form 7.92.0
zod 4.6.7
@hookform/resolvers 7.0.9
```

## 3. Cambios de la semana

```
src/schemas/machineSchema.ts          z.object con name, genre (enum), zone y tokensPerPlay (z.coerce.number); tipos con z.input y z.output
src/components/FormField.tsx          Controller + TextInput + mensaje de error, genérico y con el tema oscuro
src/screens/CreateMachineScreen.tsx   useForm + zodResolver + useCreateMachine; género con botones seleccionables; vuelve a Home en onSuccess
src/api/client.ts                     el adaptador simulado responde POST /machines (201)
src/api/machines.ts                   createMachine
src/hooks/useMachines.ts              useCreateMachine (invalida machineKeys.all)
src/navigation/*                      ruta HomeCreate en el stack de Home
src/screens/HomeScreen.tsx            botón "+ Nueva máquina"
src/types/index.ts                    NewMachinePayload
```

## 4. Decisiones

- El schema es la fuente de verdad: `MachineFormInput` (entrada del formulario) y `MachineFormData` (salida validada) salen de `z.input` y `z.output`, porque `z.coerce` hace que sean distintos.
- El género se elige con botones en vez de escribirlo, usando `GENRE_LABEL` para los nombres en español.
- Las máquinas creadas viven en memoria (se pierden al recargar); la persistencia llega en la semana 07.
- La máquina nueva reutiliza la imagen de la primera, porque el formulario no pide imagen.
- `FormField` tiene un `any` en `Control<T, any, any>`, necesario por los tipos genéricos de React Hook Form con `z.coerce`.

## 5. Checklist

- [x] react-hook-form, zod y resolvers con versiones exactas
- [x] Schema Zod con campo numérico `z.coerce.number()` y mensajes en español
- [x] `FormField` reutilizable
- [x] Pantalla Create con validación y errores bajo cada campo
- [x] Spinner y botón deshabilitado durante el envío
- [ ] Extra: pantalla Edit con `defaultValues` y `reset()`
- [ ] Verificado en el celular (completar tras probar)

## 6. Siguiente: Semana 07 (persistencia local)

```
git checkout -b week-07 week-06
```
