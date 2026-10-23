import type { ImageSourcePropType } from 'react-native';

export type MachineStatus = 'available' | 'in-use' | 'maintenance' | 'out-of-service';

export type MachineGenre =
  | 'shooter'
  | 'racing'
  | 'pinball'
  | 'sports'
  | 'light-gun'
  | 'crane'
  | 'fighting'
  | 'puzzle'
  | 'rhythm';

export interface Machine {
  id: string;
  name: string;
  genre: MachineGenre;
  zone: string;
  tokensPerPlay: number;
  status: MachineStatus;
  image: ImageSourcePropType;
  lastMaintenanceAt: string;
}

export interface TokenPack {
  id: string;
  name: string;
  tokens: number;
  priceCop: number;
}

export interface Player {
  id: string;
  nickname: string;
  tokenBalance: number;
  highScore: number;
  favoriteMachineId: string | null;
}

export type MaintenanceType = 'preventive' | 'corrective';

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  type: MaintenanceType;
  description: string;
  technician: string;
  performedAt: string;
  resolved: boolean;
}
