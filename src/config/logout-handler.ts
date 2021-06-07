import {LogoutHandler as BaseLogoutHandler} from '../core/auth/logout-handler'
import {AUTH_STORAGE_KEY} from './properties';
import history from '../config/history';

class LogoutHandler implements BaseLogoutHandler {
    logout(): void {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        history.push('/auth/login');
    }

}

export default LogoutHandler;
