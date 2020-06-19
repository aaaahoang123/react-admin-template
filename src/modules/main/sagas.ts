import { call, put, all, takeLeading, select, takeLatest } from 'redux-saga/effects';
import authService from './auth-service';
import {appUserChange, appTokenChange} from '../../App.reducer';
import {Rest} from '../../entities/common/rest';
import {RouteEnum} from '../../common/enums/route.enum';
import { push } from 'connected-react-router';
import {safeCall} from '../../utils/safe-call';
import {loadUserData, loginComplete, mainLogin, mainLogout} from './reducer';
import {message} from 'antd';
import {IndexState} from "../../core/index.state";
import {PayloadAction} from '@reduxjs/toolkit';
import {LoginFormData} from './Login/form-data';
import {AuthResponse} from '../../entities/api/auth';
import {removeAuthToken, saveAuthToken} from '../../utils/auth';
import {AppState} from '../../App.state';

function* login(action: PayloadAction<LoginFormData>) {
    try {
        const response: Rest<AuthResponse> = yield call(authService.login, action.payload);
        saveAuthToken(response.data.token);

        yield all([
            put(appUserChange(response.data.user)),
            put(appTokenChange(response.data.token)),
            put(push(RouteEnum.dashboard)),
        ]);
        message.success('Đăng nhập thành công! Chuyển hướng về dashboard!');
    } catch (e) {
        yield put(appUserChange());
    } finally {
        yield put(loginComplete());
    }
}

function* doFetchUserData() {
    const {authenticated, user}: AppState = yield select((state: IndexState) => state.app);
    if (authenticated && !user) {
        const response: Rest<AuthResponse> = yield call(authService.userData);
        yield put(appUserChange(response.data.user));
    }
}

function* logout() {
    removeAuthToken();
    yield all([
        put(appUserChange()),
        put(appTokenChange(null as any)),
        put(push('/login'))
    ]);
}

function* MainSaga() {
    yield all([
        takeLeading(mainLogin, login),
        takeLeading(loadUserData, safeCall(doFetchUserData)),
        takeLatest(mainLogout, logout)
    ])
}

export default MainSaga;
