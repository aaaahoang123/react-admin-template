import {ActionPayload} from '../entities/common/action-payload';

export function createAction<T = any, U = any>(type: string) {
    return function(payload?: T, additionalInfo?: U): ActionPayload<T, U> {
        return {
            type,
            payload: payload || null as any,
            additionalInfo
        };
    };
}
