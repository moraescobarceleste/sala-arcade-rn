import axios, { AxiosError } from 'axios';
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { MACHINES } from '@/data/mockData';

const NETWORK_DELAY_MS = 600;

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const respond = <T>(
  config: InternalAxiosRequestConfig,
  status: number,
  data: T,
): AxiosResponse<T> => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
  headers: {},
  config,
});

const mockAdapter: AxiosAdapter = async (config) => {
  await wait(NETWORK_DELAY_MS);
  const url = config.url ?? '';

  if (url === '/machines') {
    return respond(config, 200, MACHINES);
  }

  const match = /^\/machines\/(.+)$/.exec(url);
  if (match) {
    const machine = MACHINES.find((item) => item.id === match[1]);
    if (machine) {
      return respond(config, 200, machine);
    }
  }

  const response = respond(config, 404, { message: 'Recurso no encontrado' });
  throw new AxiosError(
    'Request failed with status code 404',
    AxiosError.ERR_BAD_REQUEST,
    config,
    undefined,
    response,
  );
};

export const api = axios.create({ adapter: mockAdapter });
