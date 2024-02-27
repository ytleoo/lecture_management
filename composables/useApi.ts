import { useFetch, useRuntimeConfig } from '#app';

const buildWrightHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return headers;
};

type Params<T extends string | number> = {
  [key: string]: T;
};

type Options = {
  httpMethod?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: Params<string | number>;
  baseURL?: string;
};

export const useApi = (path: string, { httpMethod = 'GET', params }: Options = {}) => {
  const config = useRuntimeConfig();
  const options: Options = { baseURL: config.public.baseURL };
  switch (httpMethod) {
    case 'POST':
    case 'PATCH':
    case 'PUT':
    case 'DELETE':
      Object.assign(options, {
        headers: buildWrightHeaders(),
        method: httpMethod,
        ...(params ? { body: { ...params } } : {}),
      });
      break;
    default:
      Object.assign(options, { method: 'GET', ...(params ? { query: { ...params } } : {}) });
  }

  return useFetch(path, options);
};
