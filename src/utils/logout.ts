import {AUTH_STORAGE_KEY, DOMAIN} from '../core/properties';

export function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = DOMAIN + '/authentication';
}
