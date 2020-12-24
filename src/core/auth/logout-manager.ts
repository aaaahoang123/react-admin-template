import {LogoutHandler} from './logout-handler';

class LogoutManager {
    private static handler: LogoutHandler;

    static setLogoutHandler(handler: LogoutHandler): void {
        this.handler = handler;
    }

    static logout(): void {
        this.handler.logout();
    }
}

export default LogoutManager;
