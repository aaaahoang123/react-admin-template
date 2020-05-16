import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import './core/axios-config';
import { ConnectedRouter } from 'connected-react-router';
import {history} from './core/history';
import store from './core/store-config';

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
