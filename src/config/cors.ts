import { CorsOptions } from 'cors';

export const CORS_CONFIG: CorsOptions = {
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.ORIGIN_BASEPATH,
};
