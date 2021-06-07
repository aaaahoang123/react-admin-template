import {Dictionary} from '@reduxjs/toolkit';
import {CommonStatus, StateStatus} from '../../common/enums';
import {Category} from '../../models/category';
import {CategoryType} from '../../models/enums/category-type';

export class CategoryFormData {
    name?: string = undefined;
    parent_id?: number = undefined;
    icon?: string = undefined;
    status?: CommonStatus = undefined;
    sort_number?: number = undefined;
    type: CategoryType = CategoryType.PRODUCT;
}

export class CategoryParams {
    search?: string = undefined;
    type?: CategoryType = undefined;
}

export class CategoryState {
    ids: number[] = [];
    formId?: number = undefined;
    formStatus: StateStatus = 'idle';
    formData: CategoryFormData = {...new CategoryFormData()};

    params = new CategoryParams();
    entities: Dictionary<Category> = {};
    childrenMapper: Dictionary<number[]> = {};
    listLoaded = false;
    status: StateStatus = 'idle';
    interactingIds: number[] = [];
}
