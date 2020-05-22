import {MainState} from './state';
import {createReducer, on} from "../../utils/redux/create-reducer";
import {loginComplete, mainLogin} from "./actions";

const mainReducer = createReducer(new MainState(), [
    on(mainLogin, state => ({...state, requesting: true})),
    on(loginComplete, state => ({...state, requesting: false}))
]);

export default mainReducer;
