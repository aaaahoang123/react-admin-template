import MainSaga from '../modules/main/sagas';
import { all } from 'redux-saga/effects';

export default function* IndexSaga() {
    yield all([
        MainSaga()
    ])
}
