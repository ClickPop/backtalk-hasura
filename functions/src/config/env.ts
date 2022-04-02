import { config } from 'dotenv';
config();
export const POLYGON_URL = 'https://polygon-rpc.com/';
export const COOKIE_SECRET = process.env.COOKIE_SECRET ?? '';
export const PORT = process.env.PORT ?? 5003;
export const HASURA_BASE_URL =
  process.env.HASURA_BASE_URL ?? 'http://localhost:8080';
export const HASURA_ACTION_URL =
  process.env.HASURA_ACTION_URL ?? 'http://host.docker.internal:5003';
export const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET ?? '';
export const HASURA_API_KEY = process.env.HASURA_API_KEY ?? '';
