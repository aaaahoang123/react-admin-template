import {ActionPayload} from '../../entities/common/action-payload';
import {APP_LOGIN} from './constants';

export function mainLogin(hashed_token: string, secret: string): ActionPayload {
    return {
        type: APP_LOGIN,
        payload: {hashed_token, secret}
    }
}
