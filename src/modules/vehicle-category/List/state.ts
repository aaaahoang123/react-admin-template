import IdMapper from '../../../entities/common/id-mapper';
import {VehicleCategory} from '../../../entities/api/vehicle-category';

export class VehicleCategoriesListState {
    items: VehicleCategory[] = [];
    ids: number[] = [];
}
