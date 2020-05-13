import {VehicleCategoriesListState} from './state';
import {ActionPayload} from '../../../entities/common/action-payload';
import {VEHICLE_CATEGORY_LIST_LOADED} from '../constants';
import {VehicleCategory} from '../../../entities/api/vehicle-category';
import IdMapper from '../../../entities/common/id-mapper';

function vehicleCategoriesListReducer(state = new VehicleCategoriesListState(), action: ActionPayload) {
    switch (action.type) {
        case VEHICLE_CATEGORY_LIST_LOADED:
            return reduceListVehicleCategory(state, action);
        default:
            return state;
    }
}

function reduceListVehicleCategory(state: VehicleCategoriesListState, action: ActionPayload<VehicleCategory[]>) {
    return {
        ...state,
        items: action.payload
    };
}

export default vehicleCategoriesListReducer;
