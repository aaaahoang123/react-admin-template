import {ActionPayload} from '../../entities/common/action-payload';
import {ActionCreator} from './create-action';

export declare type ReducerResolver<T> = (state: T, action: ActionPayload) => T;

export interface OnActionListener<T> {
    type: string;
    resolver: ReducerResolver<T>;
}

export function on<T>(action: ActionCreator, resolver: ReducerResolver<T>): OnActionListener<T> {
    return {
        type: action.type,
        resolver
    };
}

export function createReducer<T>(initialState: T, ons: OnActionListener<T>[] = []) {
    const onMap = ons.reduce((result, {type, resolver}) => {
        result[type] = resolver;
        return result;
    }, {} as {[key: string]: ReducerResolver<T>});

    return (state = initialState, action: ActionPayload): T => {
        if (onMap.hasOwnProperty(action.type)) {
            return onMap[action.type](state, action);
        }
        return state;
    }
}
