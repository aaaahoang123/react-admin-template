import { all, put, takeLeading, select, call } from 'redux-saga/effects';
import {authTokenChanged, authUserLoaded, authLoginComplete, authLogin, authLoadUserData} from './reducer';
import {AUTH_STORAGE_KEY} from '../../config/properties';
import authService from './service';
import {PayloadAction} from '@reduxjs/toolkit';
import {LoginFormData} from './state';
import {Rest} from '../../common/models/rest';
import {safeCall} from '../../common/utils';
import {notification} from 'antd';
import history from '../../config/history';
import {AuthResponse} from '../../models/auth-response';
import {RouterEnum} from '../../common/enums';
import {selectAuthUser} from './selectors';
import {INITIAL_ACTION} from '../../config/store';
import {User} from '../../models/user';

function* onInitialApp() {
    yield put(authTokenChanged(localStorage.getItem(AUTH_STORAGE_KEY) || ''))
}

function* onLoadUserData() {
    const user: User = yield select(selectAuthUser);
    if (!user) {
        const response: Rest<AuthResponse> = yield call(authService.userData);
        yield put(authUserLoaded(response.data.user));
    }
}

function* onLogin({payload}: PayloadAction<LoginFormData>) {
    try {
        const response: Rest<AuthResponse> = yield call(authService.login, payload);
        localStorage.setItem(AUTH_STORAGE_KEY, response.data.token || '');
        notification.success({
            message: 'Đăng nhập thành công',
            description: 'Chuyển về trang chủ'
        });
        yield all([
            put(authUserLoaded(response.data.user)),
            put(authLoginComplete(true)),
            put(authTokenChanged(response.data?.token || '', true))
        ]);
        history.push(RouterEnum.dashboard);
    } catch (e) {
        yield put(authLoginComplete(false))
    }
}


function* authSagas() {
    yield all([
        takeLeading(INITIAL_ACTION, onInitialApp),
        takeLeading(authLoadUserData, safeCall(onLoadUserData)),
        takeLeading(authLogin, onLogin)
    ]);
}

export default authSagas;
