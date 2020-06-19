import MainSaga from '../modules/main/sagas';
import { all, takeLatest, select, put } from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'connected-react-router';
import {IndexState} from './index.state';
import {RouterState} from './routes.reducer';
import {appInitialize, appTokenChange} from '../App.reducer';
import {AUTH_STORAGE_KEY} from './properties';
import ProductSagas from '../modules/product/sagas';

function* listenRouteChangeAndChangeTitle() {
    const {routes, activatedRoutes}: RouterState = yield select((state: IndexState) => state.routes);
    const workingRoute = routes[activatedRoutes[0]];
    if (workingRoute) {
        document.title = workingRoute.data?.title || document.title;
    }
}

function* onAppInitialize() {
    const token = localStorage.getItem(AUTH_STORAGE_KEY) || '';
    yield put(appTokenChange(token));
}

export default function* IndexSaga() {
    yield all([
        MainSaga(),
        ProductSagas(),

        // VehicleCategorySagas(),
        takeLatest(LOCATION_CHANGE, listenRouteChangeAndChangeTitle),
        takeLatest(appInitialize, onAppInitialize)
    ])
}
