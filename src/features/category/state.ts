import {Dictionary} from '@reduxjs/toolkit';
import {StateStatus, CommonStatus} from '../../common/enums';
import {Category} from '../../models/category';
import {TreeSelectData} from '../../common/models/tree-select-data';


export class CategoryFormData {
    name?: string = undefined;
    parent_id?: number = undefined;
    icon?: string = undefined;
    status?: CommonStatus = undefined;
    sort_number?: number = undefined;
}

export class CategoryState {
    ids: number[] = [];
    formId?: number = undefined;
    formStatus: StateStatus = 'idle';
    formData: CategoryFormData = {...new CategoryFormData()};

    entities: Dictionary<Category> = {};
    childrenMapper: Dictionary<number[]> = {};
    listLoaded = false;
    status: StateStatus = 'idle';
    interactingIds: number[] = [];
}
