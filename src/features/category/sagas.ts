import {all, select, call, put, takeLeading, takeEvery, takeLatest} from 'redux-saga/effects';
import {CategoryFormData, CategoryParams, CategoryState} from './state';
import {selectCategoryOfForm, selectCategoryParams, selectCategoryState, selectSingleCategory} from './selectors';
import categoryService from './service';
import {message} from 'antd';
import {
    categoryFormSubmitted,
    singleCategoryAdded,
    submitCategoryForm,
    categoryFormChanged,
    listCategoriesLoaded,
    categoryDeleted,
    categoryDeleteFailed,
    deleteCategory,
    refreshListCategories,
    categoryFormIdChanged,
    categoryParamsChange
} from './reducer';
import {safeCall} from '../../common/utils';
import {Rest} from '../../common/models/rest';
import {Category} from '../../models/category';
import history from '../../config/history';
import {RouterEnum} from '../../common/enums';
import {pushQueryToRouter} from '../../common/actions';

const sagas = [
    takeLeading(submitCategoryForm, function* ({payload}) {
        try {
            const categoryOfForm: Category = yield select(selectCategoryOfForm);
            const formId = categoryOfForm?.id;
            const response: Rest<Category> = formId
                ?  yield call(categoryService.edit, formId, payload)
                : yield call(categoryService.create, payload)
            message.success(`${formId ? 'Sửa' : 'Tạo'} danh mục thành công`);
            yield all([
                put(categoryFormSubmitted(true)),
                put(singleCategoryAdded(response.data, false))
            ]);
            history.push(`${RouterEnum.categories}${RouterEnum.list}`);
        } catch (e) {
            yield put(categoryFormSubmitted(false))
        }
    }),

    takeLeading(categoryFormIdChanged, safeCall(function* ({payload}) {
        const categoryOfForm: Category = yield select(selectCategoryOfForm);
        if ((payload ?? null) === (categoryOfForm?.id ?? null)) {
            return;
        }

        if (payload) {
            const response: Rest<Category> = yield call(categoryService.single, payload);
            yield put(singleCategoryAdded(response.data, true));
        } else {
            yield put(categoryFormChanged(new CategoryFormData(), null));
        }
    })),

    takeLeading(refreshListCategories, safeCall(function* () {
        const { status }: CategoryState = yield select(selectCategoryState);
        if (status !== 'loading') {
            return;
        }
        const response: Rest<Category> = yield call(categoryService.list);
        yield put(listCategoriesLoaded(response));
    })),

    takeEvery(deleteCategory, function* ({payload}) {
        try {
            const category: Category = yield select(selectSingleCategory(payload));
            yield call(categoryService.delete, category.id);
            yield put(categoryDeleted(payload));
            message.success('Xóa danh mục thành công');
        } catch (e) {
            yield put(categoryDeleteFailed(payload))
        }
    }),

    takeLatest(categoryParamsChange, function* ({ meta }) {
        if (meta) {
            const params: CategoryParams = yield select(selectCategoryParams);
            yield put(pushQueryToRouter(params));
        }
    }),
];


function* categorySagas() {
    yield all(sagas);
}

export default categorySagas;
