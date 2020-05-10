// REACT_APP_BASE_URL=/api/
export const APP_PREFIX = process.env.REACT_APP_PREFIX || '';
export const DOMAIN = process.env.REACT_APP_BASE_DOMAIN || '';
export const API_URL = `${DOMAIN}/api`;
export const AUTH_STORAGE_KEY = process.env.REACT_APP_AUTH_STORAGE_KEY || 'token';
