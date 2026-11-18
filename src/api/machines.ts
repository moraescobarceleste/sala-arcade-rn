import type { Machine } from '@/types';

import { api } from './client';

export const fetchMachines = async (): Promise<Machine[]> => {
  const { data } = await api.get<Machine[]>('/machines');
  return data;
};

export const fetchMachine = async (id: string): Promise<Machine> => {
  const { data } = await api.get<Machine>(`/machines/${id}`);
  return data;
};
