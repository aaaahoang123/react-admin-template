import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
import {PayloadActionCreator} from '@reduxjs/toolkit';

export function takeLatestAction<T>(action: PayloadActionCreator<any>, worker: (action: T) => any) {
    return takeLatest(action.type as any, worker);
}

export function takeLeadingAction<T>(action: PayloadActionCreator<any>, worker: (action: T) => any) {
    return takeLeading(action.type as any, worker)
}

export function takeEveryAction<T>(action: PayloadActionCreator<any>, worker: (action: T) => any) {
    return takeEvery(action.type as any, worker);
}
