import {createAction, PayloadAction} from '@reduxjs/toolkit';
import { all, takeLatest } from 'redux-saga/effects';
import history from '../../config/history';
import {filterParams} from '../utils';

export const pushQueryToRouter = createAction<any>('common/pushQueryToRouter');

function* onPushQueryToRouter({payload}: PayloadAction<any>) {
    yield history.push({
        pathname: history.location.pathname,
        search: new URLSearchParams(filterParams(payload)).toString()
    });
}

export function* commonSagas() {
    yield all([
        takeLatest(pushQueryToRouter, onPushQueryToRouter)
    ]);
}
