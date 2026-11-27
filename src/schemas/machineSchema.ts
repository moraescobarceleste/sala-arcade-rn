import { z } from 'zod';

export const machineSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres'),
  type: z.enum(['arcade', 'pinball', 'carreras'], { message: 'Elige un tipo' }),
  tokensPerPlay: z.coerce
    .number({ message: 'Debe ser un número' })
    .int('Debe ser entero')
    .min(1, 'Mínimo 1 ficha')
    .max(20, 'Máximo 20 fichas'),
});

export type MachineFormInput = z.input<typeof machineSchema>;
export type MachineFormData = z.output<typeof machineSchema>;
