import axios from 'axios';

export const httpClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? import.meta.env.VITE_API_ENDPOINT_DEV
      : import.meta.env.VITE_API_ENDPOINT_PROD,
  timeout: 250000,
});

httpClient.interceptors.request.use((config) => {
  console.log('axios request', config);
  if (config.method === 'post') {
    Object.keys(config.data).forEach((key) => {
      if (!config.data[key]) delete config.data[key];
    });
  }

  console.log('data of axios request', config.data);
  return config;
});
