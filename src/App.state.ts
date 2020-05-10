import {User} from './entities/api/user';

export class AppState {
    sidebarCollapse = false;
    windowWidth: number = 0;
    windowHeight: number = 0;
    isMobile: boolean = false;
    user?: User;
    authChecked = false;
}
