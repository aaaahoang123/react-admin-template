import {User} from '../../models/user';
import {JwtPayload} from '../../common/models/jwt-payload';

export class LoginFormData {
    username?: string = undefined;
    password?: string = undefined;
}

class AuthState {
    user?: User = undefined;
    loginFormLoading = false;
    tokenInfo?: JwtPayload;
    authenticated = false;
}

export default AuthState;
