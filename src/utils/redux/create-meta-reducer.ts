import {CaseReducer, CaseReducerWithPrepare, PayloadAction} from '@reduxjs/toolkit';
// import {Action} from '?redux';


function createMetaReducer<State, P = any, M = any>(
    reducer: CaseReducer<State, PayloadAction<P, string, M|undefined>>
): CaseReducerWithPrepare<State, PayloadAction> {
    return {
        reducer: reducer as any,
        prepare: (payload: P, meta?: M) => {
            return {
                payload: payload as any,
                meta
            }
        }
    };
}

export default createMetaReducer;
