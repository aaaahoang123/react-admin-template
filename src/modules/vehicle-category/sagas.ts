import { all } from "redux-saga/effects";
import VehicleCategoryFormSagas from './Form/saga';

function* VehicleCategorySagas() {
    yield all([
        VehicleCategoryFormSagas()
    ]);
}

export default VehicleCategorySagas;
