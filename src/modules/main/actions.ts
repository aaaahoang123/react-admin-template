import {ActionPayload} from '../../entities/common/action-payload';
import {APP_LOGIN, APP_LOGIN_COMPLETE} from './constants';

export function mainLogin(hashed_token: string, secret: string): ActionPayload {
    return {
        type: APP_LOGIN,
        payload: {hashed_token, secret}
    }
}

export function loginComplete() {
    return {
        type: APP_LOGIN_COMPLETE
    }
}
