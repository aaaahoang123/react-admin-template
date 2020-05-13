import {CommonStatus} from '../../../common/enums/common-status.enum';

export class VehicleSeatFormData {
    id?: number;
    p_col?: number;
    p_row?: number;
    selectable = true;
    addition_price?: number;
}

export class VehicleCategoryFormState {
    id?: number;
    name?: string;
    seat_quantity?: number;
    status?: CommonStatus;
    vehicle_seats: VehicleSeatFormData[] = [];
    cols = 4;
    rows = 5;
    matrix: number[][] = [];
    formSubmitting = false;
}
