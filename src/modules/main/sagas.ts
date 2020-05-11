import { takeLatest, call, put, all } from 'redux-saga/effects';
import {APP_LOGIN} from './constants';
import {ActionPayload} from '../../entities/common/action-payload';
import AuthService from './auth-service';
import {appUserChange} from '../../App.actions';
import {Rest} from '../../entities/common/rest';
import {User} from '../../entities/api/user';
import {AUTH_STORAGE_KEY} from '../../core/properties';
import {RouteEnum} from '../../core/route.enum';
import { push } from 'connected-react-router';
import {FETCH_AUTH_DATA} from '../../App.constants';
import {safeCall} from '../../utils/safe-call';
import {loginComplete} from './actions';
import {message} from 'antd';

function* login(action: ActionPayload) {
    try {
        const response: Rest<User> = yield call(AuthService.login, action.payload);
        localStorage.setItem(AUTH_STORAGE_KEY, response.data.access_token || '');
        yield put(appUserChange(response.data));
        yield put(push(RouteEnum.dashboard));
        message.success('Đăng nhập thành công! Chuyển hướng về dashboard!');
    } catch (e) {
        yield put(appUserChange());
    } finally {
        yield put(loginComplete());
    }
}

function* fetchUserData() {
    const response: Rest<User> = yield call(AuthService.userData);
    yield put(appUserChange(response.data));
}

function* MainSaga() {
    yield all([
        takeLatest(APP_LOGIN, login),
        takeLatest(FETCH_AUTH_DATA, safeCall(fetchUserData))
    ])
}

export default MainSaga;
