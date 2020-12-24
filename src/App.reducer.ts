import {combineReducers} from 'redux';
import auth from './features/auth/reducer';
import category from './features/category/reducer';

const AppReducer = combineReducers({
    auth,
    category,
});

export default AppReducer;
