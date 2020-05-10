import {combineReducers} from 'redux';
import app from '../App.reducer';
import main from '../modules/main/reducer';
import {history} from './history';
import { connectRouter } from 'connected-react-router';

const IndexReducer = combineReducers({
    app,
    main,
    router: connectRouter(history),
})

export default IndexReducer
