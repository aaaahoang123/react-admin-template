import {all, takeLatest, call, put} from 'redux-saga/effects';
import {VEHICLE_CATEGORY_LIST_REFRESH} from '../constants';
import {safeCall} from '../../../utils/safe-call';
import vehicleCategoryService from '../service';
import {vehicleCategoriesListLoaded} from '../actions';
import {Rest} from '../../../entities/common/rest';
import {VehicleCategory} from '../../../entities/api/vehicle-category';

function* refreshListVehicleCategories() {
    const vehicleCategories: Rest<VehicleCategory> = yield call(vehicleCategoryService.list);
    yield put(vehicleCategoriesListLoaded(vehicleCategories.datas));
}

function* VehicleCategoryListSaga() {
    yield all([
        takeLatest(VEHICLE_CATEGORY_LIST_REFRESH, safeCall(refreshListVehicleCategories))
    ]);
}

export default VehicleCategoryListSaga;
