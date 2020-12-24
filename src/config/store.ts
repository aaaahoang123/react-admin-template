import createSagaMiddleware from 'redux-saga';
import {APP_DEBUG} from './properties';
import AppReducer from '../App.reducer';
import AppSagas from '../App.sagas';
import {configureStore} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware({
    onError(e) {
        console.trace(e);
    }
});
// const routeMiddleware = routerMiddleware(history);

const store = configureStore({
    devTools: APP_DEBUG ? {
        maxAge: 10
    } : false,
    middleware: [
        sagaMiddleware,
    ],
    reducer: AppReducer
});

// listenViewResize(store);

sagaMiddleware.run(AppSagas);

export default store;
