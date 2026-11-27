import { z } from 'zod';

import type { MachineGenre } from '@/types';

export const MACHINE_GENRES = [
  'shooter',
  'racing',
  'pinball',
  'sports',
  'light-gun',
  'crane',
  'fighting',
  'puzzle',
  'rhythm',
] as const satisfies readonly MachineGenre[];

export const machineSchema = z.object({
  name: z.string().trim().min(3, 'Mínimo 3 caracteres').max(30, 'Máximo 30 caracteres'),
  genre: z.enum(MACHINE_GENRES, { message: 'Elige un género' }),
  zone: z.string().trim().min(3, 'Indica la zona (ej. Zona A)'),
  tokensPerPlay: z.coerce
    .number({ message: 'Debe ser un número' })
    .int('Debe ser entero')
    .min(1, 'Mínimo 1 ficha')
    .max(20, 'Máximo 20 fichas'),
});

export type MachineFormInput = z.input<typeof machineSchema>;
export type MachineFormData = z.output<typeof machineSchema>;
