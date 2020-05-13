import {VehicleCategory} from '../../../entities/api/vehicle-category';
import IdMapper from '../../../entities/common/id-mapper';
import {VehicleCategoryParams} from '../params';

export class VehicleCategoriesListState {
    items: IdMapper<VehicleCategory> = {};
    ids: Set<number> = new Set();
    params = new VehicleCategoryParams();
}
