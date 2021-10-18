import ReactDOM from 'react-dom';
import App from './App';
import {Router} from 'react-router-dom';
import history from './config/history';
import {Provider} from 'react-redux';
import store from './config/store';
import reportWebVitals from './reportWebVitals';
import LogoutManager from './core/auth/logout-manager';
import LogoutHandler from './config/logout-handler';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import {RecoilRoot} from 'recoil';
import {ConfigProvider, Skeleton} from 'antd';
import vi from 'antd/es/locale/vi_VN';
import './config/i18next';
import './config/antd';
import './index.less';
import './index.scss';
import hookGuard from 'react-hook-guard';

hookGuard.config({
    SuspenseFallback: Skeleton
})

LogoutManager.setLogoutHandler(new LogoutHandler());

ReactDOM.render(
    <ConfigProvider locale={vi}>
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <Router history={history}>
                    <RecoilRoot>
                        <App/>
                    </RecoilRoot>
                </Router>
            </Provider>
        </I18nextProvider>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
