import axios from 'axios';
import {VehicleCategoryFormState} from './Form/state';
import {BASE_URL} from '../../core/properties';
import {Rest} from '../../entities/common/rest';
import {VehicleCategory} from '../../entities/api/vehicle-category';

export class VehicleCategoryService {
    create(formData: VehicleCategoryFormState) {
        return axios.post<Rest<VehicleCategory>>(`${BASE_URL}/vehicles/create-category`, formData);
    }

    list() {
        return axios.get<Rest<VehicleCategory>>(`${BASE_URL}/vehicles/list-categories`);
    }
}

const vehicleCategoryService = new VehicleCategoryService();

export default vehicleCategoryService;
