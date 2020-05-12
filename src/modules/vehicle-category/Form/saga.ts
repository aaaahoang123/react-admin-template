import {ActionPayload} from '../../../entities/common/action-payload';
import { all, takeLatest, put, select } from 'redux-saga/effects';
import {VEHICLE_CATEGORY_FORM_ID_CHANGE} from '../constants';
import {safeCall} from '../../../utils/safe-call';
import {vehicleCategoryFormChange} from '../actions';
import {VehicleCategoryFormState} from './state';
import {IndexState} from '../../../core/index.state';

function* onVehicleCategoryFormIdChange(action: ActionPayload<number | undefined>) {
    const currentFormId = yield select((state: IndexState) => state.vehicleCategory.form.id);
    const isDirty = yield select((state: IndexState) => state.vehicleCategory.form.vehicle_seats.length);
    if (currentFormId !== action.payload || !isDirty) {
        // New form
        if (!action.payload || !isDirty) {
            yield put(vehicleCategoryFormChange(new VehicleCategoryFormState(), true));
        }
        // TODO: Load the category data and dispatch new form with initial data.
    }

}

function* VehicleCategoryFormSagas() {
    yield all([
        takeLatest(VEHICLE_CATEGORY_FORM_ID_CHANGE, safeCall(onVehicleCategoryFormIdChange))
    ]);
}

export default VehicleCategoryFormSagas;
