import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import {history} from './history';
import IndexReducer from './index.reducer';
import listenViewResize from '../common/listen-view-resize';
import IndexSagas from './index.sagas';
import {APP_DEBUG} from './properties';
import {configureStore} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware({
    onError(e) {
        console.log(e);
    }
});
const routeMiddleware = routerMiddleware(history);

const store = configureStore({
    reducer: IndexReducer,
    devTools: APP_DEBUG,
    middleware: [
        routeMiddleware,
        sagaMiddleware,
    ]
});

listenViewResize(store);

sagaMiddleware.run(IndexSagas);

export default store;
