import {MainState} from './state';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginFormData} from './Login/form-data';

const slice = createSlice({
    initialState: new MainState(),
    name: 'main',
    reducers: {
        mainLogin(state, action: PayloadAction<LoginFormData>) {
            return {
                ...state,
                requesting: true
            };
        },
        loginComplete(state) {
            return {
                ...state,
                requesting: false
            };
        }
    }
});

const actions = slice.actions;

export const mainLogin = actions.mainLogin;
export const loginComplete = actions.loginComplete;
export const mainLogout = createAction('main/logout');
export const loadUserData = createAction('main/loadUserData');

const mainReducer = slice.reducer;

export default mainReducer;
