import {all, takeLatest, call, put, takeEvery, select} from 'redux-saga/effects';
import {DELETE_VEHICLE_CATEGORY, VEHICLE_CATEGORY_LIST_REFRESH} from '../constants';
import {safeCall} from '../../../utils/safe-call';
import vehicleCategoryService from '../service';
import {vehicleCategoriesListLoaded, vehicleCategoryDeletedFailed, vehicleCategoryDeletedSuccess} from '../actions';
import {Rest} from '../../../entities/common/rest';
import {VehicleCategory} from '../../../entities/api/vehicle-category';
import {ActionPayload} from '../../../entities/common/action-payload';
import {message} from 'antd';
import {IndexState} from '../../../core/index.state';
import isEqual from 'lodash/isEqual';

function* refreshListVehicleCategories() {
    const {params, oldParams} = yield select((state: IndexState) => state.vehicleCategory.list);
    if (!isEqual(params, oldParams)) {
        const vehicleCategories: Rest<VehicleCategory> = yield call(vehicleCategoryService.list, params);
        yield put(vehicleCategoriesListLoaded(vehicleCategories.datas, params));
    }
}

function* deleteVehicleCategory(action: ActionPayload<number>) {
    try {
        yield call(vehicleCategoryService.delete, action.payload);
        yield put(vehicleCategoryDeletedSuccess(action.payload));
        message.success('Xóa nhóm xe thành công');
    } catch (e) {
        yield put(vehicleCategoryDeletedFailed(action.payload));
    }
}

function* VehicleCategoryListSaga() {
    yield all([
        takeLatest(VEHICLE_CATEGORY_LIST_REFRESH, safeCall(refreshListVehicleCategories)),
        takeEvery(DELETE_VEHICLE_CATEGORY, deleteVehicleCategory)
    ]);
}

export default VehicleCategoryListSaga;
