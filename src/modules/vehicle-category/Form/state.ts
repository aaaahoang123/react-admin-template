import {VehicleCategoryFormData} from './form-data';

export class VehicleCategoryFormState {
    formData = new VehicleCategoryFormData();
    cols = 4;
    rows = 5;
    matrix: number[][] = [];
}
