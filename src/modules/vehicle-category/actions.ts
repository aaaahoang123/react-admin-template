import {
    DELETE_VEHICLE_CATEGORY,
    SINGLE_VEHICLE_CATEGORY_LOADED,
    VEHICLE_CATEGORY_DELETED_FAILED,
    VEHICLE_CATEGORY_DELETED_SUCCESS,
    VEHICLE_CATEGORY_FORM_DATA_CHANGE,
    VEHICLE_CATEGORY_FORM_ID_CHANGE,
    VEHICLE_CATEGORY_FORM_SUBMIT,
    VEHICLE_CATEGORY_FORM_SUBMITTED,
    VEHICLE_CATEGORY_LIST_LOADED,
    VEHICLE_CATEGORY_LIST_REFRESH,
    VEHICLE_SEAT_FORM_DATA_CHANGE
} from './constants';
import {ActionPayload} from '../../entities/common/action-payload';
import {VehicleCategoryFormState, VehicleSeatFormData} from './Form/state';
import {VehicleCategory} from '../../entities/api/vehicle-category';
import {createAction} from '../../utils/create-action';

export type ChangeSeatGridPayload = Partial<VehicleCategoryFormState> & { reset?: boolean };

export function vehicleCategoryFormChange(formData: Partial<VehicleCategoryFormState>, reset?: boolean): ActionPayload<ChangeSeatGridPayload> {
    return {
        type: VEHICLE_CATEGORY_FORM_DATA_CHANGE,
        payload: {
            ...formData,
            reset
        }
    };
}

export const vehicleCategoryFormIdChange = createAction<number>(VEHICLE_CATEGORY_FORM_ID_CHANGE);

export const vehicleSeatFormDataChange = createAction<Partial<VehicleSeatFormData>, number>(VEHICLE_SEAT_FORM_DATA_CHANGE);

export const vehicleCategoryFormSubmit = createAction<VehicleCategoryFormState>(VEHICLE_CATEGORY_FORM_SUBMIT);

export const vehicleCategoryFormSubmitted = createAction(VEHICLE_CATEGORY_FORM_SUBMITTED);

export const vehicleCategoriesListRefresh = createAction(VEHICLE_CATEGORY_LIST_REFRESH);

export const vehicleCategoriesListLoaded = createAction<VehicleCategory[]>(VEHICLE_CATEGORY_LIST_LOADED);

export const deleteVehicleCategory = createAction<number>(DELETE_VEHICLE_CATEGORY);
export const vehicleCategoryDeletedSuccess = createAction<number>(VEHICLE_CATEGORY_DELETED_SUCCESS);
export const vehicleCategoryDeletedFailed = createAction<number>(VEHICLE_CATEGORY_DELETED_FAILED);
export const singleVehicleCategoryLoaded = createAction<VehicleCategory>(SINGLE_VEHICLE_CATEGORY_LOADED);
