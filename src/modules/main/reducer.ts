import {MainState} from './state';
import {ActionPayload} from '../../entities/common/action-payload';
import {APP_LOGIN, APP_LOGIN_COMPLETE} from './constants';

function mainReducer(state = new MainState(), action: ActionPayload): MainState {
    switch (action.type) {
        case APP_LOGIN:
            return {...state, requesting: true};
        case APP_LOGIN_COMPLETE:
            return {...state, requesting: false};
        default:
            return state;
    }
}

export default mainReducer;
