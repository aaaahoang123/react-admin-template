import MainSaga from '../modules/main/sagas';
import { all, takeLatest, select } from 'redux-saga/effects';
import VehicleCategorySagas from '../modules/vehicle-category/sagas';
import {LOCATION_CHANGE} from "connected-react-router";
import {IndexState} from './index.state';
import {RouterState} from './routes.reducer';

function* listenRouteChangeAndChangeTitle() {
    const {routes, activatedRoutes}: RouterState = yield select((state: IndexState) => state.routes);
    const workingRoute = routes[activatedRoutes[0]];
    if (workingRoute) {
        document.title = workingRoute.data?.title || document.title;
    }
}

export default function* IndexSaga() {
    yield all([
        MainSaga(),
        VehicleCategorySagas(),
        takeLatest(LOCATION_CHANGE, listenRouteChangeAndChangeTitle)
    ])
}
