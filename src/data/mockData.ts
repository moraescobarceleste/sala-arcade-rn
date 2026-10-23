import type { Machine, MaintenanceRecord, Player, TokenPack } from '@/types';

export const MACHINES: Machine[] = [
  {
    id: 'm-001',
    name: 'Space Raiders',
    genre: 'shooter',
    zone: 'Zona A',
    tokensPerPlay: 2,
    status: 'available',
    image: require('../../assets/machines/space-raiders.png'),
    lastMaintenanceAt: '2026-09-28',
  },
  {
    id: 'm-002',
    name: 'Turbo Drift',
    genre: 'racing',
    zone: 'Zona A',
    tokensPerPlay: 3,
    status: 'in-use',
    image: require('../../assets/machines/turbo-drift.png'),
    lastMaintenanceAt: '2026-10-05',
  },
  {
    id: 'm-003',
    name: 'Pinball Nova',
    genre: 'pinball',
    zone: 'Zona B',
    tokensPerPlay: 2,
    status: 'maintenance',
    image: require('../../assets/machines/pinball-nova.png'),
    lastMaintenanceAt: '2026-10-21',
  },
  {
    id: 'm-004',
    name: 'Neon Hoops',
    genre: 'sports',
    zone: 'Zona B',
    tokensPerPlay: 1,
    status: 'available',
    image: require('../../assets/machines/neon-hoops.png'),
    lastMaintenanceAt: '2026-09-12',
  },
  {
    id: 'm-005',
    name: 'Zombie Hunt',
    genre: 'light-gun',
    zone: 'Zona C',
    tokensPerPlay: 4,
    status: 'out-of-service',
    image: require('../../assets/machines/zombie-hunt.png'),
    lastMaintenanceAt: '2026-08-30',
  },
];

export const TOKEN_PACKS: TokenPack[] = [
  { id: 't-001', name: 'Sencillo', tokens: 10, priceCop: 10000 },
  { id: 't-002', name: 'Doble', tokens: 25, priceCop: 22000 },
  { id: 't-003', name: 'Jackpot', tokens: 60, priceCop: 45000 },
];

export const PLAYERS: Player[] = [
  { id: 'p-001', nickname: 'Luna88', tokenBalance: 14, highScore: 48200, favoriteMachineId: 'm-001' },
  { id: 'p-002', nickname: 'DriftKing', tokenBalance: 3, highScore: 31750, favoriteMachineId: 'm-002' },
  { id: 'p-003', nickname: 'Pixel', tokenBalance: 0, highScore: 9900, favoriteMachineId: null },
];

export const MAINTENANCE_LOG: MaintenanceRecord[] = [
  {
    id: 'r-001',
    machineId: 'm-003',
    type: 'corrective',
    description: 'Cambio de resortes del flipper izquierdo',
    technician: 'Andrés R.',
    performedAt: '2026-10-21',
    resolved: false,
  },
  {
    id: 'r-002',
    machineId: 'm-005',
    type: 'corrective',
    description: 'Pantalla sin señal, pendiente de repuesto',
    technician: 'Marta G.',
    performedAt: '2026-08-30',
    resolved: false,
  },
  {
    id: 'r-003',
    machineId: 'm-002',
    type: 'preventive',
    description: 'Limpieza de pedales y calibración de volante',
    technician: 'Andrés R.',
    performedAt: '2026-10-05',
    resolved: true,
  },
];
