import {VEHICLE_CATEGORY_SEAT_GRID_CHANGE} from './constants';
import {ActionPayload} from '../../entities/common/action-payload';

export interface ChangeSeatGridPayload {
    rows?: number;
    cols?: number;
    reset?: boolean;
}

export function seatGridChange(rows?: number, cols?: number, reset?: boolean): ActionPayload<ChangeSeatGridPayload> {
    return {
        type: VEHICLE_CATEGORY_SEAT_GRID_CHANGE,
        payload: {rows, cols, reset}
    };
}
