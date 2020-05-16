import { all } from "redux-saga/effects";
import VehicleCategoryFormSagas from './Form/saga';
import VehicleCategoryListSaga from './List/saga';

function* VehicleCategorySagas() {
    yield all([
        VehicleCategoryFormSagas(),
        VehicleCategoryListSaga()
    ]);
}

export default VehicleCategorySagas;
