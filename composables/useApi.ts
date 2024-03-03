import { useFetch, useRuntimeConfig } from '#app';

type Params<T extends string | number> = {
  [key: string]: T;
};

type Options = {
  httpMethod?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: Params<string | number>;
};

type ReqOptions = Options & {
  baseURL: string;
  timeout: number;
};

export const useApi = async (path: string, { httpMethod = 'GET', params }: Options = {}) => {
  const config = useRuntimeConfig();
  const options: ReqOptions = { baseURL: config.public.baseURL, timeout: 3000 };

  const { data } = await useFetch('/api/token');
  const authHeaders = data.value?.authHeaders ?? '';
  if (authHeaders) {
    Object.assign(options, {
      timeout: 3000,
      headers: {
        uid: authHeaders.uid,
        client: authHeaders.client,
        'access-token': authHeaders.accessToken,
      },
    });
  }

  switch (httpMethod) {
    case 'POST':
    case 'PATCH':
    case 'PUT':
    case 'DELETE':
      Object.assign(options, {
        method: httpMethod,
        ...(params ? { body: { ...params } } : {}),
      });
      break;
    default:
      Object.assign(options, { method: 'GET', ...(params ? { query: { ...params } } : {}) });
  }

  return useFetch(path, options);
};
