import createSagaMiddleware from 'redux-saga';
import {APP_DEBUG} from './properties';
import AppReducer from '../App.reducer';
import AppSagas from '../App.sagas';
import {configureStore} from '@reduxjs/toolkit';
import random from 'lodash/random';

export const INITIAL_ACTION = random(0, new Date().valueOf()).toString();

const sagaMiddleware = createSagaMiddleware({
    onError(e) {
        console.trace(e);
    }
});
// const routeMiddleware = routerMiddleware(history);

const store = configureStore({
    devTools: APP_DEBUG && {
        maxAge: 10
    },
    middleware: [
        sagaMiddleware,
    ],
    reducer: AppReducer
});

sagaMiddleware.run(AppSagas);

store.dispatch({
    type: INITIAL_ACTION
});

export default store;
