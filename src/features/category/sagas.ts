import { all, select, call, put, takeLeading, takeEvery } from 'redux-saga/effects';
import {CategoryFormData, CategoryState} from './state';
import { selectCategoryOfForm, selectCategoryState, selectSingleCategory } from './selectors';
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
    categoryFormIdChanged
} from './reducer';
import {safeCall} from '../../common/utils';
import {Rest} from '../../common/models/rest';
import {Category} from '../../models/category';
import history from '../../config/history';
import {RouterEnum} from '../../common/enums';

const sagas = [
    takeLeading(submitCategoryForm, function* ({payload}) {
        try {
            const categoryOfForm: Category = yield select(selectCategoryOfForm);
            const formId = categoryOfForm?.slug;
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
        if ((payload ?? null) === (categoryOfForm?.slug ?? null)) {
            return;
        }

        if (payload) {
            const response: Rest<Category> = yield call(categoryService.single, payload);
            yield put(singleCategoryAdded(response.data, true));
        } else {
            yield put(categoryFormChanged(new CategoryFormData()));
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
            yield call(categoryService.delete, category.slug);
            yield message.success('Xóa danh mụcz thành công');
            yield put(categoryDeleted(payload));
        } catch (e) {
            yield put(categoryDeleteFailed(payload))
        }
    })
];


function* categorySagas() {
    yield all(sagas);
}

export default categorySagas;
