import {combineReducers} from 'redux';
import app from '../App.reducer';
import main from '../modules/main/reducer';
import {history} from './history';
import { connectRouter } from 'connected-react-router';
import routes from './routes.reducer';
import vehicleCategory from '../modules/vehicle-category/reducer';

const IndexReducer = combineReducers({
    app,
    main,
    routes,
    vehicleCategory,
    router: connectRouter(history),
})

export default IndexReducer
