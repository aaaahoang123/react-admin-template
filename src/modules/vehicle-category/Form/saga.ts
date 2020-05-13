import {ActionPayload} from '../../../entities/common/action-payload';
import { all, takeLatest, put, select, call } from 'redux-saga/effects';
import {VEHICLE_CATEGORY_FORM_ID_CHANGE, VEHICLE_CATEGORY_FORM_SUBMIT} from '../constants';
import {safeCall} from '../../../utils/safe-call';
import {singleVehicleCategoryLoaded, vehicleCategoryFormChange, vehicleCategoryFormSubmitted} from '../actions';
import {VehicleCategoryFormState} from './state';
import {IndexState} from '../../../core/index.state';
import vehicleCategoryService from '../service';
import {message} from 'antd';
import {push} from 'connected-react-router';
import {RouteEnum} from '../../../common/enums/route.enum';

function* onVehicleCategoryFormIdChange(action: ActionPayload<number | undefined>) {
    const currentFormId = (yield select((state: IndexState) => state.vehicleCategory.form.id)) || null;
    if (currentFormId !== action.payload) {
        // New form
        if (!action.payload) {
            yield put(vehicleCategoryFormChange(new VehicleCategoryFormState(), true));
        }
        // TODO: Load the category data and dispatch new form with initial data.
    }
}

function* onSubmitVehicleCategoryForm(action: ActionPayload<VehicleCategoryFormState>) {
    try {
        const result = yield call(vehicleCategoryService.create, action.payload);
        message.success('Tạo nhóm xe thành công');
        yield put(push(RouteEnum.vehicle_categories + RouteEnum.list));
        yield put(singleVehicleCategoryLoaded(result.data));
    } catch (e) {

    } finally {
        yield put(vehicleCategoryFormSubmitted());
    }
}

function* VehicleCategoryFormSagas() {
    yield all([
        takeLatest(VEHICLE_CATEGORY_FORM_ID_CHANGE, safeCall(onVehicleCategoryFormIdChange)),
        takeLatest(VEHICLE_CATEGORY_FORM_SUBMIT, onSubmitVehicleCategoryForm)
    ]);
}

export default VehicleCategoryFormSagas;
