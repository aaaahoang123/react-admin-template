import AuthState from './features/auth/state';
import {CategoryState} from './features/category/state';

interface AppState {
    auth: AuthState;
    category: CategoryState;
}

export default AppState;
