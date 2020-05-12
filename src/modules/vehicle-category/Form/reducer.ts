import {VehicleCategoryFormState, VehicleSeatFormData} from './state';
import {ActionPayload} from '../../../entities/common/action-payload';
import {VEHICLE_CATEGORY_FORM_DATA_CHANGE} from '../constants';
import range from 'lodash/range';
import {ChangeSeatGridPayload} from '../actions';

const initial = new VehicleCategoryFormState();

function vehicleCategoryFormReducer(state = initial, action: ActionPayload): VehicleCategoryFormState {
    switch (action.type) {
        case VEHICLE_CATEGORY_FORM_DATA_CHANGE:
            return onFormDataChange(state, action);
        default:
            return state;
    }
}

function onFormDataChange(oldState: VehicleCategoryFormState, {payload}: ActionPayload<ChangeSeatGridPayload>): VehicleCategoryFormState {
    const state = {...oldState, ...payload};
    if (
        payload.reset
        || (payload.rows && oldState.rows !== payload.rows)
        || (payload.cols && oldState.cols !== payload.cols)
    ) {
        state.rows = payload?.rows || state.rows;
        state.cols = payload?.cols || state.cols;
        const vehicleSeats = state.vehicle_seats;
        const newSeatsQty = state.rows * state.cols;
        if (vehicleSeats.length > newSeatsQty) {
            vehicleSeats.length = newSeatsQty;
        }
        state.matrix = range(state.rows)
            .map((num, rowIndex) =>
                range(state.cols).map((num1, colIndex) => {
                    const index = state.cols * rowIndex + colIndex;
                    const seat = (payload.reset || !vehicleSeats[index])
                        ? vehicleSeats[index] = new VehicleSeatFormData()
                        : vehicleSeats[index];
                    seat.p_col = colIndex;
                    seat.p_row = rowIndex;
                    return index;
                })
            );
    }
    return state;
}

export default vehicleCategoryFormReducer;
