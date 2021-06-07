import {all} from 'redux-saga/effects';
import authSagas from './features/auth/sagas';
import {commonSagas} from './common/actions';

function* AppSagas() {
    yield all([
        commonSagas(),
        authSagas(),
    ]);
}

export default AppSagas;
