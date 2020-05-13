import {combineReducers} from 'redux';
import form from './Form/reducer';
import list from './List/reducer';

const VehicleCategoryReducer = combineReducers({
    form,
    list
});

export default VehicleCategoryReducer;
