import {createAction, createSlice, Dictionary, PayloadAction} from '@reduxjs/toolkit';
import {CategoryFormData, CategoryState} from './state';
import {Category} from '../../models/category';
import {Rest} from '../../common/models/rest';
import {PreparedCaseReducer, transform} from '../../common/utils';

const slice = createSlice({
    name: 'category',
    initialState: {...new CategoryState()},
    reducers: {
        submitCategoryForm(state, action: PayloadAction<CategoryFormData>) {
            state.formStatus = 'loading';
        },
        categoryFormSubmitted(state, action: PayloadAction<boolean>) {
            state.formStatus = 'idle';
        },
        categoryFormChanged: new PreparedCaseReducer<CategoryState, CategoryFormData, number>(
            (state, {payload, meta}) => {
                state.formData = payload;
                state.formId = typeof meta === 'undefined' ? state.formId : meta;
            }
        ),

        singleCategoryAdded: new PreparedCaseReducer<CategoryState, Category, boolean>(
            (state, {payload, meta: willUpdateForm}) => {
                const old = state.entities[payload.id];
                // Remove if old data existed and the parent_id has changed
                if (old && old.parent_id !== payload.parent_id) {
                    if (old.parent_id) {
                        state.childrenMapper[old.parent_id] = state.childrenMapper[old.parent_id]?.filter(id => id !== old.id)
                    } else {
                        state.ids = state.ids.filter(id => id !== old.id);
                    }
                }
                const {children, ...withoutChildren} = payload;
                state.entities[payload.id] = withoutChildren;
                let idList = state.ids;
                if (payload.parent_id) {
                    idList = state.childrenMapper[payload.parent_id] ?? (state.childrenMapper[payload.parent_id] = []);
                }
                if (!idList.includes(payload.id)) {
                    idList.push(payload.id);
                }

                if (willUpdateForm) {
                    state.formData = transform(new CategoryFormData(), payload);
                    state.formId = payload.id;
                }
            }
        ),

        refreshListCategories(state: CategoryState) {
            if (!state.listLoaded) {
                state.status = 'loading';
            }
        },

        listCategoriesLoaded(state: CategoryState, {payload}: PayloadAction<Rest<Category>>) {
            const childrenMapper: Dictionary<number[]> = {};
            const entities: Dictionary<Category> = {};
            const getIds = (categories: Category[]) => {
                return categories.map(category => {
                    const {children, ...restInfo} = category;
                    if (children?.length) {
                        childrenMapper[category.id] = getIds(children)
                    }
                    entities[category.id] = restInfo;
                    return category.id;
                })
            };
            const ids = getIds(payload.datas);
            return {
                ...state,
                listLoaded: true,
                status: 'idle',
                entities,
                childrenMapper,
                ids
            };
        },

        deleteCategory(state: CategoryState, {payload}: PayloadAction<number>) {
            if (!state.interactingIds.includes(payload)) {
                state.interactingIds.push(payload)
            }
        },

        categoryDeleted(state: CategoryState, {payload}: PayloadAction<number>) {
            delete state.entities[payload];
            state.ids = state.ids.filter(id => id !== payload);
            state.childrenMapper[payload]?.forEach(child => delete state.entities[child]);
            delete state.childrenMapper[payload];
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        },

        categoryDeleteFailed(state: CategoryState, {payload}: PayloadAction<number>) {
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        }
    },
});

export const {
    refreshListCategories,
    deleteCategory,
    categoryDeleteFailed,
    categoryDeleted,
    listCategoriesLoaded,
    singleCategoryAdded,
    submitCategoryForm,
    categoryFormSubmitted,
    categoryFormChanged
} = slice.actions;

export const categoryFormIdChanged = createAction<string>('category/formIdChanged');

const categoryReducer = slice.reducer;

export default categoryReducer;
