import {ActionPayload} from '../../entities/common/action-payload';

export declare type ActionCreator<T = any, U = any> =  ((payload?: T, additionalInfo?: U) => ActionPayload<T, U>) & {type: string};

export function createAction<T = any, U = any>(type: string): ActionCreator<T, U> {
    const result = (payload?: T, additionalInfo?: U): ActionPayload<T, U> => {
        return {
            type,
            payload: payload || null as any,
            additionalInfo
        };
    };
    result.type = type;
    return result;
}
