import type { Machine, NewMachinePayload } from '@/types';
export const createMachine = async (payload: NewMachinePayload): Promise<Machine> => {
  const { data } = await api.post<Machine>('/machines', payload);
  return data;
};

import { api } from './client';

export const fetchMachines = async (): Promise<Machine[]> => {
  const { data } = await api.get<Machine[]>('/machines');
  return data;
};

export const fetchMachine = async (id: string): Promise<Machine> => {
  const { data } = await api.get<Machine>(`/machines/${id}`);
  return data;
};
