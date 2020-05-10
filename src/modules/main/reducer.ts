import {MainState} from './state';
import {ActionPayload} from '../../entities/common/action-payload';
import {APP_LOGIN} from './constants';
import {APP_USER_CHANGED} from '../../App.constants';

function mainReducer(state = new MainState(), action: ActionPayload): MainState {
    switch (action.type) {
        case APP_LOGIN:
            return {...state, requesting: true};
        case APP_USER_CHANGED:
            return {...state, requesting: false};
        default:
            return state;
    }
}

export default mainReducer;
