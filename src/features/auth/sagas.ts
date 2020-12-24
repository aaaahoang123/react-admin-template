import { all, put, takeLeading, select, call } from 'redux-saga/effects';
import {authLoadUserData, authTokenChanged, authUserLoaded, authLoginComplete, authLogin} from './reducer';
import {AUTH_STORAGE_KEY} from '../../config/properties';
import AppState from '../../App.state';
import authService from './service';
import {PayloadAction} from '@reduxjs/toolkit';
import {LoginFormData} from './state';
import {Rest} from '../../common/models/rest';
import {User} from '../../models/user';
import {safeCall} from '../../common/utils';
import {notification} from 'antd';
import history from '../../config/history';
import {AuthResponse} from '../../models/auth-response';

function* onInitialApp() {
    yield put(authTokenChanged(localStorage.getItem(AUTH_STORAGE_KEY) || ''))
}

function* onLoadUserData() {
    const user = yield select((state: AppState) => state.auth.user);
    if (user) {
        const response: Rest<User> = yield call(authService.userData);
        yield put(authUserLoaded(response.data));
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
            put(authTokenChanged(response.data?.token || ''))
        ]);
        history.push('/trash1/trash11');
    } catch (e) {
        yield put(authLoginComplete(false))
    }
}


function* authSagas() {
    yield all([
        takeLeading('@@INIT', onInitialApp),
        takeLeading(authLoadUserData, safeCall(onLoadUserData)),
        takeLeading(authLogin, onLogin)
    ]);
}

export default authSagas;
