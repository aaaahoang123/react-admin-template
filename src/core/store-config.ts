import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import {history} from './history';
import {applyMiddleware, compose, createStore} from 'redux';
import IndexReducer from './index.reducer';
import listenViewResize from '../common/listen-view-resize';
import IndexSagas from './index.sagas';

const sagaMiddleware = createSagaMiddleware({
    onError(e) {
        console.log(e);
    }
});
const routeMiddleware = routerMiddleware(history);

const store = createStore(
    IndexReducer,
    compose(
        applyMiddleware(
            routeMiddleware,
            sagaMiddleware
        )
    )
);

listenViewResize(store);

sagaMiddleware.run(IndexSagas);

export default store;
