import {AppState} from './App.state';
import {ActionPayload} from './entities/common/action-payload';
import {createReducer, on} from "./utils/redux/create-reducer";
import {appUserChange, changeWindowSize, triggerSidebar} from "./App.actions";

const appReducer = createReducer(new AppState(), [
    on(triggerSidebar, state => ({...state, sidebarCollapse: !state.sidebarCollapse})),
    on(changeWindowSize, reduceWindowSize),
    on(appUserChange, (state, {payload}) => ({...state, user: payload, authenticated: !!payload}))
]);

function reduceWindowSize(state: AppState, action: ActionPayload<{width: number, height: number}>): AppState {
    return {
        ...state,
        windowWidth: action.payload.width,
        windowHeight: action.payload.height,
        isMobile: action.payload.width < 768,
    }
}

export default appReducer;
