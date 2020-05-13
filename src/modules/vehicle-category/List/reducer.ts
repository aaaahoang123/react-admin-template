import {VehicleCategoriesListState} from './state';
import {ActionPayload} from '../../../entities/common/action-payload';
import {
    DELETE_VEHICLE_CATEGORY, SINGLE_VEHICLE_CATEGORY_LOADED,
    VEHICLE_CATEGORY_DELETED_FAILED,
    VEHICLE_CATEGORY_DELETED_SUCCESS,
    VEHICLE_CATEGORY_LIST_LOADED
} from '../constants';
import {VehicleCategory} from '../../../entities/api/vehicle-category';
import IdMapper from '../../../entities/common/id-mapper';

function vehicleCategoriesListReducer(state = new VehicleCategoriesListState(), action: ActionPayload) {
    switch (action.type) {
        case VEHICLE_CATEGORY_LIST_LOADED:
            return reduceListVehicleCategory(state, action);

        case DELETE_VEHICLE_CATEGORY:
            state.items[action.payload].isDeleting = true;
            return {...state};

        case VEHICLE_CATEGORY_DELETED_SUCCESS:
            delete state.items[action.payload];
            state.ids.delete(action.payload);
            return {...state};

        case VEHICLE_CATEGORY_DELETED_FAILED:
            state.items[action.payload].isDeleting = false;
            return {...state};

        case SINGLE_VEHICLE_CATEGORY_LOADED:
            return reduceSingleVehicleCategory(state, action);

        default:
            return state;
    }
}

function reduceListVehicleCategory(state: VehicleCategoriesListState, action: ActionPayload<VehicleCategory[]>) {
    const ids = new Set();
    const items = action.payload.reduce((result, current) => {
        result[current.id] = current;
        ids.add(current.id);
        return result;
    }, {} as IdMapper<VehicleCategory>);

    return {
        ...state,
        items,
        ids
    };
}

function reduceSingleVehicleCategory(state: VehicleCategoriesListState, action: ActionPayload<VehicleCategory>) {
    state.items[action.payload.id] = action.payload;
    state.ids.add(action.payload.id);
    return {...state};
}

export default vehicleCategoriesListReducer;
