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
  params?: Params<string | number>;
};

export const usePostAuth = async (path: string, { params }: Options = {}) => {
  const config = useRuntimeConfig();
  const options: Options = {};
  const authHeaders = ref({});

  Object.assign(options, {
    baseURL: config.public.baseURL,
    headers: buildWrightHeaders(),
    method: 'POST',
    timeout: 3000,
    ...(params ? { body: { ...params } } : {}),
    onResponse(context) {
      authHeaders.value = {
        accessToken: context.response.headers.get('access-token'),
        client: context.response.headers.get('client'),
        uid: context.response.headers.get('uid'),
      };
    },
  });

  const { error } = await useFetch(path, options);

  return { error, authHeaders };
};
