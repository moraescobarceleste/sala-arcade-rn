import { GENRE_LABEL } from '@/data/labels';
import type { Machine } from '@/types';

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export function filterMachines(machines: Machine[], query: string): Machine[] {
  const needle = normalize(query);
  if (needle === '') return machines;

  return machines.filter((machine) => {
    const haystack = normalize(`${machine.name} ${GENRE_LABEL[machine.genre]} ${machine.zone}`);
    return haystack.includes(needle);
  });
}
