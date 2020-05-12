import {VehicleCategoryFormState} from './state';
import {ActionPayload} from '../../../entities/common/action-payload';
import {VEHICLE_CATEGORY_SEAT_GRID_CHANGE} from '../constants';
import range from 'lodash/range';
import {VehicleSeatFormData} from './form-data';
import {ChangeSeatGridPayload} from '../actions';

function vehicleCategoryFormReducer(state = new VehicleCategoryFormState(), action: ActionPayload): VehicleCategoryFormState {
    switch (action.type) {
        case VEHICLE_CATEGORY_SEAT_GRID_CHANGE:
            return onSeatGridChange(state, action);
        default:
            return state;
    }
}

function onSeatGridChange(state: VehicleCategoryFormState, action: ActionPayload<ChangeSeatGridPayload>): VehicleCategoryFormState {
    state.rows = action.payload?.rows || state.rows;
    state.cols = action.payload?.cols || state.cols;

    const vehicleSeats = state.formData.vehicle_seats;
    const newSeatsQty = state.rows * state.cols;
    if (vehicleSeats.length > newSeatsQty) {
        vehicleSeats.length = newSeatsQty;
    }

    state.matrix = range(state.rows)
        .map((num, rowIndex) =>
            range(state.cols).map((num1, colIndex) => {
                const index = state.cols * rowIndex + colIndex;
                const seat = (action.payload.reset || !vehicleSeats[index])
                    ? vehicleSeats[index] = new VehicleSeatFormData()
                    : vehicleSeats[index];
                seat.p_col = colIndex;
                seat.p_row = rowIndex;
                return index;
            })
        );

    return state;
}

export default vehicleCategoryFormReducer;
