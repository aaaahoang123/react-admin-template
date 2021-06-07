// REACT_APP_BASE_URL=/api/
export const APP_PREFIX = process.env.REACT_APP_PREFIX || '';
export const DOMAIN = process.env.REACT_APP_BASE_DOMAIN || '';
export const API_URL = `api`;
export const BASE_URL = `${API_URL}/v1`;
export const APP_DEBUG = process.env.NODE_ENV === 'development';

export const AUTH_STORAGE_KEY = process.env.REACT_APP_AUTH_STORAGE_KEY || 'token';
export const RICH_EDITOR_API_KEY = process.env.REACT_APP_TINY_MCE_KEY ?? '';
