import { useQuery } from '@tanstack/react-query';

import { fetchMachine, fetchMachines } from '@/api/machines';

export const machineKeys = {
  all: ['machines'] as const,
  detail: (id: string) => ['machines', id] as const,
};

export function useMachines() {
  return useQuery({ queryKey: machineKeys.all, queryFn: fetchMachines });
}

export function useMachine(id: string) {
  return useQuery({ queryKey: machineKeys.detail(id), queryFn: () => fetchMachine(id) });
}
