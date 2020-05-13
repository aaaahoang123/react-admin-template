import {VehicleCategoryFormState, VehicleSeatFormData} from './state';
import {ActionPayload} from '../../../entities/common/action-payload';
import {
    VEHICLE_CATEGORY_FORM_DATA_CHANGE,
    VEHICLE_CATEGORY_FORM_SUBMIT, VEHICLE_CATEGORY_FORM_SUBMITTED,
    VEHICLE_SEAT_FORM_DATA_CHANGE
} from '../constants';
import range from 'lodash/range';
import {ChangeSeatGridPayload} from '../actions';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';

const initial = reduceSeatMatrixAndVehicleSeat(new VehicleCategoryFormState(), true);

function vehicleCategoryFormReducer(state = initial, action: ActionPayload): VehicleCategoryFormState {
    switch (action.type) {
        case VEHICLE_CATEGORY_FORM_DATA_CHANGE:
            return onFormDataChange(state, action);
        case VEHICLE_SEAT_FORM_DATA_CHANGE:
            return onVehicleSeatChange(state, action);
        case VEHICLE_CATEGORY_FORM_SUBMIT:
            return {...state, formSubmitting: true};
        case VEHICLE_CATEGORY_FORM_SUBMITTED:
            return {...state, formSubmitting: false};
        default:
            return state;
    }
}

function reduceSeatMatrixAndVehicleSeat(state: VehicleCategoryFormState, reset?: boolean) {
    const vehicleSeats = state.vehicle_seats;
    const newSeatsQty = state.rows * state.cols;
    if (vehicleSeats.length > newSeatsQty) {
        vehicleSeats.length = newSeatsQty;
    }
    state.matrix = range(state.rows)
        .map((num, rowIndex) =>
            range(state.cols).map((num1, colIndex) => {
                const index = state.cols * rowIndex + colIndex;
                const seat = (reset || !vehicleSeats[index])
                    ? vehicleSeats[index] = new VehicleSeatFormData()
                    : vehicleSeats[index];
                seat.p_col = colIndex;
                seat.p_row = rowIndex;
                return index;
            })
        );

    return state;
}

function onFormDataChange(oldState: VehicleCategoryFormState, {payload}: ActionPayload<ChangeSeatGridPayload>): VehicleCategoryFormState {
    let state = {...oldState, ...payload};
    if (
        payload?.reset
        || (payload?.rows && oldState.rows !== payload.rows)
        || (payload?.cols && oldState.cols !== payload.cols)
    ) {
        state.rows = payload?.rows || state.rows;
        state.cols = payload?.cols || state.cols;

        state = reduceSeatMatrixAndVehicleSeat(state, payload.reset);
    }
    return state;
}

function onVehicleSeatChange(state: VehicleCategoryFormState, action: ActionPayload<Partial<VehicleSeatFormData>, number>): VehicleCategoryFormState {
    if (isNumber(action.additionalInfo)) {
        const seat = state.vehicle_seats[action.additionalInfo];
        seat.selectable = isBoolean(action.payload.selectable) ? action.payload.selectable : seat.selectable;
        seat.addition_price = isNumber(action.payload.addition_price) ? action.payload.addition_price : seat.addition_price;
    }

    return state;
}

export default vehicleCategoryFormReducer;
