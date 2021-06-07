import {filterParams} from '../utils';
import axios from '../axios';
import {BASE_URL} from '../../config/properties';
import {Rest} from '../models/rest';

export abstract class CRUDService<DataType, FormType = any, ParamsType = any, IdType = number> {
    abstract getNameSpace(): string;

    list = (rawParams?: ParamsType) => {
        const params = rawParams ? filterParams(rawParams) : {};
        return axios.get<Rest<DataType>>(
            `${BASE_URL}${this.getNameSpace()}`,
            {params}
        );
    };

    single = (id: IdType) => {
        return axios.get<Rest<DataType>>(`${BASE_URL}${this.getNameSpace()}/${id}`);
    };

    delete = (id: IdType) => {
        return axios
            .delete<Rest<DataType>>(`${BASE_URL}${this.getNameSpace()}/${id}`);
    }

    create = (data: FormType) => {
        return axios.post<Rest<DataType>>(`${BASE_URL}${this.getNameSpace()}`, data);
    }

    edit = (id: IdType, data: FormType) => {
        return axios.put<Rest<DataType>>(`${BASE_URL}${this.getNameSpace()}/${id}`, data);
    }
}
