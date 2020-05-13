import axios from 'axios';
import {VehicleCategoryFormState} from './Form/state';
import {BASE_URL} from '../../core/properties';
import {Rest} from '../../entities/common/rest';
import {VehicleCategory} from '../../entities/api/vehicle-category';
import {VehicleCategoryParams} from './params';
import filterParams from '../../utils/filter-params';

export class VehicleCategoryService {
    create(formData: VehicleCategoryFormState) {
        return axios.post<Rest<VehicleCategory>>(`${BASE_URL}/vehicles/create-category`, formData);
    }

    list(rawParams: VehicleCategoryParams) {
        const params = filterParams(rawParams);
        return axios.get<Rest<VehicleCategory>>(`${BASE_URL}/vehicles/list-categories`, {params});
    }

    delete(id: number) {
        return axios.delete<Rest<VehicleCategory>>(`${BASE_URL}/vehicles/delete-category`, {params: {id}});
    }

    single(id: number) {
        return axios.get<Rest<VehicleCategory>>(`${BASE_URL}vehicles/single-category`, {params: {id}});
    }

    editCategory(formData: VehicleCategoryFormState) {
        return axios.put<Rest<VehicleCategory>>(`${BASE_URL}vehicles/edit-category`, formData);
    }
}

const vehicleCategoryService = new VehicleCategoryService();

export default vehicleCategoryService;
