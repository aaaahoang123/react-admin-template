import {combineReducers} from 'redux';
import auth from './features/auth/reducer';

const AppReducer = combineReducers({
    auth,
});

export default AppReducer;
