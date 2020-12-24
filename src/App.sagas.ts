import {all} from 'redux-saga/effects';
import authSagas from './features/auth/sagas';
import {commonSagas} from './common/actions';
import categorySagas from './features/category/sagas';

function* AppSagas() {
    yield all([
        commonSagas(),
        authSagas(),
        categorySagas()
    ]);
}

export default AppSagas;
