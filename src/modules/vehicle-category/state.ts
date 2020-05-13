import {VehicleCategoryFormState} from './Form/state';
import {VehicleCategoriesListState} from './List/state';

export interface VehicleCategoryState {
    form: VehicleCategoryFormState;
    list: VehicleCategoriesListState;
}
