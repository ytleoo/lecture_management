import { useFetch, useRuntimeConfig } from '#app';

type useFetchType = typeof useFetch;

export const useApi: useFetchType = (path: string, options = {}) => {
  const config = useRuntimeConfig();
  options.baseURL = config.public.baseURL;
  return useFetch(path, options);
};
