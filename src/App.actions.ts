import {APP_USER_CHANGED, COLLAPSE_SIDEBAR, FETCH_AUTH_DATA, WINDOW_SIZE_CHANGE} from './App.constants';
import {User} from './entities/api/user';
import {ActionPayload} from './entities/common/action-payload';

export function triggerSidebar() {
    return {
        type: COLLAPSE_SIDEBAR
    }
}

export function onResizeWindow(width: number, height: number) {
    return {
        type: WINDOW_SIZE_CHANGE,
        payload: {
            width,
            height
        }
    }
}

export function appUserChange(user?: User): ActionPayload<User | undefined> {
    return {
        type: APP_USER_CHANGED,
        payload: user
    }
}

export function fetchAuthData() {
    return {
        type: FETCH_AUTH_DATA
    }
}
