import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createMachine, fetchMachine, fetchMachines } from '@/api/machines';

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
export function useCreateMachine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMachine,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: machineKeys.all }),
  });
}
