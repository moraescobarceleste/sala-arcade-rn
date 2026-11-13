import type { Machine } from '@/types';

import { api } from './client';

export async function getMachines(): Promise<Machine[]> {
  const { data } = await api.get<Machine[]>('/machines');
  return data;
}

export async function getMachineById(id: string): Promise<Machine> {
  const { data } = await api.get<Machine>(`/machines/${id}`);
  return data;
}
