import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'
import IndexReducer from './core/index.reducer';
import IndexSagas from './core/index.sagas';
import { Provider } from 'react-redux';
import listenViewResize from './common/listen-view-resize';
import './core/axios-config';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import {history} from './core/history';

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
)

listenViewResize(store);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
