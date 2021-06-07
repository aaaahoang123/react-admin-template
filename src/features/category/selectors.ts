import AppState from '../../App.state';
import {createSelector} from '@reduxjs/toolkit';
import {Category} from '../../models/category';
import toNumber from 'lodash/toNumber';
import {toSlug} from '../../common/utils';
import {CategoryType} from '../../models/enums/category-type';

export const selectCategoryState = (state: AppState) => state.category;

export const selectCategoryFormId = createSelector(
    selectCategoryState,
    state => state.formId
);

export const selectCategoryOfForm = createSelector(
    selectCategoryState,
    state => state.entities[state.formId ?? '']
);

export const selectCategoryFormData = createSelector(
    selectCategoryState,
    state => state.formData
);

export const selectCategoryIds = createSelector(
    selectCategoryState,
    state => state.ids
);

export const selectListParentCategories = createSelector(
    selectCategoryState,
    state => {
        let result = state.ids.map(id => state.entities[id] as Category)
        if (state.params.type) {
            result = result.filter(category => category.type === state.params.type);
        }
        if (state.params.search) {
            const slugSearch = toSlug(state.params.search);
            result = result.filter(category => category.name.includes(state.params.search!) || category.slug.includes(slugSearch));
        }
        return result;
    }
);

export const selectAllCategories = createSelector(
    selectCategoryState,
    state => Object.values(state.entities)
);

export const selectListChildrenCategories = (parentId: number) => createSelector(
    selectCategoryState,
    state => state.childrenMapper[parentId]?.map(id => state.entities[id] as Category)
);

export const selectListParentIds = createSelector(
    selectCategoryState,
    state => Object.keys(state.childrenMapper)
        .filter(id => !!state.childrenMapper[id]?.length)
        .map(toNumber)
);

export const selectInteractingOfCategory = (id: number) => createSelector(
    selectCategoryState,
    state => state.interactingIds.includes(id)
);

export const selectSingleCategory = (id: number) => createSelector(
    selectCategoryState,
    state => state.entities[id]
);

export const selectChildrenIdsOfCategory = (id: number) => createSelector(
    selectCategoryState,
    state => state.childrenMapper[id]
);

export const selectCategoryFormLoading = createSelector(
    selectCategoryState,
    state => state.formStatus === 'loading'
);

export const selectCategoryListLoading = createSelector(
    selectCategoryState,
    state => state.status === 'loading'
);

export const selectCategoryParams = createSelector(
    selectCategoryState,
    state => state.params
);

export const selectListCategoryByType = (type?: CategoryType) => createSelector(
    selectCategoryState,
    state => Object.values(state.entities)
        .filter(category => !type || category?.type === type)
);
