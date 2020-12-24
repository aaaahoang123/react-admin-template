import {PayloadAction, CaseReducerWithPrepare, CaseReducer} from '@reduxjs/toolkit';
import { Draft } from 'immer';

export function createPrepareAction<P, M extends any = any, E = any, A = PayloadAction<P, string, M|undefined, E|undefined>>(): (payload: P, meta?: M, error?: E) => Omit<A, 'type'> {
    return (payload: P, meta?: M, error?: E) => ({payload, meta, error} as any);
}

export class PreparedCaseReducer<State, P, M extends any = any, E = any> implements CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>> {
    prepare = createPrepareAction<P, M, E>();
    private readonly reducerInternal: CaseReducer<State, PayloadAction<P, string, M|undefined, E|undefined>>;

    constructor(reducer: CaseReducer<State, PayloadAction<P, string, M|undefined, E|undefined>>) {
        this.reducerInternal = reducer;
    }

    reducer = (state: Draft<State>, action: PayloadAction<any, string, any, any>): void | State | Draft<State> => {
        return this.reducerInternal(state, action as any);
    }
}
