import axios, { AxiosError } from 'axios';
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { MACHINES } from '@/data/mockData';

// Cambia estos valores para probar la carga y el error.
// failureRate: 0 = nunca falla, 1 = siempre falla.
export const mockApiConfig = {
  latencyMs: 800,
  failureRate: 0,
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function respond<T>(config: InternalAxiosRequestConfig, status: number, data: T): AxiosResponse<T> {
  return { data, status, statusText: status < 400 ? 'OK' : 'Error', headers: {}, config, request: {} };
}

function fail(config: InternalAxiosRequestConfig, status: number, message: string): never {
  const response = respond(config, status, { message });
  throw new AxiosError(
    message,
    status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
    config,
    {},
    response,
  );
}

const mockAdapter: AxiosAdapter = async (config) => {
  await wait(mockApiConfig.latencyMs);

  if (Math.random() < mockApiConfig.failureRate) {
    fail(config, 500, 'Error simulado del servidor');
  }

  const url = config.url ?? '';
  const method = (config.method ?? 'get').toLowerCase();

  if (method === 'get' && url === '/machines') {
    return respond(config, 200, MACHINES);
  }

  const match = url.match(/^\/machines\/([^/]+)$/);
  if (method === 'get' && match) {
    const machine = MACHINES.find((m) => m.id === match[1]);
    if (!machine) {
      fail(config, 404, 'Máquina no encontrada');
    }
    return respond(config, 200, machine);
  }

  return fail(config, 404, `Ruta no encontrada: ${url}`);
};

export const api = axios.create({
  timeout: 10_000,
  adapter: mockAdapter,
});
