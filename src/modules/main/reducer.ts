import {MainState} from './state';
import {createSlice} from '@reduxjs/toolkit';
import {ActionPayload} from '../../entities/common/action-payload';
import {LoginFormData} from './Login/form-data';

// const mainReducer = createReducer(new MainState(), [
//     on(mainLogin, state => ({...state, requesting: true})),
//     on(loginComplete, state => ({...state, requesting: false}))
// ]);

const slice = createSlice({
    initialState: new MainState(),
    name: 'main',
    reducers: {
        mainLogin(state, action: ActionPayload<LoginFormData>) {
            state.requesting = true;
        },
        loginComplete(state) {
            state.requesting = false;
        }
    }
});

export const {mainLogin, loginComplete} = slice.actions;
const mainReducer = slice.reducer;

export default mainReducer;
