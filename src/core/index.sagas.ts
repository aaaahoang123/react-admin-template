import MainSaga from '../modules/main/sagas';
import { all } from 'redux-saga/effects';
import VehicleCategorySagas from '../modules/vehicle-category/sagas';

export default function* IndexSaga() {
    yield all([
        MainSaga(),
        VehicleCategorySagas()
    ])
}
