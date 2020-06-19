import {User} from './entities/api/user';
import {JwtPayload} from './entities/common/jwt-payload';

export class AppState {
    sidebarCollapse = false;
    windowWidth: number = 0;
    windowHeight: number = 0;
    isMobile: boolean = false;
    user?: User;
    authenticated = false;

    token?: string;
    tokenInfo?: JwtPayload;
}
