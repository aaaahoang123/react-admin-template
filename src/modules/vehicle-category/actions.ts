import {VEHICLE_CATEGORY_FORM_DATA_CHANGE, VEHICLE_CATEGORY_FORM_ID_CHANGE} from './constants';
import {ActionPayload} from '../../entities/common/action-payload';
import {VehicleCategoryFormState} from './Form/state';

export type ChangeSeatGridPayload = VehicleCategoryFormState & {reset?: boolean};

export function vehicleCategoryFormChange(formData: VehicleCategoryFormState, reset?: boolean): ActionPayload<ChangeSeatGridPayload> {
    return {
        type: VEHICLE_CATEGORY_FORM_DATA_CHANGE,
        payload: {
            ...formData,
            reset
        }
    };
}

export function vehicleCategoryFormIdChange(id?: number): ActionPayload<number | undefined> {
    return {
        type: VEHICLE_CATEGORY_FORM_ID_CHANGE,
        payload: id
    };
}
