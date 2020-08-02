import {AUTH_STORAGE_KEY} from '../../core/properties';

export function authToken(): string {
    return localStorage.getItem(AUTH_STORAGE_KEY) || '';
}

export function saveAuthToken(token: string) {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
}

export function removeAuthToken() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAuthHeader(isContentTypeJson = true) {
    const result: any =  {
        authorization: `Bearer ${authToken()}`,
        accept: 'application/json'
    };

    if (isContentTypeJson) {
        result['Content-Type'] = 'application/json';
    }

    return result;
}
