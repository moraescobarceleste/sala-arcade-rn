import { useQuery } from '@tanstack/react-query';

import { getMachineById, getMachines } from '@/api/machines';

export const machineKeys = {
  all: ['machines'] as const,
  detail: (id: string) => ['machines', id] as const,
};

export function useMachines() {
  return useQuery({ queryKey: machineKeys.all, queryFn: getMachines });
}

export function useMachine(id: string) {
  return useQuery({ queryKey: machineKeys.detail(id), queryFn: () => getMachineById(id) });
}
