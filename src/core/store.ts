import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import history from './history';
import rootReducer from './reducer';
import listenViewResize from '../common/listen-view-resize';
import RootSaga from './sagas';
import {APP_DEBUG} from './properties';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware({
    onError(e) {
        console.log(e);
    }
});
const routeMiddleware = routerMiddleware(history);

const store = configureStore({
    reducer: rootReducer,
    devTools: APP_DEBUG,
    middleware: [
        sagaMiddleware,
        routeMiddleware,
    ]
});

listenViewResize(store);

sagaMiddleware.run(RootSaga);

export default store;
