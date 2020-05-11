import {AppState} from './App.state';
import {ActionPayload} from './entities/common/action-payload';
import {APP_USER_CHANGED, COLLAPSE_SIDEBAR, WINDOW_SIZE_CHANGE} from './App.constants';
// import {APP_LOGIN} from './main/constants';

function appReducer(state = new AppState(), action: ActionPayload): AppState {
    switch(action.type) {
        case COLLAPSE_SIDEBAR:
            return {
                ...state,
                sidebarCollapse: !state.sidebarCollapse
            };
        case WINDOW_SIZE_CHANGE:
            return reduceWindowSize(state, action);
        // case FETCH_AUTH_DATA:
        //     return {...state, authChecked: true};
        case APP_USER_CHANGED:
            return {
                ...state,
                user: action.payload,
                authenticated: !!action.payload
            };
        default:
            return state;
    }
}

function reduceWindowSize(state: AppState, action: ActionPayload<{width: number, height: number}>): AppState {
    return {
        ...state,
        windowWidth: action.payload.width,
        windowHeight: action.payload.height,
        isMobile: action.payload.width < 768,
    }
}

export default appReducer;
