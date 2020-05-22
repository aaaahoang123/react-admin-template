import {ActionCreator} from './create-action';
import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';

export function takeLatestAction<T>(action: ActionCreator, worker: (action: T) => any) {
    return takeLatest(action.type as any, worker);
}

export function takeLeadingAction<T>(action: ActionCreator, worker: (action: T) => any) {
    return takeLeading(action.type as any, worker)
}

export function takeEveryAction<T>(action: ActionCreator, worker: (action: T) => any) {
    return takeEvery(action.type as any, worker);
}
