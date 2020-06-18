import { call, put, all, takeLeading, select } from 'redux-saga/effects';
import {ActionPayload} from '../../entities/common/action-payload';
import AuthService from './auth-service';
import {appUserChange} from '../../App.reducer';
import {Rest} from '../../entities/common/rest';
import {User} from '../../entities/api/user';
import {AUTH_STORAGE_KEY} from '../../core/properties';
import {RouteEnum} from '../../common/enums/route.enum';
import {LOCATION_CHANGE, push} from 'connected-react-router';
import {safeCall} from '../../utils/safe-call';
import {loginComplete, mainLogin} from './reducer';
import {message} from 'antd';
import {takeLeadingAction} from "../../utils/redux/saga-effects";
import {IndexState} from "../../core/index.state";
import {Route} from "../../entities/common/route";

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

function* doFetchUserData() {
    const isAuthenticated = yield select((state: IndexState) => state.app.authenticated);
    const route: Route = yield select((state: IndexState) => state.routes.routes[state.router.location.pathname]);
    if (!isAuthenticated && route.protected) {
        const response: Rest<User> = yield call(AuthService.userData);
        yield put(appUserChange(response.data));
    }
}

function* MainSaga() {
    yield all([
        takeLeadingAction(mainLogin, login),
        takeLeading(LOCATION_CHANGE, safeCall(doFetchUserData))
    ])
}

export default MainSaga;
